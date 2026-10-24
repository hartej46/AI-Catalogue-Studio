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
    success: <CheckCircle2 className="w-4 h-4 text-[#7A6A2E]" />,
    error: <AlertCircle className="w-4 h-4 text-[#B91C1C]" />,
    info: <Info className="w-4 h-4 text-[#7A6A2E]" />,
  };

  const bgClasses = {
    success: "bg-white border-[#E8DFBE] text-[#1C1917]",
    error: "bg-[#FEF2F2] border-[#FECACA] text-[#991B1B]",
    info: "bg-white border-[#E8E6DF] text-[#1C1917]",
  }[type];

  return (
    <div
      role="status"
      aria-live="polite"
      className={`relative flex items-start gap-3 p-3.5 rounded-xl border shadow-warm-md backdrop-blur-md transition-all duration-300 max-w-sm w-full ${bgClasses} ${className}`}
    >
      <div className="shrink-0 mt-0.5">{icons[type]}</div>

      <div className="flex-1 pr-2">
        <h5 className="font-semibold text-xs tracking-wide uppercase font-sans">
          {title}
        </h5>
        {message && (
          <p className="text-xs text-[#57534E] mt-0.5 leading-snug">
            {message}
          </p>
        )}
      </div>

      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Dismiss toast"
          className="shrink-0 text-[#8C867A] hover:text-[#1C1917] p-1 rounded-md hover:bg-black/5 transition-colors"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
};

export default Toast;
