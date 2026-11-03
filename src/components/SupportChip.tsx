"use client";

import React from "react";
import { MessageCircle } from "lucide-react";

export interface SupportChipProps {
  fixed?: boolean;
  phoneNumber?: string;
  onClick?: () => void;
  className?: string;
}

export const SupportChip: React.FC<SupportChipProps> = ({
  fixed = false,
  phoneNumber = "+919876543210",
  onClick,
  className = "",
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
      return;
    }
    const message = encodeURIComponent("Hello Atelier Concierge! I need assistance with Catalogue Studio.");
    window.open(`https://wa.me/${phoneNumber.replace(/[^0-9]/g, "")}?text=${message}`, "_blank");
  };

  const baseClasses =
    "inline-flex items-center gap-1.5 bg-surface text-ink border border-border px-2.5 py-1 rounded-[4px] shadow-warm-sm hover:bg-bg transition-colors duration-150 focus:outline-none z-30 cursor-pointer";

  const fixedClasses = fixed
    ? "fixed bottom-20 right-4 md:right-[calc(50%-180px)]"
    : "";

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Contact Concierge WhatsApp Support"
      className={`${baseClasses} ${fixedClasses} ${className}`}
    >
      <MessageCircle className="w-3.5 h-3.5 text-brass" />
      <span className="label-micro text-muted font-semibold tracking-[0.18em]">
        CONCIERGE
      </span>
    </button>
  );
};

export default SupportChip;
