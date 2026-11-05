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
      className={`bg-bg p-1 rounded-[6px] border border-border flex items-center justify-between select-none ${className}`}
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
            className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-[4px] text-xs tracking-wider transition-colors duration-150 focus:outline-none ${
              isActive
                ? "bg-surface text-ink border border-border font-semibold shadow-warm-sm"
                : "text-muted hover:text-ink hover:bg-surface/50 border border-transparent font-normal"
            }`}
          >
            {showIcons && (
              <Icon
                className={`w-3.5 h-3.5 transition-colors duration-150 ${
                  isActive ? "text-brass" : "text-muted"
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
