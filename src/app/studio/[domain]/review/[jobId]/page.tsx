import { Suspense } from "react";
import { notFound, redirect } from "next/navigation";
import { getCurrentUser, getCurrentProfile } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase/server";
import { getDomainConfig, getSizesConfig } from "@/lib/config";
import ReviewPageClient from "./ReviewPageClient";

interface PageProps {
  params: Promise<{
    domain: string;
    jobId: string;
  }>;
}

export const metadata = {
  title: "Masterpiece Review — Atelier AI Lab",
  description: "Review and download your synthesized professional commercial photograph.",
};

async function ReviewContent({
  domain,
  jobId,
}: {
  domain: string;
  jobId: string;
}) {
  const user = await getCurrentUser();
  if (!user) {
    redirect(`/login?redirectTo=/studio/${domain}/review/${jobId}`);
  }

  const adminClient = await createAdminClient();

  // 1. Fetch job row
  const { data: job, error: jobErr } = await adminClient
    .from("jobs")
    .select("*")
    .eq("id", jobId)
    .single();

  if (jobErr || !job) {
    notFound();
  }

  // 2. Owner check
  if (job.user_id !== user.id) {
    notFound();
  }

  // 3. User credits for 4K upgrade check
  const profile = await getCurrentProfile();
  const userCredits = {
    free_credits: profile?.free_credits ?? 0,
    paid_credits: profile?.paid_credits ?? 0,
  };

  // 4. Generate signed URLs
  let signedResultUrl: string | null = null;
  let signedOriginalUrl: string | null = null;

  if (job.result_path) {
    const { data: resData } = await adminClient.storage
      .from("results")
      .createSignedUrl(job.result_path, 3600); // 1 hour signed URL
    signedResultUrl = resData?.signedUrl || null;
  }

  if (job.original_path) {
    const { data: origData } = await adminClient.storage
      .from("originals")
      .createSignedUrl(job.original_path, 3600); // 1 hour signed URL
    signedOriginalUrl = origData?.signedUrl || null;
  }

  // 5. Look up config labels (Strictly config labels - no hardcoded claims)
  const domainCfg = getDomainConfig(domain);
  const sizesCfg = getSizesConfig();

  const categoryObj = domainCfg.categories.find((c) => c.id === job.category_id);
  const styleObj = domainCfg.styles.find((s) => s.id === job.style_id);
  const bgObj = domainCfg.backgrounds.find((b) => b.id === job.background_id);
  const lightingObj = domainCfg.lighting.find((l) => l.id === job.lighting_id);
  const ratioObj = sizesCfg.find((r) => r.id === job.ratio_id);
  const presetObj = domainCfg.presets?.find((p) => p.id === job.preset_id);

  // Dynamic Recipe Chips
  const recipeChips: string[] = [];
  if (categoryObj) recipeChips.push(`📂 ${categoryObj.label}`);
  if (styleObj) recipeChips.push(`🎨 ${styleObj.label}`);
  if (bgObj) recipeChips.push(`🧱 ${bgObj.label}`);
  if (lightingObj) recipeChips.push(`💡 ${lightingObj.label}`);
  if (ratioObj) recipeChips.push(`⛶ ${ratioObj.aspectRatio}`);

  // Dynamic Recipe Detailed List
  const recipeItems = [
    { label: "Category", value: categoryObj?.label || job.category_id || "Unspecified" },
    { label: "Style", value: styleObj?.label || job.style_id || "Standard" },
    { label: "Background", value: bgObj?.label || job.background_id || "Studio" },
    { label: "Lighting", value: lightingObj?.label || job.lighting_id || "Studio Softbox" },
    { label: "Aspect Ratio", value: ratioObj ? `${ratioObj.label} (${ratioObj.aspectRatio})` : job.ratio_id || "3:4" },
    { label: "Preset", value: presetObj?.label || "None (Custom)" },
  ];

  // If fine-tune options were saved, add them to recipe items
  if (job.fine_tune && typeof job.fine_tune === "object") {
    Object.entries(job.fine_tune).forEach(([ftKey, levelVal]) => {
      const ftConfig = domainCfg.fineTune?.find((f) => f.id === ftKey);
      if (ftConfig) {
        recipeItems.push({
          label: ftConfig.label,
          value: `Level ${levelVal}`,
        });
      }
    });
  }

  // 6. Real dimensions: read from qc_result or fallback to configured preview/final size
  const qc = job.qc_result as { width?: number; height?: number } | null;
  const isPreview = job.quality === "preview";
  const defaultSize = isPreview
    ? ratioObj?.previewPixels || { width: 810, height: 1080 }
    : ratioObj?.finalPixels || { width: 3072, height: 4096 };

  const realDimensions = {
    width: qc?.width || defaultSize.width,
    height: qc?.height || defaultSize.height,
  };

  return (
    <ReviewPageClient
      job={job as any}
      initialSignedResultUrl={signedResultUrl}
      initialSignedOriginalUrl={signedOriginalUrl}
      userCredits={userCredits}
      recipeChips={recipeChips}
      recipeItems={recipeItems}
      realDimensions={realDimensions}
    />
  );
}

export default async function StudioReviewPage({ params }: PageProps) {
  const { domain, jobId } = await params;

  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center text-xs text-[#7A7160]">
          Loading Atelier Review...
        </div>
      }
    >
      <ReviewContent domain={domain} jobId={jobId} />
    </Suspense>
  );
}
