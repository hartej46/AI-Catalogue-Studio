"use client";

import React from "react";
import { ArrowRight, Coins } from "lucide-react";
import { Button } from "./Button";

export interface StickyActionBarProps {
  pillText?: string;
  pillSubtext?: string;
  pillIcon?: React.ReactNode;
  buttonText: string;
  buttonIcon?: React.ReactNode;
  buttonDisabled?: boolean;
  buttonLoading?: boolean;
  onButtonClick?: () => void;
  onPillClick?: () => void;
  isFixed?: boolean;
  className?: string;
}

export const StickyActionBar: React.FC<StickyActionBarProps> = ({
  pillText = "1 CREDIT",
  pillSubtext = "4K Master Render",
  pillIcon,
  buttonText = "CONTINUE",
  buttonIcon,
  buttonDisabled = false,
  buttonLoading = false,
  onButtonClick,
  onPillClick,
  isFixed = false,
  className = "",
}) => {
  return (
    <aside
      aria-label="Action Controls"
      className={`${
        isFixed
          ? "fixed bottom-14 left-0 right-0 z-30 w-full"
          : "relative w-full"
      } bg-surface border-t border-border shadow-warm-sm ${className}`}
    >
      <div className="max-w-3xl sm:max-w-4xl mx-auto p-3 flex items-center justify-between gap-3">
        {/* Left Side: Small Pill */}
        <button
          type="button"
          onClick={onPillClick}
          className="text-left flex items-center gap-2 px-2.5 py-1.5 rounded-[4px] bg-bg border border-border hover:bg-surface transition-colors duration-150 focus:outline-none shrink-0"
        >
          <div className="w-5 h-5 rounded-[2px] bg-surface border border-border text-brass flex items-center justify-center shrink-0">
            {pillIcon || <Coins className="w-3 h-3 text-brass" />}
          </div>
          <div>
            <div className="label-micro text-ink font-semibold">
              {pillText}
            </div>
            {pillSubtext && (
              <div className="text-[10px] text-muted leading-none mt-0.5">
                {pillSubtext}
              </div>
            )}
          </div>
        </button>

        {/* Right Side: Main Action Button */}
        <div className="flex-1">
          <Button
            variant="solid"
            size="lg"
            className="w-full justify-center"
            disabled={buttonDisabled}
            loading={buttonLoading}
            onClick={onButtonClick}
            icon={buttonIcon || <ArrowRight className="w-4 h-4" />}
          >
            {buttonText}
          </Button>
        </div>
      </div>
    </aside>
  );
};

export default StickyActionBar;
