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
      className={`relative w-full text-left rounded-[6px] transition-colors duration-150 select-none focus:outline-none p-3.5 border ${
        disabled
          ? "bg-bg border-border text-muted opacity-60 cursor-not-allowed"
          : selected
          ? "bg-surface border-accent shadow-warm-sm"
          : "bg-surface border-border hover:border-muted shadow-warm-sm"
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
              className={`w-9 h-9 rounded-[4px] flex items-center justify-center shrink-0 border transition-colors duration-150 ${
                selected
                  ? "bg-accent border-accent text-bg"
                  : disabled
                  ? "bg-bg border-border text-muted"
                  : "bg-bg border-border text-brass"
              }`}
            >
              {icon}
            </div>
          )}

          <div>
            <div className="flex items-center gap-2">
              <span
                className={`font-semibold text-sm ${
                  selected ? "text-ink font-bold" : "text-ink"
                }`}
              >
                {name}
              </span>
              {badge && (
                <span className="label-micro bg-bg border border-border text-muted px-1.5 py-0.5 rounded-[2px]">
                  {badge}
                </span>
              )}
            </div>
            {label && (
              <p className="text-xs text-muted mt-0.5 leading-snug">
                {label}
              </p>
            )}
          </div>
        </div>

        {/* Selected State Check Mark */}
        <div className="shrink-0 ml-2">
          {selected ? (
            <div className="w-5 h-5 rounded-[3px] bg-accent text-bg flex items-center justify-center">
              <Check className="w-3 h-3 stroke-[2.5]" />
            </div>
          ) : (
            <div
              className={`w-5 h-5 rounded-[3px] border ${
                disabled ? "border-border bg-bg" : "border-border bg-surface"
              }`}
            />
          )}
        </div>
      </div>
    </button>
  );
};

export default SelectCard;
