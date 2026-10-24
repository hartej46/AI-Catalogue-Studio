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

interface OpticalCategory {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  image: string;
}

const categories: OpticalCategory[] = [
  {
    id: "titanium_rimless",
    title: "Titanium & Rimless",
    subtitle: "Modern minimalist Japanese titanium frame...",
    tag: "BETA-TI",
    image: "/images/optical_craft.jpg",
  },
  {
    id: "acetate_classics",
    title: "Acetate Classics",
    subtitle: "Classic handcrafted tortoiseshell and deep...",
    tag: "HAND-POLISHED",
    image: "/images/hero_multi_craft.jpg",
  },
  {
    id: "aviator_navigator",
    title: "Aviator & Navigator",
    subtitle: "Architectural double-bridge optical frames an...",
    tag: "DUAL-BRIDGE",
    image: "/images/optical_craft.jpg",
  },
  {
    id: "cateye_sculptural",
    title: "Cat-Eye & Sculptural",
    subtitle: "High-fashion statement beveled acetate and...",
    tag: "BEVELED",
    image: "/images/hero_multi_craft.jpg",
  },
];

export default function OpticalStep1Page() {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState("titanium_rimless");

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

      {/* Main Body */}
      <main className="space-y-4 pt-3">
        {/* Progress Bar & Badges */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-[11px] font-bold text-[#453F34]">
            <span className="uppercase tracking-wider">Step 01 / 04 · 25% Completed</span>
            <span className="inline-flex items-center gap-1 bg-[#EBE5D8] text-[#5B5226] text-[10px] font-semibold px-2 py-0.5 rounded-full border border-[#DFD8C9] uppercase tracking-wider">
              <Eye className="w-3 h-3 text-[#5B5226]" />
              <span>Prescription &amp; Sun</span>
            </span>
          </div>
          <div className="w-full h-1.5 bg-[#E7E0D3] rounded-full overflow-hidden">
            <div className="w-1/4 h-full bg-[#5B5226] rounded-full transition-all"></div>
          </div>
        </div>

        {/* Optical Catalogue Pill */}
        <div>
          <div className="inline-flex items-center gap-1.5 bg-[#F0EBE0] text-[#5B5226] text-[10px] font-semibold px-2.5 py-0.5 rounded-full border border-[#E3DCCF] uppercase tracking-wider">
            <Glasses className="w-3.5 h-3.5 text-[#5B5226]" />
            <span>Optical Catalogue</span>
          </div>
        </div>

        {/* Heading */}
        <div className="space-y-1">
          <h1 className="font-serif text-2xl font-normal text-[#1F1C18]">
            Optical Category
          </h1>
          <p className="text-xs text-[#6A6357] leading-relaxed">
            Select eyewear frame silhouette to calibrate bridge balance,
            anti-reflective multi-coating, and temple geometry.
          </p>
        </div>

        {/* 2x2 Grid of Silhouette Options */}
        <div className="grid grid-cols-2 gap-2.5">
          {categories.map((cat) => {
            const isSelected = selectedId === cat.id;
            return (
              <div
                key={cat.id}
                onClick={() => setSelectedId(cat.id)}
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

                {/* Thumbnail */}
                <div className="relative aspect-square w-full rounded-lg overflow-hidden">
                  <Image
                    src={cat.image}
                    alt={cat.title}
                    fill
                    className="object-cover"
                    sizes="180px"
                  />
                  <div className="absolute bottom-1.5 left-1.5 bg-[#FAF8F5]/90 backdrop-blur-xs text-[#302B23] text-[8px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider border border-black/5">
                    {cat.tag}
                  </div>
                </div>

                {/* Details */}
                <div className="p-2 space-y-0.5">
                  <div className="text-xs font-bold text-[#1F1C18] leading-tight">
                    {cat.title}
                  </div>
                  <div className="text-[10px] text-[#7A7366] leading-snug line-clamp-2">
                    {cat.subtitle}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Optical AI Staging Engine Info Box */}
        <div className="bg-[#F6F2EA] border border-[#E7E0D3] rounded-xl p-3.5 flex items-start gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-[#EAE3D3] flex items-center justify-center text-[#5B5226] shrink-0 mt-0.5">
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="space-y-0.5">
            <div className="text-xs font-bold text-[#1F1C18]">
              Optical AI Staging Engine
            </div>
            <p className="text-[10px] text-[#6A6357] leading-relaxed">
              Automatic anti-glare suppression and prescription curvature
              rendering are synced to your chosen frame geometry.
            </p>
          </div>
        </div>

        {/* Active Profile Bar & Action Button */}
        <div className="bg-[#FAF8F5] border border-[#E7E0D3] rounded-xl p-2.5 flex items-center justify-between shadow-xs">
          <div>
            <div className="text-[9px] uppercase tracking-wider text-[#7A7366] font-bold">
              Active Profile
            </div>
            <div className="text-xs font-bold text-[#1F1C18]">
              Titanium &amp; Rimless
            </div>
          </div>
          <Link
            href="/studio/optical/step-2"
            className="flex items-center gap-1.5 bg-[#5B5226] hover:bg-[#49421D] text-white px-4 py-2.5 rounded-lg text-xs font-bold tracking-wider uppercase transition-all shadow-sm active:scale-[0.99]"
          >
            <span>Continue to Shot Types</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
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
