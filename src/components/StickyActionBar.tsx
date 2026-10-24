"use client";

import React from "react";
import { Sparkles, ArrowRight, Loader2 } from "lucide-react";
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
          ? "fixed bottom-14 left-0 right-0 z-30 max-w-md mx-auto"
          : "relative w-full"
      } bg-[#FDF9F3]/95 backdrop-blur-md border-t border-[#E8E6DF] p-3 shadow-warm-md ${className}`}
    >
      <div className="flex items-center justify-between gap-3">
        {/* Left Side: Small Pill */}
        <button
          type="button"
          onClick={onPillClick}
          className="text-left flex items-center gap-2 px-3 py-2 rounded-xl bg-[#F5EEDB] border border-[#E8DFBE] hover:bg-[#E8DFBE] transition-colors focus:outline-none shrink-0"
        >
          <div className="w-6 h-6 rounded-full bg-[#7A6A2E] text-white flex items-center justify-center shrink-0">
            {pillIcon || <Sparkles className="w-3.5 h-3.5" />}
          </div>
          <div>
            <div className="label-micro text-[#7A6A2E] font-bold">
              {pillText}
            </div>
            {pillSubtext && (
              <div className="text-[10px] text-[#78716C] leading-none mt-0.5 font-medium">
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
