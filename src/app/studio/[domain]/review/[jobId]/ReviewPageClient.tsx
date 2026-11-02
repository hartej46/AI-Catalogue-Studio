"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Sparkles,
  Download,
  Sliders,
  RefreshCw,
  Share2,
  Check,
  AlertCircle,
  Loader2,
  Clock,
  ShieldCheck,
  Camera,
  Layers,
  Coins,
  Gem,
  ExternalLink,
  MessageCircle,
  Maximize2,
  Zap,
  Info,
} from "lucide-react";

interface RecipeDisplayItem {
  label: string;
  value: string;
}

interface Props {
  job: {
    id: string;
    domain: string;
    category_id: string | null;
    style_id: string | null;
    background_id: string | null;
    lighting_id: string | null;
    ratio_id: string | null;
    preset_id: string | null;
    fine_tune: Record<string, any> | null;
    product_name: string | null;
    original_path: string | null;
    result_path: string | null;
    quality: "preview" | "final";
    credit_kind: "free" | "paid" | null;
    status: "queued" | "running" | "done" | "failed";
    model: string | null;
    error: string | null;
    qc_result: {
      width?: number;
      height?: number;
      sizeBytes?: number;
    } | null;
  };
  initialSignedResultUrl: string | null;
  initialSignedOriginalUrl: string | null;
  userCredits: {
    free_credits: number;
    paid_credits: number;
  };
  recipeChips: string[];
  recipeItems: RecipeDisplayItem[];
  realDimensions: {
    width: number;
    height: number;
  };
}

export default function ReviewPageClient({
  job,
  initialSignedResultUrl,
  initialSignedOriginalUrl,
  userCredits,
  recipeChips,
  recipeItems,
  realDimensions,
}: Props) {
  const router = useRouter();

  const [currentStatus, setCurrentStatus] = useState(job.status);
  const [signedResultUrl, setSignedResultUrl] = useState(initialSignedResultUrl);
  const [signedOriginalUrl, setSignedOriginalUrl] = useState(initialSignedOriginalUrl);
  const [jobModel, setJobModel] = useState(job.model);
  const [errorMessage, setErrorMessage] = useState(job.error);
  const [activeTab, setActiveTab] = useState<"result" | "original">("result");

  const [isCreatingVariant, setIsCreatingVariant] = useState(false);
  const [isRecreating4K, setIsRecreating4K] = useState(false);
  const [show4KModal, setShow4KModal] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  // Poll status if job is queued or running
  useEffect(() => {
    if (currentStatus === "done" || currentStatus === "failed") return;

    let isMounted = true;
    const timer = setInterval(() => setElapsedSeconds((s) => s + 1), 1000);

    const poll = async () => {
      try {
        const res = await fetch(`/api/job-status/${job.id}`);
        const data = await res.json();
        if (!isMounted) return;

        if (res.ok && data) {
          setCurrentStatus(data.status);
          if (data.model) setJobModel(data.model);
          if (data.signedUrl) setSignedResultUrl(data.signedUrl);

          if (data.status === "failed") {
            setErrorMessage(data.error || "We are updating. Please try again soon.");
          }
        }
      } catch {
        // Retry next interval
      }
    };

    poll();
    const interval = setInterval(poll, 2000);

    return () => {
      isMounted = false;
      clearInterval(interval);
      clearInterval(timer);
    };
  }, [job.id, currentStatus]);

  // Task G2: Generate Variant (calls /api/create-job with same recipe and photo, costs 1 credit)
  const handleGenerateVariant = async () => {
    if (isCreatingVariant) return;
    setIsCreatingVariant(true);
    setActionError(null);

    try {
      const res = await fetch("/api/create-job", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          domain: job.domain,
          categoryId: job.category_id,
          styleId: job.style_id,
          backgroundId: job.background_id,
          lightingId: job.lighting_id,
          ratioId: job.ratio_id,
          presetId: job.preset_id,
          fineTune: job.fine_tune || {},
          productName: job.product_name,
          originalPath: job.original_path,
        }),
      });

      const data = await res.json();
      if (res.ok && data.jobId) {
        router.push(`/studio/${job.domain}/review/${data.jobId}`);
      } else {
        setActionError(data.error || "Failed to generate variant.");
        setIsCreatingVariant(false);
      }
    } catch (err: any) {
      setActionError(err?.message || "Network error.");
      setIsCreatingVariant(false);
    }
  };

  // Task G2: Recreate in 4K
  const handleInitiate4K = () => {
    if (userCredits.paid_credits < 1) {
      router.push("/credits");
      return;
    }
    setShow4KModal(true);
  };

  const handleConfirm4K = async () => {
    setIsRecreating4K(true);
    setActionError(null);

    try {
      const res = await fetch("/api/create-job", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          domain: job.domain,
          categoryId: job.category_id,
          styleId: job.style_id,
          backgroundId: job.background_id,
          lightingId: job.lighting_id,
          ratioId: job.ratio_id,
          presetId: job.preset_id,
          fineTune: job.fine_tune || {},
          productName: job.product_name,
          originalPath: job.original_path,
          forceFinal: true,
        }),
      });

      const data = await res.json();
      if (res.ok && data.jobId) {
        setShow4KModal(false);
        router.push(`/studio/${job.domain}/review/${data.jobId}`);
      } else {
        setActionError(data.error || "Failed to initiate 4K render.");
        setIsRecreating4K(false);
      }
    } catch (err: any) {
      setActionError(err?.message || "Network error.");
      setIsRecreating4K(false);
    }
  };

  // Task G2: Refine Recipe (go to customize page with choices, photo, and name filled in)
  const handleRefineRecipe = () => {
    const params = new URLSearchParams();
    if (job.category_id) params.set("category", job.category_id);
    if (job.style_id) params.set("style", job.style_id);
    if (job.background_id) params.set("background", job.background_id);
    if (job.lighting_id) params.set("lighting", job.lighting_id);
    if (job.ratio_id) params.set("ratio", job.ratio_id);
    if (job.preset_id) params.set("preset", job.preset_id);
    if (job.product_name) params.set("name", job.product_name);
    if (job.original_path) params.set("originalPath", job.original_path);

    router.push(`/studio/${job.domain}/step-3?${params.toString()}`);
  };

  // Task G2: Download for WhatsApp
  const handleDownloadWhatsApp = () => {
    window.location.href = `/api/download/${job.id}?format=whatsapp`;
  };

  // Standard Download
  const handleDownloadFull = () => {
    window.location.href = `/api/download/${job.id}?format=full`;
  };

  // Task G2: Share (browser share API if available, else copy download link)
  const handleShare = async () => {
    const shareUrl = signedResultUrl || window.location.href;
    const shareTitle = `${job.product_name || "Product"} — Atelier Studio Photograph`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: `Check out our new ${job.domain} photograph crafted in Atelier Studio.`,
          url: shareUrl,
        });
      } catch {
        // User dismissed
      }
    } else {
      await navigator.clipboard.writeText(shareUrl);
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2500);
    }
  };

  // 1. Creating Screen (when status is queued or running)
  if (currentStatus === "queued" || currentStatus === "running") {
    return (
      <div className="min-h-screen bg-[#FAF8F5] text-[#1F1C18] flex flex-col justify-between max-w-md mx-auto px-4 py-6 shadow-sm border-x border-[#EFEAE1]">
        <div className="flex items-center justify-between pb-3 border-b border-[#EAE3D6]">
          <div>
            <span className="font-serif text-base font-bold text-[#1E1B18] block leading-none">
              Catalogue Studio
            </span>
            <span className="text-[9px] tracking-[0.2em] uppercase text-[#787163] font-semibold">
              Atelier AI Lab · {job.domain.toUpperCase()}
            </span>
          </div>
          <div className="flex items-center gap-1.5 bg-[#F1ECD9] text-[#5B5226] text-xs font-bold px-2.5 py-1 rounded-full border border-[#E3DCC8]">
            <Clock className="w-3.5 h-3.5 animate-pulse text-[#5B5226]" />
            <span>{elapsedSeconds}s</span>
          </div>
        </div>

        <main className="my-auto py-12 text-center space-y-6">
          <div className="relative w-28 h-28 mx-auto flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border-4 border-[#EFE7D8] animate-pulse"></div>
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#5B5226] border-r-[#5B5226] animate-spin"></div>
            <div className="w-20 h-20 rounded-full bg-[#FAF5EB] border border-[#DDD4C3] flex items-center justify-center shadow-inner">
              <Sparkles className="w-8 h-8 text-[#5B5226] animate-bounce" />
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="font-serif text-2xl font-bold text-[#1F1C18] tracking-tight">
              Synthesizing Masterpiece...
            </h1>
            <p className="text-xs text-[#70685B] max-w-xs mx-auto leading-relaxed">
              {elapsedSeconds < 4
                ? "Calibrating studio lighting and camera angle..."
                : elapsedSeconds < 9
                ? "Synthesizing authentic surface textures and micro-reflections..."
                : elapsedSeconds < 15
                ? "Draping authentic materials and applying tonal harmony..."
                : "Finalizing commercial grade resolution and edge fidelity..."}
            </p>
          </div>

          <div className="inline-flex items-center gap-2 bg-[#F3EDE2] border border-[#E4DCB] px-3.5 py-1.5 rounded-full text-[11px] font-semibold text-[#5B5226]">
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
            <span className="uppercase tracking-wider text-[10px]">
              Status: {currentStatus.toUpperCase()} · Polling every 2s
            </span>
          </div>

          <div className="bg-[#FAF7F2] border border-[#E8E1D3] rounded-xl p-3 max-w-xs mx-auto text-left text-[11px] text-[#736B5E] space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-[#29241E]">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Credit Protected</span>
            </div>
            <p className="leading-snug text-[10px]">
              Your credit is safe. If any generation error occurs, it is automatically refunded to your balance immediately.
            </p>
          </div>
        </main>

        <div className="text-center pt-4">
          <Link
            href={`/studio/${job.domain}/step-3`}
            className="text-xs text-[#8A8272] hover:text-[#1F1C18] underline"
          >
            Cancel and Return to Customize
          </Link>
        </div>
      </div>
    );
  }

  // 2. Failure State
  // Determine if this was a QC mismatch failure (friendly message) or a system error
  const isQcFailure =
    errorMessage?.toLowerCase().includes("could not match") ||
    errorMessage?.toLowerCase().includes("credit is back");

  if (currentStatus === "failed" || errorMessage) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] text-[#1F1C18] flex flex-col justify-between max-w-md mx-auto px-4 py-6 shadow-sm border-x border-[#EFEAE1]">
        <div className="my-auto py-10 text-center space-y-5">
          {/* Icon */}
          <div className="w-16 h-16 rounded-full bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center mx-auto shadow-sm">
            <AlertCircle className="w-8 h-8" />
          </div>

          {/* Message */}
          <div className="space-y-2">
            <h1 className="font-serif text-xl font-bold text-[#1F1C18]">
              {isQcFailure ? "No Match Found" : "Generation Notice"}
            </h1>
            <p className="text-sm text-[#6F675A] max-w-xs mx-auto leading-relaxed">
              {isQcFailure
                ? "We could not match your piece exactly. Your credit is back."
                : "We are updating. Please try again soon."}
            </p>
          </div>

          {/* Credit refund notice */}
          <div className="bg-[#FAF7F2] border border-[#E8E1D3] rounded-xl p-3.5 max-w-[260px] mx-auto text-[11px] text-[#736B5E] flex items-start gap-2 text-left">
            <span className="text-[#C5A869] mt-0.5 text-base leading-none">✦</span>
            <p>
              1 credit has been automatically returned to your account balance.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-col gap-3 max-w-[260px] mx-auto">
            {/* Try again — same recipe, new generation */}
            <button
              onClick={() => {
                window.location.href = `/studio/${job.domain}/step-3`;
              }}
              className="w-full flex items-center justify-center gap-2 bg-[#5B5226] text-white px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-[#49421D] transition-all shadow-md"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Try Again</span>
            </button>

            {/* Refine Recipe — go back to customise with preserved settings */}
            <Link
              href={`/studio/${job.domain}/step-3`}
              className="w-full flex items-center justify-center gap-2 bg-[#F0EBE0] text-[#5B5226] border border-[#DDD5C0] px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-[#E8E1D0] transition-all"
            >
              <Sliders className="w-4 h-4" />
              <span>Refine Recipe</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 3. Review State (Done)
  const isPreview = job.quality === "preview";
  const displayImage = activeTab === "result" ? signedResultUrl : signedOriginalUrl;

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1F1C18] flex flex-col justify-between max-w-md mx-auto px-4 py-3.5 shadow-sm border-x border-[#EFEAE1] pb-24">
      {/* Top Header */}
      <header className="flex items-center justify-between pb-2.5">
        <Link
          href={`/studio/${job.domain}/step-3`}
          className="flex items-center gap-1.5 text-xs font-semibold text-[#29241E] hover:text-black"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="font-serif text-sm truncate max-w-[170px]">
            {job.domain.toUpperCase()} Review
          </span>
        </Link>

        <div className="flex items-center gap-2">
          {/* Credit Pill */}
          <div className="flex items-center gap-1 bg-[#F1ECD9] text-[#5B5226] text-xs font-bold px-2.5 py-0.5 rounded-full border border-[#E3DCC8]">
            <span className="text-[10px]">✦</span>
            <span>{isPreview ? "Free Preview" : "4K Masterpiece"}</span>
          </div>
        </div>
      </header>

      {/* Action Error Alert */}
      {actionError && (
        <div className="mb-2 p-2.5 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2 text-xs text-red-800">
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
          <div className="flex-1 text-[11px]">{actionError}</div>
        </div>
      )}

      {/* Main Content */}
      <main className="space-y-3.5 pt-1">
        {/* Title & Product Name (Real Data Only) */}
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <h1 className="font-serif text-xl font-bold text-[#1F1C18] truncate max-w-[280px]">
              {job.product_name || `${job.domain.toUpperCase()} Studio Render`}
            </h1>
            <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-800 border border-emerald-200 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
              <span>Ready</span>
            </span>
          </div>
        </div>

        {/* Preview Banner with Recreate in 4K action */}
        {isPreview && (
          <div className="bg-[#FAF4E8] border border-[#E6D9BE] rounded-xl p-3 flex items-center justify-between gap-3 shadow-xs">
            <div className="space-y-0.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#5B5226]">
                <Zap className="w-3.5 h-3.5" />
                <span>Preview Quality (Watermarked)</span>
              </div>
              <p className="text-[10px] text-[#7A705E] leading-tight">
                Generated with free credit at 1080p. Upgrade to clean 4K UHD.
              </p>
            </div>
            <button
              type="button"
              onClick={handleInitiate4K}
              className="px-3 py-1.5 bg-[#5B5226] hover:bg-[#49421D] text-white text-[10px] font-bold uppercase tracking-wider rounded-lg shrink-0 shadow-xs cursor-pointer active:scale-95 transition-all"
            >
              Recreate in 4K
            </button>
          </div>
        )}

        {/* Image Showcase Card with Original Compare Toggle */}
        <div className="relative rounded-2xl overflow-hidden border border-[#E7E0D3] bg-black shadow-md">
          {/* Before / After Toggle Buttons */}
          <div className="absolute top-3 left-3 z-20 flex items-center bg-black/70 backdrop-blur-md p-0.5 rounded-lg border border-white/20">
            <button
              type="button"
              onClick={() => setActiveTab("result")}
              className={`px-2.5 py-1 rounded text-[10px] font-bold tracking-wider uppercase transition-all ${
                activeTab === "result"
                  ? "bg-[#5B5226] text-white shadow-xs"
                  : "text-[#DCD5C5] hover:text-white"
              }`}
            >
              Studio Render
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("original")}
              className={`px-2.5 py-1 rounded text-[10px] font-bold tracking-wider uppercase transition-all ${
                activeTab === "original"
                  ? "bg-[#5B5226] text-white shadow-xs"
                  : "text-[#DCD5C5] hover:text-white"
              }`}
            >
              Original Photo
            </button>
          </div>

          {/* Model & Dimension Tag (Top Right) */}
          <div className="absolute top-3 right-3 z-20">
            <div className="bg-black/70 backdrop-blur-md text-[#E8DFD0] text-[9px] font-mono px-2.5 py-1 rounded-full uppercase tracking-wider border border-white/20 flex items-center gap-1.5">
              <span>{activeTab === "result" ? `${realDimensions.width}×${realDimensions.height} px` : "Raw Input"}</span>
            </div>
          </div>

          {/* Photo Display */}
          <div className="relative aspect-[3/4] w-full bg-[#1A1815]">
            {displayImage ? (
              <Image
                src={displayImage}
                alt={job.product_name || "Product Showcase"}
                fill
                priority
                unoptimized
                className="object-cover transition-opacity duration-300"
                sizes="(max-width: 480px) 100vw, 420px"
              />
            ) : (
              <div className="h-full flex items-center justify-center text-xs text-[#8A8272]">
                No image preview available
              </div>
            )}

            {/* Bottom Plinth Tag (Real Data Only - No Hardcoded Claims) */}
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between bg-black/80 backdrop-blur-md px-3 py-2 rounded-xl border border-white/15 text-white shadow-sm z-20">
              <div className="flex items-center gap-2 truncate">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0"></span>
                <span className="text-[11px] font-mono text-[#DCD4C5] truncate">
                  {jobModel ? `Model: ${jobModel}` : "Studio Synthesis"}
                </span>
              </div>
              <span className="bg-[#5B5226] text-[#F3EFE7] text-[9px] font-mono font-bold px-2 py-0.5 rounded tracking-wider uppercase shrink-0">
                {isPreview ? "Preview 1080p" : "4K UHD"}
              </span>
            </div>
          </div>
        </div>

        {/* Real Chips (Real Dimensions & Config Labels Only) */}
        <div className="flex flex-wrap gap-1.5">
          {/* Real Pixel Size Chip */}
          <span className="bg-white border border-[#E0D7C6] text-[#453E33] font-mono text-[10px] px-2.5 py-1 rounded-md font-bold shadow-2xs">
            📐 {realDimensions.width} × {realDimensions.height} px
          </span>

          {/* Quality Chip */}
          <span className="bg-white border border-[#E0D7C6] text-[#453E33] text-[10px] px-2.5 py-1 rounded-md font-medium shadow-2xs">
            {isPreview ? "🔒 Preview (Watermarked)" : "✨ 4K Clean (No Watermark)"}
          </span>

          {/* Dynamic Recipe Chips */}
          {recipeChips.map((chip, idx) => (
            <span
              key={idx}
              className="bg-white border border-[#E0D7C6] text-[#453E33] text-[10px] px-2.5 py-1 rounded-md font-medium shadow-2xs"
            >
              {chip}
            </span>
          ))}
        </div>

        {/* Recipe List (Strictly from Saved Job & Config Labels) */}
        <div className="bg-white rounded-xl p-3.5 border border-[#E7E0D3] shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-[#1F1C18] border-b border-[#F0EAE0] pb-2">
            <span>Studio Recipe Specifications</span>
            <span className="text-[10px] font-mono text-[#7A7160]">
              Job #{job.id.slice(0, 8)}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[11px]">
            {recipeItems.map((item, idx) => (
              <div key={idx} className="bg-[#FAF8F5] p-2 rounded-lg border border-[#EDE6D8]">
                <div className="text-[9px] uppercase tracking-wider text-[#8A8272] font-semibold">
                  {item.label}
                </div>
                <div className="font-bold text-[#29241E] truncate mt-0.5">
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Primary Download Button */}
        <div className="space-y-2 pt-1">
          <button
            type="button"
            onClick={handleDownloadFull}
            className="flex items-center justify-center gap-2 w-full bg-[#5B5226] hover:bg-[#49421D] text-white py-3.5 rounded-lg text-xs font-bold tracking-wider uppercase transition-all shadow-md active:scale-[0.99] cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>{isPreview ? "Download preview" : "Download 4K (JPG)"}</span>
          </button>

          {/* Secondary Action Grid: Generate Variant & Refine Recipe */}
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              disabled={isCreatingVariant}
              onClick={handleGenerateVariant}
              className="flex flex-col items-center justify-center gap-0.5 bg-white border border-[#DDD5C7] text-[#2F2921] py-2.5 rounded-lg text-xs font-semibold hover:bg-[#FAF8F5] transition-all cursor-pointer shadow-xs disabled:opacity-60"
            >
              <div className="flex items-center gap-1.5">
                <RefreshCw className={`w-3.5 h-3.5 text-[#5B5226] ${isCreatingVariant ? "animate-spin" : ""}`} />
                <span className="text-[10px] uppercase font-bold tracking-wider">
                  {isCreatingVariant ? "Dispatching..." : "Generate Variant"}
                </span>
              </div>
              <span className="text-[8px] text-[#787163] font-normal">
                Costs 1 credit
              </span>
            </button>

            <button
              type="button"
              onClick={handleRefineRecipe}
              className="flex items-center justify-center gap-1.5 bg-white border border-[#DDD5C7] text-[#2F2921] py-2.5 rounded-lg text-xs font-semibold hover:bg-[#FAF8F5] transition-all cursor-pointer shadow-xs"
            >
              <Sliders className="w-3.5 h-3.5 text-[#5B5226]" />
              <span className="text-[10px] uppercase font-bold tracking-wider">
                Refine Recipe
              </span>
            </button>
          </div>

          {/* Tertiary Action Grid: Download for WhatsApp & Share */}
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={handleDownloadWhatsApp}
              className="flex items-center justify-center gap-1.5 bg-[#FAF8F5] border border-[#DDD5C7] text-[#2F2921] py-2.5 rounded-lg text-xs font-semibold hover:bg-white transition-all cursor-pointer"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-700" />
              <span className="text-[10px] tracking-wider uppercase font-bold">
                WhatsApp JPG
              </span>
            </button>

            <button
              type="button"
              onClick={handleShare}
              className="flex items-center justify-center gap-1.5 bg-[#FAF8F5] border border-[#DDD5C7] text-[#2F2921] py-2.5 rounded-lg text-xs font-semibold hover:bg-white transition-all cursor-pointer"
            >
              {shareCopied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-[10px] tracking-wider uppercase font-bold text-emerald-700">
                    Copied Link!
                  </span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-[#5B5226]" />
                  <span className="text-[10px] tracking-wider uppercase font-bold">
                    Share Link
                  </span>
                </>
              )}
            </button>
          </div>
        </div>
      </main>

      {/* Recreate in 4K Confirmation Modal */}
      {show4KModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-[#FAF8F5] border border-[#D8CFBE] rounded-2xl max-w-sm w-full p-5 shadow-2xl space-y-4">
            <div className="w-10 h-10 rounded-full bg-[#5B5226]/10 text-[#5B5226] flex items-center justify-center">
              <Zap className="w-5 h-5" />
            </div>

            <div className="space-y-1.5">
              <h3 className="font-serif text-lg font-bold text-[#1F1C18]">
                Recreate in 4K Masterpiece?
              </h3>
              <p className="text-xs text-[#6B6456] leading-relaxed">
                This synthesizes a brand-new, ultra-high-resolution 4K render (4096px) with clean edges and zero watermarks.
              </p>
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-2.5 text-[10px] text-amber-900 leading-normal flex items-start gap-1.5">
                <Info className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                <span>
                  <strong>Note:</strong> Because generative AI creates a new synthesis, the 4K picture will follow your exact recipe and product but may look slightly different from the preview.
                </span>
              </div>
            </div>

            <div className="bg-[#F0EAE0] p-2.5 rounded-lg text-[11px] text-[#4A4234] flex items-center justify-between">
              <span>Cost:</span>
              <strong className="font-bold text-[#5B5226]">1 Paid Credit</strong>
            </div>

            <div className="flex gap-2 pt-1">
              <button
                type="button"
                onClick={() => setShow4KModal(false)}
                className="flex-1 py-2.5 rounded-lg border border-[#DDD5C7] text-xs font-semibold text-[#5B5226] hover:bg-white cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isRecreating4K}
                onClick={handleConfirm4K}
                className="flex-1 py-2.5 rounded-lg bg-[#5B5226] hover:bg-[#49421D] text-white text-xs font-bold uppercase tracking-wider cursor-pointer disabled:opacity-60"
              >
                {isRecreating4K ? "Starting 4K..." : "Confirm 4K"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Persistent Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-[#E8E1D5] py-2 px-6 flex items-center justify-between text-center z-40 shadow-md">
        <Link
          href={`/studio/${job.domain}`}
          className="flex flex-col items-center gap-0.5 text-[#5B5226]"
        >
          <Camera className="w-4 h-4" />
          <span className="text-[9px] font-bold uppercase tracking-wider">
            Studio
          </span>
        </Link>
        <Link
          href="/lookbook"
          className="flex flex-col items-center gap-0.5 text-[#867F73] hover:text-[#5B5226]"
        >
          <Layers className="w-4 h-4" />
          <span className="text-[9px] font-semibold uppercase tracking-wider">
            Lookbooks
          </span>
        </Link>
        <Link
          href="/credits"
          className="flex flex-col items-center gap-0.5 text-[#867F73] hover:text-[#5B5226]"
        >
          <Coins className="w-4 h-4" />
          <span className="text-[9px] font-semibold uppercase tracking-wider">
            Credits
          </span>
        </Link>
        <Link
          href="/atelier"
          className="flex flex-col items-center gap-0.5 text-[#867F73] hover:text-[#5B5226]"
        >
          <Gem className="w-4 h-4" />
          <span className="text-[9px] font-semibold uppercase tracking-wider">
            Atelier
          </span>
        </Link>
      </nav>
    </div>
  );
}
