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
    "inline-flex items-center gap-1.5 bg-white text-[#7A6A2E] border border-[#DFD5B0] px-3 py-1.5 rounded-full shadow-warm-md hover:bg-[#F5EEDB] hover:border-[#7A6A2E] transition-all active:scale-95 focus:outline-none z-30 cursor-pointer group";

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
      <div className="relative flex items-center justify-center">
        <MessageCircle className="w-3.5 h-3.5 text-[#25D366] group-hover:scale-110 transition-transform" />
        <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-[#25D366] rounded-full animate-ping opacity-75" />
        <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-[#25D366] rounded-full" />
      </div>
      <span className="label-micro text-[#7A6A2E] font-bold tracking-[0.18em]">
        CONCIERGE
      </span>
    </button>
  );
};

export default SupportChip;
