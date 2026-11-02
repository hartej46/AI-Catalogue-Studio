"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Sparkles,
  Check,
  Sun,
  Moon,
  Sunrise,
  Sliders,
  Headphones,
  ShieldCheck,
  Lock,
  Loader2,
  AlertCircle,
} from "lucide-react";

import jewelleryConfig from "@/config/jewellery.json";
import sizesConfig from "@/config/sizes.json";
import UploadBlock, { type UploadedPhotoData } from "@/components/UploadBlock";

const backgroundImages: Record<string, string> = {
  crimson_velvet: "/images/bangles_craft.jpg",
  warm_travertine: "/images/hero_multi_craft.jpg",
  silk_brocade: "/images/footwear_craft.jpg",
  dark_charcoal: "/images/jewellery_craft.jpg",
};

const surfaces = jewelleryConfig.backgrounds.map((bg) => ({
  id: bg.id,
  name: bg.label,
  image: backgroundImages[bg.id] || "/images/jewellery_craft.jpg",
}));

const lightingIcons: Record<string, typeof Sun> = {
  soft_studio: Sun,
  chiaroscuro: Moon,
  golden_hour: Sunrise,
};

const lightings = jewelleryConfig.lighting.map((l) => ({
  id: l.id,
  title: l.label,
  desc: l.rule,
  icon: lightingIcons[l.id] || Sun,
}));

const ratios = sizesConfig.map((s) => ({
  id: s.id,
  ratio: s.aspectRatio,
  label: s.label.split(" (")[0],
  sub: s.sublabel ?? "",
  best: s.id === "3_4",
}));

export default function JewelleryStep3Page() {
  const router = useRouter();
  const [selectedSurface, setSelectedSurface] = useState("crimson_velvet");
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
          domain: "jewellery",
          categoryId: "necklaces",
          styleId: "macro",
          backgroundId: selectedSurface,
          lightingId: selectedLighting,
          ratioId: selectedRatio,
          presetId: "polki_emerald_choker",
          fineTune: { specularity: 2, shadow_warmth: 2 },
          productName: uploadedPhoto.productName || null,
          originalPath: uploadedPhoto.originalPath,
        }),
      });

      const data = await res.json();

      if (res.ok && data.jobId) {
        router.push(`/studio/jewellery/step-4?jobId=${data.jobId}`);
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
    <div className="min-h-screen bg-[#FAF8F5] text-[#1F1C18] flex flex-col justify-between max-w-md mx-auto px-4 py-3.5 shadow-sm border-x border-[#EFEAE1] pb-10">
      {/* Top Header */}
      <header className="flex items-center justify-between pb-2.5">
        <Link
          href="/studio/jewellery/step-2"
          className="flex items-center gap-1.5 text-xs font-semibold text-[#29241E] hover:text-black"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="font-serif text-sm truncate max-w-[170px]">
            Jewellery Step 3: Cust...
          </span>
        </Link>

        <div className="flex items-center gap-1.5">
          <div className="flex items-center gap-1 bg-[#F1ECD9] text-[#5B5226] text-xs font-bold px-2 py-0.5 rounded-full border border-[#E3DCC8]">
            <span className="text-[10px]">✦</span>
            <span>3 CR</span>
          </div>
          <div className="w-7 h-7 rounded-full bg-[#5B5226] text-white flex items-center justify-center text-[10px] font-bold">
            GP
          </div>
        </div>
      </header>

      {/* Sub Navigation Bar */}
      <div className="flex items-center justify-between py-1 border-b border-[#EAE3D6] pb-2 text-[10px] font-bold">
        <Link
          href="/studio/jewellery/step-2"
          className="flex items-center gap-1 text-[#6E6759] uppercase tracking-wider hover:text-black"
        >
          <ArrowLeft className="w-3 h-3" />
          <span>Back to Shot Types</span>
        </Link>
        <span className="bg-[#EFE9DC] text-[#5B5226] px-2 py-0.5 rounded uppercase tracking-wider">
          Step 3 of 4 · Customize
        </span>
      </div>

      {/* Main Form */}
      <main className="space-y-4 pt-2">
        {/* Title */}
        <div className="space-y-1">
          <h1 className="font-serif text-2xl font-normal text-[#1F1C18]">
            Customize Your Shot
          </h1>
          <p className="text-xs text-[#6A6357] leading-relaxed">
            Configure staging surface, specular lighting, and catalogue aspect
            ratio.
          </p>
        </div>

        {/* 1. Background / Surface */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-[11px]">
            <span className="font-bold uppercase tracking-wider text-[#312B24]">
              1. Background / Surface
            </span>
            <span className="text-[#5B5226] font-medium text-[10px]">
              Crimson Velvet selected
            </span>
          </div>

          <div className="grid grid-cols-4 gap-2">
            {surfaces.map((s) => {
              const isSelected = selectedSurface === s.id;
              return (
                <div
                  key={s.id}
                  onClick={() => setSelectedSurface(s.id)}
                  className={`relative rounded-xl overflow-hidden border p-1 bg-white cursor-pointer transition-all ${
                    isSelected
                      ? "border-[#5B5226] ring-1 ring-[#5B5226]"
                      : "border-[#E7E0D3] hover:border-[#D5CCBC]"
                  }`}
                >
                  {isSelected && (
                    <div className="absolute top-1.5 right-1.5 z-10 w-4 h-4 rounded-full bg-[#5B5226] text-white flex items-center justify-center">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </div>
                  )}
                  <div className="relative aspect-square w-full rounded-lg overflow-hidden">
                    <Image
                      src={s.image}
                      alt={s.name}
                      fill
                      className="object-cover"
                      sizes="90px"
                    />
                  </div>
                  <div className="text-[10px] font-semibold text-[#1F1C18] text-center pt-1 truncate">
                    {s.name}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 2. Specular & Studio Lighting */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-[11px]">
            <span className="font-bold uppercase tracking-wider text-[#312B24]">
              2. Specular &amp; Studio Lighting
            </span>
            <span className="text-[#5B5226] font-medium text-[10px]">
              Editorial Grade
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {lightings.map((l) => {
              const isSelected = selectedLighting === l.id;
              const Icon = l.icon;
              return (
                <div
                  key={l.id}
                  onClick={() => setSelectedLighting(l.id)}
                  className={`relative bg-white rounded-xl p-3 border cursor-pointer transition-all space-y-1.5 ${
                    isSelected
                      ? "border-[#5B5226] ring-1 ring-[#5B5226]"
                      : "border-[#E7E0D3] hover:border-[#D5CCBC]"
                  }`}
                >
                  {isSelected && (
                    <div className="absolute top-2 right-2 text-[#5B5226]">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  )}
                  <div className="w-7 h-7 rounded-lg bg-[#F4EFE6] flex items-center justify-center text-[#5B5226]">
                    <Icon className="w-4 h-4" />
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
        <div className="space-y-2">
          <div className="flex items-center justify-between text-[11px]">
            <span className="font-bold uppercase tracking-wider text-[#312B24]">
              3. Aspect Ratio
            </span>
            <span className="text-[#5B5226] font-medium text-[10px]">
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
                  className={`relative bg-white rounded-xl p-2 border text-center cursor-pointer transition-all ${
                    isSelected
                      ? "border-[#5B5226] ring-1 ring-[#5B5226]"
                      : "border-[#E7E0D3] hover:border-[#D5CCBC]"
                  }`}
                >
                  {r.best && (
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-[#5B5226] text-white text-[8px] font-bold px-1.5 py-0.2 rounded uppercase tracking-wider">
                      Best
                    </div>
                  )}
                  <div className="bg-[#F4EFE6] text-[#5B5226] font-mono text-[10px] font-bold py-1 px-1.5 rounded mx-auto inline-block mb-1">
                    {r.ratio}
                  </div>
                  <div className="text-[10px] font-bold text-[#1F1C18] truncate">
                    {r.label}
                  </div>
                  <div className="text-[8px] text-[#7A7366] truncate">{r.sub}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 4. Product Photo Upload */}
        <UploadBlock
          onUploadChange={setUploadedPhoto}
          domainLabel="Jewellery"
        />

        {/* Polki Emerald Choker Preset Fine-tune */}
        <div className="bg-[#F5F1E8] border border-[#E7E0D3] rounded-xl p-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-[#E9E1D2] flex items-center justify-center text-[#5B5226]">
              <Sliders className="w-3.5 h-3.5" />
            </div>
            <div>
              <div className="text-xs font-bold text-[#1F1C18]">
                Polki Emerald Choker Preset
              </div>
              <div className="text-[10px] text-[#70685B]">
                Specularity 88% · Shadow Warmth +12%
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={() => alert("Preset Fine-tuning modal opened")}
            className="text-[10px] font-bold uppercase tracking-wider bg-white border border-[#DDD5C7] px-2.5 py-1 rounded text-[#363027] hover:bg-[#FAF8F5]"
          >
            Fine-tune
          </button>
        </div>

        {/* Floating Concierge Button */}
        <div className="flex justify-end pt-0.5">
          <button
            type="button"
            onClick={() => alert("Connecting to Atelier Concierge...")}
            className="inline-flex items-center gap-1.5 bg-white border border-[#DDD5C7] text-[#2F2921] px-3 py-1 rounded-full text-xs font-semibold shadow-xs hover:bg-[#FAF8F5]"
          >
            <Headphones className="w-3.5 h-3.5 text-[#5B5226]" />
            <span className="text-[10px]">Concierge</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
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
    </div>
  );
}
