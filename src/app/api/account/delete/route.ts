import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase/server";

export async function DELETE() {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const adminClient = await createAdminClient();

    // 1. Fetch all user's jobs to find storage files
    const { data: jobs } = await adminClient
      .from("jobs")
      .select("id, result_path, original_path")
      .eq("user_id", user.id);

    // 2. Remove files from results bucket
    const resultPaths = (jobs || [])
      .map((j) => j.result_path)
      .filter((p): p is string => Boolean(p));
    if (resultPaths.length > 0) {
      await adminClient.storage.from("results").remove(resultPaths);
    }

    // 3. Remove files from originals bucket
    const originalPaths = (jobs || [])
      .map((j) => j.original_path)
      .filter((p): p is string => Boolean(p));
    if (originalPaths.length > 0) {
      await adminClient.storage.from("originals").remove(originalPaths);
    }

    // Also remove any uploaded originals under folder `${user.id}/`
    try {
      const { data: userFiles } = await adminClient.storage
        .from("originals")
        .list(user.id);
      if (userFiles && userFiles.length > 0) {
        const fullPaths = userFiles.map((f) => `${user.id}/${f.name}`);
        await adminClient.storage.from("originals").remove(fullPaths);
      }
    } catch {
      // Ignore if list fails
    }

    // 4. Delete user database records
    await adminClient.from("credit_log").delete().eq("user_id", user.id);
    await adminClient.from("jobs").delete().eq("user_id", user.id);
    await adminClient.from("orders").delete().eq("user_id", user.id);
    await adminClient.from("profiles").delete().eq("id", user.id);

    // 5. Delete auth user from Supabase Auth admin
    try {
      await adminClient.auth.admin.deleteUser(user.id);
    } catch (authErr) {
      console.warn("Could not delete user from auth admin:", authErr);
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Account delete error:", err);
    return NextResponse.json(
      { error: err?.message || "Failed to delete account" },
      { status: 500 }
    );
  }
}
