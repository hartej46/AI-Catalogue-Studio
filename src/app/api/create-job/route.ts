import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase/server";
import { buildPrompt } from "@/lib/buildPrompt";
import { startGenerationWorker } from "@/lib/generate";
import { deductUserCredit } from "@/lib/credits";

const ALLOWED_BODY_KEYS = new Set([
  "domain",
  "categoryId",
  "styleId",
  "backgroundId",
  "lightingId",
  "ratioId",
  "presetId",
  "fineTune",
  "productName",
  "originalPath",
  "forceFinal",
]);

export async function POST(request: Request) {
  try {
    // 1. Require a signed-in user
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized. Please sign in to create generation jobs." },
        { status: 401 }
      );
    }

    // 2. Parse request body and accept strictly allowed keys only
    let body: Record<string, any>;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON request body." },
        { status: 400 }
      );
    }

    for (const key of Object.keys(body)) {
      if (!ALLOWED_BODY_KEYS.has(key)) {
        return NextResponse.json(
          { error: `Unexpected field: "${key}" is not permitted.` },
          { status: 400 }
        );
      }
    }

    // Ensure required fields exist
    if (
      !body.domain ||
      !body.categoryId ||
      !body.styleId ||
      !body.backgroundId ||
      !body.lightingId ||
      !body.ratioId ||
      !body.originalPath
    ) {
      return NextResponse.json(
        { error: "Missing required generation fields." },
        { status: 400 }
      );
    }

    // 3. Check that originalPath belongs to this user
    if (!body.originalPath.startsWith(`${user.id}/`)) {
      return NextResponse.json(
        { error: "Unauthorized access: original photo does not belong to this user." },
        { status: 403 }
      );
    }

    // 4. Validate every ID with buildPrompt (it throws on bad IDs or invalid domain ownership)
    try {
      buildPrompt({
        domain: body.domain,
        categoryId: body.categoryId,
        styleId: body.styleId,
        backgroundId: body.backgroundId,
        lightingId: body.lightingId,
        ratioId: body.ratioId,
        presetId: body.presetId || null,
        fineTune: body.fineTune || null,
        productName: body.productName || null,
      });
    } catch (validationErr: any) {
      return NextResponse.json(
        { error: validationErr.message },
        { status: 400 }
      );
    }

    // 5. Check if GENERATION_ENABLED is "true" in environment
    if (process.env.GENERATION_ENABLED !== "true") {
      return NextResponse.json(
        { error: "We are updating. Please try again soon." },
        { status: 503 }
      );
    }

    const adminClient = await createAdminClient();

    // 6. Enforce quotas:
    // a. At most 5 running jobs per user
    const { count: runningCount } = await adminClient
      .from("jobs")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user.id)
      .eq("status", "running");

    if ((runningCount || 0) >= 5) {
      return NextResponse.json(
        { error: "You already have 5 jobs running. Please wait for them to finish." },
        { status: 429 }
      );
    }

    // b. At most 40 jobs per hour per user
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
    const { count: hourlyCount } = await adminClient
      .from("jobs")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user.id)
      .gte("created_at", oneHourAgo);

    if ((hourlyCount || 0) >= 40) {
      return NextResponse.json(
        { error: "Hourly limit reached (maximum 40 jobs/hour). Please try again later." },
        { status: 429 }
      );
    }

    // c. MAX_JOBS_PER_DAY for the whole app (default 300)
    const maxJobsPerDay = parseInt(process.env.MAX_JOBS_PER_DAY || "300", 10);
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    const { count: dailyAppCount } = await adminClient
      .from("jobs")
      .select("*", { count: "exact", head: true })
      .gte("created_at", oneDayAgo);

    if ((dailyAppCount || 0) >= maxJobsPerDay) {
      return NextResponse.json(
        { error: "We are updating. Please try again soon." },
        { status: 503 }
      );
    }

    // 7. Double-tap guard:
    // If the user already has a queued or running job created in the last 5 seconds with the same inputs,
    // return that job instead of creating another
    const fiveSecondsAgo = new Date(Date.now() - 5000).toISOString();
    const { data: recentMatchingJobs } = await adminClient
      .from("jobs")
      .select("id, status, quality, credit_kind")
      .eq("user_id", user.id)
      .in("status", ["queued", "running"])
      .eq("domain", body.domain)
      .eq("category_id", body.categoryId)
      .eq("style_id", body.styleId)
      .eq("background_id", body.backgroundId)
      .eq("lighting_id", body.lightingId)
      .eq("ratio_id", body.ratioId)
      .eq("original_path", body.originalPath)
      .gte("created_at", fiveSecondsAgo)
      .limit(1);

    if (recentMatchingJobs && recentMatchingJobs.length > 0) {
      return NextResponse.json({
        success: true,
        jobId: recentMatchingJobs[0].id,
        status: recentMatchingJobs[0].status,
        quality: recentMatchingJobs[0].quality,
        creditKind: recentMatchingJobs[0].credit_kind,
        reused: true,
      });
    }

    // 8. Deduct credit (paid-only if forceFinal is true)
    let creditKind: "free" | "paid";
    try {
      creditKind = await deductUserCredit(
        adminClient,
        user.id,
        body.forceFinal === true
      );
    } catch (deductErr: any) {
      const msg = deductErr?.message || "You have no credits left";
      return NextResponse.json(
        { error: msg },
        { status: 402 }
      );
    }

    // 9. Create the job row:
    // Quality = preview when a free credit was taken, otherwise final; save credit_kind
    const quality = body.forceFinal === true || creditKind === "paid" ? "final" : "preview";

    const { data: newJob, error: jobInsertError } = await adminClient
      .from("jobs")
      .insert({
        user_id: user.id,
        domain: body.domain,
        category_id: body.categoryId,
        style_id: body.styleId,
        background_id: body.backgroundId,
        lighting_id: body.lightingId,
        ratio_id: body.ratioId,
        preset_id: body.presetId || null,
        fine_tune: body.fineTune || {},
        product_name: body.productName || null,
        original_path: body.originalPath,
        quality,
        credit_kind: creditKind,
        status: "queued",
      })
      .select()
      .single();

    if (jobInsertError || !newJob) {
      console.error("Job insertion error:", jobInsertError);
      return NextResponse.json(
        { error: "Failed to initialize studio job." },
        { status: 500 }
      );
    }

    // 10. Start the generation in the background and return the job id immediately
    startGenerationWorker(newJob.id).catch((workerErr) => {
      console.error(`[JOB ${newJob.id}] Background worker invocation failed:`, workerErr);
    });

    return NextResponse.json({
      success: true,
      jobId: newJob.id,
      status: newJob.status,
      quality: newJob.quality,
      creditKind: newJob.credit_kind,
    });
  } catch (error: any) {
    console.error("POST /api/create-job error:", error);
    return NextResponse.json(
      { error: error?.message || "Internal server error." },
      { status: 500 }
    );
  }
}
