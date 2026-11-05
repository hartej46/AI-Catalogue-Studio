"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { CreditsPill } from "./CreditsPill";
import { useAuth } from "@/lib/auth-context";

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
  credits: explicitCredits,
  avatarUrl = "/images/jewellery_craft.jpg",
  avatarAlt = "Atelier Merchant Avatar",
  showBack = false,
  onBack,
  onCreditsClick,
  onAvatarClick,
  className = "",
}) => {
  const router = useRouter();
  const { credits: authCredits } = useAuth();
  const displayCredits = explicitCredits !== undefined ? explicitCredits : authCredits;

  const handleCreditsClick = () => {
    if (onCreditsClick) {
      onCreditsClick();
    } else {
      router.push("/credits");
    }
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full bg-surface border-b border-border ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        {/* Left: Brand mark / Back button */}
        <div className="flex items-center gap-3">
        {showBack && (
          <button
            onClick={onBack}
            type="button"
            className="w-8 h-8 rounded-[4px] border border-border bg-surface flex items-center justify-center text-muted hover:text-ink hover:border-muted transition-colors duration-150"
            aria-label="Go back"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
        )}

        <Link href="/" className="group block focus:outline-none">
          <div className="flex items-center gap-1.5">
            <span className="font-serif text-xl font-bold tracking-tight text-ink group-hover:text-accent transition-colors duration-150">
              Catalogue Studio
            </span>
            <span className="bg-bg text-muted border border-border text-[9px] font-semibold px-1.5 py-0.5 rounded-[2px] tracking-wider uppercase">
              LAB
            </span>
          </div>
          <div className="label-micro text-muted tracking-[0.22em]">
            Atelier AI Lab
          </div>
        </Link>
      </div>

      {/* Right: Credits Pill & Profile Avatar */}
      <div className="flex items-center gap-2.5">
        <CreditsPill credits={displayCredits} onClick={handleCreditsClick} />

        <button
          onClick={onAvatarClick}
          type="button"
          aria-label="Profile Account"
          className="relative w-8 h-8 rounded-[4px] p-[1px] border border-border bg-surface hover:border-muted transition-colors duration-150 overflow-hidden focus:outline-none"
        >
          <div className="relative w-full h-full rounded-[3px] overflow-hidden bg-bg">
            {avatarUrl ? (
              <Image
                src={avatarUrl}
                alt={avatarAlt}
                fill
                className="object-cover"
                sizes="32px"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-bg text-ink text-xs font-bold font-serif">
                CS
              </div>
            )}
          </div>
        </button>
      </div>
      </div>
    </header>
  );
};

export default TopBar;
