"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Sparkles,
  Check,
  Star,
  ThumbsUp,
  Sliders,
  ArrowRight,
  Camera,
  Layers,
  Coins,
  Gem,
} from "lucide-react";

import footwearConfig from "@/config/footwear.json";

const styleImages: Record<string, string> = {
  macro_detail: "/images/hero_multi_craft.jpg",
  flatlay: "/images/footwear_craft.jpg",
  studio_high_key: "/images/hero_multi_craft.jpg",
  boutique_display: "/images/footwear_craft.jpg",
  editorial_campaign: "/images/footwear_craft.jpg",
  lifestyle_on_street: "/images/footwear_craft.jpg",
};

const styleIsAtelierChoice: Record<string, boolean> = {
  boutique_display: true,
};

const styles = footwearConfig.styles.map((s) => ({
  id: s.id,
  title: s.label,
  subtitle: s.rule,
  tag: s.group,
  image: styleImages[s.id] || "/images/footwear_craft.jpg",
  isAtelierChoice: styleIsAtelierChoice[s.id] ?? false,
}));

export default function FootwearStep2Page() {
  const router = useRouter();
  const [selectedStyle, setSelectedStyle] = useState("boutique_display");
  const [selectedRatio, setSelectedRatio] = useState("4_5");

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

      {/* Progress & Badge */}
      <div className="max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="text-muted uppercase tracking-wider text-[10px]">
              Step 02 of 04 — Style &amp; Size
            </span>
            <span className="bg-surface text-accent px-2.5 py-0.5 rounded-[4px] border border-border text-[10px] uppercase tracking-wider font-semibold">
              Bespoke Footwear
            </span>
          </div>
          <div className="w-full h-1.5 bg-border rounded-[2px] overflow-hidden">
            <div className="w-2/4 h-full bg-accent rounded-[2px] transition-all"></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 space-y-6 flex-1">
        {/* Title */}
        <div className="space-y-1.5">
          <h1 className="font-serif text-2xl sm:text-3xl font-normal text-ink">
            Style &amp; Size Preset
          </h1>
          <p className="text-xs sm:text-sm text-muted leading-relaxed max-w-2xl">
            Pick how the photos should look, then configure the footwear composition.
          </p>
        </div>

        {/* Section Header */}
        <div className="flex items-center justify-between pt-1 text-xs">
          <span className="font-semibold uppercase tracking-wider text-ink">
            Shot Style · Select 1 Option
          </span>
          <span className="text-muted text-[10px] font-medium uppercase tracking-wider">
            6 Visual Directives
          </span>
        </div>

        {/* 6 Cards Grid in Responsive Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
          {styles.map((style) => {
            const isSelected = selectedStyle === style.id;
            return (
              <div
                key={style.id}
                onClick={() => setSelectedStyle(style.id)}
                className={`relative bg-surface rounded-[6px] overflow-hidden border p-1 cursor-pointer transition-all shadow-warm-sm ${
                  isSelected
                    ? "border-[#5B1A1F] ring-1 ring-[#5B1A1F]"
                    : "border-[#DDD4C7] hover:border-[#DDD4C7]"
                }`}
              >
                {/* Active Checkmark */}
                {isSelected && (
                  <div className="absolute top-2 right-2 z-10 w-5 h-5 rounded-[4px] bg-[#5B1A1F] text-bg flex items-center justify-center shadow-warm-sm">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                )}

                {/* Image */}
                <div className="relative aspect-[16/11] w-full rounded-[4px] overflow-hidden">
                  <Image
                    src={style.image}
                    alt={style.title}
                    fill
                    className="object-cover"
                    sizes="180px"
                  />
                  {/* Tag Pill */}
                  <div className="absolute bottom-1.5 left-1.5 flex items-center gap-1">
                    <span className="bg-[#F4EFE8]/90 backdrop-blur-xs text-[#302B23] text-[8px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider border border-black/5">
                      {style.tag}
                    </span>
                    {style.isAtelierChoice && (
                      <span className="bg-[#5B1A1F] text-bg p-0.5 rounded">
                        <Star className="w-2.5 h-2.5 fill-white" />
                      </span>
                    )}
                  </div>
                </div>

                {/* Details */}
                <div className="p-2 space-y-0.5">
                  <div className="text-xs font-bold text-[#1C1714] leading-tight">
                    {style.title}
                  </div>
                  <div className="text-[10px] text-[#6E655C] leading-snug line-clamp-1">
                    {style.subtitle}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Aspect Ratio & Canvas Bar */}
        <div className="space-y-1.5 pt-1">
          <div className="flex items-center justify-between text-[11px]">
            <span className="font-bold uppercase tracking-wider text-[#353028]">
              Aspect Ratio &amp; Canvas
            </span>
            <span className="text-[#5B1A1F] text-[10px] font-semibold">
              Ready for E-Commerce
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 bg-[#FBF8F3] p-1.5 rounded-[6px] border border-[#DDD4C7]">
            <button
              type="button"
              onClick={() => setSelectedRatio("1_1")}
              className={`py-1.5 rounded-[4px] text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                selectedRatio === "1_1"
                  ? "bg-[#5B1A1F] text-bg shadow-warm-sm"
                  : "text-[#585145] hover:bg-surface"
              }`}
            >
              <span className="w-2.5 h-2.5 rounded-xs border border-current"></span>
              <span>1:1 Square</span>
            </button>
            <button
              type="button"
              onClick={() => setSelectedRatio("4_5")}
              className={`py-1.5 rounded-[4px] text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                selectedRatio === "4_5"
                  ? "bg-[#5B1A1F] text-bg shadow-warm-sm"
                  : "text-[#585145] hover:bg-surface"
              }`}
            >
              <span className="w-2 h-2.5 rounded-xs border border-current"></span>
              <span>4:5 Atelier</span>
            </button>
            <button
              type="button"
              onClick={() => setSelectedRatio("9_16")}
              className={`py-1.5 rounded-[4px] text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                selectedRatio === "9_16"
                  ? "bg-[#5B1A1F] text-bg shadow-warm-sm"
                  : "text-[#585145] hover:bg-surface"
              }`}
            >
              <span className="w-1.5 h-2.5 rounded-xs border border-current"></span>
              <span>9:16 Story</span>
            </button>
          </div>
        </div>

        {/* Atelier Recommendation Box */}
        <div className="bg-[#FBF8F3] border border-[#DDD4C7] rounded-[6px] p-3 flex items-start gap-2.5">
          <div className="w-7 h-7 rounded-[4px] bg-[#DDD4C7] flex items-center justify-center text-[#5B1A1F] shrink-0 mt-0.5">
            <ThumbsUp className="w-4 h-4" />
          </div>
          <div className="space-y-0.5">
            <div className="text-xs font-bold text-[#1C1714]">
              Atelier Recommendation
            </div>
            <p className="text-[10px] text-[#6E655C] leading-relaxed">
              For burnished leather footwear, <strong>Boutique Display</strong>{" "}
              highlights hand-patina finish, welt contours, and sole beveling
              without glare.
            </p>
          </div>
        </div>

        {/* Status Bar */}
        <div className="flex items-center justify-between text-[10px] px-1 font-semibold">
          <div className="flex items-center gap-1.5 text-[#1C1714] uppercase tracking-wider">
            <span className="w-2 h-2 rounded-[4px] bg-[#5B1A1F]"></span>
            <span>Selected: Boutique Display</span>
          </div>
          <div className="flex items-center gap-1 text-[#5B1A1F] uppercase tracking-wider font-bold">
            <Sliders className="w-3 h-3" />
            <span>AI Staging Presets</span>
          </div>
        </div>

        {/* Action Button */}
        <Link
          href="/studio/footwear/step-3"
          className="flex items-center justify-center gap-2 w-full bg-[#5B1A1F] hover:bg-[#471418] text-bg py-3.5 rounded-[4px] text-xs font-bold tracking-wider uppercase transition-all shadow-warm-sm active:scale-[0.99]"
        >
          <span>CONTINUE TO CUSTOMIZE</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
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
