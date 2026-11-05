"use client";

import React from "react";
import Image from "next/image";
import { Check } from "lucide-react";

export interface StyleCardProps {
  imageUrl: string;
  name: string;
  description: string;
  tag?: string;
  selected?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}

export const StyleCard: React.FC<StyleCardProps> = ({
  imageUrl,
  name,
  description,
  tag,
  selected = false,
  disabled = false,
  onClick,
  className = "",
}) => {
  return (
    <div
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-pressed={selected}
      aria-disabled={disabled}
      onClick={disabled ? undefined : onClick}
      onKeyDown={(e) => {
        if (!disabled && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          onClick?.();
        }
      }}
      className={`group relative overflow-hidden rounded-[6px] transition-colors duration-150 cursor-pointer select-none focus:outline-none border ${
        disabled
          ? "bg-bg border-border opacity-60 cursor-not-allowed"
          : selected
          ? "bg-surface border-accent shadow-warm-sm"
          : "bg-surface border-border hover:border-muted shadow-warm-sm"
      } ${className}`}
    >
      {/* Sample Image Top - product carries colour, no zoom scaling animation */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-bg border-b border-border">
        <Image
          src={imageUrl}
          alt={name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 360px"
        />

        {/* Top Tag - bone text on dark background */}
        {tag && (
          <div className="absolute top-2 left-2 bg-ink/80 text-bg label-micro px-1.5 py-0.5 rounded-[2px] border border-border/20">
            {tag}
          </div>
        )}

        {/* Selected Check Mark Badge in Corner - Oxblood fill with bone text */}
        {selected && (
          <div className="absolute top-2 right-2 w-5 h-5 rounded-[3px] bg-accent text-bg flex items-center justify-center border border-surface shadow-warm-sm">
            <Check className="w-3.5 h-3.5 stroke-[2.5]" />
          </div>
        )}
      </div>

      {/* Name and Description Below */}
      <div className="p-3 space-y-0.5">
        <div className="flex items-center justify-between">
          <h4
            className={`font-serif text-base font-bold ${
              selected ? "text-ink" : "text-ink"
            }`}
          >
            {name}
          </h4>
          {selected && (
            <span className="label-micro text-accent font-semibold">
              SELECTED
            </span>
          )}
        </div>
        <p className="text-xs text-muted line-clamp-1 leading-snug">
          {description}
        </p>
      </div>
    </div>
  );
};

export default StyleCard;
