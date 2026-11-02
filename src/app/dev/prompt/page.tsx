import { Suspense } from "react";
import Link from "next/link";
import { ShieldAlert, ArrowLeft, KeyRound, Loader2 } from "lucide-react";
import { getCurrentUser } from "@/lib/auth";
import PromptDevClient from "./PromptDevClient";

export const metadata = {
  title: "Prompt Inspector (/dev/prompt) — Atelier AI Lab",
  description: "Internal developer prompt compilation tool for Atelier Catalogue Studio.",
};

async function DevPromptContent() {
  const user = await getCurrentUser();
  const rawAdminEmails = process.env.ADMIN_EMAILS || "";
  const adminEmails = rawAdminEmails
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);

  const userEmail = user?.email?.toLowerCase().trim() || "";
  const isAuthorized = Boolean(userEmail && adminEmails.includes(userEmail));

  // Access control: visible only to emails listed in ADMIN_EMAILS
  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-[#0E0D0A] text-[#EDE7DB] flex flex-col items-center justify-center p-6">
        <div className="max-w-md w-full bg-[#181612] border border-[#2B2720] rounded-2xl p-7 text-center shadow-2xl space-y-5">
          <div className="w-14 h-14 rounded-full bg-red-950/60 border border-red-800 text-red-400 flex items-center justify-center mx-auto shadow-inner">
            <ShieldAlert className="w-7 h-7" />
          </div>

          <div className="space-y-2">
            <h1 className="text-xl font-serif font-bold tracking-tight text-[#F5F0E6]">
              Restricted Developer Tool
            </h1>
            <p className="text-xs text-[#9E9586] leading-relaxed">
              The <code className="bg-[#242019] px-1.5 py-0.5 rounded text-[#C5A869] font-mono">/dev/prompt</code> inspector
              is private and strictly visible only to authenticated administrator emails specified in <code className="bg-[#242019] px-1.5 py-0.5 rounded text-[#C5A869] font-mono">ADMIN_EMAILS</code>.
            </p>
          </div>

          <div className="bg-[#211E18] rounded-xl p-3.5 text-xs text-[#8F8778] text-left space-y-1.5 border border-[#2F2920]">
            <div className="flex items-start justify-between gap-2">
              <span className="font-semibold text-[#C4BCAD]">Current Session:</span>
              <span className="font-mono text-[11px] text-[#EDE7DB] truncate max-w-[200px]">
                {userEmail || "Anonymous / Unauthenticated"}
              </span>
            </div>
            <div className="flex items-start justify-between gap-2">
              <span className="font-semibold text-[#C4BCAD]">Access Status:</span>
              <span className="text-red-400 font-bold text-[11px]">Unauthorized</span>
            </div>
          </div>

          <div className="pt-2 flex flex-col gap-2.5">
            {!user ? (
              <Link
                href="/login?redirectTo=/dev/prompt"
                className="w-full flex items-center justify-center gap-2 bg-[#C5A869] hover:bg-[#B39655] text-[#14120E] font-bold text-xs uppercase tracking-wider py-3 rounded-lg transition-all shadow-md"
              >
                <KeyRound className="w-4 h-4" />
                <span>Sign In with Admin Account</span>
              </Link>
            ) : null}

            <Link
              href="/"
              className="inline-flex items-center justify-center gap-1.5 text-xs text-[#8F8778] hover:text-[#EDE7DB] transition-colors py-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Catalogue Studio</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return <PromptDevClient userEmail={userEmail} />;
}

export default function DevPromptPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#0E0D0A] text-[#EDE7DB] flex items-center justify-center">
          <div className="flex items-center gap-2 text-xs text-[#8F8778]">
            <Loader2 className="w-4 h-4 animate-spin text-[#C5A869]" />
            <span>Verifying administrator credentials...</span>
          </div>
        </div>
      }
    >
      <DevPromptContent />
    </Suspense>
  );
}
