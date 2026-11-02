import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase/server";

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id: jobId } = await params;
    if (!jobId) {
      return NextResponse.json({ error: "Missing job id" }, { status: 400 });
    }

    const adminClient = await createAdminClient();

    // 1. Load the job — verify ownership
    const { data: job, error: fetchErr } = await adminClient
      .from("jobs")
      .select("id, user_id, result_path, original_path, status")
      .eq("id", jobId)
      .single();

    if (fetchErr || !job) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    if (job.user_id !== user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // 2. Delete result image from storage (best effort — don't fail if missing)
    if (job.result_path) {
      await adminClient.storage.from("results").remove([job.result_path]);
    }

    // 3. Delete original photo from storage (best effort)
    if (job.original_path) {
      await adminClient.storage.from("originals").remove([job.original_path]);
    }

    // 4. Delete the job row — cascades credit_log join but NOT the credit itself
    const { error: deleteErr } = await adminClient
      .from("jobs")
      .delete()
      .eq("id", jobId);

    if (deleteErr) {
      return NextResponse.json({ error: deleteErr.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Internal error" },
      { status: 500 }
    );
  }
}
