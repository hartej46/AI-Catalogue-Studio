import { NextResponse } from "next/server";
import sharp from "sharp";
import { getCurrentUser } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ jobId: string }> }
) {
  try {
    // 1. Authenticate user
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { jobId } = await params;
    if (!jobId) {
      return NextResponse.json({ error: "Missing job ID" }, { status: 400 });
    }

    const { searchParams } = new URL(request.url);
    const format = (searchParams.get("format") || "full").toLowerCase();

    const adminClient = await createAdminClient();

    // 2. Fetch job
    const { data: job, error: fetchErr } = await adminClient
      .from("jobs")
      .select("*")
      .eq("id", jobId)
      .single();

    if (fetchErr || !job) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    // 3. Ownership check: only the owner may download
    if (job.user_id !== user.id) {
      return NextResponse.json(
        { error: "Forbidden: You do not own this image." },
        { status: 403 }
      );
    }

    if (!job.result_path || job.status !== "done") {
      return NextResponse.json(
        { error: "Image is not ready yet." },
        { status: 400 }
      );
    }

    // 4. Download original result buffer from private results bucket
    const { data: fileData, error: downloadErr } = await adminClient.storage
      .from("results")
      .download(job.result_path);

    if (downloadErr || !fileData) {
      return NextResponse.json(
        { error: `Failed to download image: ${downloadErr?.message}` },
        { status: 500 }
      );
    }

    const arrayBuffer = await fileData.arrayBuffer();
    const rawBuffer = Buffer.from(arrayBuffer);

    let outputBuffer: Buffer = rawBuffer;
    let filename = `atelier-${job.domain}-${job.quality}-${job.id}.jpg`;

    // 5. If format is 'whatsapp', compress specifically for WhatsApp sharing
    if (format === "whatsapp") {
      filename = `atelier-${job.domain}-${job.id}-whatsapp.jpg`;

      // Resize max dimension to 1600px and compress at quality 75 with mozjpeg
      outputBuffer = await sharp(rawBuffer)
        .resize({
          width: 1600,
          height: 1600,
          fit: "inside",
          withoutEnlargement: true,
        })
        .jpeg({ quality: 75, mozjpeg: true })
        .toBuffer();
    }

    // 6. Return streamed response with download headers
    return new NextResponse(outputBuffer as any, {
      status: 200,
      headers: {
        "Content-Type": "image/jpeg",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Content-Length": outputBuffer.length.toString(),
        "Cache-Control": "private, no-transform, max-age=3600",
      },
    });
  } catch (err: any) {
    console.error("GET /api/download/[jobId] error:", err);
    return NextResponse.json(
      { error: err?.message || "Failed to download image." },
      { status: 500 }
    );
  }
}
