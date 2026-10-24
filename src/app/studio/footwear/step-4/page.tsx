"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Sparkles,
  Search,
  Check,
  Download,
  Sliders,
  RefreshCw,
  Sun,
  Camera,
  Layers,
  Coins,
  Gem,
  BookOpen,
} from "lucide-react";

export default function FootwearStep4Page() {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = () => {
    setIsDownloading(true);
    setTimeout(() => {
      setIsDownloading(false);
      alert("4K High-Resolution Footwear Package (TIFF + JPG) downloaded!");
    }, 1200);
  };

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
          href="/studio/footwear/step-3"
          className="flex items-center gap-1 text-[#6E6759] uppercase tracking-wider hover:text-black"
        >
          <ArrowLeft className="w-3 h-3" />
          <span>Back to Customize</span>
        </Link>
        <div className="flex items-center gap-1">
          <span className="bg-[#EFE9DC] text-[#5B5226] px-2 py-0.5 rounded uppercase tracking-wider">
            Step 4 of 4 · Review
          </span>
          <span className="inline-flex items-center gap-1 bg-[#E8F5E9] text-[#2E7D32] px-2 py-0.5 rounded uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2E7D32]"></span>
            <span>Image Ready</span>
          </span>
        </div>
      </div>

      {/* Main Content */}
      <main className="space-y-4 pt-2">
        {/* Title */}
        <div className="space-y-1">
          <h1 className="font-serif text-2xl font-normal text-[#1F1C18]">
            Review Your Image
          </h1>
          <p className="text-xs text-[#6A6357] leading-relaxed">
            Your bespoke footwear render is configured and ready for production
            lookbooks.
          </p>
        </div>

        {/* 4K Footwear Render Showcase Card */}
        <div className="relative rounded-2xl overflow-hidden border border-[#E7E0D3] bg-black shadow-md">
          {/* Top Badges */}
          <div className="absolute top-3 left-3 z-10">
            <div className="bg-black/60 backdrop-blur-md text-[#E8DFD0] text-[9px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider border border-white/20 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E5C989]"></span>
              <span>Atelier Render · 3:4 Lookbook</span>
            </div>
          </div>

          <div className="absolute top-3 right-3 z-10">
            <div className="bg-black/60 backdrop-blur-md text-[#E8DFD0] text-[9px] font-bold px-2 py-1 rounded-md uppercase tracking-wider border border-white/20">
              ⏱ 3840 × 5120
            </div>
          </div>

          {/* Masterpiece Image */}
          <div className="relative aspect-[3/4] w-full">
            <Image
              src="/images/footwear_craft.jpg"
              alt="Burnished Double Monkstrap & Loafer"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 480px) 100vw, 420px"
            />

            {/* Bottom Plinth Tag */}
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between bg-[#F8F5EE]/95 backdrop-blur-md px-3 py-2 rounded-xl border border-black/10 text-[#211E1A] shadow-sm">
              <div className="truncate">
                <div className="text-[8px] uppercase tracking-widest text-[#7C7467] font-bold">
                  Atelier Studio N° 07
                </div>
                <div className="text-[11px] font-bold tracking-wide truncate">
                  Hand-Burnished Loafers &amp; Tra...
                </div>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  type="button"
                  onClick={() => alert("Zooming into 4K calfskin detail...")}
                  className="w-7 h-7 rounded-lg bg-white border border-[#DDD5C7] flex items-center justify-center text-[#3B352C] hover:bg-[#FAF8F5]"
                >
                  <Search className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => alert("Viewing raw phone snapshot...")}
                  className="flex items-center gap-1 bg-white border border-[#DDD5C7] px-2 py-1 rounded-lg text-[9px] font-bold uppercase tracking-wider text-[#3B352C] hover:bg-[#FAF8F5]"
                >
                  <BookOpen className="w-3 h-3" />
                  <span>Original</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Details Card */}
        <div className="bg-white rounded-2xl p-4 border border-[#E7E0D3] shadow-xs space-y-3">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-[9px] uppercase tracking-widest text-[#7C7467] font-bold">
                Curated Recipe
              </div>
              <h2 className="font-serif text-lg font-bold text-[#1F1C18] leading-snug">
                Burnished Double Monkstrap &amp; Loafer
              </h2>
            </div>
            <div className="flex items-center gap-1 bg-[#F5F0E4] text-[#5B5226] text-[10px] font-bold px-2 py-0.5 rounded-md border border-[#E5DEC9]">
              <Sun className="w-3 h-3 text-[#5B5226]" />
              <span>5600K Diffused</span>
            </div>
          </div>

          <p className="text-[11px] text-[#787163] leading-relaxed">
            Boutique Display Preset · Soft Travertine Pedestal · Warm Amber Light
          </p>

          {/* 3 Calibrated Features */}
          <div className="space-y-1.5 pt-1">
            <div className="inline-flex items-center gap-1.5 bg-[#FAF8F5] border border-[#E5DECF] text-[#4F483D] text-[10px] px-2.5 py-1 rounded-md font-medium w-full">
              <Check className="w-3 h-3 text-[#5B5226] shrink-0" />
              <span>Specular Welt Glare Calibrated</span>
            </div>
            <div className="inline-flex items-center gap-1.5 bg-[#FAF8F5] border border-[#E5DECF] text-[#4F483D] text-[10px] px-2.5 py-1 rounded-md font-medium w-full">
              <Check className="w-3 h-3 text-[#5B5226] shrink-0" />
              <span>Ultra-HD 4K Export Ready</span>
            </div>
            <div className="inline-flex items-center gap-1.5 bg-[#FAF8F5] border border-[#E5DECF] text-[#4F483D] text-[10px] px-2.5 py-1 rounded-md font-medium w-full">
              <Check className="w-3 h-3 text-[#5B5226] shrink-0" />
              <span>True-Scale Calfskin Grain</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2.5">
          <button
            type="button"
            onClick={handleDownload}
            disabled={isDownloading}
            className="flex items-center justify-center gap-2 w-full bg-[#5B5226] hover:bg-[#49421D] text-white py-3.5 rounded-lg text-xs font-bold tracking-wider uppercase transition-all shadow-md active:scale-[0.99] disabled:opacity-75"
          >
            <Download className="w-4 h-4" />
            <span>
              {isDownloading
                ? "Preparing 4K Package..."
                : "Download 4K Render (TIFF + JPG)"}
            </span>
          </button>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => alert("Synthesizing angle variant...")}
              className="flex items-center justify-center gap-1.5 bg-[#FAF8F5] border border-[#DDD5C7] text-[#2F2921] py-2.5 rounded-lg text-xs font-semibold hover:bg-white transition-all text-center"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#5B5226]" />
              <span className="text-[10px] uppercase tracking-wider">
                Generate Variant
              </span>
            </button>
            <Link
              href="/studio/footwear/step-3"
              className="flex items-center justify-center gap-1.5 bg-[#FAF8F5] border border-[#DDD5C7] text-[#2F2921] py-2.5 rounded-lg text-xs font-semibold hover:bg-white transition-all text-center"
            >
              <Sliders className="w-3.5 h-3.5 text-[#5B5226]" />
              <span className="text-[10px] uppercase tracking-wider">
                Refine Recipe
              </span>
            </Link>
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
