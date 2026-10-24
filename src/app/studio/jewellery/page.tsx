"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Sparkles,
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

interface CategoryCard {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  image: string;
}

const categories: CategoryCard[] = [
  {
    id: "necklaces",
    title: "Necklaces & Chokers",
    subtitle: "Bridal Polki, Kundan sets, emerald chokers, temple...",
    tag: "💎RK 24K REFRACTION",
    image: "/images/jewellery_craft.jpg",
  },
  {
    id: "earrings",
    title: "Earrings & Jhumkas",
    subtitle: "Chandbalis, diamond drops, royal jhumkis,...",
    tag: "✦ MICRO-PAVÉ",
    image: "/images/jhumkas_craft.jpg",
  },
  {
    id: "bangles",
    title: "Bangles & Kadas",
    subtitle: "Temple cuffs, diamond bangles, polki kadas,...",
    tag: "⛶ CYLINDRICAL MESH",
    image: "/images/bangles_craft.jpg",
  },
  {
    id: "rings",
    title: "Rings & Maang Teeka",
    subtitle: "Solitaire cocktail rings, royal maang teekas, nat...",
    tag: "❂ FOCAL MACRO",
    image: "/images/hero_multi_craft.jpg",
  },
];

export default function JewelleryStep1Page() {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState("necklaces");

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1F1C18] flex flex-col justify-between max-w-md mx-auto px-4 py-3.5 shadow-sm border-x border-[#EFEAE1] pb-24">
      {/* Top Header */}
      <header className="flex items-center justify-between pb-3 border-b border-[#EFEAE1]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#EFEAE0] flex items-center justify-center text-[#5B5226]">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <span className="font-serif text-base font-bold tracking-tight text-[#1E1B18] block leading-none">
              Catalogue Studio
            </span>
            <span className="text-[9px] tracking-[0.2em] uppercase text-[#787163] font-semibold">
              Atelier AI Lab
            </span>
          </div>
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
        {/* Badges */}
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-1 bg-[#F0EBE0] text-[#5B5226] text-[10px] font-semibold px-2.5 py-0.5 rounded-full border border-[#E3DCCF] uppercase tracking-wider">
            <Sparkles className="w-3 h-3 text-[#5B5226]" />
            <span>Jewellery Catalogue</span>
          </div>
          <div className="inline-flex items-center gap-1 bg-[#EBE5D8] text-[#5B5226] text-[10px] font-semibold px-2.5 py-0.5 rounded-full border border-[#DFD8C9] uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-[#5B5226]"></span>
            <span>Heritage Polki</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-[11px] font-bold text-[#453F34]">
            <span className="uppercase tracking-wider">
              Step 01 / 04 · Silhouette Setup
            </span>
            <span className="text-[#5B5226]">25% Completed</span>
          </div>
          <div className="w-full h-1.5 bg-[#E7E0D3] rounded-full overflow-hidden">
            <div className="w-1/4 h-full bg-[#5B5226] rounded-full transition-all"></div>
          </div>
        </div>

        {/* Page Title & Subtitle */}
        <div className="space-y-1">
          <h1 className="font-serif text-2xl font-normal text-[#1F1C18]">
            Jewellery Category
          </h1>
          <p className="text-xs text-[#6A6357] leading-relaxed">
            Select ornament silhouette to calibrate specular reflection, gemstone
            depth, and gold lustre physics in the neural atelier.
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
                {/* Checkmark Badge */}
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
                  <div className="absolute bottom-1.5 left-1.5 bg-black/70 backdrop-blur-xs text-[#F2ECE1] text-[8px] font-semibold px-1.5 py-0.5 rounded uppercase tracking-wider">
                    {cat.tag}
                  </div>
                </div>

                {/* Content */}
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

        {/* Indian Karigar Calibration Pro Box */}
        <div className="bg-[#F6F2EA] border border-[#E7E0D3] rounded-xl p-3 flex items-start gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-[#EAE3D3] flex items-center justify-center text-[#5B5226] shrink-0 mt-0.5">
            <Scale className="w-4 h-4" />
          </div>
          <div className="space-y-0.5">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-[#1F1C18]">
                Indian Karigar Calibration
              </span>
              <span className="bg-[#5B5226] text-white text-[8px] font-bold px-1.5 py-0.5 rounded tracking-wider uppercase">
                PRO
              </span>
            </div>
            <p className="text-[10px] text-[#6A6357] leading-relaxed">
              Automatically accounts for uncut diamond foil backing, enamel
              meenakari hues, and South Indian matte antique finishes.
            </p>
          </div>
        </div>

        {/* Active Configuration Bar */}
        <div className="bg-[#F3EFE6] border border-[#E5DECF] rounded-lg px-3 py-2 flex items-center justify-between text-[10px]">
          <div className="flex items-center gap-1.5 text-[#2C2720] font-bold uppercase tracking-wider truncate">
            <span className="w-2 h-2 rounded-full bg-[#5B5226] shrink-0"></span>
            <span className="truncate">
              ACTIVE CONFIGURATION: POLKI &amp; CHOKER SELECT...
            </span>
          </div>
          <div className="flex items-center gap-1 text-[#5B5226] font-semibold shrink-0">
            <SlidersHorizontal className="w-3 h-3" />
            <span>1 Preset Active</span>
          </div>
        </div>

        {/* Action Button */}
        <Link
          href="/studio/jewellery/step-2"
          className="flex items-center justify-center gap-2 w-full bg-[#5B5226] hover:bg-[#49421D] text-white py-3.5 rounded-lg text-xs font-bold tracking-wider uppercase transition-all shadow-md active:scale-[0.99]"
        >
          <span>CONTINUE TO SHOT TYPES</span>
          <ArrowRight className="w-4 h-4" />
        </Link>

        {/* Floating Concierge Button */}
        <div className="flex justify-end pt-1">
          <button
            type="button"
            onClick={() => alert("Connecting to Atelier Concierge...")}
            className="inline-flex items-center gap-1.5 bg-white border border-[#DDD5C7] text-[#2F2921] px-3.5 py-1.5 rounded-full text-xs font-bold shadow-xs hover:bg-[#FAF8F5]"
          >
            <Headphones className="w-3.5 h-3.5 text-[#5B5226]" />
            <span className="text-[10px] tracking-wider uppercase">CONCIERGE</span>
          </button>
        </div>
      </main>

      {/* Persistent Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-[#E8E1D5] py-2 px-6 flex items-center justify-between text-center z-50 shadow-md">
        <Link
          href="/studio/jewellery"
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
