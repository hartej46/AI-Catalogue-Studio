"use client";

import React from "react";
import { Coins } from "lucide-react";

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
      className={`inline-flex items-center gap-1.5 rounded-[4px] border border-border bg-surface text-ink font-medium transition-colors duration-150 hover:bg-bg shadow-warm-sm focus:outline-none ${
        isSm ? "px-2 py-0.5 text-[10px]" : "px-2.5 py-1 text-xs"
      } ${className}`}
      aria-label={`${credits} Credits Available`}
    >
      <Coins className={isSm ? "w-3 h-3 text-brass" : "w-3.5 h-3.5 text-brass"} />
      <span className="tracking-wide font-sans">
        {credits} {credits === 1 ? "CREDIT" : "CREDITS"}
      </span>
      {showPlus && (
        <span className="w-3.5 h-3.5 rounded-[2px] bg-accent text-bg flex items-center justify-center text-[10px] font-bold ml-0.5">
          +
        </span>
      )}
    </button>
  );
};

export default CreditsPill;
