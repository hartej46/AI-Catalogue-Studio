"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronLeft,
  Sparkles,
  Camera,
  Upload,
  Diamond,
  Footprints,
  Glasses,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";

interface StudioConfig {
  title: string;
  tagline: string;
  icon: typeof Diamond;
  badge: string;
  image: string;
  focusItems: string[];
  presets: { name: string; time: string; lighting: string }[];
  placeholderText: string;
}

const studioData: Record<string, StudioConfig> = {
  jewellery: {
    title: "Fine Jewellery & Heritage",
    tagline: "Bridal Polki, Uncut Diamonds & Temple Kundan",
    icon: Diamond,
    badge: "JEWELLERY ATELIER",
    image: "/images/jewellery_craft.jpg",
    focusItems: [
      "Necklaces & Chokers",
      "Kundan & Polki Earrings",
      "Bangles & Kadas",
      "Maang Tikka & Rings",
    ],
    presets: [
      { name: "Jaipur Heritage Travertine", time: "42s", lighting: "Warm Sunlight" },
      { name: "Regal Emerald Velvet Bust", time: "38s", lighting: "Museum Spot" },
      { name: "Minimal Sandstone Plinth", time: "35s", lighting: "Soft Diffused" },
    ],
    placeholderText: "Drop necklace, earring pair, or ring photo...",
  },
  footwear: {
    title: "Bespoke & Contemporary Footwear",
    tagline: "Artisanal Mojaris, Zardozi Juttis & Handcrafted Leather",
    icon: Footprints,
    badge: "FOOTWEAR ATELIER",
    image: "/images/footwear_craft.jpg",
    focusItems: [
      "Bridal Zardozi Juttis",
      "Handcrafted Leather Loafers",
      "Kolhapuris & Mojaris",
      "Formal Oxford Brogues",
    ],
    presets: [
      { name: "Sandstone & Marigold Petals", time: "45s", lighting: "Courtyard Glow" },
      { name: "Terracotta Court Plinth", time: "40s", lighting: "Golden Hour" },
      { name: "Modern Minimalist Linen", time: "30s", lighting: "Clean Studio" },
    ],
    placeholderText: "Drop bridal jutti or leather shoe photo...",
  },
  optical: {
    title: "Luxury Spectacles & Shades",
    tagline: "Acetate Frames, Titanium Bridges & Heritage Eyewear",
    icon: Glasses,
    badge: "OPTICAL ATELIER",
    image: "/images/optical_craft.jpg",
    focusItems: [
      "Tortoiseshell Acetate Frames",
      "Titanium Wire Spectacles",
      "Vintage Aviators & Sunshades",
      "Minimalist Rimless Eyewear",
    ],
    presets: [
      { name: "Sunlit Travertine Macro", time: "36s", lighting: "Natural High-Key" },
      { name: "Sand Dune Architectural Shadow", time: "42s", lighting: "Directional" },
      { name: "Minimalist Stone Pedestal", time: "32s", lighting: "Soft Neutral" },
    ],
    placeholderText: "Drop spectacles or sunglasses photo...",
  },
};

export default function StudioClient({ domain }: { domain: string }) {
  const domainKey = domain?.toLowerCase() || "jewellery";
  const studio = studioData[domainKey] || studioData["jewellery"];
  const Icon = studio.icon;

  const [selectedPreset, setSelectedPreset] = useState(0);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [renderFinished, setRenderFinished] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setUploadedImage(url);
      setRenderFinished(false);
    }
  };

  const handleStartRender = () => {
    setIsSynthesizing(true);
    setTimeout(() => {
      setIsSynthesizing(false);
      setRenderFinished(true);
    }, 1800);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1F1C18] flex flex-col justify-between max-w-md mx-auto px-4 py-4 shadow-sm border-x border-[#EFEAE1]">
      {/* Studio Navigation */}
      <header className="flex items-center justify-between pb-3 border-b border-[#EFEAE1]">
        <Link
          href="/select-domain"
          className="p-1 -ml-1 text-[#4F493F] hover:text-black transition-colors rounded-full flex items-center gap-1"
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="text-xs font-semibold text-[#5B5226]">Domains</span>
        </Link>

        <div className="flex items-center gap-1.5">
          <div className="w-6 h-6 rounded-md bg-[#5B5226]/10 flex items-center justify-center text-[#5B5226]">
            <Icon className="w-3.5 h-3.5" />
          </div>
          <span className="font-serif text-sm font-semibold tracking-wide text-[#231F1B]">
            {domainKey.toUpperCase()} STUDIO
          </span>
        </div>

        <div className="bg-[#EAE4D7] text-[#5B5226] text-[10px] font-bold px-2 py-1 rounded">
          3 Credits
        </div>
      </header>

      {/* Main Studio Body */}
      <main className="space-y-4 pt-3">
        {/* Domain Classification Banner */}
        <div className="bg-white rounded-2xl overflow-hidden border border-[#E7E0D3] shadow-xs">
          <div className="relative aspect-[16/9] w-full">
            <Image
              src={studio.image}
              alt={studio.title}
              fill
              className="object-cover"
              sizes="(max-width: 480px) 100vw, 420px"
            />
            <div className="absolute top-2.5 left-2.5 bg-black/60 backdrop-blur-md text-[#E8DFD0] text-[9px] font-bold px-2 py-0.5 rounded tracking-wider uppercase border border-white/10">
              {studio.badge}
            </div>
          </div>
          <div className="p-3.5 space-y-2">
            <h1 className="font-serif text-lg font-medium text-[#1F1C18]">
              {studio.title}
            </h1>
            <p className="text-[11px] text-[#70695E]">{studio.tagline}</p>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {studio.focusItems.map((item, idx) => (
                <span
                  key={idx}
                  className="bg-[#FAF8F5] border border-[#E5DECF] text-[#4F483D] text-[10px] px-2 py-0.5 rounded font-medium"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Upload & Staging Workspace */}
        <div className="bg-white rounded-2xl p-4 border border-[#E7E0D3] shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Camera className="w-4 h-4 text-[#5B5226]" />
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#1F1C18]">
                Product Snapshot Staging
              </h2>
            </div>
            <span className="text-[10px] text-[#7A7366] font-medium">
              Mobile Direct
            </span>
          </div>

          {/* Upload Dropzone */}
          <label className="relative flex flex-col items-center justify-center p-5 border-2 border-dashed border-[#DDD5C7] hover:border-[#5B5226] rounded-xl bg-[#FAF8F5] cursor-pointer transition-all text-center">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileUpload}
            />
            {uploadedImage ? (
              <div className="space-y-2">
                <div className="relative w-32 h-32 mx-auto rounded-lg overflow-hidden border border-[#D5CCBD]">
                  <Image
                    src={uploadedImage}
                    alt="Uploaded Product"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex items-center justify-center gap-1 text-[11px] font-bold text-[#5B5226]">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Product Photo Loaded</span>
                </div>
                <p className="text-[10px] text-[#7A7366]">Tap to change photo</p>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-full bg-[#EFEAE0] flex items-center justify-center text-[#5B5226] mx-auto">
                  <Upload className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-[#1F1C18]">
                    Upload Phone Photo
                  </div>
                  <p className="text-[10px] text-[#7E776A] mt-0.5">
                    {studio.placeholderText}
                  </p>
                </div>
              </div>
            )}
          </label>

          {/* Preset Lighting & Environment Selector */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-[11px]">
              <span className="font-bold uppercase tracking-wider text-[#635C4F]">
                Atmospheric Lighting Preset
              </span>
              <span className="text-[10px] text-[#5B5226] font-semibold">
                Indian Editorial
              </span>
            </div>

            <div className="space-y-2">
              {studio.presets.map((preset, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedPreset(idx)}
                  className={`p-2.5 rounded-lg border text-xs cursor-pointer flex items-center justify-between transition-all ${
                    selectedPreset === idx
                      ? "border-[#5B5226] bg-[#FAF8F5] font-semibold text-[#1F1C18]"
                      : "border-[#E7E0D3] bg-white text-[#5F584C] hover:border-[#CCC2B1]"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                        selectedPreset === idx
                          ? "border-[#5B5226] bg-[#5B5226]"
                          : "border-[#C5BBAA]"
                      }`}
                    >
                      {selectedPreset === idx && (
                        <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                      )}
                    </div>
                    <span>{preset.name}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-[#7A7366]">
                    <span>{preset.lighting}</span>
                    <span className="bg-[#EFEAE0] px-1.5 py-0.5 rounded font-bold text-[#5B5226]">
                      {preset.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Product Rules Notice */}
          <div className="bg-[#F8F5EE] border border-[#E5DECF] rounded-xl p-3 space-y-1">
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#5B5226] uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Studio Fidelity Rules</span>
            </div>
            <ul className="text-[10px] text-[#696254] space-y-0.5 list-disc pl-3.5 leading-relaxed">
              <li>Exact product geometry, stones, colours &amp; proportions preserved.</li>
              <li>Realistic body &amp; surface scale with no added watermarks.</li>
            </ul>
          </div>

          {/* Synthesis CTA */}
          <button
            type="button"
            onClick={handleStartRender}
            disabled={isSynthesizing}
            className="flex items-center justify-center gap-2 w-full bg-[#5B5226] hover:bg-[#49421D] text-white py-3.5 rounded-lg text-xs font-bold tracking-wider uppercase transition-all shadow-md active:scale-[0.99] disabled:opacity-75"
          >
            <Sparkles className="w-4 h-4" />
            <span>
              {isSynthesizing
                ? "Synthesizing 4K Neural Render..."
                : "Render 4K Editorial Shoot (1 Credit)"}
            </span>
          </button>

          {/* Render Result Modal / Preview */}
          {renderFinished && (
            <div className="bg-[#FAF8F5] border border-[#5B5226] rounded-xl p-3.5 space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-[#5B5226]">
                <div className="flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>4K Render Complete</span>
                </div>
                <span className="text-[10px] bg-[#E7DFCE] px-2 py-0.5 rounded uppercase">
                  Ready for Storefront
                </span>
              </div>
              <div className="relative aspect-[4/3] w-full rounded-lg overflow-hidden border border-[#DCD3C4]">
                <Image
                  src={studio.image}
                  alt="Rendered result"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => alert("Downloading 4K Campaign Pack...")}
                  className="flex-1 bg-[#5B5226] text-white text-xs font-semibold py-2 rounded-md hover:bg-[#49421D]"
                >
                  Download 4K Renders
                </button>
                <Link
                  href="/select-domain"
                  className="px-3 py-2 border border-[#DDD5C7] text-[#332E27] text-xs font-medium rounded-md hover:bg-white text-center"
                >
                  Switch Domain
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="pt-6 pb-2 text-center text-[10px] text-[#7A7366] space-y-1">
        <p>Atelier Studio Engine v2.4 · Built for Indian Luxury Merchants</p>
      </footer>
    </div>
  );
}
