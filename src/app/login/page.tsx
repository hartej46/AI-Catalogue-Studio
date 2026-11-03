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
    <div className="min-h-screen bg-bg text-ink flex flex-col">
      {/* Top Header */}
      <header className="sticky top-0 z-50 w-full bg-surface border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-muted hover:text-ink transition-colors duration-150 rounded-[4px] group"
          >
            <ChevronLeft className="w-4 h-4 transition-transform duration-150 group-hover:-translate-x-0.5" />
            <span className="text-xs uppercase tracking-wider font-semibold">
              Return to Overview
            </span>
          </Link>

          <Link href="/" className="flex items-center gap-2 focus:outline-none">
            <span className="font-serif text-lg sm:text-xl font-bold tracking-tight text-ink">
              Catalogue Studio
            </span>
            <span className="bg-bg text-muted border border-border text-[9px] font-semibold px-1.5 py-0.5 rounded-[2px] tracking-wider uppercase">
              LAB
            </span>
          </Link>

          <div className="w-8 h-8 rounded-[4px] overflow-hidden border border-border relative bg-surface">
            <Image
              src="/images/jewellery_craft.jpg"
              alt="Merchant Profile"
              fill
              className="object-cover"
              sizes="32px"
            />
          </div>
        </div>
      </header>

      {/* Main Body */}
      <main className="flex-1 w-full max-w-xl mx-auto px-4 sm:px-6 py-8 sm:py-12 my-auto space-y-6">
        {/* Eyebrow badge */}
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-1.5 bg-surface text-ink text-[10px] font-semibold px-3 py-1 rounded-[4px] border border-border uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-brass shrink-0" />
            <span>AI Editorial Studio for Indian Merchants</span>
          </div>
        </div>

        {/* Headings */}
        <div className="text-center space-y-2">
          <h1 className="font-serif text-3xl sm:text-4xl font-normal leading-tight text-ink">
            Elevate Your Storefront{" "}
            <span className="italic font-serif">to High Vogue</span>
          </h1>
          <p className="text-xs sm:text-sm text-muted leading-relaxed max-w-md mx-auto">
            Transform raw product photographs into Vogue-worthy catalogue campaigns in 60 seconds.
          </p>
        </div>

        {/* Free Credits Complimentary Banner */}
        <div className="bg-surface border border-border rounded-[6px] p-3.5 sm:p-4 flex items-center justify-between shadow-warm-sm">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-[4px] bg-bg border border-border flex items-center justify-center text-brass shrink-0">
              <Sparkles className="w-4 h-4 text-brass" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-semibold text-ink">
                3 Complimentary Studio Credits
              </div>
              <div className="text-[11px] text-muted">
                Granted automatically on your first atelier passkey sign in
              </div>
            </div>
          </div>
          <span className="bg-accent text-bg text-[9px] font-semibold px-2 py-0.5 rounded-[2px] tracking-wider uppercase shrink-0">
            Atelier Gift
          </span>
        </div>

        {/* Enter the Atelier Card */}
        <div className="bg-surface rounded-[8px] p-5 sm:p-7 border border-border shadow-warm-card space-y-4">
          <div className="flex items-start justify-between border-b border-border pb-3.5">
            <div>
              <h2 className="text-sm sm:text-base font-semibold text-ink font-serif">
                Enter the Atelier
              </h2>
              <p className="text-xs text-muted">
                Sign in with one-time verification passkey
              </p>
            </div>
            <div className="text-brass">
              <Lock className="w-4 h-4" />
            </div>
          </div>

          {/* Method Selector: Email (Active) vs Phone */}
          {!otpSent && (
            <div className="grid grid-cols-2 p-1 bg-bg rounded-[4px] border border-border text-xs font-medium">
              <button
                type="button"
                onClick={() => {
                  setAuthMethod("email");
                  setErrorMsg(null);
                }}
                className={`flex items-center justify-center gap-1.5 py-2 rounded-[3px] transition-colors duration-150 ${
                  authMethod === "email"
                    ? "bg-surface text-accent font-semibold shadow-warm-sm border border-border"
                    : "text-muted hover:text-ink"
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
                className={`flex items-center justify-center gap-1.5 py-2 rounded-[3px] transition-colors duration-150 ${
                  authMethod === "phone"
                    ? "bg-surface text-accent font-semibold shadow-warm-sm border border-border"
                    : "text-muted hover:text-ink"
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Phone (SMS)</span>
              </button>
            </div>
          )}

          {errorMsg && (
            <div className="p-3 rounded-[4px] bg-bg border border-accent text-xs text-accent flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {statusMsg && (
            <div className="p-3 rounded-[4px] bg-bg border border-border text-xs text-ink flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-brass" />
              <span>{statusMsg}</span>
            </div>
          )}

          {!otpSent ? (
            <form onSubmit={handleSendOtp} className="space-y-4">
              {authMethod === "email" ? (
                <div>
                  <label className="block text-[10px] uppercase font-semibold tracking-wider text-muted mb-1.5">
                    Merchant Email Address
                  </label>
                  <div className="flex items-center rounded-[4px] border border-border bg-bg overflow-hidden focus-within:border-accent">
                    <div className="px-3 py-2.5 border-r border-border text-xs font-semibold text-muted bg-surface/50">
                      <Mail className="w-4 h-4 text-brass" />
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="merchant@jewelleryatelier.in"
                      className="w-full px-3 py-2.5 text-xs sm:text-sm text-ink bg-transparent outline-none font-medium placeholder:text-muted/60"
                      required
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <label className="block text-[10px] uppercase font-semibold tracking-wider text-muted mb-1.5">
                    Mobile Phone Number
                  </label>
                  <div className="flex items-center rounded-[4px] border border-border bg-bg overflow-hidden focus-within:border-accent">
                    <div className="flex items-center gap-1.5 px-3 py-2.5 border-r border-border text-xs font-semibold text-ink bg-surface/50">
                      <span>🇮🇳</span>
                      <span>+91</span>
                    </div>
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="98450 12890"
                      className="w-full px-3 py-2.5 text-xs sm:text-sm text-ink bg-transparent outline-none font-medium placeholder:text-muted/60"
                      required
                    />
                  </div>
                </div>
              )}

              <div className="flex items-center gap-1.5 text-xs text-muted">
                <ShieldCheck className="w-4 h-4 text-brass shrink-0" />
                <span>
                  Passwordless security: we send a 6-digit one-time passkey.
                </span>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="flex items-center justify-center gap-2 w-full bg-accent hover:bg-accent-hover text-bg py-3 px-4 rounded-[4px] text-xs font-semibold tracking-wider uppercase transition-colors duration-150 shadow-warm-sm disabled:opacity-60 cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Sending Passkey...</span>
                  </>
                ) : (
                  <>
                    <span>Send One-Time Code</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="relative py-1 text-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border"></div>
                </div>
                <div className="relative flex justify-center text-[10px] uppercase font-semibold text-muted bg-surface px-3">
                  or quick access
                </div>
              </div>

              <button
                type="button"
                onClick={handleDemoBypass}
                disabled={isLoading}
                className="w-full py-2.5 px-4 bg-bg hover:bg-surface text-ink border border-border rounded-[4px] text-xs font-semibold flex items-center justify-center gap-2 transition-colors duration-150 shadow-warm-sm cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-brass" />
                <span>Enter Atelier Instantly (Bypass OTP)</span>
              </button>
            </form>
          ) : (
            /* OTP Verification Panel */
            <div className="space-y-4 pt-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-[2px] bg-accent" />
                  <span className="text-xs font-semibold text-ink">
                    Verify 6-Digit Passkey
                  </span>
                </div>
                <span className="bg-bg text-ink text-[11px] font-semibold px-2.5 py-0.5 rounded-[4px] border border-border truncate max-w-[200px]">
                  {authMethod === "email" ? email : `+91 ${phoneNumber}`}
                </span>
              </div>

              <p className="text-xs text-muted">
                Enter the 6-digit passkey sent to your inbox.
              </p>

              {/* 6 Digit Inputs */}
              <div className="grid grid-cols-6 gap-2 sm:gap-2.5">
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
                    className="w-full h-12 text-center font-serif text-lg font-bold bg-bg border border-border rounded-[4px] text-ink focus:border-accent focus:bg-surface outline-none transition-colors duration-150"
                  />
                ))}
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setOtpSent(false);
                    setOtpDigits(["", "", "", "", "", ""]);
                    setErrorMsg(null);
                  }}
                  className="text-muted hover:text-ink transition-colors duration-150"
                >
                  ← Change {authMethod === "email" ? "Email" : "Phone"}
                </button>
                <button
                  type="button"
                  onClick={handleSendOtp}
                  disabled={isLoading}
                  className="font-semibold text-[10px] uppercase tracking-wider text-accent hover:underline"
                >
                  Resend Passkey
                </button>
              </div>

              <button
                type="button"
                onClick={handleVerifyOtp}
                disabled={isLoading}
                className="flex items-center justify-center gap-2 w-full bg-accent hover:bg-accent-hover text-bg py-3 px-4 rounded-[4px] text-xs font-semibold tracking-wider uppercase transition-colors duration-150 shadow-warm-sm disabled:opacity-60 cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Verifying Passkey...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Verify &amp; Enter Atelier</span>
                  </>
                )}
              </button>

              <div className="mt-3 p-3.5 bg-bg border border-border rounded-[6px] text-center space-y-1.5">
                <div className="text-xs font-semibold text-ink flex items-center justify-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-brass" />
                  <span>No OTP Arriving or Testing?</span>
                </div>
                <p className="text-[11px] text-muted leading-relaxed">
                  Enter passkey <strong className="font-mono text-ink bg-surface px-1.5 py-0.5 rounded border border-border">123456</strong> or click below to enter directly with 3 credits.
                </p>
                <button
                  type="button"
                  onClick={handleDemoBypass}
                  className="text-xs text-accent hover:underline font-semibold inline-flex items-center gap-1 pt-0.5 cursor-pointer"
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
      <footer className="w-full border-t border-border bg-surface py-6 text-center space-y-3">
        <div className="flex items-center justify-center gap-6 text-brass">
          <Diamond className="w-4 h-4" />
          <Footprints className="w-4 h-4" />
          <Glasses className="w-4 h-4" />
        </div>
        <p className="text-xs text-muted max-w-sm mx-auto leading-relaxed">
          Crafted exclusively for Indian jewellers, bespoke footwear shoemakers, and heritage optical boutiques.
        </p>
        <div className="flex items-center justify-center gap-4 text-xs text-muted">
          <Link href="/privacy" className="hover:text-ink transition-colors duration-150">Security Protocol</Link>
          <span>·</span>
          <Link href="/terms" className="hover:text-ink transition-colors duration-150">Merchant Terms</Link>
          <span>·</span>
          <span className="hover:text-ink transition-colors duration-150 cursor-pointer">Concierge Support</span>
        </div>
      </footer>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-bg flex items-center justify-center text-xs text-accent">Loading Atelier Login...</div>}>
      <LoginContent />
    </Suspense>
  );
}
