"use client";

import React from "react";
import { Sparkles } from "lucide-react";

export interface CreditsPillProps {
  credits: number;
  onClick?: () => void;
  size?: "sm" | "md";
  className?: string;
  showPlus?: boolean;
}

export const CreditsPill: React.FC<CreditsPillProps> = ({
  credits = 3,
  onClick,
  size = "md",
  className = "",
  showPlus = false,
}) => {
  const isSm = size === "sm";

  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 rounded-full border border-[#DFD5B0] bg-[#F5EEDB] text-[#7A6A2E] font-semibold transition-all hover:bg-[#E8DFBE] hover:border-[#7A6A2E] active:scale-95 shadow-xs focus:outline-none ${
        isSm ? "px-2.5 py-0.5 text-[10px]" : "px-3 py-1 text-xs"
      } ${className}`}
      aria-label={`${credits} Credits Available`}
    >
      <Sparkles className={isSm ? "w-3 h-3 text-[#7A6A2E]" : "w-3.5 h-3.5 text-[#7A6A2E]"} />
      <span className="tracking-wide font-sans font-bold">
        {credits} {credits === 1 ? "CREDIT" : "CREDITS"}
      </span>
      {showPlus && (
        <span className="w-3.5 h-3.5 rounded-full bg-[#7A6A2E] text-white flex items-center justify-center text-[10px] font-bold ml-0.5">
          +
        </span>
      )}
    </button>
  );
};

export default CreditsPill;
