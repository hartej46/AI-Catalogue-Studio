import React from "react";
import Link from "next/link";
import { ArrowLeft, Shield, AlertTriangle } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | Atelier AI Catalogue Studio",
  description: "Privacy Policy and data processing practices for Atelier AI Catalogue Studio.",
};

export default function PrivacyPage() {
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
          below with your company's official, legally vetted Privacy Policy before launching to
          customers.
        </div>
      </div>

      {/* Header */}
      <div className="border-b border-[#E7E0D3] pb-6 mb-8">
        <div className="inline-flex items-center gap-1.5 bg-[#F0EBE0] text-[#7A6A2E] text-[10px] font-semibold px-2.5 py-0.5 rounded-full border border-[#E3DCCF] uppercase tracking-wider mb-3">
          <Shield className="w-3 h-3" />
          <span>Legal & Privacy</span>
        </div>
        <h1 className="font-serif text-3xl font-bold text-[#1F1C18]">
          Privacy Policy
        </h1>
        <p className="text-xs text-[#8C867A] mt-2">
          Effective Date: October 2026 · Version 1.0 (Draft)
        </p>
      </div>

      {/* Content */}
      <div className="space-y-6 text-xs text-[#524B40] leading-relaxed">
        <section className="space-y-2">
          <h2 className="font-serif text-base font-bold text-[#1F1C18]">
            1. Information We Collect
          </h2>
          <p>
            When you register and use Atelier AI Catalogue Studio, we collect your authentication
            details (such as your email address or phone number), transaction records, and the
            images you upload for studio photo generation.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-base font-bold text-[#1F1C18]">
            2. How We Use Uploaded Images
          </h2>
          <p>
            Product images uploaded to the platform are used solely to generate styled commercial
            catalogue renderings requested by your account. We do not use your proprietary
            product photographs to train public foundation models without your explicit consent.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-base font-bold text-[#1F1C18]">
            3. Data Storage and Security
          </h2>
          <p>
            Your uploaded originals and generated high-resolution assets are stored securely in
            private, encrypted cloud storage buckets. Access to generated assets is restricted to
            short-lived, cryptographically signed URLs available only to the authenticated owner.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-base font-bold text-[#1F1C18]">
            4. Your Rights & Account Deletion
          </h2>
          <p>
            You retain complete ownership of your uploaded assets and generated photos. You may
            permanently delete any generated photo from your Lookbook at any time, or permanently
            delete your entire account and all associated cloud assets directly from your Atelier
            account settings.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-base font-bold text-[#1F1C18]">
            5. Contact Us
          </h2>
          <p>
            For privacy inquiries or data rights requests, please contact the studio director at{" "}
            <span className="font-medium text-[#1F1C18]">privacy@atelierstudio.ai</span>.
          </p>
        </section>
      </div>
    </div>
  );
}
