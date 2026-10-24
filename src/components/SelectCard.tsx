"use client";

import React from "react";
import { Check } from "lucide-react";

export interface SelectCardProps {
  icon?: React.ReactNode;
  name: string;
  label?: string;
  badge?: string;
  selected?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  layout?: "horizontal" | "vertical";
}

export const SelectCard: React.FC<SelectCardProps> = ({
  icon,
  name,
  label,
  badge,
  selected = false,
  disabled = false,
  onClick,
  className = "",
  layout = "horizontal",
}) => {
  const isHorizontal = layout === "horizontal";

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={disabled ? undefined : onClick}
      aria-pressed={selected}
      className={`relative w-full text-left rounded-2xl transition-all duration-200 select-none focus:outline-none p-3.5 ${
        disabled
          ? "bg-[#F7F5F0] border border-[#E8E6DF] opacity-50 cursor-not-allowed"
          : selected
          ? "bg-[#F5EEDB] border-2 border-[#7A6A2E] shadow-warm-md transform scale-[1.01]"
          : "bg-white border border-[#E8E6DF] hover:border-[#DFD5B0] hover:bg-[#FAF6ED]/50 shadow-warm-card active:scale-[0.99]"
      } ${className}`}
    >
      <div
        className={`flex ${
          isHorizontal ? "items-center justify-between" : "flex-col items-start gap-2"
        }`}
      >
        <div className="flex items-center gap-3">
          {icon && (
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                selected
                  ? "bg-[#7A6A2E] text-white"
                  : disabled
                  ? "bg-[#E8E6DF] text-[#8C867A]"
                  : "bg-[#F5EEDB] text-[#7A6A2E]"
              }`}
            >
              {icon}
            </div>
          )}

          <div>
            <div className="flex items-center gap-2">
              <span
                className={`font-semibold text-sm ${
                  selected ? "text-[#1C1917] font-bold" : "text-[#292524]"
                }`}
              >
                {name}
              </span>
              {badge && (
                <span className="label-micro bg-[#E8DFBE] text-[#7A6A2E] px-1.5 py-0.5 rounded">
                  {badge}
                </span>
              )}
            </div>
            {label && (
              <p className="text-xs text-[#78716C] mt-0.5 leading-snug">
                {label}
              </p>
            )}
          </div>
        </div>

        {/* Selected State Check Mark */}
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
      </div>
    </button>
  );
};

export default SelectCard;
