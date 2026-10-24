"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ChevronLeft,
  Lock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Clock,
  Diamond,
  Footprints,
  Glasses,
  CheckCircle2,
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState("98450 12890");
  const [otpSent, setOtpSent] = useState(false);
  const [otpDigits, setOtpDigits] = useState(["7", "4", "9", "2", "", ""]);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber.trim().length >= 10) {
      setOtpSent(true);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value.slice(-1);
    }
    const updated = [...otpDigits];
    updated[index] = value;
    setOtpDigits(updated);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleVerifyOtp = () => {
    setIsVerifying(true);
    setTimeout(() => {
      router.push("/select-domain");
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1F1C18] flex flex-col justify-between max-w-md mx-auto px-4 py-4 shadow-sm border-x border-[#EFEAE1]">
      {/* Top Header */}
      <header className="flex items-center justify-between pb-3 border-b border-[#EFEAE1]">
        <Link
          href="/"
          className="p-1 -ml-1 text-[#4F493F] hover:text-black transition-colors rounded-full"
        >
          <ChevronLeft className="w-5 h-5" />
        </Link>

        <div className="flex items-center gap-1.5">
          <div className="w-5 h-5 rounded-md bg-[#5B5226]/10 flex items-center justify-center text-[#5B5226]">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <span className="font-serif text-sm font-semibold tracking-wide text-[#231F1B]">
            Render Inspector
          </span>
        </div>

        <div className="w-7 h-7 rounded-full overflow-hidden border border-[#D8D0C3] relative">
          <Image
            src="/images/jewellery_craft.jpg"
            alt="Merchant Profile"
            fill
            className="object-cover"
            sizes="28px"
          />
        </div>
      </header>

      {/* Main Body */}
      <main className="space-y-4 pt-3">
        {/* Eyebrow badge */}
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-1 bg-[#F0EBE0] text-[#5B5226] text-[10px] font-semibold px-2.5 py-0.5 rounded-full border border-[#E3DCCF]">
            <Sparkles className="w-3 h-3 text-[#5B5226]" />
            <span className="tracking-wide">AI EDITORIAL STUDIO FOR INDIAN MERCHANTS</span>
          </div>
        </div>

        {/* Headings */}
        <div className="text-center space-y-1">
          <h1 className="font-serif text-2xl font-normal leading-tight text-[#1F1C18]">
            Elevate Your Storefront{" "}
            <span className="italic font-serif">to High Vogue</span>
          </h1>
          <p className="text-xs text-[#6A6357] leading-relaxed max-w-xs mx-auto">
            Turn phone photos of jewellery, footwear and eyewear into
            catalogue-ready campaigns in a minute or two.
          </p>
        </div>

        {/* Free Credits Complimentary Banner */}
        <div className="bg-[#F3EFE6] border border-[#E5DECF] rounded-xl p-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-[#E4DCB9] flex items-center justify-center text-[#5B5226]">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <div>
              <div className="text-xs font-bold text-[#27231E]">
                3 Free Preview Credits
              </div>
              <div className="text-[10px] text-[#736A5D]">
                Instant access when you sign in
              </div>
            </div>
          </div>
          <span className="bg-[#5B5226] text-white text-[9px] font-bold px-2 py-0.5 rounded tracking-wider uppercase">
            Complimentary
          </span>
        </div>

        {/* Horizontal Preview Scroll */}
        <div className="flex items-center gap-2.5 overflow-x-auto pb-1 no-scrollbar pt-1">
          {/* Card 1: Jewellery */}
          <div className="shrink-0 w-32 bg-white rounded-xl overflow-hidden border border-[#E7E0D3] shadow-xs">
            <div className="relative h-32 w-full">
              <Image
                src="/images/jewellery_craft.jpg"
                alt="Emerald Polki Jewellery"
                fill
                className="object-cover"
                sizes="128px"
              />
              <div className="absolute bottom-1.5 left-1.5 bg-black/70 text-white text-[8px] font-semibold px-1.5 py-0.5 rounded uppercase tracking-wider">
                Polki &amp; Gold
              </div>
            </div>
            <div className="p-2">
              <div className="text-[11px] font-semibold text-[#1F1C18] truncate">
                Royal Emerald ...
              </div>
              <div className="text-[9px] text-[#7E776B] truncate">
                Heritage Jewellers
              </div>
            </div>
          </div>

          {/* Card 2: Footwear */}
          <div className="shrink-0 w-32 bg-white rounded-xl overflow-hidden border border-[#E7E0D3] shadow-xs">
            <div className="relative h-32 w-full">
              <Image
                src="/images/footwear_craft.jpg"
                alt="Artisanal Footwear"
                fill
                className="object-cover"
                sizes="128px"
              />
              <div className="absolute bottom-1.5 left-1.5 bg-black/70 text-white text-[8px] font-semibold px-1.5 py-0.5 rounded uppercase tracking-wider">
                Bespoke Jutti
              </div>
            </div>
            <div className="p-2">
              <div className="text-[11px] font-semibold text-[#1F1C18] truncate">
                Zardozi Bridal ...
              </div>
              <div className="text-[9px] text-[#7E776B] truncate">
                Artisan Footwear
              </div>
            </div>
          </div>

          {/* Card 3: Optical */}
          <div className="shrink-0 w-32 bg-white rounded-xl overflow-hidden border border-[#E7E0D3] shadow-xs">
            <div className="relative h-32 w-full">
              <Image
                src="/images/optical_craft.jpg"
                alt="Luxury Spectacles"
                fill
                className="object-cover"
                sizes="128px"
              />
              <div className="absolute bottom-1.5 left-1.5 bg-black/70 text-white text-[8px] font-semibold px-1.5 py-0.5 rounded uppercase tracking-wider">
                Fine Optical
              </div>
            </div>
            <div className="p-2">
              <div className="text-[11px] font-semibold text-[#1F1C18] truncate">
                Tortoiseshell ...
              </div>
              <div className="text-[9px] text-[#7E776B] truncate">
                Bespoke Eyewear
              </div>
            </div>
          </div>
        </div>

        {/* Enter the Atelier Card */}
        <div className="bg-white rounded-2xl p-4 border border-[#E7E0D3] shadow-xs space-y-3.5">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-sm font-bold text-[#1F1C18]">
                Enter the Atelier
              </h2>
              <p className="text-[11px] text-[#787163]">
                Merchant Studio Access &amp; Campaign Creator
              </p>
            </div>
            <div className="text-[#5B5226]">
              <Lock className="w-4 h-4" />
            </div>
          </div>

          {!otpSent ? (
            <form onSubmit={handleSendOtp} className="space-y-3">
              <div>
                <label className="block text-[9px] uppercase font-bold tracking-wider text-[#6B6456] mb-1">
                  Mobile Phone Number
                </label>
                <div className="flex items-center rounded-lg border border-[#DDD6C8] bg-[#FAF8F5] overflow-hidden focus-within:border-[#5B5226] focus-within:ring-1 focus-within:ring-[#5B5226]">
                  <div className="flex items-center gap-1 px-2.5 py-2.5 border-r border-[#E2DBD0] text-xs font-semibold text-[#2F2A23] bg-[#F2EDE3]">
                    <span>🇮🇳</span>
                    <span>+91</span>
                  </div>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="98450 12890"
                    className="w-full px-3 py-2 text-sm text-[#1F1C18] bg-transparent outline-none font-medium"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-[10px] text-[#7A7366]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#5B5226] shrink-0" />
                <span>
                  We send a secure one-time verification code to your phone.
                </span>
              </div>

              <button
                type="submit"
                className="flex items-center justify-center gap-2 w-full bg-[#5B5226] hover:bg-[#49421D] text-white py-3 rounded-lg text-xs font-semibold tracking-wider uppercase transition-all shadow-sm active:scale-[0.99]"
              >
                <span>Continue with OTP</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <div className="relative flex items-center justify-center py-1">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[#EAE3D6]"></div>
                </div>
                <span className="relative bg-white px-2 text-[9px] uppercase tracking-wider text-[#91897C] font-semibold">
                  Or Continue With
                </span>
              </div>

              <button
                type="button"
                onClick={() => setOtpSent(true)}
                className="flex items-center justify-center gap-2 w-full border border-[#DDD6C8] bg-[#FAF8F5] hover:bg-[#F3EFE7] text-[#2C2720] py-2.5 rounded-lg text-xs font-medium transition-all"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>Google Workspace</span>
              </button>
            </form>
          ) : (
            /* OTP Verification Panel */
            <div className="space-y-3.5 pt-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-[#5B5226]"></div>
                  <span className="text-xs font-semibold text-[#1F1C18]">
                    Verify Phone Number
                  </span>
                </div>
                <span className="bg-[#EFEAE0] text-[#5B5226] text-[10px] font-semibold px-2 py-0.5 rounded">
                  +91 {phoneNumber}
                </span>
              </div>

              <p className="text-[11px] text-[#70695D]">
                Enter the 6-digit studio passkey sent via SMS.
              </p>

              {/* 6 Digit Inputs */}
              <div className="grid grid-cols-6 gap-2">
                {otpDigits.map((digit, idx) => (
                  <input
                    key={idx}
                    id={`otp-${idx}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                    className="w-full h-11 text-center font-serif text-lg font-bold bg-[#FAF8F5] border border-[#DDD6C8] rounded-lg text-[#1F1C18] focus:border-[#5B5226] focus:bg-white focus:ring-1 focus:ring-[#5B5226] outline-none transition-all"
                  />
                ))}
              </div>

              <div className="flex items-center justify-between text-[11px] pt-1">
                <div className="flex items-center gap-1 text-[#6F685B]">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Resend in Available</span>
                </div>
                <button
                  type="button"
                  onClick={() => alert("Passkey resent to +91 " + phoneNumber)}
                  className="font-bold text-[10px] uppercase tracking-wider text-[#5B5226] hover:underline"
                >
                  Resend SMS
                </button>
              </div>

              <button
                type="button"
                onClick={handleVerifyOtp}
                disabled={isVerifying}
                className="flex items-center justify-center gap-2 w-full bg-[#5B5226] hover:bg-[#49421D] text-white py-3 rounded-lg text-xs font-semibold tracking-wider uppercase transition-all shadow-sm active:scale-[0.99] disabled:opacity-75"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>
                  {isVerifying ? "Verifying..." : "Verify & Enter Atelier"}
                </span>
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="pt-6 pb-2 text-center space-y-3">
        <div className="flex items-center justify-center gap-4 text-[#7A7366]">
          <Diamond className="w-4 h-4" />
          <Footprints className="w-4 h-4" />
          <Glasses className="w-4 h-4" />
        </div>
        <p className="text-[10px] text-[#777062] max-w-xs mx-auto leading-relaxed">
          Crafted exclusively for Indian jewellers, bespoke footwear
          shoemakers, and heritage optical boutiques.
        </p>
        <div className="flex items-center justify-center gap-3 text-[10px] text-[#867F72]">
          <span className="hover:underline cursor-pointer">Security Protocol</span>
          <span>·</span>
          <span className="hover:underline cursor-pointer">Merchant Terms</span>
          <span>·</span>
          <span className="hover:underline cursor-pointer">Concierge Support</span>
        </div>
      </footer>
    </div>
  );
}
