"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Sparkles,
  Check,
  Eye,
  Glasses,
  ArrowRight,
  Camera,
  Layers,
  Coins,
  Store,
} from "lucide-react";

import opticalConfig from "@/config/optical.json";

const categoryImages: Record<string, { image: string; tag: string }> = {
  titanium_rimless: { image: "/images/optical_craft.jpg", tag: "BETA-TI" },
  acetate_classics: { image: "/images/hero_multi_craft.jpg", tag: "HAND-POLISHED" },
  aviator_navigator: { image: "/images/optical_craft.jpg", tag: "DUAL-BRIDGE" },
  cateye_sculptural: { image: "/images/hero_multi_craft.jpg", tag: "BEVELED" },
};

const categories = opticalConfig.categories.map((cat) => ({
  id: cat.id,
  title: cat.label,
  subtitle: cat.rule,
  tag: categoryImages[cat.id]?.tag || "ATELIER GRADE",
  image: categoryImages[cat.id]?.image || "/images/optical_craft.jpg",
}));

export default function OpticalStep1Page() {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState("titanium_rimless");

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

      {/* Main Body */}
      <main className="max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 space-y-6 flex-1">
        {/* Progress Bar & Badges */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs font-semibold text-ink">
            <span className="uppercase tracking-wider">Step 01 / 04 · 25% Completed</span>
            <span className="inline-flex items-center gap-1.5 bg-surface text-accent text-[10px] font-semibold px-2.5 py-0.5 rounded-[4px] border border-border uppercase tracking-wider">
              <Eye className="w-3.5 h-3.5 text-brass" />
              <span>Prescription &amp; Sun</span>
            </span>
          </div>
          <div className="w-full h-1.5 bg-border rounded-[2px] overflow-hidden">
            <div className="w-1/4 h-full bg-accent rounded-[2px] transition-all"></div>
          </div>
        </div>

        {/* Optical Catalogue Pill */}
        <div>
          <div className="inline-flex items-center gap-1.5 bg-surface text-ink text-[10px] font-semibold px-2.5 py-1 rounded-[4px] border border-border uppercase tracking-wider">
            <Glasses className="w-3.5 h-3.5 text-brass" />
            <span>Optical Catalogue</span>
          </div>
        </div>

        {/* Heading */}
        <div className="space-y-1.5">
          <h1 className="font-serif text-2xl sm:text-3xl font-normal text-ink">
            Optical Category
          </h1>
          <p className="text-xs sm:text-sm text-muted leading-relaxed max-w-2xl">
            Select eyewear frame silhouette to calibrate bridge balance,
            anti-reflective multi-coating, and temple geometry.
          </p>
        </div>

        {/* Grid of Silhouette Options */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {categories.map((cat) => {
            const isSelected = selectedId === cat.id;
            return (
              <div
                key={cat.id}
                onClick={() => setSelectedId(cat.id)}
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

                {/* Thumbnail */}
                <div className="relative aspect-square w-full rounded-[4px] overflow-hidden">
                  <Image
                    src={cat.image}
                    alt={cat.title}
                    fill
                    className="object-cover"
                    sizes="180px"
                  />
                  <div className="absolute bottom-1.5 left-1.5 bg-[#F4EFE8]/90 backdrop-blur-xs text-[#302B23] text-[8px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider border border-black/5">
                    {cat.tag}
                  </div>
                </div>

                {/* Details */}
                <div className="p-2 space-y-0.5">
                  <div className="text-xs font-bold text-[#1C1714] leading-tight">
                    {cat.title}
                  </div>
                  <div className="text-[10px] text-[#6E655C] leading-snug line-clamp-2">
                    {cat.subtitle}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Optical AI Staging Engine Info Box */}
        <div className="bg-[#FBF8F3] border border-[#DDD4C7] rounded-[6px] p-3.5 flex items-start gap-2.5">
          <div className="w-7 h-7 rounded-[4px] bg-[#DDD4C7] flex items-center justify-center text-[#5B1A1F] shrink-0 mt-0.5">
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="space-y-0.5">
            <div className="text-xs font-bold text-[#1C1714]">
              Optical AI Staging Engine
            </div>
            <p className="text-[10px] text-[#6E655C] leading-relaxed">
              Automatic anti-glare suppression and prescription curvature
              rendering are synced to your chosen frame geometry.
            </p>
          </div>
        </div>

        {/* Active Profile Bar & Action Button */}
        <div className="bg-[#F4EFE8] border border-[#DDD4C7] rounded-[6px] p-2.5 flex items-center justify-between shadow-warm-sm">
          <div>
            <div className="text-[9px] uppercase tracking-wider text-[#6E655C] font-bold">
              Active Profile
            </div>
            <div className="text-xs font-bold text-[#1C1714]">
              Titanium &amp; Rimless
            </div>
          </div>
          <Link
            href="/studio/optical/step-2"
            className="flex items-center gap-1.5 bg-[#5B1A1F] hover:bg-[#471418] text-bg px-4 py-2.5 rounded-[4px] text-xs font-bold tracking-wider uppercase transition-all shadow-warm-sm active:scale-[0.99]"
          >
            <span>Continue to Shot Types</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
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
