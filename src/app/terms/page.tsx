import React from "react";
import Link from "next/link";
import { ArrowLeft, FileText, AlertTriangle } from "lucide-react";

export const metadata = {
  title: "Terms of Service | Atelier AI Catalogue Studio",
  description: "Terms of Service and commercial terms for Atelier AI Catalogue Studio.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-bg text-ink flex flex-col">
      {/* Header Bar */}
      <header className="sticky top-0 z-40 w-full bg-surface border-b border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <Link
            href="/atelier"
            className="inline-flex items-center gap-2 text-xs font-semibold text-accent hover:text-accent-hover transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Atelier</span>
          </Link>
          <span className="font-serif text-sm font-bold tracking-tight text-ink">
            Catalogue Studio
          </span>
        </div>
      </header>

      <main className="max-w-3xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8 flex-1">
        {/* Notice Banner */}
        <div className="p-4 rounded-[6px] bg-surface border border-brass/40 text-ink text-xs flex items-start gap-3 leading-relaxed shadow-warm-sm">
          <AlertTriangle className="w-4 h-4 text-brass shrink-0 mt-0.5" />
          <div className="text-muted">
            <strong className="font-semibold text-ink">Placeholder Legal Document:</strong> This is a
            template document provided for testing and navigation. Please replace the text
            below with your company's official, legally vetted Terms of Service before launching to
            customers.
          </div>
        </div>

        {/* Header */}
        <div className="border-b border-border pb-6 space-y-3">
          <div className="inline-flex items-center gap-1.5 bg-surface text-ink text-[10px] font-semibold px-2.5 py-1 rounded-[4px] border border-border uppercase tracking-wider">
            <FileText className="w-3.5 h-3.5 text-brass" />
            <span>Terms &amp; Conditions</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-normal text-ink">
            Terms of Service
          </h1>
          <p className="text-xs text-muted">
            Effective Date: October 2026 · Version 1.0 (Draft)
          </p>
        </div>

        {/* Content */}
        <div className="space-y-6 text-xs sm:text-sm text-muted leading-relaxed">
        <section className="space-y-2">
          <h2 className="font-serif text-base font-bold text-[#1C1714]">
            1. Acceptance of Terms
          </h2>
          <p>
            By accessing or using Atelier AI Catalogue Studio, you agree to be bound by these
            Terms of Service. If you do not agree to these terms, do not access or use the
            platform.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-base font-bold text-[#1C1714]">
            2. Studio Credits & Purchases
          </h2>
          <p>
            Generation jobs consume credits. Free promotional credits create 1080p preview
            renders with a watermark. Paid credits generate watermark-free 4K ultra-high
            resolution assets. Purchased credits do not expire.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-base font-bold text-[#1C1714]">
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
          <h2 className="font-serif text-base font-bold text-ink">
            4. Ownership &amp; Intellectual Property
          </h2>
          <p>
            You retain all rights, title, and ownership in and to your original product photos.
            Subject to credit settlement, you are granted full commercial rights to use, publish,
            and reproduce generated catalogue photos in print, ecommerce, and advertising.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-base font-bold text-ink">
            5. Contact Information
          </h2>
          <p>
            For questions regarding these terms, please contact legal counsel at{" "}
            <span className="font-medium text-ink">legal@atelierstudio.ai</span>.
          </p>
        </section>
      </div>
      </main>
    </div>
  );
}
