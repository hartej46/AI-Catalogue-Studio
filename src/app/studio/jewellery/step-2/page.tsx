"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ChevronLeft,
  ArrowLeft,
  Star,
  Check,
  ArrowRight,
  MessageCircle,
} from "lucide-react";

import jewelleryConfig from "@/config/jewellery.json";

const styleImages: Record<string, string> = {
  macro: "/images/hero_multi_craft.jpg",
  flatlay: "/images/bangles_craft.jpg",
  studio: "/images/jhumkas_craft.jpg",
  shop_display: "/images/jewellery_craft.jpg",
  indian_bridal: "/images/bangles_craft.jpg",
  modern_wear: "/images/footwear_craft.jpg",
};

const styles = jewelleryConfig.styles.map((style) => ({
  id: style.id,
  title: style.label,
  subtitle: style.rule,
  image: styleImages[style.id] || "/images/jewellery_craft.jpg",
}));

export default function JewelleryStep2Page() {
  const router = useRouter();
  const [selectedStyle, setSelectedStyle] = useState("shop_display");

  return (
    <div className="min-h-screen bg-bg text-ink flex flex-col justify-between pb-16">
      {/* Top Header */}
      <header className="sticky top-0 z-40 w-full bg-surface border-b border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <Link
            href="/studio/jewellery"
            className="w-8 h-8 rounded-[4px] border border-border bg-bg flex items-center justify-center text-ink hover:bg-surface transition-colors duration-150"
          >
            <ChevronLeft className="w-4 h-4" />
          </Link>

          <div className="text-center">
            <span className="text-[9px] uppercase tracking-[0.25em] text-muted font-bold block">
              Haute Atelier
            </span>
            <span className="font-serif text-sm font-bold tracking-tight text-ink">
              Catalogue Studio
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <div className="flex items-center gap-1 bg-bg text-accent text-xs font-semibold px-2.5 py-1 rounded-[4px] border border-border">
              <span className="text-brass">✦</span>
              <span>3 CR</span>
            </div>
            <div className="w-7 h-7 rounded-[4px] bg-bg border border-border text-ink flex items-center justify-center font-serif text-xs font-bold">
              GP
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-4">
        {/* 4-Segment Progress Bar */}
        <div className="space-y-2 py-1">
          <div className="grid grid-cols-4 gap-2">
            <div className="h-1 bg-accent rounded-[2px]"></div>
            <div className="h-1 bg-accent rounded-[2px]"></div>
            <div className="h-1 bg-border rounded-[2px]"></div>
            <div className="h-1 bg-border rounded-[2px]"></div>
          </div>

          <div className="flex items-center justify-between text-xs text-muted font-semibold">
            <Link
              href="/studio/jewellery"
              className="flex items-center gap-1 hover:text-ink uppercase tracking-wider text-[10px]"
            >
              <ArrowLeft className="w-3 h-3" />
              <span>Back</span>
            </Link>
            <span className="uppercase tracking-wider text-[10px]">
              Step 2 of 4 — Style &amp; Size
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 space-y-6 flex-1">
        {/* Jewellery Set Tag */}
        <div>
          <span className="inline-flex items-center gap-1.5 bg-surface border border-border text-ink text-[10px] font-semibold px-2.5 py-1 rounded-[4px] shadow-warm-sm uppercase tracking-wider">
            <Star className="w-3.5 h-3.5 text-brass" />
            <span>Jewellery Set</span>
          </span>
        </div>

        {/* Title */}
        <div className="space-y-1.5">
          <h1 className="font-serif text-2xl sm:text-3xl font-normal text-ink">
            Style &amp; Framing Preset
          </h1>
          <p className="text-xs sm:text-sm text-muted leading-relaxed max-w-2xl">
            Pick how the photos should look, then configure the neural stage composition.
          </p>
        </div>

        {/* Shot Style Header */}
        <div className="flex items-center justify-between pt-1 text-xs">
          <span className="font-semibold uppercase tracking-wider text-ink">
            Shot Style Preset
          </span>
          <span className="text-accent font-semibold text-[10px] uppercase tracking-wider">
            Select 1 option
          </span>
        </div>

        {/* 6 Dark Cards (2 columns x 3 rows) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
          {styles.map((style) => {
            const isSelected = selectedStyle === style.id;
            return (
              <div
                key={style.id}
                onClick={() => setSelectedStyle(style.id)}
                className={`relative bg-[#191715] text-bg rounded-[6px] overflow-hidden border p-1.5 cursor-pointer transition-all ${
                  isSelected
                    ? "border-[#5B1A1F] ring-2 ring-[#5B1A1F] shadow-warm-sm"
                    : "border-neutral-800 hover:border-neutral-600"
                }`}
              >
                {/* Active Checkmark */}
                {isSelected && (
                  <div className="absolute top-2.5 right-2.5 z-10 w-5 h-5 rounded-[4px] bg-[#5B1A1F] text-bg flex items-center justify-center shadow-warm-sm">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                )}

                {/* Image */}
                <div className="relative aspect-[16/11] w-full rounded-[6px] overflow-hidden">
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
                  <div
                    className={`text-xs font-bold leading-tight ${
                      isSelected ? "text-[#E6C987]" : "text-bg"
                    }`}
                  >
                    {style.title}
                  </div>
                  <div className="text-[10px] text-[#A69E90] leading-snug line-clamp-1">
                    {style.subtitle}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Status & WhatsApp Concierge */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#29241D]">
            <span className="w-2 h-2 rounded-[4px] bg-[#5B1A1F]"></span>
            <span>
              Selected:{" "}
              {styles.find((s) => s.id === selectedStyle)?.title || "Shop Display"}
            </span>
          </div>

          <a
            href="https://wa.me/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 bg-[#E8F7EE] text-[#1E7E34] text-[10px] font-bold px-2.5 py-1 rounded-[4px] border border-[#C5E9D3] hover:bg-[#DDF3E6] transition-colors"
          >
            <MessageCircle className="w-3 h-3" />
            <span>WhatsApp Concierge</span>
          </a>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <Link
            href="/studio/jewellery/step-3"
            className="flex items-center justify-center gap-2 w-full bg-[#5B1A1F] hover:bg-[#471418] text-bg py-3.5 rounded-[4px] text-xs font-bold tracking-wider uppercase transition-all shadow-warm-sm active:scale-[0.99]"
          >
            <span>CONTINUE TO CUSTOMIZE</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </main>
    </div>
  );
}
