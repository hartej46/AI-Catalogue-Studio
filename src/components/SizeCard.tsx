"use client";

import React from "react";
import { Check } from "lucide-react";

export type AspectRatioType = "1:1" | "4:5" | "9:16" | "16:9";

export interface SizeCardProps {
  ratio: AspectRatioType | string;
  name: string;
  recommendedFor?: string;
  selected?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}

export const SizeCard: React.FC<SizeCardProps> = ({
  ratio,
  name,
  recommendedFor,
  selected = false,
  disabled = false,
  onClick,
  className = "",
}) => {
  // Helper to render proportional ratio box
  const renderRatioOutline = () => {
    let boxClass = "w-6 h-6"; // default 1:1
    if (ratio === "4:5") boxClass = "w-5 h-6";
    if (ratio === "9:16") boxClass = "w-4 h-7";
    if (ratio === "16:9") boxClass = "w-7 h-4";

    return (
      <div className="w-9 h-9 flex items-center justify-center shrink-0">
        <div
          className={`${boxClass} rounded-xs border-2 transition-all ${
            selected
              ? "border-[#7A6A2E] bg-[#7A6A2E]/15"
              : disabled
              ? "border-[#D5D2C7] bg-[#E8E6DF]"
              : "border-[#8C867A] bg-transparent"
          }`}
        />
      </div>
    );
  };

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={disabled ? undefined : onClick}
      aria-pressed={selected}
      className={`relative w-full text-left rounded-2xl p-3.5 transition-all duration-200 select-none focus:outline-none flex items-center justify-between ${
        disabled
          ? "bg-[#F7F5F0] border border-[#E8E6DF] opacity-50 cursor-not-allowed"
          : selected
          ? "bg-[#F5EEDB] border-2 border-[#7A6A2E] shadow-warm-md scale-[1.01]"
          : "bg-white border border-[#E8E6DF] hover:border-[#DFD5B0] shadow-warm-card active:scale-[0.99]"
      } ${className}`}
    >
      <div className="flex items-center gap-3">
        {renderRatioOutline()}

        <div>
          <div className="flex items-center gap-2">
            <span
              className={`font-semibold text-sm ${
                selected ? "text-[#1C1917] font-bold" : "text-[#292524]"
              }`}
            >
              {name}
            </span>
            <span
              className={`label-micro px-1.5 py-0.5 rounded ${
                selected
                  ? "bg-[#E8DFBE] text-[#7A6A2E] font-bold"
                  : "bg-[#F5EEDB] text-[#7A6A2E]"
              }`}
            >
              {ratio}
            </span>
          </div>
          {recommendedFor && (
            <p className="text-xs text-[#78716C] mt-0.5 leading-snug">
              {recommendedFor}
            </p>
          )}
        </div>
      </div>

      <div className="shrink-0 ml-2">
        {selected ? (
          <div className="w-5 h-5 rounded-full bg-[#7A6A2E] text-white flex items-center justify-center shadow-xs">
            <Check className="w-3 h-3 stroke-[3]" />
          </div>
        ) : (
          <div
            className={`w-5 h-5 rounded-full border ${
              disabled ? "border-[#E8E6DF]" : "border-[#D5D2C7] bg-[#FDF9F3]"
            }`}
          />
        )}
      </div>
    </button>
  );
};

export default SizeCard;
