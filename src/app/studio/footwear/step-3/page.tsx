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
} from "lucide-react";

interface BackgroundOption {
  id: string;
  name: string;
  colorClass: string;
}

const backgrounds: BackgroundOption[] = [
  { id: "pure_white", name: "Pure White", colorClass: "bg-white border border-[#E0D9CC]" },
  { id: "warm_beige", name: "Warm Beige", colorClass: "bg-[#F3ECE1] border border-[#DDD5C6]" },
  { id: "travertine", name: "Travertine", colorClass: "bg-[#E6DEC9] border border-[#D5CCA8]" },
  { id: "atelier", name: "Atelier", colorClass: "bg-[#ECE6DC] border border-[#D9D1C5]" },
];

interface LightingOption {
  id: string;
  title: string;
  desc: string;
  icon: typeof Sun;
}

const lightings: LightingOption[] = [
  {
    id: "soft_studio",
    title: "Soft Studio",
    desc: "3200K Balance",
    icon: Sunrise,
  },
  {
    id: "chiaroscuro",
    title: "Chiaroscuro",
    desc: "Deep Shadows",
    icon: Moon,
  },
  {
    id: "gallery_daylight",
    title: "Gallery Daylight",
    desc: "North Facade",
    icon: Sun,
  },
];

interface RatioOption {
  id: string;
  ratio: string;
  title: string;
  desc: string;
  isBest?: boolean;
}

const ratios: RatioOption[] = [
  {
    id: "3_4",
    ratio: "3:4",
    title: "Lookbook",
    desc: "Editorial",
    isBest: true,
  },
  {
    id: "1_1",
    ratio: "1:1",
    title: "Square",
    desc: "Instagram Feed",
  },
  {
    id: "9_16",
    ratio: "9:16",
    title: "Story / Reel",
    desc: "Full Screen",
  },
  {
    id: "16_9",
    ratio: "16:9",
    title: "Catalogue",
    desc: "Hero Header",
  },
];

export default function FootwearStep3Page() {
  const router = useRouter();
  const [selectedBg, setSelectedBg] = useState("warm_beige");
  const [selectedLighting, setSelectedLighting] = useState("soft_studio");
  const [selectedRatio, setSelectedRatio] = useState("3_4");

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
          <Link
            href="/studio/footwear/step-4"
            className="flex items-center justify-center gap-2 w-full bg-[#5B5226] hover:bg-[#49421D] text-white py-3.5 rounded-lg text-xs font-bold tracking-wider uppercase transition-all shadow-md active:scale-[0.99]"
          >
            <Sparkles className="w-4 h-4" />
            <span>GENERATE SHOT — 1 CREDIT</span>
          </Link>
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
