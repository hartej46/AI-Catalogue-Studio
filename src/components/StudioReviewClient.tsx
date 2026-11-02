"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  Sparkles,
  Download,
  Sliders,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Clock,
  ShieldCheck,
  Store,
  Camera,
  Layers,
  Coins,
  Gem,
  Award,
  ExternalLink,
} from "lucide-react";

interface StudioReviewClientProps {
  domain: "jewellery" | "footwear" | "optical";
  domainTitle: string;
  defaultTitle: string;
  defaultSubtitle: string;
}

export default function StudioReviewClient({
  domain,
  domainTitle,
  defaultTitle,
  defaultSubtitle,
}: StudioReviewClientProps) {
  const searchParams = useSearchParams();
  const jobId = searchParams.get("jobId");

  const [jobStatus, setJobStatus] = useState<string>("queued");
  const [signedUrl, setSignedUrl] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [jobQuality, setJobQuality] = useState<string>("preview");
  const [usedModel, setUsedModel] = useState<string | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  // Poll job status every 2 seconds if jobId is present
  useEffect(() => {
    if (!jobId) return;

    let isMounted = true;
    let pollInterval: NodeJS.Timeout | null = null;
    let timerInterval: NodeJS.Timeout | null = null;

    // Timer for elapsed seconds
    timerInterval = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);

    const checkStatus = async () => {
      try {
        const res = await fetch(`/api/job-status/${jobId}`);
        const data = await res.json();

        if (!isMounted) return;

        if (res.ok && data) {
          setJobStatus(data.status);
          if (data.quality) setJobQuality(data.quality);
          if (data.model) setUsedModel(data.model);

          if (data.status === "done" && data.signedUrl) {
            setSignedUrl(data.signedUrl);
            if (pollInterval) clearInterval(pollInterval);
            if (timerInterval) clearInterval(timerInterval);
          } else if (data.status === "failed") {
            setErrorMessage(data.error || "We are updating. Please try again soon.");
            if (pollInterval) clearInterval(pollInterval);
            if (timerInterval) clearInterval(timerInterval);
          }
        } else {
          setErrorMessage(data?.error || "Unable to retrieve job status.");
          if (pollInterval) clearInterval(pollInterval);
          if (timerInterval) clearInterval(timerInterval);
        }
      } catch {
        if (!isMounted) return;
        setErrorMessage("Network error checking job status.");
      }
    };

    // First check immediately
    checkStatus();

    // Poll every 2 seconds
    pollInterval = setInterval(checkStatus, 2000);

    return () => {
      isMounted = false;
      if (pollInterval) clearInterval(pollInterval);
      if (timerInterval) clearInterval(timerInterval);
    };
  }, [jobId]);

  const handleDownload = async () => {
    if (!signedUrl) return;
    setIsDownloading(true);

    try {
      const response = await fetch(signedUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `atelier-${domain}-${jobId || "render"}.jpg`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch {
      window.open(signedUrl, "_blank");
    } finally {
      setIsDownloading(false);
    }
  };

  // Phase A: Creating / Generating Screen (when jobId exists and job is not done yet)
  if (jobId && jobStatus !== "done" && !errorMessage) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] text-[#1F1C18] flex flex-col justify-between max-w-md mx-auto px-4 py-6 shadow-sm border-x border-[#EFEAE1]">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#EAE3D6]">
          <div>
            <span className="font-serif text-base font-bold text-[#1E1B18] block leading-none">
              Catalogue Studio
            </span>
            <span className="text-[9px] tracking-[0.2em] uppercase text-[#787163] font-semibold">
              Atelier AI Lab · {domainTitle}
            </span>
          </div>
          <div className="flex items-center gap-1.5 bg-[#F1ECD9] text-[#5B5226] text-xs font-bold px-2.5 py-1 rounded-full border border-[#E3DCC8]">
            <Clock className="w-3.5 h-3.5 animate-pulse text-[#5B5226]" />
            <span>{elapsedSeconds}s</span>
          </div>
        </div>

        {/* Creating Centerpiece */}
        <main className="my-auto py-12 text-center space-y-6">
          {/* Animated Spinner with Studio Glow */}
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
                ? "Calibrating 4K studio lighting and camera angle..."
                : elapsedSeconds < 9
                ? "Synthesizing authentic surface textures and micro-reflections..."
                : elapsedSeconds < 15
                ? "Draping authentic materials and applying tonal harmony..."
                : "Finalizing commercial grade resolution and edge fidelity..."}
            </p>
          </div>

          {/* Step Pill */}
          <div className="inline-flex items-center gap-2 bg-[#F3EDE2] border border-[#E4DCB] px-3.5 py-1.5 rounded-full text-[11px] font-semibold text-[#5B5226]">
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
            <span className="uppercase tracking-wider text-[10px]">
              Status: {jobStatus.toUpperCase()} · Polling every 2s
            </span>
          </div>

          {/* Quality Notice */}
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

        {/* Footer cancel / back */}
        <div className="text-center pt-4">
          <Link
            href={`/studio/${domain}/step-3`}
            className="text-xs text-[#8A8272] hover:text-[#1F1C18] underline"
          >
            Cancel and Return to Customize
          </Link>
        </div>
      </div>
    );
  }

  // Phase B: Error / Failed Screen
  if (errorMessage) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] text-[#1F1C18] flex flex-col justify-between max-w-md mx-auto px-4 py-6 shadow-sm border-x border-[#EFEAE1]">
        <div className="my-auto py-12 text-center space-y-4">
          <div className="w-14 h-14 rounded-full bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center mx-auto shadow-sm">
            <AlertCircle className="w-7 h-7" />
          </div>

          <div className="space-y-1.5">
            <h1 className="font-serif text-xl font-bold text-[#1F1C18]">
              Notice
            </h1>
            <p className="text-xs text-[#6F675A] max-w-xs mx-auto leading-relaxed">
              {errorMessage}
            </p>
          </div>

          <div className="bg-[#FAF7F2] border border-[#E8E1D3] rounded-xl p-3 max-w-xs mx-auto text-[11px] text-[#736B5E]">
            <p>1 Credit has been refunded to your account balance.</p>
          </div>

          <div className="pt-4">
            <Link
              href={`/studio/${domain}/step-3`}
              className="inline-flex items-center justify-center gap-2 bg-[#5B5226] text-white px-6 py-3 rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-[#49421D] transition-all shadow-md"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Return to Customize</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Phase C: Review Page (Generated Masterpiece Ready)
  const displayImage = signedUrl || "/images/jewellery_craft.jpg";

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1F1C18] flex flex-col justify-between max-w-md mx-auto px-4 py-3.5 shadow-sm border-x border-[#EFEAE1] pb-24">
      {/* Top Header */}
      <header className="flex items-center justify-between pb-2.5">
        <Link
          href={`/studio/${domain}/step-3`}
          className="flex items-center gap-1.5 text-xs font-semibold text-[#29241E] hover:text-black"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="font-serif text-sm truncate max-w-[170px]">
            {domainTitle} Step 4: Review
          </span>
        </Link>

        <div className="flex items-center gap-1.5">
          <div className="flex items-center gap-1 bg-[#F1ECD9] text-[#5B5226] text-xs font-bold px-2 py-0.5 rounded-full border border-[#E3DCC8]">
            <span className="text-[10px]">✦</span>
            <span>{jobQuality === "preview" ? "Preview Render" : "Final 4K"}</span>
          </div>
        </div>
      </header>

      {/* Sub Navigation Bar */}
      <div className="flex items-center justify-between py-1 border-b border-[#EAE3D6] pb-2 text-[10px] font-bold">
        <Link
          href={`/studio/${domain}/step-3`}
          className="flex items-center gap-1 text-[#6E6759] uppercase tracking-wider hover:text-black"
        >
          <ArrowLeft className="w-3 h-3" />
          <span>Back to Customize</span>
        </Link>
        <span className="bg-[#EFE9DC] text-[#5B5226] px-2 py-0.5 rounded uppercase tracking-wider">
          Step 4 of 4 · Masterpiece
        </span>
      </div>

      {/* Main Content */}
      <main className="space-y-4 pt-2">
        {/* Title & Badge */}
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <h1 className="font-serif text-2xl font-normal text-[#1F1C18]">
              Review Your Image
            </h1>
            <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-800 border border-emerald-200 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
              <span>Ready</span>
            </span>
          </div>
          <p className="text-xs text-[#6A6357] leading-relaxed">
            Your bespoke {domainTitle.toLowerCase()} photograph is rendered and ready for commercial use.
          </p>
        </div>

        {/* Generated Image Showcase Card */}
        <div className="relative rounded-2xl overflow-hidden border border-[#E7E0D3] bg-black shadow-md">
          {/* Top Overlays */}
          <div className="absolute top-3 right-3 z-10">
            <div className="bg-black/60 backdrop-blur-md text-[#E8DFD0] text-[9px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider border border-white/20 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span>
                {jobQuality === "preview" ? "Preview Grade (Watermarked)" : "4K Masterpiece (Clean)"}
              </span>
            </div>
          </div>

          {/* Masterpiece Image */}
          <div className="relative aspect-[3/4] w-full bg-[#1A1815]">
            <Image
              src={displayImage}
              alt="Generated Atelier Render"
              fill
              priority
              unoptimized
              className="object-cover"
              sizes="(max-width: 480px) 100vw, 420px"
            />

            {/* Bottom Plinth Tag */}
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between bg-black/75 backdrop-blur-md px-3 py-2 rounded-xl border border-white/10 text-white shadow-sm">
              <div className="flex items-center gap-2 truncate">
                <Award className="w-4 h-4 text-[#D6B86C] shrink-0" />
                <span className="text-[11px] font-semibold tracking-wide truncate">
                  {usedModel ? `Rendered via ${usedModel}` : "Studio Certified Quality"}
                </span>
              </div>
              <span className="bg-[#5B5226] text-[#F3EFE7] text-[9px] font-bold px-2 py-0.5 rounded tracking-wider uppercase shrink-0">
                {jobQuality === "preview" ? "1080P" : "4K UHD"}
              </span>
            </div>
          </div>
        </div>

        {/* Details Card */}
        <div className="bg-white rounded-2xl p-4 border border-[#E7E0D3] shadow-xs space-y-3">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="font-serif text-lg font-bold text-[#1F1C18]">
                {defaultTitle}
              </h2>
              <p className="text-[11px] text-[#787163]">
                {defaultSubtitle}
              </p>
            </div>
          </div>

          {/* Metadata Chips */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            <span className="bg-[#FAF8F5] border border-[#E5DECF] text-[#4F483D] text-[10px] px-2.5 py-1 rounded-md font-medium">
              🔒 Short-lived link (valid 10 mins)
            </span>
            <span className="bg-[#FAF8F5] border border-[#E5DECF] text-[#4F483D] text-[10px] px-2.5 py-1 rounded-md font-medium">
              {jobQuality === "preview" ? "Free Credit (Preview)" : "Paid Credit (Final 4K)"}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-2.5">
          <button
            type="button"
            onClick={handleDownload}
            disabled={isDownloading || !signedUrl}
            className="flex items-center justify-center gap-2 w-full bg-[#5B5226] hover:bg-[#49421D] text-white py-3.5 rounded-lg text-xs font-bold tracking-wider uppercase transition-all shadow-md active:scale-[0.99] disabled:opacity-75 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>
              {isDownloading ? "Downloading Image..." : "Download High-Res Render"}
            </span>
          </button>

          <div className="grid grid-cols-2 gap-2">
            <Link
              href={`/studio/${domain}/step-3`}
              className="flex items-center justify-center gap-1.5 bg-[#FAF8F5] border border-[#DDD5C7] text-[#2F2921] py-2.5 rounded-lg text-xs font-semibold hover:bg-white transition-all text-center"
            >
              <Sliders className="w-3.5 h-3.5 text-[#5B5226]" />
              <span className="text-[10px] uppercase tracking-wider">
                Refine Recipe
              </span>
            </Link>
            <Link
              href={`/studio/${domain}/step-3`}
              className="flex items-center justify-center gap-1.5 bg-[#FAF8F5] border border-[#DDD5C7] text-[#2F2921] py-2.5 rounded-lg text-xs font-semibold hover:bg-white transition-all text-center"
            >
              <RefreshCw className="w-3.5 h-3.5 text-[#5B5226]" />
              <span className="text-[10px] uppercase tracking-wider">
                Generate Variant
              </span>
            </Link>
          </div>

          <div className="flex items-center justify-between text-[10px] text-[#696255] font-medium pt-1 px-1">
            <div className="flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-[#5B5226]" />
              <span>Ready for Marketplace &amp; Social</span>
            </div>
            <span className="font-bold text-[#5B5226] uppercase">
              Private Link
            </span>
          </div>
        </div>
      </main>

      {/* Persistent Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-[#E8E1D5] py-2 px-6 flex items-center justify-between text-center z-50 shadow-md">
        <Link
          href={`/studio/${domain}`}
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
