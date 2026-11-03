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
    <div className="min-h-screen bg-bg text-ink flex flex-col justify-between pb-24">
      {/* Top Header */}
      <header className="sticky top-0 z-40 w-full bg-surface border-b border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <div>
            <span className="font-serif text-base font-bold tracking-tight text-ink block leading-none">
              Catalogue Studio
            </span>
            <span className="text-[9px] tracking-[0.2em] uppercase text-muted font-semibold">
              Atelier AI Lab · Optical
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
              ✦ Optical Frames
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
            Style &amp; Framing Preset
          </h1>
          <p className="text-xs sm:text-sm text-muted leading-relaxed max-w-2xl">
            Pick how the photos should look, then configure the eyewear composition.
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

        {/* 6 Cards Grid (Responsive) */}
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
                </div>

                {/* Details */}
                <div className="p-2 space-y-0.5">
                  <div className="text-xs font-bold text-[#1C1714] leading-tight">
                    {style.title}
                  </div>
                  <div className="text-[10px] text-[#6E655C] leading-snug line-clamp-2">
                    {style.subtitle}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Atelier Recommendation Box */}
        <div className="bg-[#FBF8F3] border border-[#DDD4C7] rounded-[6px] p-3 flex items-start gap-2.5">
          <div className="w-7 h-7 rounded-[4px] bg-[#DDD4C7] flex items-center justify-center text-[#5B1A1F] shrink-0 mt-0.5">
            <Glasses className="w-4 h-4" />
          </div>
          <div className="space-y-0.5">
            <div className="text-xs font-bold text-[#1C1714]">
              Atelier Recommendation
            </div>
            <p className="text-[10px] text-[#6E655C] leading-relaxed">
              For acetate &amp; filigree eyewear, <strong>Boutique Display</strong>{" "}
              highlights authentic lens translucency and hinge accents without
              artificial glare.
            </p>
          </div>
        </div>

        {/* Status Bar & Concierge */}
        <div className="flex items-center justify-between text-[10px] px-1 font-semibold">
          <div className="flex items-center gap-1.5 text-[#1C1714] uppercase tracking-wider">
            <span className="w-2 h-2 rounded-[4px] bg-[#5B1A1F]"></span>
            <span>Selected: Boutique Display</span>
          </div>
          <button
            type="button"
            onClick={() => alert("Connecting to Concierge...")}
            className="flex items-center gap-1 text-[#5B1A1F] bg-[#FBF8F3] px-2 py-0.5 rounded-[4px] uppercase tracking-wider font-bold"
          >
            <Headphones className="w-3 h-3" />
            <span>Concierge</span>
          </button>
        </div>

        {/* Action Button */}
        <Link
          href="/studio/optical/step-3"
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
            href="/studio/optical"
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
            <Store className="w-4 h-4" />
            <span className="text-[9px] font-semibold uppercase tracking-wider">
              Atelier
            </span>
          </Link>
        </div>
      </nav>
    </div>
  );
}
