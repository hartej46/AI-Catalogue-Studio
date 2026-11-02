import React from "react";
import Link from "next/link";
import { ArrowLeft, FileText, AlertTriangle } from "lucide-react";

export const metadata = {
  title: "Terms of Service | Atelier AI Catalogue Studio",
  description: "Terms of Service and commercial terms for Atelier AI Catalogue Studio.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1F1C18] flex flex-col max-w-2xl mx-auto shadow-sm border-x border-[#EFEAE1] px-6 py-8">
      {/* Back button */}
      <div className="mb-6">
        <Link
          href="/atelier"
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#7A6A2E] hover:text-[#5B5226] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Atelier</span>
        </Link>
      </div>

      {/* Notice Banner */}
      <div className="mb-8 p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-3 leading-relaxed">
        <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <strong className="font-semibold">Placeholder Legal Document:</strong> This is a
          template document provided for testing and navigation. Please replace the text
          below with your company's official, legally vetted Terms of Service before launching to
          customers.
        </div>
      </div>

      {/* Header */}
      <div className="border-b border-[#E7E0D3] pb-6 mb-8">
        <div className="inline-flex items-center gap-1.5 bg-[#F0EBE0] text-[#7A6A2E] text-[10px] font-semibold px-2.5 py-0.5 rounded-full border border-[#E3DCCF] uppercase tracking-wider mb-3">
          <FileText className="w-3 h-3" />
          <span>Terms & Conditions</span>
        </div>
        <h1 className="font-serif text-3xl font-bold text-[#1F1C18]">
          Terms of Service
        </h1>
        <p className="text-xs text-[#8C867A] mt-2">
          Effective Date: October 2026 · Version 1.0 (Draft)
        </p>
      </div>

      {/* Content */}
      <div className="space-y-6 text-xs text-[#524B40] leading-relaxed">
        <section className="space-y-2">
          <h2 className="font-serif text-base font-bold text-[#1F1C18]">
            1. Acceptance of Terms
          </h2>
          <p>
            By accessing or using Atelier AI Catalogue Studio, you agree to be bound by these
            Terms of Service. If you do not agree to these terms, do not access or use the
            platform.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-base font-bold text-[#1F1C18]">
            2. Studio Credits & Purchases
          </h2>
          <p>
            Generation jobs consume credits. Free promotional credits create 1080p preview
            renders with a watermark. Paid credits generate watermark-free 4K ultra-high
            resolution assets. Purchased credits do not expire.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-base font-bold text-[#1F1C18]">
            3. Quality Guarantee & Automatic Refunds
          </h2>
          <p>
            Every generated photo passes through our automated Quality Check (QC) pipeline to
            verify stone placement, proportions, and product fidelity. If a render fails QC
            validation after retry attempts, the consumed credit is automatically returned to your
            balance.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-base font-bold text-[#1F1C18]">
            4. Ownership & Intellectual Property
          </h2>
          <p>
            You retain all rights, title, and ownership in and to your original product photos.
            Subject to credit settlement, you are granted full commercial rights to use, publish,
            and reproduce generated catalogue photos in print, ecommerce, and advertising.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-base font-bold text-[#1F1C18]">
            5. Contact Information
          </h2>
          <p>
            For questions regarding these terms, please contact legal counsel at{" "}
            <span className="font-medium text-[#1F1C18]">legal@atelierstudio.ai</span>.
          </p>
        </section>
      </div>
    </div>
  );
}
