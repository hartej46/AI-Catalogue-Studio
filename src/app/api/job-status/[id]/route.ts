import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // 1. Require signed-in user
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized. Please sign in." },
        { status: 401 }
      );
    }

    const { id: jobId } = await params;
    if (!jobId) {
      return NextResponse.json({ error: "Missing job ID." }, { status: 400 });
    }

    const adminClient = await createAdminClient();

    // 2. Fetch job row
    const { data: job, error: jobFetchError } = await adminClient
      .from("jobs")
      .select("*")
      .eq("id", jobId)
      .single();

    if (jobFetchError || !job) {
      return NextResponse.json({ error: "Job not found." }, { status: 404 });
    }

    // 3. Ownership check: Only the owner may call it
    if (job.user_id !== user.id) {
      return NextResponse.json(
        { error: "Forbidden. You do not have permission to view this job." },
        { status: 403 }
      );
    }

    // 4. If status is done, generate a signed URL valid for 10 minutes (600 seconds)
    let signedUrl: string | null = null;
    if (job.status === "done" && job.result_path) {
      const { data: signedData, error: signError } = await adminClient.storage
        .from("results")
        .createSignedUrl(job.result_path, 600); // 10 minutes

      if (signError) {
        console.warn(`[JOB ${jobId}] Failed to create signed URL for results:`, signError.message);
      } else {
        signedUrl = signedData?.signedUrl || null;
      }
    }

    return NextResponse.json({
      id: job.id,
      status: job.status,
      quality: job.quality,
      creditKind: job.credit_kind,
      model: job.model,
      signedUrl,
      error: job.error,
      createdAt: job.created_at,
      finishedAt: job.finished_at,
    });
  } catch (err: any) {
    console.error("GET /api/job-status/[id] error:", err);
    return NextResponse.json(
      { error: err?.message || "Internal server error." },
      { status: 500 }
    );
  }
}
