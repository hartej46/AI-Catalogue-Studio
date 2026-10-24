"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Sparkles } from "lucide-react";
import { CreditsPill } from "./CreditsPill";

export interface TopBarProps {
  credits?: number;
  avatarUrl?: string;
  avatarAlt?: string;
  showBack?: boolean;
  onBack?: () => void;
  onCreditsClick?: () => void;
  onAvatarClick?: () => void;
  className?: string;
}

export const TopBar: React.FC<TopBarProps> = ({
  credits = 3,
  avatarUrl = "/images/jewellery_craft.jpg",
  avatarAlt = "Atelier Merchant Avatar",
  showBack = false,
  onBack,
  onCreditsClick,
  onAvatarClick,
  className = "",
}) => {
  return (
    <header
      className={`sticky top-0 z-40 w-full bg-[#FDF9F3]/95 backdrop-blur-md border-b border-[#E8E6DF] px-4 py-3 flex items-center justify-between transition-colors ${className}`}
    >
      {/* Left: Brand mark / Back button */}
      <div className="flex items-center gap-3">
        {showBack && (
          <button
            onClick={onBack}
            type="button"
            className="w-8 h-8 rounded-full border border-[#E8E6DF] bg-white flex items-center justify-center text-[#57534E] hover:text-[#1C1917] hover:border-[#7A6A2E] transition-colors active:scale-95"
            aria-label="Go back"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
        )}

        <Link href="/" className="group block focus:outline-none">
          <div className="flex items-center gap-1.5">
            <span className="font-serif text-xl font-bold tracking-tight text-[#1C1917] group-hover:text-[#7A6A2E] transition-colors">
              Catalogue Studio
            </span>
            <span className="bg-[#F5EEDB] text-[#7A6A2E] border border-[#E8DFBE] text-[9px] font-bold px-1.5 py-0.5 rounded tracking-wider uppercase">
              LAB
            </span>
          </div>
          <div className="label-micro text-[#8C867A] tracking-[0.22em]">
            Atelier AI Lab
          </div>
        </Link>
      </div>

      {/* Right: Gold Credits Pill & Round Profile Avatar */}
      <div className="flex items-center gap-2.5">
        <CreditsPill credits={credits} onClick={onCreditsClick} />

        <button
          onClick={onAvatarClick}
          type="button"
          aria-label="Profile Account"
          className="relative w-8 h-8 rounded-full p-[1.5px] border border-[#D5D2C7] bg-white hover:border-[#7A6A2E] transition-all overflow-hidden focus:outline-none active:scale-95 shadow-xs"
        >
          <div className="relative w-full h-full rounded-full overflow-hidden bg-[#F5EEDB]">
            {avatarUrl ? (
              <Image
                src={avatarUrl}
                alt={avatarAlt}
                fill
                className="object-cover"
                sizes="32px"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-[#E8DFBE] text-[#7A6A2E] text-xs font-bold font-serif">
                CS
              </div>
            )}
          </div>
        </button>
      </div>
    </header>
  );
};

export default TopBar;
