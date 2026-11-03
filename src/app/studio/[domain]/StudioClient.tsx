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
    <div className="min-h-screen bg-bg text-ink flex flex-col justify-between">
      {/* Studio Navigation */}
      <header className="sticky top-0 z-50 w-full bg-surface border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link
            href="/select-domain"
            className="flex items-center gap-2 text-muted hover:text-ink transition-colors duration-150 rounded-[4px] group"
          >
            <ChevronLeft className="w-4 h-4 transition-transform duration-150 group-hover:-translate-x-0.5" />
            <span className="text-xs uppercase tracking-wider font-semibold text-accent">Domains</span>
          </Link>

          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-[4px] bg-bg border border-border flex items-center justify-center text-brass">
              <Icon className="w-3.5 h-3.5" />
            </div>
            <span className="font-serif text-base sm:text-lg font-bold tracking-tight text-ink uppercase">
              {domainKey} Studio
            </span>
          </div>

          <div className="bg-bg text-accent text-xs font-semibold px-3 py-1 rounded-[4px] border border-border">
            3 Credits
          </div>
        </div>
      </header>

      {/* Main Studio Body */}
      <main className="max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-6 flex-1">
        {/* Domain Classification Banner */}
        <div className="bg-surface rounded-[8px] overflow-hidden border border-border shadow-warm-card">
          <div className="relative aspect-[16/8] sm:aspect-[21/9] w-full">
            <Image
              src={studio.image}
              alt={studio.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 960px"
            />
            <div className="absolute top-3 left-3 bg-ink/80 text-bg text-[10px] font-semibold px-2.5 py-1 rounded-[2px] tracking-wider uppercase border border-border/20">
              {studio.badge}
            </div>
          </div>
          <div className="p-5 sm:p-6 space-y-2">
            <h1 className="font-serif text-xl sm:text-2xl font-normal text-ink">
              {studio.title}
            </h1>
            <p className="text-xs sm:text-sm text-muted">{studio.tagline}</p>
            <div className="flex flex-wrap gap-2 pt-2">
              {studio.focusItems.map((item, idx) => (
                <span
                  key={idx}
                  className="bg-bg border border-border text-muted text-xs px-2.5 py-1 rounded-[4px] font-medium"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Upload & Staging Workspace */}
        <div className="bg-surface rounded-[6px] p-4 border border-[#DDD4C7] shadow-warm-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Camera className="w-4 h-4 text-[#5B1A1F]" />
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#1C1714]">
                Product Snapshot Staging
              </h2>
            </div>
            <span className="text-[10px] text-[#6E655C] font-medium">
              Mobile Direct
            </span>
          </div>

          {/* Upload Dropzone */}
          <label className="relative flex flex-col items-center justify-center p-5 border-2 border-dashed border-[#DDD4C7] hover:border-[#5B1A1F] rounded-[6px] bg-[#F4EFE8] cursor-pointer transition-all text-center">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileUpload}
            />
            {uploadedImage ? (
              <div className="space-y-2">
                <div className="relative w-32 h-32 mx-auto rounded-[4px] overflow-hidden border border-[#DDD4C7]">
                  <Image
                    src={uploadedImage}
                    alt="Uploaded Product"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex items-center justify-center gap-1 text-[11px] font-bold text-[#5B1A1F]">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Product Photo Loaded</span>
                </div>
                <p className="text-[10px] text-[#6E655C]">Tap to change photo</p>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-[4px] bg-[#FBF8F3] flex items-center justify-center text-[#5B1A1F] mx-auto">
                  <Upload className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-[#1C1714]">
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
              <span className="text-[10px] text-[#5B1A1F] font-semibold">
                Indian Editorial
              </span>
            </div>

            <div className="space-y-2">
              {studio.presets.map((preset, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedPreset(idx)}
                  className={`p-2.5 rounded-[4px] border text-xs cursor-pointer flex items-center justify-between transition-all ${
                    selectedPreset === idx
                      ? "border-[#5B1A1F] bg-[#F4EFE8] font-semibold text-[#1C1714]"
                      : "border-[#DDD4C7] bg-surface text-[#5F584C] hover:border-[#CCC2B1]"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-3.5 h-3.5 rounded-[4px] border flex items-center justify-center ${
                        selectedPreset === idx
                          ? "border-[#5B1A1F] bg-[#5B1A1F]"
                          : "border-[#C5BBAA]"
                      }`}
                    >
                      {selectedPreset === idx && (
                        <div className="w-1.5 h-1.5 rounded-[4px] bg-surface"></div>
                      )}
                    </div>
                    <span>{preset.name}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-[#6E655C]">
                    <span>{preset.lighting}</span>
                    <span className="bg-[#FBF8F3] px-1.5 py-0.5 rounded font-bold text-[#5B1A1F]">
                      {preset.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Product Rules Notice */}
          <div className="bg-[#F8F5EE] border border-[#DDD4C7] rounded-[6px] p-3 space-y-1">
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#5B1A1F] uppercase tracking-wider">
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
            className="flex items-center justify-center gap-2 w-full bg-accent hover:bg-accent-hover text-bg py-3.5 sm:py-4 px-6 rounded-[4px] text-xs sm:text-sm font-semibold tracking-wider uppercase transition-colors duration-150 shadow-warm-sm disabled:opacity-60 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-brass" />
            <span>
              {isSynthesizing
                ? "Synthesizing 4K Neural Render..."
                : "Render 4K Editorial Shoot (1 Credit)"}
            </span>
          </button>

          {/* Render Result Modal / Preview */}
          {renderFinished && (
            <div className="bg-surface border border-accent rounded-[8px] p-5 sm:p-6 space-y-4 shadow-warm-card">
              <div className="flex items-center justify-between text-xs font-semibold text-accent">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>4K Render Complete</span>
                </div>
                <span className="text-[10px] bg-bg border border-border text-ink px-2.5 py-0.5 rounded-[2px] uppercase tracking-wider font-semibold">
                  Ready for Storefront
                </span>
              </div>
              <div className="relative aspect-[4/3] w-full rounded-[6px] overflow-hidden border border-border bg-bg">
                <Image
                  src={studio.image}
                  alt="Rendered result"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => alert("Downloading 4K Campaign Pack...")}
                  className="flex-1 bg-accent hover:bg-accent-hover text-bg text-xs font-semibold py-3 px-4 rounded-[4px] uppercase tracking-wider transition-colors duration-150 shadow-warm-sm cursor-pointer"
                >
                  Download 4K Renders
                </button>
                <Link
                  href="/select-domain"
                  className="px-4 py-3 border border-border text-ink text-xs font-semibold rounded-[4px] hover:bg-bg transition-colors duration-150 text-center uppercase tracking-wider"
                >
                  Switch Domain
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-border bg-surface py-6 text-center text-xs text-muted">
        <p>Atelier Studio Engine v2.4 · Calibrated for Indian Luxury Ateliers</p>
      </footer>
    </div>
  );
}
