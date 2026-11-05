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
  // Helper to render proportional ratio box with 1px border
  const renderRatioOutline = () => {
    let boxClass = "w-5 h-5"; // default 1:1
    if (ratio === "4:5") boxClass = "w-4 h-5";
    if (ratio === "9:16") boxClass = "w-3.5 h-6";
    if (ratio === "16:9") boxClass = "w-6 h-3.5";

    return (
      <div className="w-8 h-8 flex items-center justify-center shrink-0">
        <div
          className={`${boxClass} rounded-[2px] border transition-colors duration-150 ${
            selected
              ? "border-accent bg-bg"
              : disabled
              ? "border-border bg-bg"
              : "border-muted bg-transparent"
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
      className={`relative w-full text-left rounded-[6px] p-3 transition-colors duration-150 select-none focus:outline-none flex items-center justify-between border ${
        disabled
          ? "bg-bg border-border opacity-60 cursor-not-allowed"
          : selected
          ? "bg-surface border-accent shadow-warm-sm"
          : "bg-surface border-border hover:border-muted shadow-warm-sm"
      } ${className}`}
    >
      <div className="flex items-center gap-3">
        {renderRatioOutline()}

        <div>
          <div className="flex items-center gap-2">
            <span
              className={`font-semibold text-sm ${
                selected ? "text-ink font-bold" : "text-ink"
              }`}
            >
              {name}
            </span>
            <span
              className={`label-micro px-1.5 py-0.5 rounded-[2px] border ${
                selected
                  ? "bg-bg text-ink border-border font-bold"
                  : "bg-bg text-muted border-border"
              }`}
            >
              {ratio}
            </span>
          </div>
          {recommendedFor && (
            <p className="text-xs text-muted mt-0.5 leading-snug">
              {recommendedFor}
            </p>
          )}
        </div>
      </div>

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
    </button>
  );
};

export default SizeCard;
