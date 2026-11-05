"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ChevronLeft,
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
    <div className="min-h-screen bg-bg text-ink flex flex-col justify-between">
      {/* Top Header */}
      <header className="sticky top-0 z-50 w-full bg-surface border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link
            href="/login"
            className="flex items-center gap-2 text-muted hover:text-ink transition-colors duration-150 rounded-[4px] group"
          >
            <ChevronLeft className="w-4 h-4 transition-transform duration-150 group-hover:-translate-x-0.5" />
            <span className="text-xs uppercase tracking-wider font-semibold">
              Back to Sign In
            </span>
          </Link>

          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brass" />
            <span className="font-serif text-lg sm:text-xl font-bold tracking-tight text-ink">
              Catalogue Studio
            </span>
            <span className="bg-bg text-muted border border-border text-[9px] font-semibold px-1.5 py-0.5 rounded-[2px] tracking-wider uppercase">
              LAB
            </span>
          </div>

          <div className="w-8 h-8 rounded-[4px] overflow-hidden border border-border relative bg-surface">
            <Image
              src="/images/jewellery_craft.jpg"
              alt="Merchant Profile"
              fill
              className="object-cover"
              sizes="32px"
            />
          </div>
        </div>
      </header>

      {/* Main Body */}
      <main className="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8 flex-1">
        {/* Eyebrow */}
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-1.5 bg-surface text-ink text-[10px] font-semibold px-3 py-1 rounded-[4px] border border-border uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-brass shrink-0" />
            <span>Atelier Onboarding</span>
          </div>
        </div>

        {/* Heading */}
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <h1 className="font-serif text-3xl sm:text-4xl font-normal text-ink">
            Select Your Atelier Craft Domain
          </h1>
          <p className="text-xs sm:text-sm text-muted leading-relaxed">
            Catalogue Studio tunes its styles, props, and lighting to the exact micro-reflections of your craft.
          </p>
        </div>

        {/* 3 Domain Cards in Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          {domains.map((domain) => {
            const isSelected = selectedDomain === domain.key;
            const Icon = domain.icon;

            return (
              <div
                key={domain.key}
                onClick={() => setSelectedDomain(domain.key)}
                className={`relative bg-surface rounded-[6px] overflow-hidden border transition-colors duration-150 cursor-pointer shadow-warm-sm ${
                  isSelected
                    ? "border-accent"
                    : "border-border hover:border-muted"
                }`}
              >
                {/* Active Craft Badge */}
                {isSelected && (
                  <div className="absolute top-2.5 right-2.5 z-10 flex items-center gap-1 bg-accent text-bg text-[9px] font-semibold px-2 py-0.5 rounded-[2px] tracking-wider uppercase">
                    <Check className="w-3 h-3" />
                    <span>Active Craft</span>
                  </div>
                )}

                {/* Card Image */}
                <div className="relative aspect-[16/10] w-full border-b border-border">
                  <Image
                    src={domain.image}
                    alt={domain.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 480px) 100vw, 420px"
                  />
                  {/* Category Pill Tag */}
                  <div className="absolute bottom-2.5 left-2.5 bg-ink/80 text-bg text-[9px] font-semibold px-2 py-0.5 rounded-[2px] uppercase tracking-wider border border-border/20 flex items-center gap-1">
                    <Icon className="w-3 h-3 text-brass" />
                    <span>{domain.tag}</span>
                  </div>
                </div>

                {/* Card Info & Button */}
                <div className="p-3.5 space-y-3">
                  <div className="flex items-start gap-2.5">
                    <div className="w-7 h-7 rounded-[4px] bg-bg border border-border flex items-center justify-center text-brass shrink-0 mt-0.5">
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h3 className="font-serif text-base font-medium text-ink">
                        {domain.title}
                      </h3>
                      <p className="text-[11px] text-muted leading-relaxed">
                        {domain.description}
                      </p>
                    </div>
                  </div>

                  <Link
                    href={domain.studioHref}
                    className={`flex items-center justify-center gap-2 w-full py-2.5 rounded-[4px] text-xs font-semibold tracking-wider transition-colors duration-150 ${
                      isSelected
                        ? "bg-accent hover:bg-accent-hover text-bg shadow-warm-sm"
                        : "bg-surface hover:bg-bg text-ink border border-border"
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
      <footer className="w-full border-t border-border bg-surface py-6 text-center space-y-2">
        <div className="flex items-center justify-center gap-2 text-muted text-xs font-semibold uppercase tracking-wider">
          <SlidersHorizontal className="w-3.5 h-3.5 text-brass" />
          <span>Universal Atelier Access</span>
        </div>
        <p className="text-xs text-muted max-w-md mx-auto leading-relaxed">
          You can freely switch domains or combine multi-category catalogues later from Studio Settings.
        </p>
      </footer>
    </div>
  );
}
