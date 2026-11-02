"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Coins,
  History,
  Sparkles,
  Gem,
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
    <div className="min-h-screen bg-[#FAF8F5] text-[#1F1C18] flex flex-col max-w-md mx-auto shadow-sm border-x border-[#EFEAE1] pb-24">
      <TopBar showBack={false} />

      <main className="px-4 pt-4 pb-6 space-y-4 flex-1">
        {/* Eyebrow */}
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-1.5 bg-[#F0EBE0] text-[#7A6A2E] text-[10px] font-semibold px-2.5 py-0.5 rounded-full border border-[#E3DCCF] uppercase tracking-wider">
            <Coins className="w-3 h-3" />
            <span>Studio Credits</span>
          </div>
          <span className="text-[10px] uppercase tracking-wider text-[#8C867A] font-semibold">
            Your Balance
          </span>
        </div>

        {/* Balance card */}
        <div className="bg-gradient-to-br from-[#F5EEDB] via-[#EFE6CF] to-[#E4D7B5] rounded-2xl p-5 border border-[#DFD3AF] shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full blur-2xl pointer-events-none" />

          <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#7A6A2E] relative z-10">
            Available Credits
          </div>

          {/* Two numbers */}
          <div className="mt-3 grid grid-cols-2 gap-3 relative z-10">
            <div className="bg-white/60 rounded-xl p-3 border border-[#E0D4AC]">
              <div className="flex items-center gap-1.5 mb-1">
                <Sparkles className="w-3 h-3 text-[#7A6A2E]" />
                <span className="text-[9px] uppercase tracking-wider text-[#7A7366] font-bold">
                  Free
                </span>
              </div>
              <div className="font-serif text-3xl font-bold text-[#1C1917] leading-none">
                {freeCredits}
              </div>
              <div className="text-[9px] text-[#7A7366] mt-1">
                Makes 1080p preview
              </div>
            </div>
            <div className="bg-white/60 rounded-xl p-3 border border-[#E0D4AC]">
              <div className="flex items-center gap-1.5 mb-1">
                <Gem className="w-3 h-3 text-[#7A6A2E]" />
                <span className="text-[9px] uppercase tracking-wider text-[#7A7366] font-bold">
                  Paid
                </span>
              </div>
              <div className="font-serif text-3xl font-bold text-[#1C1917] leading-none">
                {paidCredits}
              </div>
              <div className="text-[9px] text-[#7A7366] mt-1">
                Makes clean 4K JPG
              </div>
            </div>
          </div>

          <div className="mt-3 flex items-center gap-1.5 text-[10px] text-[#635520] font-medium relative z-10">
            <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
            <span>Credits do not expire.</span>
          </div>
        </div>

        {/* Credit packs */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#453F34]">
              Top Up Credits
            </h2>
            <span className="text-[10px] bg-[#F0EBE0] text-[#7A6A2E] px-2 py-0.5 rounded-full border border-[#E3DCCF] font-semibold">
              Coming soon
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {packs.map((pack) => (
              <div
                key={pack.id}
                className={`relative bg-white rounded-xl p-3 border text-center opacity-75 ${
                  pack.popular
                    ? "border-2 border-[#C5A869]"
                    : "border-[#E8E6DF]"
                }`}
              >
                {pack.popular && (
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-[#7A6A2E] text-white text-[8px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider whitespace-nowrap">
                    Popular
                  </div>
                )}
                <div className="text-[10px] uppercase font-bold text-[#8C867A] tracking-wider mt-1">
                  {pack.label}
                </div>
                <div className="font-serif text-xl font-bold text-[#1F1C18] my-1">
                  {pack.credits}
                </div>
                <div className="text-[10px] text-[#7A6A2E] font-semibold">
                  ₹{pack.priceInr.toLocaleString("en-IN")}
                </div>
                <div className="text-[8px] text-[#A8A29E] mt-1">
                  ₹{pack.perPhoto}/photo
                </div>
                <button
                  disabled
                  className="mt-2 w-full py-1.5 rounded-lg bg-[#F0EBE0] text-[#9E8F72] text-[9px] font-bold uppercase tracking-wider cursor-not-allowed"
                >
                  Coming soon
                </button>
              </div>
            ))}
          </div>

          {/* Explainer */}
          <div className="bg-[#F5F0E6] border border-[#E3D9C8] rounded-xl px-4 py-3 space-y-1.5 text-[11px] text-[#5B5226] leading-relaxed">
            <p>
              <span className="font-bold">Free credits</span> make 1080p
              previews with a small watermark — great for proofing your shots.
            </p>
            <p>
              <span className="font-bold">Paid credits</span> make clean,
              watermark-free 4K JPGs ready for your catalogue or social media.
            </p>
            <p>
              <span className="font-bold">Credits never expire.</span> Use them
              at your own pace.
            </p>
          </div>
        </div>

        {/* Credit log */}
        <div className="bg-white rounded-2xl p-4 border border-[#E7E0D3] shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <History className="w-4 h-4 text-[#7A6A2E]" />
              <h3 className="text-xs font-bold text-[#1F1C18]">
                Credit History
              </h3>
            </div>
            <button
              onClick={async () => {
                await refreshCredits();
                await loadLogs();
              }}
              className="text-[10px] text-[#7A6A2E] hover:underline font-semibold flex items-center gap-1"
            >
              <RefreshCw className="w-3 h-3" />
              Refresh
            </button>
          </div>

          {loadingLogs ? (
            <div className="py-5 text-center">
              <Loader2 className="w-4 h-4 animate-spin text-[#C5A869] mx-auto" />
            </div>
          ) : logError ? (
            <div className="flex items-center gap-2 text-xs text-red-700 bg-red-50 rounded-lg p-3">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              {logError}
            </div>
          ) : logs.length === 0 ? (
            <p className="text-xs text-[#9E8F72] text-center py-4">
              No transactions yet.
            </p>
          ) : (
            <div className="divide-y divide-[#F0EDE6]">
              {logs.map((log) => (
                <div
                  key={log.id}
                  className="py-2.5 flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-[#F0EBE0] text-[#7A6A2E] flex items-center justify-center shrink-0">
                      {log.change > 0 ? (
                        <Sparkles className="w-3 h-3" />
                      ) : (
                        <Clock className="w-3 h-3" />
                      )}
                    </div>
                    <div>
                      <div className="font-semibold text-[#1F1C18]">
                        {reasonLabel(log.reason, log.change)}
                      </div>
                      <div className="text-[9px] text-[#8C867A]">
                        {formatDate(log.created_at)} ·{" "}
                        <span className="capitalize">{log.kind}</span>
                      </div>
                    </div>
                  </div>
                  <div
                    className={`font-bold tabular-nums ${
                      log.change > 0 ? "text-emerald-700" : "text-[#78716C]"
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
