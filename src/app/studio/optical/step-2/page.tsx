"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Sparkles,
  Check,
  Glasses,
  Headphones,
  ArrowRight,
  Camera,
  Layers,
  Coins,
  Store,
} from "lucide-react";

import opticalConfig from "@/config/optical.json";

const styleImages: Record<string, string> = {
  macro_detail: "/images/optical_craft.jpg",
  flatlay: "/images/hero_multi_craft.jpg",
  studio_high_key: "/images/optical_craft.jpg",
  boutique_display: "/images/hero_multi_craft.jpg",
  editorial_campaign: "/images/optical_craft.jpg",
  lifestyle_portrait: "/images/hero_multi_craft.jpg",
};

const styles = opticalConfig.styles.map((s) => ({
  id: s.id,
  title: s.label,
  subtitle: s.rule,
  image: styleImages[s.id] || "/images/optical_craft.jpg",
}));

export default function OpticalStep2Page() {
  const router = useRouter();
  const [selectedStyle, setSelectedStyle] = useState("boutique_display");

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1F1C18] flex flex-col justify-between max-w-md mx-auto px-4 py-3.5 shadow-sm border-x border-[#EFEAE1] pb-24">
      {/* Top Header */}
      <header className="flex items-center justify-between pb-3 border-b border-[#EFEAE1]">
        <div>
          <span className="font-serif text-base font-bold tracking-tight text-[#1E1B18] block leading-none">
            Catalogue Studio
          </span>
          <span className="text-[9px] tracking-[0.2em] uppercase text-[#787163] font-semibold">
            Atelier AI Lab · Optical
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

      {/* Progress & Badge */}
      <div className="space-y-1.5 pt-2">
        <div className="flex items-center justify-between text-[10px] font-bold">
          <span className="text-[#3E382E] uppercase tracking-wider">
            Step 02 of 04 — Style &amp; Size
          </span>
          <span className="bg-[#EFEAE0] text-[#5B5226] px-2 py-0.5 rounded-full border border-[#DFD8C9]">
            ✦ Optical Frames
          </span>
        </div>
        <div className="w-full h-1.5 bg-[#E7E0D3] rounded-full overflow-hidden">
          <div className="w-2/4 h-full bg-[#5B5226] rounded-full transition-all"></div>
        </div>
      </div>

      {/* Main Content */}
      <main className="space-y-4 pt-2">
        {/* Title */}
        <div className="space-y-1">
          <h1 className="font-serif text-2xl font-normal text-[#1F1C18]">
            Style &amp; size
          </h1>
          <p className="text-xs text-[#6A6357] leading-relaxed">
            Pick how the photos should look, then choose the size.
          </p>
        </div>

        {/* Section Header */}
        <div className="flex items-center justify-between text-[11px] pt-1">
          <span className="font-bold uppercase tracking-wider text-[#353028]">
            Shot Style ·
          </span>
          <span className="text-[#7A7366] text-[10px] font-semibold uppercase">
            Select 1 Option
          </span>
        </div>

        {/* 6 Cards Grid (2x3) */}
        <div className="grid grid-cols-2 gap-2.5">
          {styles.map((style) => {
            const isSelected = selectedStyle === style.id;
            return (
              <div
                key={style.id}
                onClick={() => setSelectedStyle(style.id)}
                className={`relative bg-white rounded-xl overflow-hidden border p-1 cursor-pointer transition-all shadow-xs ${
                  isSelected
                    ? "border-[#5B5226] ring-1 ring-[#5B5226]"
                    : "border-[#E7E0D3] hover:border-[#D5CCBC]"
                }`}
              >
                {/* Active Checkmark */}
                {isSelected && (
                  <div className="absolute top-2 right-2 z-10 w-5 h-5 rounded-full bg-[#5B5226] text-white flex items-center justify-center shadow-xs">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                )}

                {/* Image */}
                <div className="relative aspect-[16/11] w-full rounded-lg overflow-hidden">
                  <Image
                    src={style.image}
                    alt={style.title}
                    fill
                    className="object-cover"
                    sizes="180px"
                  />
                </div>

                {/* Details */}
                <div className="p-2 space-y-0.5">
                  <div className="text-xs font-bold text-[#1F1C18] leading-tight">
                    {style.title}
                  </div>
                  <div className="text-[10px] text-[#7A7366] leading-snug line-clamp-2">
                    {style.subtitle}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Atelier Recommendation Box */}
        <div className="bg-[#F6F2EA] border border-[#E7E0D3] rounded-xl p-3 flex items-start gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-[#EAE3D3] flex items-center justify-center text-[#5B5226] shrink-0 mt-0.5">
            <Glasses className="w-4 h-4" />
          </div>
          <div className="space-y-0.5">
            <div className="text-xs font-bold text-[#1F1C18]">
              Atelier Recommendation
            </div>
            <p className="text-[10px] text-[#6A6357] leading-relaxed">
              For acetate &amp; filigree eyewear, <strong>Boutique Display</strong>{" "}
              highlights authentic lens translucency and hinge accents without
              artificial glare.
            </p>
          </div>
        </div>

        {/* Status Bar & Concierge */}
        <div className="flex items-center justify-between text-[10px] px-1 font-semibold">
          <div className="flex items-center gap-1.5 text-[#2C2720] uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-[#5B5226]"></span>
            <span>Selected: Boutique Display</span>
          </div>
          <button
            type="button"
            onClick={() => alert("Connecting to Concierge...")}
            className="flex items-center gap-1 text-[#5B5226] bg-[#EFEAE0] px-2 py-0.5 rounded-full uppercase tracking-wider font-bold"
          >
            <Headphones className="w-3 h-3" />
            <span>Concierge</span>
          </button>
        </div>

        {/* Action Button */}
        <Link
          href="/studio/optical/step-3"
          className="flex items-center justify-center gap-2 w-full bg-[#5B5226] hover:bg-[#49421D] text-white py-3.5 rounded-lg text-xs font-bold tracking-wider uppercase transition-all shadow-md active:scale-[0.99]"
        >
          <span>CONTINUE TO CUSTOMIZE</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </main>

      {/* Persistent Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-[#E8E1D5] py-2 px-6 flex items-center justify-between text-center z-50 shadow-md">
        <Link
          href="/studio/optical"
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
          <Store className="w-4 h-4" />
          <span className="text-[9px] font-semibold uppercase tracking-wider">
            Atelier
          </span>
        </Link>
      </nav>
    </div>
  );
}
