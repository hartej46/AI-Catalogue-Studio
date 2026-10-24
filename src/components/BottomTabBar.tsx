"use client";

import React from "react";
import { Sparkles, BookOpen, Coins, Crown } from "lucide-react";

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
  { key: "studio", label: "Studio", icon: Sparkles },
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
          ? "fixed bottom-0 left-0 right-0 z-40 max-w-md mx-auto"
          : "relative w-full"
      } bg-[#FDF9F3]/95 backdrop-blur-md border-t border-[#E8E6DF] py-2 px-3 shadow-warm-card ${className}`}
    >
      <div className="flex items-center justify-around">
        {TABS.map(({ key, label, icon: Icon, badge }) => {
          const isActive = activeTab === key;
          return (
            <button
              key={key}
              type="button"
              onClick={() => onChange(key)}
              className={`flex-1 flex flex-col items-center justify-center py-1 px-2 rounded-lg transition-all focus:outline-none active:scale-95 relative ${
                isActive ? "text-[#7A6A2E]" : "text-[#78716C] hover:text-[#1C1917]"
              }`}
            >
              <div className="relative">
                <div
                  className={`w-9 h-7 rounded-full flex items-center justify-center transition-colors ${
                    isActive ? "bg-[#F5EEDB] text-[#7A6A2E]" : "text-[#8C867A]"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "stroke-[2.2]" : "stroke-[1.8]"}`} />
                </div>
                {badge && (
                  <span className="absolute -top-1 -right-1 bg-[#7A6A2E] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-[#FDF9F3]">
                    {badge}
                  </span>
                )}
              </div>
              <span
                className={`text-[10px] tracking-wider uppercase font-semibold mt-0.5 ${
                  isActive ? "text-[#7A6A2E] font-bold" : "text-[#78716C]"
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
