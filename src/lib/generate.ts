import sharp from "sharp";
import { GoogleGenAI } from "@google/genai";
import { createAdminClient } from "@/lib/supabase/server";
import { buildPrompt } from "@/lib/buildPrompt";

// Models configurable via environment variables
export const IMAGE_MODEL_PREVIEW =
  process.env.IMAGE_MODEL_PREVIEW || "gemini-2.5-flash-image";
export const IMAGE_MODEL_FINAL =
  process.env.IMAGE_MODEL_FINAL || "gemini-3-pro-image-preview";
export const IMAGE_MODEL_RETRY =
  process.env.IMAGE_MODEL_RETRY || "gemini-2.5-flash-image";

// QC vision model — reads image 1 (original) + image 2 (generated), returns JSON
const QC_MODEL = process.env.QC_MODEL || "gemini-2.5-flash";

const QC_QUESTION =
  'Image 1 is the original product. Image 2 is a generated photo. ' +
  'Does the product in image 2 match image 1 in shape, colour, stones, pattern and proportions? ' +
  'Is any part of the product hidden, cropped, or duplicated incorrectly? ' +
  'Answer with JSON only: {"match": true or false, "reason": "one short sentence"}';

interface QcAnswer {
  match: boolean;
  reason: string;
}

/**
 * Checks if an error corresponds to HTTP 402 (Payment Required) or Quota/Resource Exhaustion.
 */
function isQuotaOrPaymentError(error: any): boolean {
  if (!error) return false;
  const status = error.status || error.statusCode || error.httpStatus;
  if (status === 402 || status === 429) return true;

  const msg = (error.message || "").toLowerCase();
  const code = (error.code || "").toString().toLowerCase();

  return (
    msg.includes("402") ||
    msg.includes("quota") ||
    msg.includes("resource_exhausted") ||
    msg.includes("billing") ||
    msg.includes("rate limit") ||
    msg.includes("insufficient_quota") ||
    code.includes("402") ||
    code.includes("429") ||
    code.includes("resource_exhausted")
  );
}

/**
 * Calls the QC vision model with both original and generated images.
 * Returns { match, reason } or null if the response cannot be parsed.
 */
async function runQcCheck(
  ai: GoogleGenAI,
  base64Original: string,
  base64Generated: string
): Promise<QcAnswer | null> {
  try {
    const response = await ai.models.generateContent({
      model: QC_MODEL,
      contents: [
        {
          role: "user",
          parts: [
            {
              inlineData: {
                mimeType: "image/jpeg",
                data: base64Original,
              },
            },
            {
              inlineData: {
                mimeType: "image/jpeg",
                data: base64Generated,
              },
            },
            { text: QC_QUESTION },
          ],
        },
      ],
    });

    const rawText =
      response.candidates?.[0]?.content?.parts
        ?.filter((p: any) => typeof p.text === "string")
        .map((p: any) => p.text)
        .join("") || "";

    // Strip markdown code fences if the model wraps the JSON
    const jsonText = rawText
      .replace(/```(?:json)?\s*/gi, "")
      .replace(/```/g, "")
      .trim();

    const parsed = JSON.parse(jsonText);

    if (
      typeof parsed.match !== "boolean" ||
      typeof parsed.reason !== "string"
    ) {
      console.warn("[QC] Unexpected JSON shape:", parsed);
      return null;
    }

    return { match: Boolean(parsed.match), reason: String(parsed.reason) };
  } catch (err: any) {
    console.warn("[QC] Failed to parse QC response:", err?.message || err);
    return null;
  }
}

/**
 * Generation worker executing Gemini image generation in the background.
 * Hard limit: at most 2 image generations and 2 QC checks per job.
 */
export async function startGenerationWorker(jobId: string): Promise<void> {
  const adminClient = await createAdminClient();

  // 1. Fetch job row
  const { data: job, error: jobFetchError } = await adminClient
    .from("jobs")
    .select("*")
    .eq("id", jobId)
    .single();

  if (jobFetchError || !job) {
    console.error(
      `[JOB ${jobId}] Failed to fetch job:`,
      jobFetchError?.message
    );
    return;
  }

  // 2. Mark job as running
  await adminClient
    .from("jobs")
    .update({ status: "running" })
    .eq("id", jobId);

  // Helper to refund credit and mark job as failed
  const failAndRefund = async (
    userMessage: string,
    internalError: any,
    qcReason?: string
  ) => {
    console.error(`[JOB ${jobId}] Generation error:`, internalError);

    try {
      const { data: refundKind, error: refundErr } = await adminClient.rpc(
        "refund_credit",
        { p_job_id: jobId }
      );
      if (refundErr) {
        console.warn(`[JOB ${jobId}] refund_credit note:`, refundErr.message);
      } else {
        console.log(
          `[JOB ${jobId}] Credit refunded successfully (${refundKind}).`
        );
      }
    } catch (refErr: any) {
      console.warn(`[JOB ${jobId}] Refund exception:`, refErr?.message);
    }

    const qcResultUpdate = qcReason
      ? { qc_fail_reason: qcReason, refunded: true }
      : null;

    await adminClient
      .from("jobs")
      .update({
        status: "failed",
        error: userMessage,
        ...(qcResultUpdate ? { qc_result: qcResultUpdate } : {}),
        finished_at: new Date().toISOString(),
      })
      .eq("id", jobId);
  };

  try {
    // 3. Download the original reference product photo from private storage
    if (!job.original_path) {
      throw new Error("Job has no original_path recorded.");
    }

    const { data: fileData, error: downloadError } = await adminClient.storage
      .from("originals")
      .download(job.original_path);

    if (downloadError || !fileData) {
      throw new Error(
        `Failed to download original photo from storage: ${downloadError?.message}`
      );
    }

    const arrayBuffer = await fileData.arrayBuffer();
    const inputBuffer = Buffer.from(arrayBuffer);
    const base64Original = inputBuffer.toString("base64");

    // 4. Build prompt using buildPrompt
    const promptOutput = buildPrompt({
      domain: job.domain,
      categoryId: job.category_id || "",
      styleId: job.style_id || "",
      backgroundId: job.background_id || "",
      lightingId: job.lighting_id || "",
      ratioId: job.ratio_id || "3_4",
      presetId: job.preset_id || null,
      fineTune: (job.fine_tune as Record<string, number>) || null,
      productName: job.product_name || null,
    });

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error(
        "GEMINI_API_KEY is not configured in environment variables."
      );
    }

    const ai = new GoogleGenAI({ apiKey });
    const isPreview = job.quality === "preview";
    const primaryModel = isPreview ? IMAGE_MODEL_PREVIEW : IMAGE_MODEL_FINAL;

    // 5. Generate raw image buffer using a named model
    const generateWithModel = async (
      modelName: string
    ): Promise<{ buffer: Buffer; modelUsed: string }> => {
      const response = await ai.models.generateContent({
        model: modelName,
        contents: [
          {
            inlineData: {
              mimeType: "image/jpeg",
              data: base64Original,
            },
          },
          promptOutput.text,
        ],
        config: {
          responseModalities: ["IMAGE"],
          imageConfig: {
            aspectRatio: promptOutput.ratioAspect,
            imageSize: isPreview ? "1K" : "4K",
          },
        },
      });

      let generatedBuffer: Buffer | null = null;
      const candidate = response.candidates?.[0];

      if (candidate?.content?.parts) {
        for (const part of candidate.content.parts) {
          if ((part as any).inlineData?.data) {
            generatedBuffer = Buffer.from(
              (part as any).inlineData.data,
              "base64"
            );
            break;
          }
        }
      }

      if (!generatedBuffer) {
        throw new Error("No image data returned from Gemini API.");
      }

      return { buffer: generatedBuffer, modelUsed: modelName };
    };

    // 6. Post-process: resize + watermark (preview) or full-res (final)
    const processImage = async (rawBuffer: Buffer): Promise<Buffer> => {
      if (isPreview) {
        const resized = sharp(rawBuffer).resize({
          width: 1080,
          height: 1080,
          fit: "inside",
          withoutEnlargement: true,
        });

        const resizedBuffer = await resized.toBuffer();
        const meta = await sharp(resizedBuffer).metadata();
        const width = meta.width || 810;
        const height = meta.height || 1080;

        const watermarkWidth = 190;
        const watermarkHeight = 34;
        const leftPos = Math.max(0, width - watermarkWidth - 14);
        const topPos = Math.max(0, height - watermarkHeight - 14);

        const watermarkSvg = Buffer.from(`
          <svg width="${watermarkWidth}" height="${watermarkHeight}" xmlns="http://www.w3.org/2000/svg">
            <rect x="0" y="0" width="${watermarkWidth}" height="${watermarkHeight}" rx="6" fill="black" fill-opacity="0.45" />
            <text x="${watermarkWidth / 2}" y="22" font-family="sans-serif" font-size="11" font-weight="bold" fill="white" fill-opacity="0.8" text-anchor="middle" letter-spacing="1.5">CATALOGUE STUDIO</text>
          </svg>
        `);

        return sharp(resizedBuffer)
          .composite([{ input: watermarkSvg, left: leftPos, top: topPos }])
          .jpeg({ quality: 90 })
          .toBuffer();
      } else {
        return sharp(rawBuffer)
          .jpeg({ quality: 95, mozjpeg: true })
          .toBuffer();
      }
    };

    // ─────────────────────────────────────────────────────────────
    // Helper: upload result to storage and mark job done
    // ─────────────────────────────────────────────────────────────
    const saveAndFinish = async (
      processedBuffer: Buffer,
      modelUsed: string,
      qcAnswer: QcAnswer
    ): Promise<void> => {
      const resultPath = `${job.user_id}/${job.id}.jpg`;
      const { error: uploadError } = await adminClient.storage
        .from("results")
        .upload(resultPath, processedBuffer, {
          contentType: "image/jpeg",
          upsert: true,
        });

      if (uploadError) {
        throw new Error(
          `Failed to save image to results bucket: ${uploadError.message}`
        );
      }

      const finalMeta = await sharp(processedBuffer).metadata();

      await adminClient
        .from("jobs")
        .update({
          status: "done",
          result_path: resultPath,
          model: modelUsed,
          qc_result: {
            width: finalMeta.width || (isPreview ? 810 : 3072),
            height: finalMeta.height || (isPreview ? 1080 : 4096),
            sizeBytes: processedBuffer.length,
            format: finalMeta.format || "jpeg",
            qc_match: true,
            qc_reason: qcAnswer.reason,
          },
          finished_at: new Date().toISOString(),
        })
        .eq("id", jobId);

      console.log(
        `[JOB ${jobId}] Completed using model: ${modelUsed} | QC: ${qcAnswer.reason}`
      );
    };

    // ─────────────────────────────────────────────────────────────
    // GENERATION + QC LOOP
    // Max 2 image generations, max 2 QC checks.
    // ─────────────────────────────────────────────────────────────

    // Attempt 1 — primary model
    let gen1: { buffer: Buffer; modelUsed: string };
    try {
      gen1 = await generateWithModel(primaryModel);
    } catch (primaryError: any) {
      console.error(
        `[JOB ${jobId}] Primary model (${primaryModel}) error:`,
        primaryError?.message || primaryError
      );

      if (isQuotaOrPaymentError(primaryError)) {
        await failAndRefund(
          "We are updating. Please try again soon.",
          primaryError
        );
        return;
      }

      // Non-quota error on generation 1 — skip QC, go straight to retry model
      console.log(
        `[JOB ${jobId}] Retrying with ${IMAGE_MODEL_RETRY} after primary failure...`
      );
      let gen2: { buffer: Buffer; modelUsed: string };
      try {
        gen2 = await generateWithModel(IMAGE_MODEL_RETRY);
      } catch (retryError: any) {
        await failAndRefund(
          "We are updating. Please try again soon.",
          retryError
        );
        return;
      }

      const proc2 = await processImage(gen2.buffer);
      const qc2 = await runQcCheck(
        ai,
        base64Original,
        proc2.toString("base64")
      );

      if (!qc2 || !qc2.match) {
        const reason = qc2?.reason || "QC response unreadable after retry";
        console.warn(
          `[JOB ${jobId}] QC failed after retry (primary failure path): ${reason}`
        );
        await failAndRefund(
          "We could not match your piece exactly. Your credit is back.",
          `QC failed: ${reason}`,
          reason
        );
        return;
      }

      await saveAndFinish(proc2, gen2.modelUsed, qc2);
      return;
    }

    // QC check 1
    const proc1 = await processImage(gen1.buffer);
    const qc1 = await runQcCheck(ai, base64Original, proc1.toString("base64"));

    if (qc1 && qc1.match) {
      await saveAndFinish(proc1, gen1.modelUsed, qc1);
      return;
    }

    const qcReason1 = qc1?.reason || "QC response could not be read";
    console.warn(
      `[JOB ${jobId}] QC 1 failed: "${qcReason1}". Retrying with ${IMAGE_MODEL_RETRY}...`
    );

    // Attempt 2 — retry model
    let gen2: { buffer: Buffer; modelUsed: string };
    try {
      gen2 = await generateWithModel(IMAGE_MODEL_RETRY);
    } catch (retryError: any) {
      await failAndRefund(
        "We could not match your piece exactly. Your credit is back.",
        retryError,
        qcReason1
      );
      return;
    }

    // QC check 2
    const proc2 = await processImage(gen2.buffer);
    const qc2 = await runQcCheck(ai, base64Original, proc2.toString("base64"));

    if (qc2 && qc2.match) {
      await saveAndFinish(proc2, gen2.modelUsed, qc2);
      return;
    }

    // Both QC checks failed — refund exactly once
    const qcReason2 =
      qc2?.reason || "QC response could not be read on second attempt";
    console.warn(
      `[JOB ${jobId}] QC 2 also failed: "${qcReason2}". Refunding.`
    );
    await failAndRefund(
      "We could not match your piece exactly. Your credit is back.",
      `QC failed twice — Attempt 1: ${qcReason1} | Attempt 2: ${qcReason2}`,
      `Attempt 1: ${qcReason1} | Attempt 2: ${qcReason2}`
    );
  } catch (err: any) {
    await failAndRefund("We are updating. Please try again soon.", err);
  }
}
