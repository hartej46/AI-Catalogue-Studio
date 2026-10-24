"use client";

import React from "react";
import { AlertCircle, ImageOff, RefreshCw, Sparkles } from "lucide-react";
import { Button } from "./Button";

// 1. Loading Skeleton State
export interface ListLoadingStateProps {
  count?: number;
  type?: "card" | "row" | "image";
  className?: string;
}

export const ListLoadingState: React.FC<ListLoadingStateProps> = ({
  count = 3,
  type = "card",
  className = "",
}) => {
  return (
    <div className={`space-y-3 w-full animate-pulse ${className}`}>
      {Array.from({ length: count }, (_, idx) => (
        <div
          key={idx}
          className="bg-white border border-[#E8E6DF] rounded-2xl p-4 shadow-warm-card space-y-3"
        >
          {type === "image" && (
            <div className="w-full aspect-[4/3] bg-[#F5EEDB] rounded-xl" />
          )}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#F5EEDB] shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-3/5 bg-[#E8DFBE] rounded" />
              <div className="h-3 w-4/5 bg-[#F5EEDB] rounded" />
            </div>
            <div className="w-5 h-5 rounded-full bg-[#E8E6DF] shrink-0" />
          </div>
        </div>
      ))}
    </div>
  );
};

// 2. Empty State
export interface ListEmptyStateProps {
  title?: string;
  description?: string;
  actionText?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
  className?: string;
}

export const ListEmptyState: React.FC<ListEmptyStateProps> = ({
  title = "No Catalogue Renders Yet",
  description = "Upload your first raw product photo and tap to generate a Vogue-grade 4K atelier render in 60 seconds.",
  actionText = "START FIRST SYNTHESIS",
  onAction,
  icon,
  className = "",
}) => {
  return (
    <div
      className={`bg-white border border-[#E8E6DF] rounded-2xl p-6 text-center shadow-warm-card flex flex-col items-center justify-center space-y-3 ${className}`}
    >
      <div className="w-14 h-14 rounded-full bg-[#F5EEDB] border border-[#E8DFBE] flex items-center justify-center text-[#7A6A2E] shadow-2xs">
        {icon || <ImageOff className="w-6 h-6 stroke-[1.7]" />}
      </div>

      <div className="space-y-1 max-w-xs">
        <h4 className="font-serif text-lg font-bold text-[#1C1917]">
          {title}
        </h4>
        <p className="text-xs text-[#78716C] leading-relaxed">
          {description}
        </p>
      </div>

      {actionText && (
        <div className="pt-2">
          <Button
            variant="solid"
            size="md"
            onClick={onAction}
            icon={<Sparkles className="w-3.5 h-3.5" />}
          >
            {actionText}
          </Button>
        </div>
      )}
    </div>
  );
};

// 3. Error State
export interface ListErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  retryText?: string;
  className?: string;
}

export const ListErrorState: React.FC<ListErrorStateProps> = ({
  title = "Failed to Load Presets",
  message = "We couldn't connect to the Atelier Neural Engine. Please check your network and try again.",
  onRetry,
  retryText = "RETRY SYNTHESIS",
  className = "",
}) => {
  return (
    <div
      className={`bg-[#FEF2F2] border border-[#FECACA] rounded-2xl p-5 text-center shadow-warm-card flex flex-col items-center justify-center space-y-3 ${className}`}
    >
      <div className="w-12 h-12 rounded-full bg-[#FEE2E2] flex items-center justify-center text-[#B91C1C]">
        <AlertCircle className="w-6 h-6 stroke-[2]" />
      </div>

      <div className="space-y-1 max-w-xs">
        <h4 className="font-serif text-base font-bold text-[#991B1B]">
          {title}
        </h4>
        <p className="text-xs text-[#7F1D1D] leading-snug">
          {message}
        </p>
      </div>

      {onRetry && (
        <div className="pt-1">
          <Button
            variant="outline"
            size="sm"
            onClick={onRetry}
            icon={<RefreshCw className="w-3.5 h-3.5" />}
            className="border-[#B91C1C] text-[#B91C1C] hover:bg-[#FEE2E2]"
          >
            {retryText}
          </Button>
        </div>
      )}
    </div>
  );
};
