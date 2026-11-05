"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Sparkles,
  Check,
  Palette,
  Sun,
  Moon,
  Sunrise,
  Sliders,
  Headphones,
  Camera,
  Layers,
  Coins,
  Gem,
  Footprints,
  Lock,
  Loader2,
  AlertCircle,
} from "lucide-react";

import footwearConfig from "@/config/footwear.json";
import sizesConfig from "@/config/sizes.json";
import UploadBlock, { type UploadedPhotoData } from "@/components/UploadBlock";

const bgColorClasses: Record<string, string> = {
  pure_white: "bg-surface border border-[#E0D9CC]",
  warm_beige: "bg-[#F3ECE1] border border-[#DDD5C6]",
  travertine: "bg-[#E6DEC9] border border-[#D5CCA8]",
  atelier: "bg-[#ECE6DC] border border-[#D9D1C5]",
};

const backgrounds = footwearConfig.backgrounds.map((bg) => ({
  id: bg.id,
  name: bg.label,
  colorClass: bgColorClasses[bg.id] || "bg-[#F3ECE1] border border-[#DDD5C6]",
}));

const lightingIcons: Record<string, typeof Sun> = {
  soft_studio: Sunrise,
  chiaroscuro: Moon,
  gallery_daylight: Sun,
};

const lightings = footwearConfig.lighting.map((l) => ({
  id: l.id,
  title: l.label,
  desc: l.rule,
  icon: lightingIcons[l.id] || Sun,
}));

const ratios = sizesConfig.map((s) => ({
  id: s.id,
  ratio: s.aspectRatio,
  title: s.label.split(" (")[0],
  desc: s.sublabel ?? "",
  isBest: s.id === "3_4",
}));

export default function FootwearStep3Page() {
  const router = useRouter();
  const [selectedBg, setSelectedBg] = useState("warm_beige");
  const [selectedLighting, setSelectedLighting] = useState("soft_studio");
  const [selectedRatio, setSelectedRatio] = useState("3_4");
  const [uploadedPhoto, setUploadedPhoto] = useState<UploadedPhotoData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const canGenerate = uploadedPhoto !== null;

  const handleGenerate = async () => {
    if (!uploadedPhoto || isSubmitting) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const res = await fetch("/api/create-job", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          domain: "footwear",
          categoryId: "formal_dress",
          styleId: "macro_detail",
          backgroundId: selectedBg,
          lightingId: selectedLighting,
          ratioId: selectedRatio,
          presetId: "burnished_leather",
          fineTune: { specularity: 2, leather_warmth: 2 },
          productName: uploadedPhoto.productName || null,
          originalPath: uploadedPhoto.originalPath,
        }),
      });

      const data = await res.json();

      if (res.ok && data.jobId) {
        router.push(`/studio/footwear/step-4?jobId=${data.jobId}`);
      } else {
        setSubmitError(data.error || "Failed to start generation.");
        setIsSubmitting(false);
      }
    } catch (err: any) {
      setSubmitError(err?.message || "Network error. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg text-ink flex flex-col justify-between pb-24">
      {/* Top Header */}
      <header className="sticky top-0 z-40 w-full bg-surface border-b border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <div>
            <span className="font-serif text-base font-bold tracking-tight text-ink block leading-none">
              Catalogue Studio
            </span>
            <span className="text-[9px] tracking-[0.2em] uppercase text-muted font-semibold">
              Atelier AI Lab · Footwear
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/credits"
              className="flex items-center gap-1 bg-bg hover:bg-surface text-accent text-xs font-semibold px-2.5 py-1 rounded-[4px] border border-border transition-colors duration-150"
            >
              <Sparkles className="w-3.5 h-3.5 text-brass" />
              <span>3 CR</span>
            </Link>
            <Link
              href="/atelier"
              className="w-8 h-8 rounded-[4px] bg-bg border border-border text-ink flex items-center justify-center font-serif text-xs font-bold hover:border-muted transition-colors duration-150"
            >
              GP
            </Link>
          </div>
        </div>
      </header>

      {/* Sub Navigation Bar */}
      <div className="max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-3">
        <div className="flex items-center justify-between py-1.5 border-b border-border text-xs font-semibold">
          <Link
            href="/studio/footwear/step-2"
            className="flex items-center gap-1 text-muted uppercase tracking-wider hover:text-ink transition-colors duration-150 text-[10px]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Shot Types</span>
          </Link>
          <span className="bg-surface text-accent px-2.5 py-0.5 rounded-[4px] border border-border uppercase tracking-wider text-[10px]">
            Step 3 of 4 · Customize
          </span>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 space-y-6 flex-1">
        {/* Title */}
        <div className="space-y-1">
          <h1 className="font-serif text-2xl font-normal text-[#1C1714]">
            Customize Your Shot
          </h1>
          <p className="text-xs text-[#6E655C] leading-relaxed">
            Configure staging, lighting, and aspect ratio for bespoke footwear.
          </p>
        </div>

        {/* 1. Background */}
        <div className="bg-surface rounded-[6px] p-3.5 border border-[#DDD4C7] shadow-warm-sm space-y-2.5">
          <div className="flex items-center justify-between text-[11px]">
            <div className="flex items-center gap-1.5">
              <span className="font-bold uppercase tracking-wider text-[#312B24]">
                1. Background
              </span>
              <span className="text-[#5B1A1F] font-semibold text-[10px]">
                · Warm Beige Active
              </span>
            </div>
            <Palette className="w-4 h-4 text-[#6E655C]" />
          </div>

          <div className="grid grid-cols-4 gap-2">
            {backgrounds.map((bg) => {
              const isSelected = selectedBg === bg.id;
              return (
                <div
                  key={bg.id}
                  onClick={() => setSelectedBg(bg.id)}
                  className={`relative rounded-[6px] p-2.5 text-center cursor-pointer transition-all ${
                    isSelected
                      ? "bg-[#FAF7F0] border-2 border-[#5B1A1F]"
                      : "bg-[#F4EFE8] border border-[#DDD4C7] hover:border-[#D0C5B3]"
                  }`}
                >
                  <div
                    className={`w-9 h-9 rounded-[4px] mx-auto mb-1.5 flex items-center justify-center ${bg.colorClass}`}
                  >
                    {isSelected && (
                      <Check className="w-4 h-4 text-[#5B1A1F] stroke-[3]" />
                    )}
                  </div>
                  <div className="text-[10px] font-semibold text-[#1C1714] truncate">
                    {bg.name}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 2. Studio Lighting */}
        <div className="bg-surface rounded-[6px] p-3.5 border border-[#DDD4C7] shadow-warm-sm space-y-2.5">
          <div className="flex items-center justify-between text-[11px]">
            <div className="flex items-center gap-1.5">
              <span className="font-bold uppercase tracking-wider text-[#312B24]">
                2. Studio Lighting
              </span>
              <span className="text-[#5B1A1F] font-semibold text-[10px]">
                · Diffused Rayon
              </span>
            </div>
            <Sun className="w-4 h-4 text-[#6E655C]" />
          </div>

          <div className="grid grid-cols-3 gap-2">
            {lightings.map((l) => {
              const isSelected = selectedLighting === l.id;
              const Icon = l.icon;
              return (
                <div
                  key={l.id}
                  onClick={() => setSelectedLighting(l.id)}
                  className={`p-3 rounded-[6px] border cursor-pointer transition-all space-y-1 ${
                    isSelected
                      ? "bg-[#FAF7F0] border-[#5B1A1F] ring-1 ring-[#5B1A1F]"
                      : "bg-[#F4EFE8] border-[#DDD4C7] hover:border-[#D0C5B3]"
                  }`}
                >
                  <div className="w-6 h-6 rounded-md bg-surface border border-[#E0D7C7] flex items-center justify-center text-[#5B1A1F] mb-1">
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <div className="text-xs font-bold text-[#1C1714] leading-tight">
                    {l.title}
                  </div>
                  <div className="text-[9px] text-[#6E655C] leading-snug">
                    {l.desc}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 3. Aspect Ratio */}
        <div className="bg-surface rounded-[6px] p-3.5 border border-[#DDD4C7] shadow-warm-sm space-y-2.5">
          <div className="flex items-center justify-between text-[11px]">
            <span className="font-bold uppercase tracking-wider text-[#312B24]">
              3. Aspect Ratio
            </span>
            <span className="bg-[#FBF8F3] text-[#5B1A1F] text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">
              Multi-Platform
            </span>
          </div>

          <div className="grid grid-cols-4 gap-2">
            {ratios.map((r) => {
              const isSelected = selectedRatio === r.id;
              return (
                <div
                  key={r.id}
                  onClick={() => setSelectedRatio(r.id)}
                  className={`relative p-2 rounded-[6px] border text-center cursor-pointer transition-all ${
                    isSelected
                      ? "bg-[#FAF7F0] border-[#5B1A1F] ring-1 ring-[#5B1A1F]"
                      : "bg-[#F4EFE8] border-[#DDD4C7] hover:border-[#D0C5B3]"
                  }`}
                >
                  {r.isBest && (
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-[#5B1A1F] text-bg text-[8px] font-bold px-1.5 py-0.2 rounded uppercase tracking-wider">
                      Best
                    </div>
                  )}
                  <div className="bg-[#FBF8F3] text-[#5B1A1F] font-mono text-[10px] font-bold py-0.5 px-1 rounded mx-auto inline-block mb-1">
                    {r.ratio}
                  </div>
                  <div className="text-[10px] font-bold text-[#1C1714] truncate">
                    {r.title}
                  </div>
                  <div className="text-[8px] text-[#6E655C] truncate">{r.desc}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 4. Product Photo Upload */}
        <UploadBlock
          onUploadChange={setUploadedPhoto}
          domainLabel="Footwear"
        />

        {/* Preset Fine-tune Bar */}
        <div className="bg-[#FBF8F3] border border-[#DDD4C7] rounded-[6px] p-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-[4px] bg-[#E9E1D2] flex items-center justify-center text-[#5B1A1F]">
              <Footprints className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-[#1C1714] flex items-center gap-1">
                <span>Burnished Leather Preset</span>
                <Check className="w-3 h-3 text-[#5B1A1F]" />
              </div>
              <div className="text-[10px] text-[#6E655C]">
                Specularity 88% · Leather Warmth ...
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={() => alert("Preset Fine-tuning modal opened")}
            className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider bg-surface border border-[#DDD4C7] px-2.5 py-1 rounded text-[#363027] hover:bg-[#F4EFE8]"
          >
            <span>Fine-tune</span>
            <Sliders className="w-3 h-3" />
          </button>
        </div>

        {/* Floating Concierge Button */}
        <div className="flex justify-end pt-0.5">
          <button
            type="button"
            onClick={() => alert("Connecting to Atelier Concierge...")}
            className="inline-flex items-center gap-1.5 bg-surface border border-[#DDD4C7] text-[#1C1714] px-3 py-1 rounded-[4px] text-xs font-semibold shadow-warm-sm hover:bg-[#F4EFE8]"
          >
            <span className="w-1.5 h-1.5 rounded-[4px] bg-emerald-500"></span>
            <Headphones className="w-3.5 h-3.5 text-[#5B1A1F]" />
            <span className="text-[10px] tracking-wider uppercase font-bold">
              Concierge
            </span>
            <span className="text-[#888]">&gt;</span>
          </button>
        </div>

        {/* Action Button & Note */}
        <div className="space-y-1.5 pt-1">
          {submitError && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-800 rounded-[6px] p-2.5 text-xs">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
              <span>{submitError}</span>
            </div>
          )}

          {!canGenerate && (
            <div className="flex items-center justify-center gap-1.5 bg-[#F7F2E7] border border-[#DDD4C7] rounded-[6px] py-2.5 px-3 text-[10px] text-[#5B1A1F] font-semibold">
              <Lock className="w-3 h-3" />
              <span>Upload a product photo above to enable generation</span>
            </div>
          )}

          <button
            type="button"
            disabled={!canGenerate || isSubmitting}
            onClick={handleGenerate}
            className={`flex items-center justify-center gap-2 w-full py-3.5 rounded-[4px] text-xs font-bold tracking-wider uppercase transition-all shadow-warm-sm ${
              canGenerate && !isSubmitting
                ? "bg-[#5B1A1F] hover:bg-[#471418] text-bg active:scale-[0.99] cursor-pointer"
                : "bg-[#D0C9BB] text-[#8F897E] cursor-not-allowed shadow-none"
            }`}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>DISPATCHING ATELIER JOB...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>GENERATE SHOT — 1 CREDIT</span>
              </>
            )}
          </button>
          <div className="flex items-center justify-center gap-1 text-[10px] text-[#6E655C] font-medium">
            <Check className="w-3 h-3 text-[#5B1A1F]" />
            <span>1 CREDIT DEDUCTED ONLY ON APPROVAL</span>
          </div>
        </div>
      </main>

      {/* Persistent Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 w-full bg-surface border-t border-border py-2 px-6 z-50 shadow-warm-sm">
        <div className="max-w-5xl mx-auto flex items-center justify-around sm:justify-center sm:gap-16 text-center">
          <Link
            href="/studio/footwear"
            className="flex flex-col items-center gap-0.5 text-accent"
          >
            <Camera className="w-4 h-4" />
            <span className="text-[9px] font-semibold uppercase tracking-wider">
              Studio
            </span>
          </Link>
          <Link
            href="/lookbook"
            className="flex flex-col items-center gap-0.5 text-muted hover:text-ink transition-colors duration-150"
          >
            <Layers className="w-4 h-4" />
            <span className="text-[9px] font-semibold uppercase tracking-wider">
              Lookbook
            </span>
          </Link>
          <Link
            href="/credits"
            className="flex flex-col items-center gap-0.5 text-muted hover:text-ink transition-colors duration-150"
          >
            <Coins className="w-4 h-4" />
            <span className="text-[9px] font-semibold uppercase tracking-wider">
              Credits
            </span>
          </Link>
          <Link
            href="/atelier"
            className="flex flex-col items-center gap-0.5 text-muted hover:text-ink transition-colors duration-150"
          >
            <Gem className="w-4 h-4" />
            <span className="text-[9px] font-semibold uppercase tracking-wider">
              Atelier
            </span>
          </Link>
        </div>
      </nav>
    </div>
  );
}
