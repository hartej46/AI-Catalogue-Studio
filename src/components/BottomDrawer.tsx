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
      {/* Backdrop Scrim - warm espresso tint, no blur */}
      <div
        className="fixed inset-0 bg-ink/50 transition-opacity duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Surface - parchment with hairline border, 8px radius */}
      <div
        className={`relative z-10 w-full max-w-md bg-surface rounded-t-[8px] border-t border-x border-border shadow-warm-md flex flex-col max-h-[85vh] ${className}`}
      >
        {/* Drag Handle */}
        <div
          className="w-full pt-3 pb-2 flex items-center justify-center cursor-pointer select-none"
          onClick={onClose}
        >
          <div className="w-10 h-1 rounded-[2px] bg-border hover:bg-muted transition-colors duration-150" />
        </div>

        {/* Drawer Header */}
        {(title || subtitle) && (
          <div className="flex items-center justify-between px-5 py-3 border-b border-border">
            <div>
              {title && (
                <h3 className="font-serif text-lg font-bold text-ink">
                  {title}
                </h3>
              )}
              {subtitle && (
                <p className="text-xs text-muted mt-0.5 font-sans">
                  {subtitle}
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close drawer"
              className="w-7 h-7 rounded-[4px] border border-border bg-surface flex items-center justify-center text-muted hover:text-ink hover:border-muted transition-colors duration-150"
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
          <div className="p-4 border-t border-border bg-bg">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default BottomDrawer;
