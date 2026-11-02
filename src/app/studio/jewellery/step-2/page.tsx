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
    <div className="min-h-screen bg-[#FAF8F5] text-[#1F1C18] flex flex-col justify-between max-w-md mx-auto px-4 py-3.5 shadow-sm border-x border-[#EFEAE1] pb-10">
      {/* Top Header */}
      <header className="flex items-center justify-between pb-2.5">
        <Link
          href="/studio/jewellery"
          className="w-8 h-8 rounded-full border border-[#DCD5C6] bg-white flex items-center justify-center text-[#3B352C] hover:bg-[#FAF8F5] transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
        </Link>

        <div className="text-center">
          <span className="text-[9px] uppercase tracking-[0.25em] text-[#7C7467] font-bold block">
            Haute Atelier
          </span>
          <span className="font-serif text-sm font-bold tracking-tight text-[#1F1C18]">
            CATALOGUESTUDIO
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <div className="flex items-center gap-1 bg-[#F1ECD9] text-[#5B5226] text-xs font-bold px-2 py-0.5 rounded-full border border-[#E3DCC8]">
            <span className="text-[10px]">✦</span>
            <span>3 CR</span>
          </div>
          <div className="w-7 h-7 rounded-full bg-[#27231E] text-white flex items-center justify-center text-[10px] font-bold">
            GP
          </div>
        </div>
      </header>

      {/* 4-Segment Progress Bar */}
      <div className="space-y-2 py-1">
        <div className="grid grid-cols-4 gap-1.5">
          <div className="h-1 bg-[#5B5226] rounded-full"></div>
          <div className="h-1 bg-[#5B5226] rounded-full"></div>
          <div className="h-1 bg-[#DDD5C7] rounded-full"></div>
          <div className="h-1 bg-[#DDD5C7] rounded-full"></div>
        </div>

        <div className="flex items-center justify-between text-[11px] text-[#696255] font-semibold">
          <Link
            href="/studio/jewellery"
            className="flex items-center gap-1 hover:text-black uppercase tracking-wider text-[10px]"
          >
            <ArrowLeft className="w-3 h-3" />
            <span>Back</span>
          </Link>
          <span className="uppercase tracking-wider text-[10px]">
            Step 2 of 4 — Style &amp; Size
          </span>
        </div>
      </div>

      {/* Main Content */}
      <main className="space-y-4 pt-1">
        {/* Jewellery Set Tag */}
        <div>
          <span className="inline-flex items-center gap-1 bg-white border border-[#DDD5C7] text-[#453F34] text-[10px] font-semibold px-2.5 py-0.5 rounded-full shadow-xs">
            <Star className="w-3 h-3 text-[#5B5226]" />
            <span>Jewellery Set</span>
          </span>
        </div>

        {/* Title */}
        <div className="space-y-1">
          <h1 className="font-serif text-2xl font-normal text-[#1F1C18]">
            Style &amp; size
          </h1>
          <p className="text-xs text-[#6A6357] leading-relaxed">
            Pick how the photos should look, then choose the size.
          </p>
        </div>

        {/* Shot Style Header */}
        <div className="flex items-center justify-between pt-1 text-[11px]">
          <span className="font-bold uppercase tracking-wider text-[#353028]">
            Shot Style
          </span>
          <span className="text-[#5B5226] font-medium text-[10px]">
            Select 1 option
          </span>
        </div>

        {/* 6 Dark Cards (2 columns x 3 rows) */}
        <div className="grid grid-cols-2 gap-2.5">
          {styles.map((style) => {
            const isSelected = selectedStyle === style.id;
            return (
              <div
                key={style.id}
                onClick={() => setSelectedStyle(style.id)}
                className={`relative bg-[#191715] text-white rounded-2xl overflow-hidden border p-1.5 cursor-pointer transition-all ${
                  isSelected
                    ? "border-[#5B5226] ring-2 ring-[#5B5226] shadow-md"
                    : "border-neutral-800 hover:border-neutral-600"
                }`}
              >
                {/* Active Checkmark */}
                {isSelected && (
                  <div className="absolute top-2.5 right-2.5 z-10 w-5 h-5 rounded-full bg-[#5B5226] text-white flex items-center justify-center shadow-sm">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                )}

                {/* Image */}
                <div className="relative aspect-[16/11] w-full rounded-xl overflow-hidden">
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
                      isSelected ? "text-[#E6C987]" : "text-white"
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
            <span className="w-2 h-2 rounded-full bg-[#5B5226]"></span>
            <span>
              Selected:{" "}
              {styles.find((s) => s.id === selectedStyle)?.title || "Shop Display"}
            </span>
          </div>

          <a
            href="https://wa.me/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 bg-[#E8F7EE] text-[#1E7E34] text-[10px] font-bold px-2.5 py-1 rounded-full border border-[#C5E9D3] hover:bg-[#DDF3E6] transition-colors"
          >
            <MessageCircle className="w-3 h-3" />
            <span>WhatsApp Concierge</span>
          </a>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <Link
            href="/studio/jewellery/step-3"
            className="flex items-center justify-center gap-2 w-full bg-[#5B5226] hover:bg-[#49421D] text-white py-3.5 rounded-lg text-xs font-bold tracking-wider uppercase transition-all shadow-md active:scale-[0.99]"
          >
            <span>CONTINUE TO CUSTOMIZE</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </main>
    </div>
  );
}
