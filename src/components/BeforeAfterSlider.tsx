"use client";

import React, { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { ChevronsLeftRight } from "lucide-react";

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
}

export function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel = "Ordinary phone photo on counter",
  afterLabel = "Catalogue Studio render on travertine",
  className = "",
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState<number>(50); // percentage 0 to 100
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<"split" | "before" | "after">("split");
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const clampedX = Math.max(0, Math.min(x, rect.width));
    const percent = (clampedX / rect.width) * 100;
    setSliderPosition(percent);
    setViewMode("split");
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // Prevent browser native image dragging & text selection
    e.preventDefault();
    setIsDragging(true);
    try {
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    } catch {
      // Fallback
    }
    handleMove(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    e.preventDefault();
    handleMove(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(false);
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // Fallback
    }
  };

  // Determine effective clip based on viewMode
  const effectivePosition =
    viewMode === "before" ? 100 : viewMode === "after" ? 0 : sliderPosition;

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Control Strip above the comparison */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-1">
        <div className="flex items-center gap-2 text-xs text-[#6E655C]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#B08D57]" />
          <span>Drag the slider or tap buttons to inspect the difference</span>
        </div>

        {/* Quick View Switcher */}
        <div className="inline-flex items-center p-0.5 rounded-[4px] bg-[#FBF8F3] border border-[#DDD4C7] text-[11px] font-medium text-[#6E655C]">
          <button
            type="button"
            onClick={() => setViewMode("before")}
            className={`px-2.5 py-1 rounded-[2px] transition-colors duration-150 ${
              viewMode === "before"
                ? "bg-[#5B1A1F] text-[#F4EFE8] font-semibold"
                : "hover:text-[#1C1714]"
            }`}
          >
            Phone Photo
          </button>
          <button
            type="button"
            onClick={() => setViewMode("split")}
            className={`px-2.5 py-1 rounded-[2px] transition-colors duration-150 ${
              viewMode === "split"
                ? "bg-[#5B1A1F] text-[#F4EFE8] font-semibold"
                : "hover:text-[#1C1714]"
            }`}
          >
            Split Slider
          </button>
          <button
            type="button"
            onClick={() => setViewMode("after")}
            className={`px-2.5 py-1 rounded-[2px] transition-colors duration-150 ${
              viewMode === "after"
                ? "bg-[#5B1A1F] text-[#F4EFE8] font-semibold"
                : "hover:text-[#1C1714]"
            }`}
          >
            Studio Render
          </button>
        </div>
      </div>

      {/* Main Image Framing */}
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={() => setIsDragging(false)}
        onDragStart={(e) => e.preventDefault()}
        className="relative aspect-[16/11] sm:aspect-[16/10] w-full rounded-[6px] border border-[#DDD4C7] bg-[#FBF8F3] overflow-hidden select-none cursor-ew-resize shadow-warm-card"
        style={{
          touchAction: "none",
          userSelect: "none",
          WebkitUserSelect: "none",
        }}
      >
        {/* Layer 1: After Image (Studio Render - Base Layer) */}
        <div className="absolute inset-0 w-full h-full pointer-events-none select-none">
          <Image
            src={afterImage}
            alt={afterLabel}
            fill
            priority
            draggable={false}
            className="object-cover pointer-events-none select-none"
            sizes="(max-width: 1280px) 100vw, 1200px"
          />
          {/* Label Badge for After: ONLY show when in 'after' view OR in 'split' mode when slider is not near the right edge */}
          {(viewMode === "after" || (viewMode === "split" && effectivePosition < 85)) && (
            <div className="absolute bottom-3 right-3 z-10 pointer-events-none select-none">
              <span className="bg-[#5B1A1F]/90 text-[#F4EFE8] text-[10px] sm:text-xs font-medium px-2.5 py-1 rounded-[3px] border border-[#DDD4C7]/20 shadow-warm-sm">
                After · Studio 4K Render
              </span>
            </div>
          )}
        </div>

        {/* Layer 2: Before Image (Raw Phone Snapshot - Clipped Layer) */}
        <div
          className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none z-10"
          style={{ clipPath: `inset(0 ${100 - effectivePosition}% 0 0)` }}
        >
          <Image
            src={beforeImage}
            alt={beforeLabel}
            fill
            priority
            draggable={false}
            className="object-cover pointer-events-none select-none"
            sizes="(max-width: 1280px) 100vw, 1200px"
          />
          {/* Label Badge for Before: ONLY show when in 'before' view OR in 'split' mode when slider is not near the left edge */}
          {(viewMode === "before" || (viewMode === "split" && effectivePosition > 15)) && (
            <div className="absolute bottom-3 left-3 z-20 pointer-events-none select-none">
              <span className="bg-[#1C1714]/85 text-[#F4EFE8] text-[10px] sm:text-xs font-medium px-2.5 py-1 rounded-[3px] border border-[#DDD4C7]/20 shadow-warm-sm">
                Before · Raw Phone Snapshot
              </span>
            </div>
          )}
        </div>

        {/* Layer 3: Vertical Slider Divider Handle (Only visible in split mode) */}
        {viewMode === "split" && (
          <div
            className="absolute top-0 bottom-0 z-30 pointer-events-none select-none"
            style={{ left: `${effectivePosition}%` }}
          >
            {/* Hairline Divider */}
            <div className="absolute top-0 bottom-0 -left-[1px] w-[2px] bg-[#F4EFE8] shadow-[0_0_8px_rgba(28,23,20,0.3)]" />

            {/* Center Handle Pill */}
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#FBF8F3] border border-[#DDD4C7] shadow-warm-md flex items-center justify-center text-[#B08D57]">
              <ChevronsLeftRight className="w-4 h-4 text-[#B08D57]" />
            </div>
          </div>
        )}
      </div>

      {/* Proof Footnote Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 pt-1 px-1 text-xs text-[#6E655C]">
        <div className="flex items-center gap-1.5">
          <span className="font-medium text-[#1C1714]">Live Demonstration:</span>
          <span>Kundan &amp; Polki Choker necklace</span>
        </div>
        <div className="text-[11px] text-[#6E655C]">
          <span>Uncut glass foils preserved · True 22K gold reflections</span>
        </div>
      </div>
    </div>
  );
}
