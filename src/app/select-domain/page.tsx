"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ChevronLeft,
  Sparkles,
  ArrowRight,
  ArrowUpRight,
  Check,
  Diamond,
  Footprints,
  Glasses,
  SlidersHorizontal,
} from "lucide-react";

type DomainKey = "jewellery" | "footwear" | "optical";

interface DomainConfig {
  key: DomainKey;
  tag: string;
  badge: string;
  title: string;
  description: string;
  buttonText: string;
  image: string;
  icon: typeof Diamond;
  studioHref: string;
}

const domains: DomainConfig[] = [
  {
    key: "jewellery",
    tag: "BRIDAL & HIGH POLKI",
    badge: "ACTIVE CRAFT",
    title: "Fine Jewellery & Heritage",
    description:
      "Styles for bridal, macro, flat lay, studio and shop display looks.",
    buttonText: "ENTER JEWELLERY STUDIO",
    image: "/images/jewellery_craft.jpg",
    icon: Diamond,
    studioHref: "/studio/jewellery",
  },
  {
    key: "footwear",
    tag: "ARTISANAL LEATHER",
    badge: "ACTIVE CRAFT",
    title: "Bespoke & Contemporary",
    description:
      "Styles for on-foot, floating, flat lay, festive and shelf looks.",
    buttonText: "ENTER FOOTWEAR STUDIO",
    image: "/images/footwear_craft.jpg",
    icon: Footprints,
    studioHref: "/studio/footwear",
  },
  {
    key: "optical",
    tag: "ACETATE & TITANIUM",
    badge: "ACTIVE CRAFT",
    title: "Luxury Spectacles & Shades",
    description:
      "Styles for portrait, floating, flat lay, street and dark luxury looks.",
    buttonText: "ENTER OPTICAL STUDIO",
    image: "/images/optical_craft.jpg",
    icon: Glasses,
    studioHref: "/studio/optical",
  },
];

export default function SelectDomainPage() {
  const router = useRouter();
  const [selectedDomain, setSelectedDomain] = useState<DomainKey>("jewellery");

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1F1C18] flex flex-col justify-between max-w-md mx-auto px-4 py-4 shadow-sm border-x border-[#EFEAE1]">
      {/* Top Header */}
      <header className="flex items-center justify-between pb-3 border-b border-[#EFEAE1]">
        <Link
          href="/login"
          className="p-1 -ml-1 text-[#4F493F] hover:text-black transition-colors rounded-full"
        >
          <ChevronLeft className="w-5 h-5" />
        </Link>

        <div className="flex items-center gap-1.5">
          <div className="w-5 h-5 rounded-md bg-[#5B5226]/10 flex items-center justify-center text-[#5B5226]">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <span className="font-serif text-sm font-semibold tracking-wide text-[#231F1B]">
            Render Inspector
          </span>
        </div>

        <div className="w-7 h-7 rounded-full overflow-hidden border border-[#D8D0C3] relative">
          <Image
            src="/images/jewellery_craft.jpg"
            alt="Merchant Profile"
            fill
            className="object-cover"
            sizes="28px"
          />
        </div>
      </header>

      {/* Main Body */}
      <main className="space-y-4 pt-3">
        {/* Eyebrow */}
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-1 bg-[#F0EBE0] text-[#5B5226] text-[10px] font-semibold px-2.5 py-0.5 rounded-full border border-[#E3DCCF] uppercase tracking-wider">
            Atelier Onboarding
          </div>
        </div>

        {/* Heading */}
        <div className="text-center space-y-1">
          <h1 className="font-serif text-2xl font-normal text-[#1F1C18]">
            Select Your Atelier Domain
          </h1>
          <p className="text-xs text-[#6A6357] leading-relaxed max-w-xs mx-auto">
            Catalogue Studio tunes its styles, props, and lighting to your
            specific craft.
          </p>
        </div>

        {/* 3 Domain Cards */}
        <div className="space-y-4 pt-1">
          {domains.map((domain) => {
            const isSelected = selectedDomain === domain.key;
            const Icon = domain.icon;

            return (
              <div
                key={domain.key}
                onClick={() => setSelectedDomain(domain.key)}
                className={`relative bg-white rounded-2xl overflow-hidden border transition-all cursor-pointer shadow-xs ${
                  isSelected
                    ? "border-[#5B5226] ring-1 ring-[#5B5226]"
                    : "border-[#E7E0D3] hover:border-[#C4BAA9]"
                }`}
              >
                {/* Active Craft Badge */}
                {isSelected && (
                  <div className="absolute top-2.5 right-2.5 z-10 flex items-center gap-1 bg-[#5B5226] text-white text-[9px] font-bold px-2 py-0.5 rounded-md tracking-wider shadow-sm uppercase">
                    <Check className="w-3 h-3" />
                    <span>Active Craft</span>
                  </div>
                )}

                {/* Card Image */}
                <div className="relative aspect-[16/10] w-full">
                  <Image
                    src={domain.image}
                    alt={domain.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 480px) 100vw, 420px"
                  />
                  {/* Category Pill Tag */}
                  <div className="absolute bottom-2.5 left-2.5 bg-black/60 backdrop-blur-md text-[#F4EDE2] text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider border border-white/10 flex items-center gap-1">
                    <Icon className="w-3 h-3 text-[#D8C7A3]" />
                    <span>{domain.tag}</span>
                  </div>
                </div>

                {/* Card Info & Button */}
                <div className="p-3.5 space-y-3">
                  <div className="flex items-start gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-[#F4EFE6] flex items-center justify-center text-[#5B5226] shrink-0 mt-0.5">
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h3 className="font-serif text-base font-medium text-[#1F1C18]">
                        {domain.title}
                      </h3>
                      <p className="text-[11px] text-[#716A5E] leading-relaxed">
                        {domain.description}
                      </p>
                    </div>
                  </div>

                  <Link
                    href={domain.studioHref}
                    className={`flex items-center justify-center gap-2 w-full py-2.5 rounded-lg text-xs font-semibold tracking-wider transition-all ${
                      isSelected
                        ? "bg-[#5B5226] hover:bg-[#49421D] text-white shadow-xs"
                        : "bg-white hover:bg-[#FAF8F5] text-[#3A342B] border border-[#DDD5C7]"
                    }`}
                  >
                    <span>{domain.buttonText}</span>
                    {isSelected ? (
                      <ArrowRight className="w-3.5 h-3.5" />
                    ) : (
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    )}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* Footer / Switch Domain Notice */}
      <footer className="pt-6 pb-3 text-center space-y-1.5">
        <div className="flex items-center justify-center gap-1.5 text-[#5B5226] text-[10px] font-bold uppercase tracking-wider">
          <SlidersHorizontal className="w-3 h-3" />
          <span>Universal Atelier Access</span>
        </div>
        <p className="text-[10px] text-[#7A7366] max-w-xs mx-auto leading-relaxed">
          You can freely switch domains or combine multi-category catalogues
          later from Studio Settings.
        </p>
      </footer>
    </div>
  );
}
