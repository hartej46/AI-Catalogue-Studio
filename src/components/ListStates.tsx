"use client";

import React from "react";
import { AlertCircle, ImageOff, RefreshCw, ArrowRight } from "lucide-react";
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
          className="bg-surface border border-border rounded-[6px] p-4 shadow-warm-sm space-y-3"
        >
          {type === "image" && (
            <div className="w-full aspect-[4/3] bg-bg rounded-[4px]" />
          )}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-[4px] bg-bg shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="h-3.5 w-3/5 bg-border rounded-[2px]" />
              <div className="h-3 w-4/5 bg-bg rounded-[2px]" />
            </div>
            <div className="w-4 h-4 rounded-[2px] bg-border shrink-0" />
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
      className={`bg-surface border border-border rounded-[6px] p-6 text-center shadow-warm-sm flex flex-col items-center justify-center space-y-3 ${className}`}
    >
      <div className="w-12 h-12 rounded-[6px] bg-bg border border-border flex items-center justify-center text-brass">
        {icon || <ImageOff className="w-5 h-5 stroke-[1.5]" />}
      </div>

      <div className="space-y-1 max-w-xs">
        <h4 className="font-serif text-lg font-bold text-ink">
          {title}
        </h4>
        <p className="text-xs text-muted leading-relaxed">
          {description}
        </p>
      </div>

      {actionText && (
        <div className="pt-2">
          <Button
            variant="solid"
            size="md"
            onClick={onAction}
            icon={<ArrowRight className="w-3.5 h-3.5" />}
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
      className={`bg-surface border border-border rounded-[6px] p-5 text-center shadow-warm-sm flex flex-col items-center justify-center space-y-3 ${className}`}
    >
      <div className="w-10 h-10 rounded-[4px] bg-bg border border-border flex items-center justify-center text-accent">
        <AlertCircle className="w-5 h-5 stroke-[2]" />
      </div>

      <div className="space-y-1 max-w-xs">
        <h4 className="font-serif text-base font-bold text-ink">
          {title}
        </h4>
        <p className="text-xs text-muted leading-snug">
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
          >
            {retryText}
          </Button>
        </div>
      )}
    </div>
  );
};
