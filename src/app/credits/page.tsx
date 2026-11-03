"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Coins,
  History,
  Clock,
  RefreshCw,
  Loader2,
  AlertCircle,
  ShieldCheck,
} from "lucide-react";
import { TopBar, BottomTabBar, SupportChip } from "@/components";
import { useAuth } from "@/lib/auth-context";
import packsRaw from "@/config/packs.json";

interface Pack {
  id: string;
  label: string;
  credits: number;
  priceInr: number;
  perPhoto: number;
  popular: boolean;
  description: string;
}

interface LogItem {
  id: string;
  kind: "free" | "paid";
  change: number;
  reason: string;
  created_at: string;
}

const packs = packsRaw as Pack[];

// Plain-English labels for credit_log.reason values
function reasonLabel(reason: string, change: number): string {
  switch (reason) {
    case "signup":
      return "Welcome bonus";
    case "job":
      return "Photo created";
    case "refund":
      return "Credit returned";
    case "purchase":
      return "Pack bought";
    case "admin":
      return change > 0 ? "Credit added by admin" : "Credit removed by admin";
    default:
      return reason;
  }
}

function formatDate(ts: string): string {
  return new Date(ts).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function CreditsPage() {
  const router = useRouter();
  const { user, freeCredits, paidCredits, refreshCredits } = useAuth();
  const [logs, setLogs] = useState<LogItem[]>([]);
  const [loadingLogs, setLoadingLogs] = useState(false);
  const [logError, setLogError] = useState<string | null>(null);

  const loadLogs = async () => {
    if (!user) return;
    setLoadingLogs(true);
    setLogError(null);
    try {
      const res = await fetch("/api/credits/history");
      if (!res.ok) throw new Error((await res.json()).error || "Failed to load");
      const data = await res.json();
      setLogs((data.logs || []).slice(0, 20));
    } catch (e: any) {
      setLogError(e.message);
    } finally {
      setLoadingLogs(false);
    }
  };

  useEffect(() => {
    if (user) loadLogs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleTabChange = (tab: "studio" | "lookbook" | "credits" | "atelier") => {
    if (tab === "studio") router.push("/studio/jewellery");
    else if (tab === "lookbook") router.push("/lookbook");
    else if (tab === "atelier") router.push("/atelier");
  };

  return (
    <div className="min-h-screen bg-bg text-ink flex flex-col pb-24">
      <TopBar showBack={false} />

      <main className="max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-6 pb-12 space-y-6 flex-1">
        {/* Eyebrow */}
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-1.5 bg-surface text-ink text-[10px] font-semibold px-2.5 py-1 rounded-[4px] border border-border uppercase tracking-wider">
            <Coins className="w-3.5 h-3.5 text-brass" />
            <span>Studio Credits</span>
          </div>
          <span className="text-xs uppercase tracking-wider text-muted font-medium">
            Your Balance
          </span>
        </div>

        {/* Balance card */}
        <div className="bg-surface rounded-[8px] p-5 sm:p-7 border border-border shadow-warm-card relative space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                Available Credits
              </div>
              <h1 className="font-serif text-2xl sm:text-3xl font-normal text-ink mt-0.5">
                Atelier Token Balance
              </h1>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-muted font-medium bg-bg px-3 py-1.5 rounded-[4px] border border-border">
              <ShieldCheck className="w-4 h-4 text-brass shrink-0" />
              <span>Credits do not expire</span>
            </div>
          </div>

          {/* Two numbers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-1">
            <div className="bg-bg rounded-[6px] p-4 sm:p-5 border border-border">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-2 h-2 rounded-full bg-brass" />
                <span className="text-[10px] uppercase tracking-wider text-muted font-semibold">
                  Free Preview Credits
                </span>
              </div>
              <div className="font-serif text-3xl sm:text-4xl font-bold text-ink leading-none">
                {freeCredits}
              </div>
              <div className="text-xs text-muted mt-2">
                Generates 1080p high-fidelity digital draft previews
              </div>
            </div>
            <div className="bg-bg rounded-[6px] p-4 sm:p-5 border border-border">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-2 h-2 rounded-full bg-accent" />
                <span className="text-[10px] uppercase tracking-wider text-muted font-semibold">
                  Commercial 4K Credits
                </span>
              </div>
              <div className="font-serif text-3xl sm:text-4xl font-bold text-ink leading-none">
                {paidCredits}
              </div>
              <div className="text-xs text-muted mt-2">
                Synthesizes print-ready 4K uncompressed master renders
              </div>
            </div>
          </div>

          <div className="sm:hidden flex items-center gap-1.5 text-xs text-muted font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-brass shrink-0" />
            <span>Credits do not expire.</span>
          </div>
        </div>

        {/* Credit packs */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-wider text-ink font-serif">
                Top Up Credits
              </h2>
              <p className="text-xs text-muted">
                Secure checkout via UPI and corporate cards
              </p>
            </div>
            <span className="text-[10px] bg-surface text-muted px-2.5 py-1 rounded-[4px] border border-border font-medium">
              Coming soon
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            {packs.map((pack) => (
              <div
                key={pack.id}
                className={`relative bg-surface rounded-[8px] p-4 sm:p-5 border text-center shadow-warm-sm flex flex-col justify-between ${
                  pack.popular
                    ? "border-accent ring-1 ring-accent"
                    : "border-border"
                }`}
              >
                {pack.popular && (
                  <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-accent text-bg text-[9px] font-semibold px-2.5 py-0.5 rounded-[2px] uppercase tracking-wider whitespace-nowrap shadow-warm-sm">
                    Popular Atelier Choice
                  </div>
                )}
                <div>
                  <div className="text-[10px] uppercase font-semibold text-muted tracking-wider mt-1">
                    {pack.label}
                  </div>
                  <div className="font-serif text-2xl sm:text-3xl font-bold text-ink my-2">
                    {pack.credits} Credits
                  </div>
                  <div className="text-sm text-ink font-semibold">
                    ₹{pack.priceInr.toLocaleString("en-IN")}
                  </div>
                  <div className="text-xs text-muted mt-1">
                    ₹{pack.perPhoto} per 4K master
                  </div>
                </div>
                <button
                  disabled
                  className="mt-4 w-full py-2 rounded-[4px] bg-bg text-muted border border-border text-[10px] font-semibold uppercase tracking-wider cursor-not-allowed"
                >
                  Coming soon
                </button>
              </div>
            ))}
          </div>

          {/* Explainer */}
          <div className="bg-surface border border-border rounded-[8px] p-4 sm:p-5 space-y-2 text-xs text-muted leading-relaxed">
            <p>
              <strong className="font-semibold text-ink">Free preview credits</strong> make 1080p
              drafts with an atelier watermark — ideal for quick client proofing and composition approval.
            </p>
            <p>
              <strong className="font-semibold text-ink">Commercial 4K credits</strong> deliver full-resolution,
              uncompressed commercial photography ready for high-end lookbooks, hoarding prints, and flagship e-commerce storefronts.
            </p>
          </div>
        </div>

        {/* Credit log */}
        <div className="bg-surface rounded-[8px] p-5 sm:p-6 border border-border shadow-warm-sm space-y-4">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <div className="flex items-center gap-2">
              <History className="w-4 h-4 text-brass" />
              <h3 className="text-sm font-semibold text-ink font-serif">
                Credit History &amp; Ledger
              </h3>
            </div>
            <button
              onClick={async () => {
                await refreshCredits();
                await loadLogs();
              }}
              className="text-xs text-muted hover:text-ink transition-colors duration-150 flex items-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Refresh
            </button>
          </div>

          {loadingLogs ? (
            <div className="py-5 text-center">
              <Loader2 className="w-4 h-4 animate-spin text-accent mx-auto" />
            </div>
          ) : logError ? (
            <div className="flex items-center gap-2 text-xs text-accent bg-bg rounded-[4px] border border-accent p-3">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              {logError}
            </div>
          ) : logs.length === 0 ? (
            <p className="text-xs text-muted text-center py-4">
              No transactions yet.
            </p>
          ) : (
            <div className="divide-y divide-border">
              {logs.map((log) => (
                <div
                  key={log.id}
                  className="py-2.5 flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-[2px] bg-bg border border-border text-brass flex items-center justify-center shrink-0">
                      <Clock className="w-3 h-3" />
                    </div>
                    <div>
                      <div className="font-semibold text-ink">
                        {reasonLabel(log.reason, log.change)}
                      </div>
                      <div className="text-[9px] text-muted">
                        {formatDate(log.created_at)} ·{" "}
                        <span className="capitalize">{log.kind}</span>
                      </div>
                    </div>
                  </div>
                  <div
                    className={`font-semibold tabular-nums ${
                      log.change > 0 ? "text-accent" : "text-muted"
                    }`}
                  >
                    {log.change > 0 ? `+${log.change}` : log.change}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <SupportChip />
      <BottomTabBar activeTab="credits" onChange={handleTabChange} isFixed={true} />
    </div>
  );
}
