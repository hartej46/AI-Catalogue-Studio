"use client";

import React from "react";
import { Diamond, Footprints, Glasses } from "lucide-react";

export type CategoryKey = "JEWELLERY" | "SHOES" | "OPTICAL";

export interface CategorySwitcherProps {
  selected: CategoryKey;
  onChange: (category: CategoryKey) => void;
  className?: string;
  showIcons?: boolean;
}

const CATEGORIES: { key: CategoryKey; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { key: "JEWELLERY", label: "JEWELLERY", icon: Diamond },
  { key: "SHOES", label: "SHOES", icon: Footprints },
  { key: "OPTICAL", label: "OPTICAL", icon: Glasses },
];

export const CategorySwitcher: React.FC<CategorySwitcherProps> = ({
  selected,
  onChange,
  className = "",
  showIcons = false,
}) => {
  return (
    <div
      role="tablist"
      aria-label="Product Category Switcher"
      className={`bg-[#F5EEDB]/80 p-1 rounded-xl border border-[#E8DFBE] flex items-center justify-between shadow-xs select-none ${className}`}
    >
      {CATEGORIES.map(({ key, label, icon: Icon }) => {
        const isActive = selected === key;
        return (
          <button
            key={key}
            role="tab"
            aria-selected={isActive}
            type="button"
            onClick={() => onChange(key)}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-semibold tracking-wider transition-all duration-200 focus:outline-none active:scale-[0.98] ${
              isActive
                ? "bg-white text-[#7A6A2E] shadow-sm border border-[#E8DFBE] font-bold"
                : "text-[#6B6355] hover:text-[#1C1917] hover:bg-white/40"
            }`}
          >
            {showIcons && (
              <Icon
                className={`w-3.5 h-3.5 transition-colors ${
                  isActive ? "text-[#7A6A2E]" : "text-[#8C867A]"
                }`}
              />
            )}
            <span className="label-caps text-[11px]">{label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default CategorySwitcher;
