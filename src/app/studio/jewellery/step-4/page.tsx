import { Suspense } from "react";
import StudioReviewClient from "@/components/StudioReviewClient";

export default function JewelleryStep4Page() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center text-xs text-[#70685B]">
          Loading Atelier Review...
        </div>
      }
    >
      <StudioReviewClient
        domain="jewellery"
        domainTitle="Jewellery"
        defaultTitle="Polki Choker with Zambian Emeralds"
        defaultSubtitle="Heritage Bridal Collection · Bespoke Atelier Preset"
      />
    </Suspense>
  );
}
