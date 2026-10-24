"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Sparkles,
  Search,
  Sun,
  Award,
  Star,
  Download,
  Sliders,
  RefreshCw,
  CheckCircle2,
  Store,
  Camera,
  Layers,
  Headphones,
} from "lucide-react";

export default function JewelleryStep4Page() {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = () => {
    setIsDownloading(true);
    setTimeout(() => {
      setIsDownloading(false);
      alert("4K High-Resolution Masterpiece Render downloaded!");
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1F1C18] flex flex-col justify-between max-w-md mx-auto px-4 py-3.5 shadow-sm border-x border-[#EFEAE1] pb-24">
      {/* Top Header */}
      <header className="flex items-center justify-between pb-2.5">
        <Link
          href="/studio/jewellery/step-3"
          className="flex items-center gap-1.5 text-xs font-semibold text-[#29241E] hover:text-black"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="font-serif text-sm truncate max-w-[170px]">
            Jewellery Step 4: Revi...
          </span>
        </Link>

        <div className="flex items-center gap-1.5">
          <div className="flex items-center gap-1 bg-[#F1ECD9] text-[#5B5226] text-xs font-bold px-2 py-0.5 rounded-full border border-[#E3DCC8]">
            <span className="text-[10px]">✦</span>
            <span>3 CR</span>
          </div>
          <div className="w-7 h-7 rounded-full bg-[#5B5226] text-white flex items-center justify-center text-[10px] font-bold">
            GP
          </div>
        </div>
      </header>

      {/* Sub Navigation Bar */}
      <div className="flex items-center justify-between py-1 border-b border-[#EAE3D6] pb-2 text-[10px] font-bold">
        <Link
          href="/studio/jewellery/step-3"
          className="flex items-center gap-1 text-[#6E6759] uppercase tracking-wider hover:text-black"
        >
          <ArrowLeft className="w-3 h-3" />
          <span>Back to Customize</span>
        </Link>
        <span className="bg-[#EFE9DC] text-[#5B5226] px-2 py-0.5 rounded uppercase tracking-wider">
          Step 4 of 4 · Review
        </span>
      </div>

      {/* Main Content */}
      <main className="space-y-4 pt-2">
        {/* Title & Badge */}
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <h1 className="font-serif text-2xl font-normal text-[#1F1C18]">
              Review Your Image
            </h1>
            <span className="inline-flex items-center gap-1 bg-[#EAE4D5] text-[#5B5226] text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-[#5B5226]"></span>
              <span>Image Ready</span>
            </span>
          </div>
          <p className="text-xs text-[#6A6357] leading-relaxed">
            Your bespoke jewellery render is configured and ready.
          </p>
        </div>

        {/* 4K Atelier Render Showcase Card */}
        <div className="relative rounded-2xl overflow-hidden border border-[#E7E0D3] bg-black shadow-md">
          {/* Top Overlays */}
          <div className="absolute top-3 left-3 z-10 flex items-center gap-2">
            <button
              type="button"
              onClick={() => alert("Zooming into 4K detail...")}
              className="w-7 h-7 rounded-lg bg-black/60 backdrop-blur-md text-white flex items-center justify-center border border-white/20 hover:bg-black"
            >
              <Search className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => alert("Exposure calibrated.")}
              className="w-7 h-7 rounded-lg bg-black/60 backdrop-blur-md text-white flex items-center justify-center border border-white/20 hover:bg-black"
            >
              <Sun className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="absolute top-3 right-3 z-10">
            <div className="bg-black/60 backdrop-blur-md text-[#E8DFD0] text-[9px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider border border-white/20 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E5C989]"></span>
              <span>Atelier Render · 3:4</span>
            </div>
          </div>

          {/* Masterpiece Image */}
          <div className="relative aspect-[3/4] w-full">
            <Image
              src="/images/jewellery_craft.jpg"
              alt="Polki Choker with Zambian Emeralds"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 480px) 100vw, 420px"
            />

            {/* Bottom Plinth Tag */}
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between bg-black/75 backdrop-blur-md px-3 py-2 rounded-xl border border-white/10 text-white shadow-sm">
              <div className="flex items-center gap-2 truncate">
                <Award className="w-4 h-4 text-[#D6B86C] shrink-0" />
                <span className="text-[11px] font-semibold tracking-wide truncate">
                  Masterpiece Grade · Zambian Eme...
                </span>
              </div>
              <span className="bg-[#5B5226] text-[#F3EFE7] text-[9px] font-bold px-2 py-0.5 rounded tracking-wider uppercase shrink-0">
                4K UHD
              </span>
            </div>
          </div>
        </div>

        {/* Details Card */}
        <div className="bg-white rounded-2xl p-4 border border-[#E7E0D3] shadow-xs space-y-3">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="font-serif text-lg font-bold text-[#1F1C18]">
                Polki Choker with Zambian Emeralds
              </h2>
              <p className="text-[11px] text-[#787163]">
                Heritage Bridal Collection · Bespoke Atelier Preset
              </p>
            </div>
            <div className="flex items-center gap-1 text-[#5B5226] text-xs font-bold bg-[#F4EFE6] px-2 py-0.5 rounded-md border border-[#E7E0D3]">
              <Star className="w-3.5 h-3.5 fill-[#5B5226]" />
              <span>9.9</span>
            </div>
          </div>

          {/* Metadata Chips */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            <span className="bg-[#FAF8F5] border border-[#E5DECF] text-[#4F483D] text-[10px] px-2.5 py-1 rounded-md font-medium">
              📽 Theatrical Soft Studio
            </span>
            <span className="bg-[#FAF8F5] border border-[#E5DECF] text-[#4F483D] text-[10px] px-2.5 py-1 rounded-md font-medium">
              ⛶ Ratio: 3:4
            </span>
            <span className="bg-[#FAF8F5] border border-[#E5DECF] text-[#4F483D] text-[10px] px-2.5 py-1 rounded-md font-medium">
              💎 Kundan Setting
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-2.5">
          <button
            type="button"
            onClick={handleDownload}
            disabled={isDownloading}
            className="flex items-center justify-center gap-2 w-full bg-[#5B5226] hover:bg-[#49421D] text-white py-3.5 rounded-lg text-xs font-bold tracking-wider uppercase transition-all shadow-md active:scale-[0.99] disabled:opacity-75"
          >
            <Download className="w-4 h-4" />
            <span>
              {isDownloading ? "Preparing 4K Package..." : "Download 4K Render"}
            </span>
          </button>

          <div className="grid grid-cols-2 gap-2">
            <Link
              href="/studio/jewellery/step-3"
              className="flex items-center justify-center gap-1.5 bg-[#FAF8F5] border border-[#DDD5C7] text-[#2F2921] py-2.5 rounded-lg text-xs font-semibold hover:bg-white transition-all text-center"
            >
              <Sliders className="w-3.5 h-3.5 text-[#5B5226]" />
              <span className="text-[10px] uppercase tracking-wider">
                Refine Recipe
              </span>
            </Link>
            <button
              type="button"
              onClick={() => alert("Synthesizing new angle variant...")}
              className="flex items-center justify-center gap-1.5 bg-[#FAF8F5] border border-[#DDD5C7] text-[#2F2921] py-2.5 rounded-lg text-xs font-semibold hover:bg-white transition-all text-center"
            >
              <RefreshCw className="w-3.5 h-3.5 text-[#5B5226]" />
              <span className="text-[10px] uppercase tracking-wider">
                Generate Variant
              </span>
            </button>
          </div>

          <div className="flex items-center justify-between text-[10px] text-[#696255] font-medium pt-1 px-1">
            <div className="flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-[#5B5226]" />
              <span>Ready for Instagram, E-Commerce &amp; Lookbook</span>
            </div>
            <span className="font-bold text-[#5B5226] uppercase">
              Print-Ready
            </span>
          </div>
        </div>
      </main>

      {/* Persistent Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-[#E8E1D5] py-2 px-6 flex items-center justify-between text-center z-50 shadow-md">
        <Link
          href="/studio/jewellery"
          className="flex flex-col items-center gap-0.5 text-[#867F73] hover:text-[#5B5226]"
        >
          <Store className="w-4 h-4" />
          <span className="text-[9px] font-semibold uppercase tracking-wider">
            Catalogues
          </span>
        </Link>
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
            Lookbooks
          </span>
        </Link>
        <div
          onClick={() => alert("Connecting to Concierge...")}
          className="flex flex-col items-center gap-0.5 text-[#867F73] hover:text-[#5B5226] cursor-pointer"
        >
          <Headphones className="w-4 h-4" />
          <span className="text-[9px] font-semibold uppercase tracking-wider">
            Concierge
          </span>
        </div>
      </nav>
    </div>
  );
}
