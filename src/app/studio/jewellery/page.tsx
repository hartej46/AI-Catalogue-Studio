"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Check,
  Scale,
  ArrowRight,
  Headphones,
  SlidersHorizontal,
  Layers,
  Coins,
  Store,
  Camera,
} from "lucide-react";

import jewelleryConfig from "@/config/jewellery.json";

const categoryImages: Record<string, { image: string; tag: string }> = {
  necklaces: { image: "/images/jewellery_craft.jpg", tag: "24K REFRACTION" },
  earrings: { image: "/images/jhumkas_craft.jpg", tag: "MICRO-PAVÉ" },
  bangles: { image: "/images/bangles_craft.jpg", tag: "CYLINDRICAL MESH" },
  rings: { image: "/images/hero_multi_craft.jpg", tag: "FOCAL MACRO" },
};

const categories = jewelleryConfig.categories.map((cat) => ({
  id: cat.id,
  title: cat.label,
  subtitle: cat.rule,
  tag: categoryImages[cat.id]?.tag || "ATELIER GRADE",
  image: categoryImages[cat.id]?.image || "/images/jewellery_craft.jpg",
}));

import { useAuth } from "@/lib/auth-context";

export default function JewelleryStep1Page() {
  const router = useRouter();
  const { credits } = useAuth();
  const [selectedId, setSelectedId] = useState("necklaces");

  return (
    <div className="min-h-screen bg-bg text-ink flex flex-col justify-between pb-24">
      {/* Top Header */}
      <header className="sticky top-0 z-40 w-full bg-surface border-b border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-[4px] bg-bg border border-border flex items-center justify-center text-brass">
              <Camera className="w-4 h-4" />
            </div>
            <div>
              <span className="font-serif text-base font-bold tracking-tight text-ink block leading-none">
                Catalogue Studio
              </span>
              <span className="text-[9px] tracking-[0.2em] uppercase text-muted font-medium">
                Atelier AI Lab
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/credits"
              className="flex items-center gap-1 bg-bg hover:bg-surface text-ink text-xs font-semibold px-2.5 py-1 rounded-[4px] border border-border transition-colors duration-150 cursor-pointer"
            >
              <Coins className="w-3.5 h-3.5 text-brass" />
              <span>{credits} CR</span>
            </Link>
            <Link
              href="/atelier"
              className="w-7 h-7 rounded-[4px] bg-bg border border-border text-ink flex items-center justify-center font-serif text-xs font-bold hover:border-muted transition-colors duration-150"
            >
              GP
            </Link>
          </div>
        </div>
      </header>

      {/* Main Body */}
      <main className="max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 space-y-6 flex-1">
        {/* Badges */}
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-1.5 bg-surface text-ink text-[10px] font-semibold px-2.5 py-1 rounded-[4px] border border-border uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-brass" />
            <span>Jewellery Catalogue</span>
          </div>
          <div className="inline-flex items-center gap-1.5 bg-surface text-muted text-[10px] font-semibold px-2.5 py-1 rounded-[4px] border border-border uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
            <span>Heritage Polki</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs font-semibold text-ink">
            <span className="uppercase tracking-wider">
              Step 01 / 04 · Silhouette Setup
            </span>
            <span className="text-accent">25% Completed</span>
          </div>
          <div className="w-full h-1.5 bg-border rounded-[2px] overflow-hidden">
            <div className="w-1/4 h-full bg-accent rounded-[2px] transition-all"></div>
          </div>
        </div>

        {/* Page Title & Subtitle */}
        <div className="space-y-1.5">
          <h1 className="font-serif text-2xl sm:text-3xl font-normal text-ink">
            Jewellery Category
          </h1>
          <p className="text-xs sm:text-sm text-muted leading-relaxed max-w-2xl">
            Select ornament silhouette to calibrate specular reflection, gemstone
            depth, and gold lustre physics in the neural atelier.
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
                className={`relative bg-surface rounded-[6px] overflow-hidden border p-1 cursor-pointer transition-colors duration-150 shadow-warm-sm ${
                  isSelected
                    ? "border-accent"
                    : "border-border hover:border-muted"
                }`}
              >
                {/* Checkmark Badge */}
                {isSelected && (
                  <div className="absolute top-2 right-2 z-10 w-5 h-5 rounded-[3px] bg-accent text-bg flex items-center justify-center border border-surface shadow-warm-sm">
                    <Check className="w-3 h-3 stroke-[2.5]" />
                  </div>
                )}

                {/* Thumbnail */}
                <div className="relative aspect-square w-full rounded-[4px] overflow-hidden bg-bg border border-border">
                  <Image
                    src={cat.image}
                    alt={cat.title}
                    fill
                    className="object-cover"
                    sizes="180px"
                  />
                  <div className="absolute bottom-1.5 left-1.5 bg-ink/80 text-bg text-[8px] font-semibold px-1.5 py-0.5 rounded-[2px] uppercase tracking-wider border border-border/20">
                    {cat.tag}
                  </div>
                </div>

                {/* Content */}
                <div className="p-2 space-y-0.5">
                  <div className="text-xs font-bold text-ink leading-tight">
                    {cat.title}
                  </div>
                  <div className="text-[10px] text-muted leading-snug line-clamp-2">
                    {cat.subtitle}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Indian Karigar Calibration Pro Box */}
        <div className="bg-surface border border-border rounded-[6px] p-3 flex items-start gap-2.5 shadow-warm-sm">
          <div className="w-7 h-7 rounded-[4px] bg-bg border border-border flex items-center justify-center text-brass shrink-0 mt-0.5">
            <Scale className="w-4 h-4" />
          </div>
          <div className="space-y-0.5">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-semibold text-ink">
                Indian Karigar Calibration
              </span>
              <span className="bg-bg border border-border text-muted text-[8px] font-semibold px-1.5 py-0.5 rounded-[2px] tracking-wider uppercase">
                PRO
              </span>
            </div>
            <p className="text-[10px] text-muted leading-relaxed">
              Automatically accounts for uncut diamond foil backing, enamel
              meenakari hues, and South Indian matte antique finishes.
            </p>
          </div>
        </div>

        {/* Active Configuration Bar */}
        <div className="bg-surface border border-border rounded-[4px] px-3 py-2 flex items-center justify-between text-[10px]">
          <div className="flex items-center gap-1.5 text-ink font-semibold uppercase tracking-wider truncate">
            <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0"></span>
            <span className="truncate">
              ACTIVE CONFIGURATION: POLKI &amp; CHOKER
            </span>
          </div>
          <div className="flex items-center gap-1 text-muted font-normal shrink-0">
            <SlidersHorizontal className="w-3 h-3 text-brass" />
            <span>1 Preset Active</span>
          </div>
        </div>

        {/* Action Button */}
        <Link
          href="/studio/jewellery/step-2"
          className="flex items-center justify-center gap-2 w-full bg-accent hover:bg-accent-hover text-bg py-3.5 rounded-[4px] text-xs font-semibold tracking-wider uppercase transition-colors duration-150 shadow-warm-sm"
        >
          <span>CONTINUE TO SHOT TYPES</span>
          <ArrowRight className="w-4 h-4" />
        </Link>

        {/* Concierge Button */}
        <div className="flex justify-end pt-1">
          <button
            type="button"
            onClick={() => alert("Connecting to Atelier Concierge...")}
            className="inline-flex items-center gap-1.5 bg-surface border border-border text-ink px-3 py-1.5 rounded-[4px] text-xs font-semibold shadow-warm-sm hover:bg-bg transition-colors duration-150"
          >
            <Headphones className="w-3.5 h-3.5 text-brass" />
            <span className="text-[10px] tracking-wider uppercase text-muted">CONCIERGE</span>
          </button>
        </div>
      </main>

      {/* Persistent Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 w-full bg-surface border-t border-border py-2 px-6 z-50 shadow-warm-sm">
        <div className="max-w-5xl mx-auto flex items-center justify-around sm:justify-center sm:gap-16 text-center">
          <Link
            href="/studio/jewellery"
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
            <span className="text-[9px] font-normal uppercase tracking-wider">
              Lookbook
            </span>
          </Link>
          <Link
            href="/credits"
            className="flex flex-col items-center gap-0.5 text-muted hover:text-ink transition-colors duration-150"
          >
            <Coins className="w-4 h-4" />
            <span className="text-[9px] font-normal uppercase tracking-wider">
              Credits
            </span>
          </Link>
          <Link
            href="/atelier"
            className="flex flex-col items-center gap-0.5 text-muted hover:text-ink transition-colors duration-150"
          >
            <Store className="w-4 h-4" />
            <span className="text-[9px] font-normal uppercase tracking-wider">
              Atelier
            </span>
          </Link>
        </div>
      </nav>
    </div>
  );
}
