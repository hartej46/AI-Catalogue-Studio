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
  pure_white: "bg-white border border-[#E0D9CC]",
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
    <div className="min-h-screen bg-[#FAF8F5] text-[#1F1C18] flex flex-col justify-between max-w-md mx-auto px-4 py-3.5 shadow-sm border-x border-[#EFEAE1] pb-24">
      {/* Top Header */}
      <header className="flex items-center justify-between pb-3 border-b border-[#EFEAE1]">
        <div>
          <span className="font-serif text-base font-bold tracking-tight text-[#1E1B18] block leading-none">
            Catalogue Studio
          </span>
          <span className="text-[9px] tracking-[0.2em] uppercase text-[#787163] font-semibold">
            Atelier AI Lab · Footwear
          </span>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-[#F1ECD9] text-[#5B5226] text-xs font-bold px-2.5 py-1 rounded-full border border-[#E3DCC8]">
            <Sparkles className="w-3 h-3 text-[#5B5226]" />
            <span>3 CR</span>
          </div>
          <div className="w-8 h-8 rounded-full bg-[#5B5226] text-white flex items-center justify-center font-serif text-xs font-bold">
            GP
          </div>
        </div>
      </header>

      {/* Sub Navigation Bar */}
      <div className="flex items-center justify-between py-1.5 border-b border-[#EAE3D6] text-[10px] font-bold">
        <Link
          href="/studio/footwear/step-2"
          className="flex items-center gap-1 text-[#6E6759] uppercase tracking-wider hover:text-black"
        >
          <ArrowLeft className="w-3 h-3" />
          <span>Back to Shot Types</span>
        </Link>
        <span className="bg-[#EFE9DC] text-[#5B5226] px-2 py-0.5 rounded uppercase tracking-wider">
          Step 3 of 4 · Customize
        </span>
      </div>

      {/* Main Content */}
      <main className="space-y-4 pt-2">
        {/* Title */}
        <div className="space-y-1">
          <h1 className="font-serif text-2xl font-normal text-[#1F1C18]">
            Customize Your Shot
          </h1>
          <p className="text-xs text-[#6A6357] leading-relaxed">
            Configure staging, lighting, and aspect ratio for bespoke footwear.
          </p>
        </div>

        {/* 1. Background */}
        <div className="bg-white rounded-2xl p-3.5 border border-[#E7E0D3] shadow-xs space-y-2.5">
          <div className="flex items-center justify-between text-[11px]">
            <div className="flex items-center gap-1.5">
              <span className="font-bold uppercase tracking-wider text-[#312B24]">
                1. Background
              </span>
              <span className="text-[#5B5226] font-semibold text-[10px]">
                · Warm Beige Active
              </span>
            </div>
            <Palette className="w-4 h-4 text-[#7A7366]" />
          </div>

          <div className="grid grid-cols-4 gap-2">
            {backgrounds.map((bg) => {
              const isSelected = selectedBg === bg.id;
              return (
                <div
                  key={bg.id}
                  onClick={() => setSelectedBg(bg.id)}
                  className={`relative rounded-xl p-2.5 text-center cursor-pointer transition-all ${
                    isSelected
                      ? "bg-[#FAF7F0] border-2 border-[#5B5226]"
                      : "bg-[#FAF8F5] border border-[#E7E0D3] hover:border-[#D0C5B3]"
                  }`}
                >
                  <div
                    className={`w-9 h-9 rounded-full mx-auto mb-1.5 flex items-center justify-center ${bg.colorClass}`}
                  >
                    {isSelected && (
                      <Check className="w-4 h-4 text-[#5B5226] stroke-[3]" />
                    )}
                  </div>
                  <div className="text-[10px] font-semibold text-[#1F1C18] truncate">
                    {bg.name}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 2. Studio Lighting */}
        <div className="bg-white rounded-2xl p-3.5 border border-[#E7E0D3] shadow-xs space-y-2.5">
          <div className="flex items-center justify-between text-[11px]">
            <div className="flex items-center gap-1.5">
              <span className="font-bold uppercase tracking-wider text-[#312B24]">
                2. Studio Lighting
              </span>
              <span className="text-[#5B5226] font-semibold text-[10px]">
                · Diffused Rayon
              </span>
            </div>
            <Sun className="w-4 h-4 text-[#7A7366]" />
          </div>

          <div className="grid grid-cols-3 gap-2">
            {lightings.map((l) => {
              const isSelected = selectedLighting === l.id;
              const Icon = l.icon;
              return (
                <div
                  key={l.id}
                  onClick={() => setSelectedLighting(l.id)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all space-y-1 ${
                    isSelected
                      ? "bg-[#FAF7F0] border-[#5B5226] ring-1 ring-[#5B5226]"
                      : "bg-[#FAF8F5] border-[#E7E0D3] hover:border-[#D0C5B3]"
                  }`}
                >
                  <div className="w-6 h-6 rounded-md bg-white border border-[#E0D7C7] flex items-center justify-center text-[#5B5226] mb-1">
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <div className="text-xs font-bold text-[#1F1C18] leading-tight">
                    {l.title}
                  </div>
                  <div className="text-[9px] text-[#7A7366] leading-snug">
                    {l.desc}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 3. Aspect Ratio */}
        <div className="bg-white rounded-2xl p-3.5 border border-[#E7E0D3] shadow-xs space-y-2.5">
          <div className="flex items-center justify-between text-[11px]">
            <span className="font-bold uppercase tracking-wider text-[#312B24]">
              3. Aspect Ratio
            </span>
            <span className="bg-[#EFEAE0] text-[#5B5226] text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">
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
                  className={`relative p-2 rounded-xl border text-center cursor-pointer transition-all ${
                    isSelected
                      ? "bg-[#FAF7F0] border-[#5B5226] ring-1 ring-[#5B5226]"
                      : "bg-[#FAF8F5] border-[#E7E0D3] hover:border-[#D0C5B3]"
                  }`}
                >
                  {r.isBest && (
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-[#5B5226] text-white text-[8px] font-bold px-1.5 py-0.2 rounded uppercase tracking-wider">
                      Best
                    </div>
                  )}
                  <div className="bg-[#EAE4D7] text-[#5B5226] font-mono text-[10px] font-bold py-0.5 px-1 rounded mx-auto inline-block mb-1">
                    {r.ratio}
                  </div>
                  <div className="text-[10px] font-bold text-[#1F1C18] truncate">
                    {r.title}
                  </div>
                  <div className="text-[8px] text-[#7A7366] truncate">{r.desc}</div>
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
        <div className="bg-[#F5F1E8] border border-[#E7E0D3] rounded-xl p-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-[#E9E1D2] flex items-center justify-center text-[#5B5226]">
              <Footprints className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-[#1F1C18] flex items-center gap-1">
                <span>Burnished Leather Preset</span>
                <Check className="w-3 h-3 text-[#5B5226]" />
              </div>
              <div className="text-[10px] text-[#70685B]">
                Specularity 88% · Leather Warmth ...
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={() => alert("Preset Fine-tuning modal opened")}
            className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider bg-white border border-[#DDD5C7] px-2.5 py-1 rounded text-[#363027] hover:bg-[#FAF8F5]"
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
            className="inline-flex items-center gap-1.5 bg-white border border-[#DDD5C7] text-[#2F2921] px-3 py-1 rounded-full text-xs font-semibold shadow-xs hover:bg-[#FAF8F5]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <Headphones className="w-3.5 h-3.5 text-[#5B5226]" />
            <span className="text-[10px] tracking-wider uppercase font-bold">
              Concierge
            </span>
            <span className="text-[#888]">&gt;</span>
          </button>
        </div>

        {/* Action Button & Note */}
        <div className="space-y-1.5 pt-1">
          {submitError && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-800 rounded-xl p-2.5 text-xs">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
              <span>{submitError}</span>
            </div>
          )}

          {!canGenerate && (
            <div className="flex items-center justify-center gap-1.5 bg-[#F7F2E7] border border-[#E8DFBE] rounded-xl py-2.5 px-3 text-[10px] text-[#7A6A2E] font-semibold">
              <Lock className="w-3 h-3" />
              <span>Upload a product photo above to enable generation</span>
            </div>
          )}

          <button
            type="button"
            disabled={!canGenerate || isSubmitting}
            onClick={handleGenerate}
            className={`flex items-center justify-center gap-2 w-full py-3.5 rounded-lg text-xs font-bold tracking-wider uppercase transition-all shadow-md ${
              canGenerate && !isSubmitting
                ? "bg-[#5B5226] hover:bg-[#49421D] text-white active:scale-[0.99] cursor-pointer"
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
          <div className="flex items-center justify-center gap-1 text-[10px] text-[#6E675B] font-medium">
            <Check className="w-3 h-3 text-[#5B5226]" />
            <span>1 CREDIT DEDUCTED ONLY ON APPROVAL</span>
          </div>
        </div>
      </main>

      {/* Persistent Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-[#E8E1D5] py-2 px-6 flex items-center justify-between text-center z-50 shadow-md">
        <Link
          href="/studio/footwear"
          className="flex flex-col items-center gap-0.5 text-[#5B5226]"
        >
          <Camera className="w-4 h-4" />
          <span className="text-[9px] font-bold uppercase tracking-wider">
            Studio
          </span>
        </Link>
        <Link
          href="/select-domain"
          className="flex flex-col items-center gap-0.5 text-[#867F73] hover:text-[#5B5226]"
        >
          <Layers className="w-4 h-4" />
          <span className="text-[9px] font-semibold uppercase tracking-wider">
            Lookbook
          </span>
        </Link>
        <div className="flex flex-col items-center gap-0.5 text-[#867F73]">
          <Coins className="w-4 h-4" />
          <span className="text-[9px] font-semibold uppercase tracking-wider">
            Credits
          </span>
        </div>
        <Link
          href="/select-domain"
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
