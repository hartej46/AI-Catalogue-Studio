"use client";

import React from "react";
import { Camera, BookOpen, Coins, Crown } from "lucide-react";

export type TabKey = "studio" | "lookbook" | "credits" | "atelier";

export interface TabItem {
  key: TabKey;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

export interface BottomTabBarProps {
  activeTab: TabKey;
  onChange: (tab: TabKey) => void;
  className?: string;
  isFixed?: boolean;
}

const TABS: TabItem[] = [
  { key: "studio", label: "Studio", icon: Camera },
  { key: "lookbook", label: "Lookbook", icon: BookOpen },
  { key: "credits", label: "Credits", icon: Coins, badge: "3" },
  { key: "atelier", label: "Atelier", icon: Crown },
];

export const BottomTabBar: React.FC<BottomTabBarProps> = ({
  activeTab,
  onChange,
  className = "",
  isFixed = false,
}) => {
  return (
    <nav
      aria-label="Atelier Navigation"
      className={`${
        isFixed
          ? "fixed bottom-0 left-0 right-0 z-40 w-full"
          : "relative w-full"
      } bg-surface border-t border-border shadow-warm-sm ${className}`}
    >
      <div className="max-w-3xl sm:max-w-4xl mx-auto py-2 px-4 flex items-center justify-around">
        {TABS.map(({ key, label, icon: Icon, badge }) => {
          const isActive = activeTab === key;
          return (
            <button
              key={key}
              type="button"
              onClick={() => onChange(key)}
              className={`flex-1 flex flex-col items-center justify-center py-1 px-2 rounded-[4px] transition-colors duration-150 focus:outline-none relative ${
                isActive ? "text-accent" : "text-muted hover:text-ink"
              }`}
            >
              <div className="relative">
                <div
                  className={`w-8 h-6 rounded-[4px] flex items-center justify-center transition-colors duration-150 ${
                    isActive ? "bg-bg text-accent" : "text-muted"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "stroke-[2]" : "stroke-[1.5]"}`} />
                </div>
                {badge && (
                  <span className="absolute -top-1 -right-1 bg-accent text-bg text-[9px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center border border-surface">
                    {badge}
                  </span>
                )}
              </div>
              <span
                className={`text-[10px] tracking-wider uppercase mt-0.5 ${
                  isActive ? "text-accent font-semibold" : "text-muted font-normal"
                }`}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomTabBar;
