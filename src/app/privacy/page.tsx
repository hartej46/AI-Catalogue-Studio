import React from "react";
import Link from "next/link";
import { ArrowLeft, Shield, AlertTriangle } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | Atelier AI Catalogue Studio",
  description: "Privacy Policy and data processing practices for Atelier AI Catalogue Studio.",
};

export default function PrivacyPage() {
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
            below with your company's official, legally vetted Privacy Policy before launching to
            customers.
          </div>
        </div>

        {/* Header */}
        <div className="border-b border-border pb-6 space-y-3">
          <div className="inline-flex items-center gap-1.5 bg-surface text-ink text-[10px] font-semibold px-2.5 py-1 rounded-[4px] border border-border uppercase tracking-wider">
            <Shield className="w-3.5 h-3.5 text-brass" />
            <span>Legal &amp; Privacy</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-normal text-ink">
            Privacy Policy
          </h1>
          <p className="text-xs text-muted">
            Effective Date: October 2026 · Version 1.0 (Draft)
          </p>
        </div>

        {/* Content */}
        <div className="space-y-6 text-xs sm:text-sm text-muted leading-relaxed">
        <section className="space-y-2">
          <h2 className="font-serif text-base font-bold text-[#1C1714]">
            1. Information We Collect
          </h2>
          <p>
            When you register and use Atelier AI Catalogue Studio, we collect your authentication
            details (such as your email address or phone number), transaction records, and the
            images you upload for studio photo generation.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-base font-bold text-[#1C1714]">
            2. How We Use Uploaded Images
          </h2>
          <p>
            Product images uploaded to the platform are used solely to generate styled commercial
            catalogue renderings requested by your account. We do not use your proprietary
            product photographs to train public foundation models without your explicit consent.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-base font-bold text-[#1C1714]">
            3. Data Storage and Security
          </h2>
          <p>
            Your uploaded originals and generated high-resolution assets are stored securely in
            private, encrypted cloud storage buckets. Access to generated assets is restricted to
            short-lived, cryptographically signed URLs available only to the authenticated owner.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-base font-bold text-ink">
            4. Your Rights &amp; Account Deletion
          </h2>
          <p>
            You retain complete ownership of your uploaded assets and generated photos. You may
            permanently delete any generated photo from your Lookbook at any time, or permanently
            delete your entire account and all associated cloud assets directly from your Atelier
            account settings.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-base font-bold text-ink">
            5. Contact Us
          </h2>
          <p>
            For privacy inquiries or data rights requests, please contact the studio director at{" "}
            <span className="font-medium text-ink">privacy@atelierstudio.ai</span>.
          </p>
        </section>
      </div>
      </main>
    </div>
  );
}
