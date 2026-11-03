"use client";

import React, { useEffect } from "react";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

export type ToastType = "success" | "error" | "info";

export interface ToastProps {
  id?: string;
  type?: ToastType;
  title: string;
  message?: string;
  duration?: number;
  onClose?: () => void;
  className?: string;
}

export const Toast: React.FC<ToastProps> = ({
  type = "success",
  title,
  message,
  duration = 4000,
  onClose,
  className = "",
}) => {
  useEffect(() => {
    if (!duration || !onClose) return;
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const icons = {
    success: <CheckCircle2 className="w-4 h-4 text-brass" />,
    error: <AlertCircle className="w-4 h-4 text-accent" />,
    info: <Info className="w-4 h-4 text-brass" />,
  };

  const bgClasses = {
    success: "bg-surface border-border text-ink",
    error: "bg-surface border-accent text-accent",
    info: "bg-surface border-border text-ink",
  }[type];

  return (
    <div
      role="status"
      aria-live="polite"
      className={`relative flex items-start gap-3 p-3 rounded-[6px] border shadow-warm-sm transition-opacity duration-150 max-w-sm w-full ${bgClasses} ${className}`}
    >
      <div className="shrink-0 mt-0.5">{icons[type]}</div>

      <div className="flex-1 pr-2">
        <h5 className="font-semibold text-xs tracking-wide uppercase font-sans">
          {title}
        </h5>
        {message && (
          <p className="text-xs text-muted mt-0.5 leading-snug">
            {message}
          </p>
        )}
      </div>

      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Dismiss toast"
          className="shrink-0 text-muted hover:text-ink p-1 rounded-[3px] transition-colors duration-150"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
};

export default Toast;
