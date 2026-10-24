"use client";

import React from "react";
import Image from "next/image";
import { Check, Sparkles } from "lucide-react";

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
      className={`group relative overflow-hidden rounded-2xl transition-all duration-200 cursor-pointer select-none focus:outline-none ${
        disabled
          ? "bg-[#F7F5F0] border border-[#E8E6DF] opacity-50 cursor-not-allowed"
          : selected
          ? "bg-[#F5EEDB] border-2 border-[#7A6A2E] shadow-warm-md scale-[1.01]"
          : "bg-white border border-[#E8E6DF] hover:border-[#DFD5B0] shadow-warm-card hover:shadow-warm-md active:scale-[0.99]"
      } ${className}`}
    >
      {/* Sample Image Top */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#E8E6DF]">
        <Image
          src={imageUrl}
          alt={name}
          fill
          className={`object-cover transition-transform duration-500 ${
            selected ? "scale-105" : "group-hover:scale-105"
          }`}
          sizes="(max-width: 768px) 100vw, 360px"
        />

        {/* Top Tag */}
        {tag && (
          <div className="absolute top-2.5 left-2.5 bg-black/60 backdrop-blur-md text-[#F5EEDB] label-micro px-2 py-0.5 rounded border border-white/10">
            {tag}
          </div>
        )}

        {/* Selected Check Mark Badge in Corner */}
        {selected && (
          <div className="absolute top-2.5 right-2.5 w-6 h-6 rounded-full bg-[#7A6A2E] text-white flex items-center justify-center shadow-md border-2 border-white">
            <Check className="w-3.5 h-3.5 stroke-[3]" />
          </div>
        )}
      </div>

      {/* Name and One-line Description Below */}
      <div className="p-3.5 space-y-1">
        <div className="flex items-center justify-between">
          <h4
            className={`font-serif text-base font-bold ${
              selected ? "text-[#1C1917]" : "text-[#292524]"
            }`}
          >
            {name}
          </h4>
          {selected && (
            <span className="label-micro text-[#7A6A2E] flex items-center gap-1 font-semibold">
              <Sparkles className="w-2.5 h-2.5" />
              ACTIVE
            </span>
          )}
        </div>
        <p className="text-xs text-[#78716C] line-clamp-1 leading-snug">
          {description}
        </p>
      </div>
    </div>
  );
};

export default StyleCard;
