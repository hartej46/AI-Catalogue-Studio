"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
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
  Mail,
  Smartphone,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "/studio/jewellery";

  const [authMethod, setAuthMethod] = useState<"email" | "phone">("email");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpDigits, setOtpDigits] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);
  const [supabaseConfigured, setSupabaseConfigured] = useState(true);

  useEffect(() => {
    // Check if Supabase keys are configured in environment
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!supabaseUrl || !supabaseKey || supabaseUrl.trim() === "") {
      setSupabaseConfigured(false);
    }
  }, []);

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setStatusMsg(null);

    if (authMethod === "email") {
      if (!email.trim() || !email.includes("@")) {
        setErrorMsg("Please enter a valid boutique or merchant email address.");
        return;
      }

      setIsLoading(true);

      try {
        const res = await fetch("/api/auth/otp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "send",
            email: email.trim(),
          }),
        });

        const data = await res.json();

        if (data.success) {
          setOtpSent(true);
          setStatusMsg(data.message || `We dispatched a studio passkey to ${email}`);
          if (data.warning) {
            setErrorMsg(data.warning);
          }
        } else {
          setErrorMsg(data.error || "Failed to dispatch verification code.");
          // Still allow entering passkey 123456
          setOtpSent(true);
        }
      } catch (err: any) {
        // Fallback gracefully so user is never blocked
        setOtpSent(true);
        setStatusMsg("Demo passkey active. Enter 123456 to enter the studio.");
      } finally {
        setIsLoading(false);
      }
    } else {
      // Phone OTP (scheduled for subsequent SMS integration)
      if (phoneNumber.replace(/\D/g, "").length < 10) {
        setErrorMsg("Please enter a 10-digit mobile phone number.");
        return;
      }

      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setOtpSent(true);
        setStatusMsg("SMS passkey dispatched. Enter passkey: 123456");
      }, 400);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    // Allow single digit
    const cleaned = value.replace(/\D/g, "").slice(-1);
    const updated = [...otpDigits];
    updated[index] = cleaned;
    setOtpDigits(updated);

    // Auto-focus next input
    if (cleaned && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otpDigits[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleVerifyOtp = async () => {
    const code = otpDigits.join("");
    if (code.length < 6) {
      setErrorMsg("Please enter all 6 digits of your passkey.");
      return;
    }

    setIsLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch("/api/auth/otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "verify",
          email: email.trim() || "vedrai0091@gmail.com",
          token: code,
        }),
      });

      const data = await res.json();

      if (data.success) {
        try {
          await fetch("/api/auth/profile");
        } catch {
          // Non-critical
        }
        router.push(redirectTo);
        router.refresh();
      } else {
        setErrorMsg(data.error || "Verification failed. You may enter 123456 for instant access.");
        setIsLoading(false);
      }
    } catch (err: any) {
      // If error, check if 123456
      if (code === "123456") {
        await handleDemoBypass();
      } else {
        setErrorMsg(err?.message || "Verification failed. Try passkey 123456.");
        setIsLoading(false);
      }
    }
  };

  const handleDemoBypass = async () => {
    setIsLoading(true);
    try {
      await fetch("/api/auth/otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "demo-bypass",
          email: email.trim() || "vedrai0091@gmail.com",
        }),
      });
      try {
        await fetch("/api/auth/profile");
      } catch {
        // Non-critical
      }
      router.push(redirectTo);
      router.refresh();
    } catch {
      router.push(redirectTo);
      router.refresh();
    } finally {
      setIsLoading(false);
    }
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
          <div className="w-5 h-5 rounded-md bg-[#7A6A2E]/10 flex items-center justify-center text-[#7A6A2E]">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <span className="font-serif text-sm font-semibold tracking-wide text-[#231F1B]">
            Catalogue Studio · Atelier Access
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
          <div className="inline-flex items-center gap-1 bg-[#F0EBE0] text-[#7A6A2E] text-[10px] font-semibold px-2.5 py-0.5 rounded-full border border-[#E3DCCF]">
            <Sparkles className="w-3 h-3 text-[#7A6A2E]" />
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
            Transform raw product photographs into Vogue-worthy catalogue campaigns in 60 seconds.
          </p>
        </div>

        {/* Free Credits Complimentary Banner */}
        <div className="bg-[#F5EEDB] border border-[#E8DFBE] rounded-xl p-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-[#E8DFBE] flex items-center justify-center text-[#7A6A2E]">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <div>
              <div className="text-xs font-bold text-[#27231E]">
                3 Complimentary Studio Credits
              </div>
              <div className="text-[10px] text-[#736A5D]">
                Granted instantly on first sign in
              </div>
            </div>
          </div>
          <span className="bg-[#7A6A2E] text-white text-[9px] font-bold px-2 py-0.5 rounded tracking-wider uppercase">
            Atelier Gift
          </span>
        </div>

        {/* Environment banner warning if keys not configured yet */}
        {!supabaseConfigured && (
          <div className="bg-[#FFF8E7] border border-[#F0DEB4] rounded-lg p-2.5 text-[11px] text-[#7A601A] flex items-start gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-[#B38318]" />
            <div>
              <span className="font-bold">Setup Notice:</span> Paste your{" "}
              <code className="bg-white/80 px-1 py-0.5 rounded text-[10px] border border-[#E8D196]">
                NEXT_PUBLIC_SUPABASE_URL
              </code>{" "}
              and anon key into{" "}
              <code className="bg-white/80 px-1 py-0.5 rounded text-[10px] border border-[#E8D196]">
                .env.local
              </code>{" "}
              for live Supabase email OTP.
            </div>
          </div>
        )}

        {/* Enter the Atelier Card */}
        <div className="bg-white rounded-2xl p-4 border border-[#E7E0D3] shadow-xs space-y-3.5">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-sm font-bold text-[#1F1C18]">
                Enter the Atelier
              </h2>
              <p className="text-[11px] text-[#787163]">
                Sign in with one-time verification passkey
              </p>
            </div>
            <div className="text-[#7A6A2E]">
              <Lock className="w-4 h-4" />
            </div>
          </div>

          {/* Method Selector: Email (Active) vs Phone */}
          {!otpSent && (
            <div className="grid grid-cols-2 p-1 bg-[#FAF8F5] rounded-lg border border-[#EAE4D7] text-xs font-medium">
              <button
                type="button"
                onClick={() => {
                  setAuthMethod("email");
                  setErrorMsg(null);
                }}
                className={`flex items-center justify-center gap-1.5 py-1.5 rounded-md transition-all ${
                  authMethod === "email"
                    ? "bg-white text-[#7A6A2E] font-bold shadow-xs border border-[#DDD6C8]"
                    : "text-[#787163] hover:text-[#1F1C18]"
                }`}
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Email Passkey</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setAuthMethod("phone");
                  setErrorMsg(null);
                }}
                className={`flex items-center justify-center gap-1.5 py-1.5 rounded-md transition-all ${
                  authMethod === "phone"
                    ? "bg-white text-[#7A6A2E] font-bold shadow-xs border border-[#DDD6C8]"
                    : "text-[#787163] hover:text-[#1F1C18]"
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Phone (SMS)</span>
              </button>
            </div>
          )}

          {errorMsg && (
            <div className="p-2.5 rounded-lg bg-[#FDF2F2] border border-[#F6C6C6] text-[11px] text-[#991B1B] flex items-center gap-2">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {statusMsg && (
            <div className="p-2.5 rounded-lg bg-[#F2F8F4] border border-[#CDE5D5] text-[11px] text-[#1E5D34] flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-[#258548]" />
              <span>{statusMsg}</span>
            </div>
          )}

          {!otpSent ? (
            <form onSubmit={handleSendOtp} className="space-y-3">
              {authMethod === "email" ? (
                <div>
                  <label className="block text-[9px] uppercase font-bold tracking-wider text-[#6B6456] mb-1">
                    Merchant Email Address
                  </label>
                  <div className="flex items-center rounded-lg border border-[#DDD6C8] bg-[#FAF8F5] overflow-hidden focus-within:border-[#7A6A2E] focus-within:ring-1 focus-within:ring-[#7A6A2E]">
                    <div className="px-2.5 py-2.5 border-r border-[#E2DBD0] text-xs font-semibold text-[#6B6456] bg-[#F2EDE3]">
                      <Mail className="w-3.5 h-3.5 text-[#7A6A2E]" />
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="merchant@jewelleryatelier.in"
                      className="w-full px-3 py-2 text-sm text-[#1F1C18] bg-transparent outline-none font-medium"
                      required
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <label className="block text-[9px] uppercase font-bold tracking-wider text-[#6B6456] mb-1">
                    Mobile Phone Number
                  </label>
                  <div className="flex items-center rounded-lg border border-[#DDD6C8] bg-[#FAF8F5] overflow-hidden focus-within:border-[#7A6A2E] focus-within:ring-1 focus-within:ring-[#7A6A2E]">
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
              )}

              <div className="flex items-center gap-1.5 text-[10px] text-[#7A7366]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#7A6A2E] shrink-0" />
                <span>
                  Passwordless security: we send a 6-digit one-time passkey.
                </span>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="flex items-center justify-center gap-2 w-full bg-[#7A6A2E] hover:bg-[#685925] text-white py-3 rounded-lg text-xs font-semibold tracking-wider uppercase transition-all shadow-sm active:scale-[0.99] disabled:opacity-75 cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Sending Passkey...</span>
                  </>
                ) : (
                  <>
                    <span>Send One-Time Code</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>

              <div className="relative py-1 text-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[#E8DFBE]"></div>
                </div>
                <div className="relative flex justify-center text-[10px] uppercase font-semibold text-[#8C8374] bg-[#FAF8F5] px-2">
                  or quick access
                </div>
              </div>

              <button
                type="button"
                onClick={handleDemoBypass}
                disabled={isLoading}
                className="w-full py-2.5 px-3 bg-[#F5EEDB] hover:bg-[#EFE6CE] text-[#5C4F22] border border-[#DDD3B3] rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-sm active:scale-[0.99] cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#7A6A2E]" />
                <span>Enter Atelier Instantly (Bypass OTP)</span>
              </button>
            </form>
          ) : (
            /* OTP Verification Panel */
            <div className="space-y-3.5 pt-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-[#7A6A2E]"></div>
                  <span className="text-xs font-semibold text-[#1F1C18]">
                    Verify 6-Digit Passkey
                  </span>
                </div>
                <span className="bg-[#EFEAE0] text-[#7A6A2E] text-[10px] font-semibold px-2 py-0.5 rounded truncate max-w-[170px]">
                  {authMethod === "email" ? email : `+91 ${phoneNumber}`}
                </span>
              </div>

              <p className="text-[11px] text-[#70695D]">
                Enter the 6-digit passkey sent to your inbox.
              </p>

              {/* 6 Digit Inputs */}
              <div className="grid grid-cols-6 gap-1.5 sm:gap-2">
                {otpDigits.map((digit, idx) => (
                  <input
                    key={idx}
                    id={`otp-${idx}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(idx, e)}
                    className="w-full h-11 text-center font-serif text-lg font-bold bg-[#FAF8F5] border border-[#DDD6C8] rounded-lg text-[#1F1C18] focus:border-[#7A6A2E] focus:bg-white focus:ring-1 focus:ring-[#7A6A2E] outline-none transition-all"
                  />
                ))}
              </div>

              <div className="flex items-center justify-between text-[11px] pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setOtpSent(false);
                    setOtpDigits(["", "", "", "", "", ""]);
                    setErrorMsg(null);
                  }}
                  className="text-[10px] text-[#787163] hover:text-[#1F1C18]"
                >
                  ← Change {authMethod === "email" ? "Email" : "Phone"}
                </button>
                <button
                  type="button"
                  onClick={handleSendOtp}
                  disabled={isLoading}
                  className="font-bold text-[10px] uppercase tracking-wider text-[#7A6A2E] hover:underline"
                >
                  Resend Passkey
                </button>
              </div>

              <button
                type="button"
                onClick={handleVerifyOtp}
                disabled={isLoading}
                className="flex items-center justify-center gap-2 w-full bg-[#7A6A2E] hover:bg-[#685925] text-white py-3 rounded-lg text-xs font-semibold tracking-wider uppercase transition-all shadow-sm active:scale-[0.99] disabled:opacity-75 cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Verifying Passkey...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Verify &amp; Enter Atelier</span>
                  </>
                )}
              </button>

              <div className="mt-2.5 p-3 bg-[#F7F2E7] border border-[#E8DFBE] rounded-xl text-center space-y-1.5">
                <div className="text-[11px] font-semibold text-[#5C4F22] flex items-center justify-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#7A6A2E]" />
                  <span>No OTP Arriving or Testing?</span>
                </div>
                <p className="text-[10px] text-[#787163] leading-relaxed">
                  Enter passkey <strong className="font-mono text-[#1F1C18] bg-white px-1.5 py-0.5 rounded border border-[#DDD6C8]">123456</strong> or click below to enter directly with 3 credits.
                </p>
                <button
                  type="button"
                  onClick={handleDemoBypass}
                  className="text-xs text-[#7A6A2E] hover:underline font-bold inline-flex items-center gap-1 pt-0.5 cursor-pointer"
                >
                  <span>Skip OTP &amp; Enter Atelier Now</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
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
          Crafted exclusively for Indian jewellers, bespoke footwear shoemakers, and heritage optical boutiques.
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

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center text-xs text-[#7A6A2E]">Loading Atelier Login...</div>}>
      <LoginContent />
    </Suspense>
  );
}
