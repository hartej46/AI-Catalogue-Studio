import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase/server";
import { getDomainConfig } from "@/lib/config";

export async function GET(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const domain = searchParams.get("domain") || null; // null = all
    const cursor = searchParams.get("cursor") || null; // ISO timestamp for pagination
    const PAGE_SIZE = 24;

    const adminClient = await createAdminClient();

    let query = adminClient
      .from("jobs")
      .select(
        "id, domain, status, quality, credit_kind, product_name, style_id, result_path, original_path, error, created_at, finished_at"
      )
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(PAGE_SIZE + 1); // fetch one extra to determine if there's a next page

    if (domain && domain !== "all") {
      query = query.eq("domain", domain);
    }

    if (cursor) {
      query = query.lt("created_at", cursor);
    }

    const { data: jobs, error: fetchError } = await query;

    if (fetchError) {
      return NextResponse.json({ error: fetchError.message }, { status: 500 });
    }

    const hasMore = (jobs?.length ?? 0) > PAGE_SIZE;
    const pageJobs = hasMore ? jobs!.slice(0, PAGE_SIZE) : (jobs ?? []);

    // Generate short-lived signed URLs for thumbnails (5 minutes is enough for the grid)
    const items = await Promise.all(
      pageJobs.map(async (job) => {
        let thumbUrl: string | null = null;
        if (job.status === "done" && job.result_path) {
          const { data } = await adminClient.storage
            .from("results")
            .createSignedUrl(job.result_path, 300); // 5 minutes
          thumbUrl = data?.signedUrl || null;
        }

        // Resolve style label from config
        let styleLabel: string | null = null;
        try {
          const cfg = getDomainConfig(job.domain);
          const styleObj = cfg.styles.find((s) => s.id === job.style_id);
          styleLabel = styleObj?.label || null;
        } catch {}

        return {
          id: job.id,
          domain: job.domain,
          status: job.status,
          quality: job.quality,
          credit_kind: job.credit_kind,
          product_name: job.product_name,
          style_label: styleLabel,
          error: job.error,
          thumb_url: thumbUrl,
          created_at: job.created_at,
          finished_at: job.finished_at,
        };
      })
    );

    const nextCursor =
      hasMore && pageJobs.length > 0
        ? pageJobs[pageJobs.length - 1].created_at
        : null;

    return NextResponse.json({ items, nextCursor });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Internal error" },
      { status: 500 }
    );
  }
}
