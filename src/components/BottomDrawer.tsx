"use client";

import React, { useEffect } from "react";
import { X } from "lucide-react";

export interface BottomDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

export const BottomDrawer: React.FC<BottomDrawerProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  footer,
  className = "",
}) => {
  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-end justify-center"
    >
      {/* Backdrop Scrim */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Surface */}
      <div
        className={`relative z-10 w-full max-w-md bg-[#FDF9F3] rounded-t-3xl border-t border-[#E8E6DF] shadow-2xl flex flex-col max-h-[85vh] animate-in slide-in-from-bottom duration-300 ${className}`}
      >
        {/* Tactile Drag Handle */}
        <div
          className="w-full pt-3 pb-2 flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
          onClick={onClose}
        >
          <div className="w-12 h-1.5 rounded-full bg-[#D5D2C7] hover:bg-[#8C867A] transition-colors" />
        </div>

        {/* Drawer Header */}
        {(title || subtitle) && (
          <div className="flex items-center justify-between px-5 py-3 border-b border-[#E8E6DF]">
            <div>
              {title && (
                <h3 className="font-serif text-lg font-bold text-[#1C1917]">
                  {title}
                </h3>
              )}
              {subtitle && (
                <p className="text-xs text-[#78716C] mt-0.5 font-sans">
                  {subtitle}
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close drawer"
              className="w-8 h-8 rounded-full border border-[#E8E6DF] bg-white flex items-center justify-center text-[#57534E] hover:text-[#1C1917] hover:border-[#7A6A2E] transition-colors active:scale-95"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Scrollable Content Body */}
        <div className="p-5 overflow-y-auto space-y-4 no-scrollbar">
          {children}
        </div>

        {/* Optional Footer */}
        {footer && (
          <div className="p-4 border-t border-[#E8E6DF] bg-[#FAF6ED]/80">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default BottomDrawer;
