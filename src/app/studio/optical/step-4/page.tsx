import { Suspense } from "react";
import StudioReviewClient from "@/components/StudioReviewClient";

export default function OpticalStep4Page() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center text-xs text-[#70685B]">
          Loading Atelier Review...
        </div>
      }
    >
      <StudioReviewClient
        domain="optical"
        domainTitle="Optical"
        defaultTitle="Titanium Rimless Aviator"
        defaultSubtitle="Featherweight Collection · Multi-Coated Anti-Glare Preset"
      />
    </Suspense>
  );
}
