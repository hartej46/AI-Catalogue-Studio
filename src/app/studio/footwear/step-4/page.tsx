import { Suspense } from "react";
import StudioReviewClient from "@/components/StudioReviewClient";

export default function FootwearStep4Page() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center text-xs text-[#70685B]">
          Loading Atelier Review...
        </div>
      }
    >
      <StudioReviewClient
        domain="footwear"
        domainTitle="Footwear"
        defaultTitle="Burnished Leather Oxford Brogue"
        defaultSubtitle="Handcrafted Patina Collection · Bespoke Shoe Preset"
      />
    </Suspense>
  );
}
