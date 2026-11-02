import { Suspense } from "react";
import Link from "next/link";
import {
  ShieldAlert,
  ArrowLeft,
  KeyRound,
  Loader2,
  CheckCircle2,
  XCircle,
  Clock,
  Zap,
  RefreshCw,
  AlertTriangle,
} from "lucide-react";
import { getCurrentUser } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase/server";

export const metadata = {
  title: "Job Monitor (/dev/jobs) — Atelier AI Lab",
  description: "Internal developer job log for Atelier Catalogue Studio.",
};

// ─────────────────────────────────────────────────────────────
// Access control helper
// ─────────────────────────────────────────────────────────────
function isAdmin(email: string): boolean {
  const rawAdminEmails = process.env.ADMIN_EMAILS || "";
  const adminEmails = rawAdminEmails
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
  return Boolean(email && adminEmails.includes(email.toLowerCase().trim()));
}

// ─────────────────────────────────────────────────────────────
// Status badge helpers
// ─────────────────────────────────────────────────────────────
function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { icon: React.ReactNode; cls: string; label: string }> = {
    done: {
      icon: <CheckCircle2 className="w-3 h-3" />,
      cls: "bg-emerald-900/40 text-emerald-300 border-emerald-700/50",
      label: "Done",
    },
    failed: {
      icon: <XCircle className="w-3 h-3" />,
      cls: "bg-red-900/40 text-red-300 border-red-700/50",
      label: "Failed",
    },
    running: {
      icon: <RefreshCw className="w-3 h-3 animate-spin" />,
      cls: "bg-blue-900/40 text-blue-300 border-blue-700/50",
      label: "Running",
    },
    queued: {
      icon: <Clock className="w-3 h-3" />,
      cls: "bg-[#2B2720] text-[#9E9586] border-[#3A342A]",
      label: "Queued",
    },
  };
  const s = map[status] ?? map["queued"];
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide border ${s.cls}`}
    >
      {s.icon} {s.label}
    </span>
  );
}

function CreditBadge({ kind }: { kind: string | null }) {
  if (!kind) return <span className="text-[#6B6357] text-[10px]">—</span>;
  const isPaid = kind === "paid";
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border ${
        isPaid
          ? "bg-amber-900/40 text-amber-300 border-amber-700/50"
          : "bg-[#2B2720] text-[#9E9586] border-[#3A342A]"
      }`}
    >
      <Zap className="w-2.5 h-2.5" />
      {isPaid ? "Paid" : "Free"}
    </span>
  );
}

// ─────────────────────────────────────────────────────────────
// Main data component (server-side)
// ─────────────────────────────────────────────────────────────
async function DevJobsContent() {
  const user = await getCurrentUser();
  const userEmail = user?.email?.toLowerCase().trim() || "";

  if (!isAdmin(userEmail)) {
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
              The{" "}
              <code className="bg-[#242019] px-1.5 py-0.5 rounded text-[#C5A869] font-mono">
                /dev/jobs
              </code>{" "}
              monitor is private and strictly visible only to administrator
              emails specified in{" "}
              <code className="bg-[#242019] px-1.5 py-0.5 rounded text-[#C5A869] font-mono">
                ADMIN_EMAILS
              </code>
              .
            </p>
          </div>
          <div className="bg-[#211E18] rounded-xl p-3.5 text-xs text-[#8F8778] text-left space-y-1.5 border border-[#2F2920]">
            <div className="flex items-start justify-between gap-2">
              <span className="font-semibold text-[#C4BCAD]">Current session:</span>
              <span className="font-mono text-[11px] text-[#EDE7DB] truncate max-w-[200px]">
                {userEmail || "Anonymous / Unauthenticated"}
              </span>
            </div>
            <div className="flex items-start justify-between gap-2">
              <span className="font-semibold text-[#C4BCAD]">Access status:</span>
              <span className="text-red-400 font-bold text-[11px]">Unauthorized</span>
            </div>
          </div>
          <div className="pt-2 flex flex-col gap-2.5">
            {!user ? (
              <Link
                href="/login?redirectTo=/dev/jobs"
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

  // Fetch the last 100 jobs (admin client bypasses RLS)
  const adminClient = await createAdminClient();
  const { data: jobs, error: fetchError } = await adminClient
    .from("jobs")
    .select(
      "id, user_id, domain, status, quality, credit_kind, model, qc_result, error, created_at, finished_at"
    )
    .order("created_at", { ascending: false })
    .limit(100);

  if (fetchError) {
    return (
      <div className="min-h-screen bg-[#0E0D0A] text-red-400 flex items-center justify-center text-sm">
        Failed to load jobs: {fetchError.message}
      </div>
    );
  }

  const formatDuration = (created: string, finished: string | null): string => {
    if (!finished) return "—";
    const ms = new Date(finished).getTime() - new Date(created).getTime();
    const s = Math.round(ms / 1000);
    return s < 60 ? `${s}s` : `${Math.floor(s / 60)}m ${s % 60}s`;
  };

  const formatTime = (ts: string): string => {
    const d = new Date(ts);
    return d.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZone: "Asia/Kolkata",
    });
  };

  return (
    <div className="min-h-screen bg-[#0E0D0A] text-[#EDE7DB]">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-[#0E0D0A]/90 backdrop-blur border-b border-[#2B2720] px-5 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/dev/prompt"
            className="text-[#9E9586] hover:text-[#EDE7DB] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="font-serif text-sm font-bold text-[#F5F0E6] tracking-tight">
              Job Monitor
            </h1>
            <p className="text-[10px] text-[#6B6357] font-mono">/dev/jobs</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-[10px] text-[#6B6357]">
          <span className="font-mono">{jobs?.length ?? 0} of last 100</span>
          <span className="px-2 py-0.5 rounded bg-[#181612] border border-[#2B2720] text-[#C5A869] font-bold">
            ADMIN
          </span>
        </div>
      </header>

      {/* Legend */}
      <div className="px-5 pt-4 pb-2 flex flex-wrap gap-2 text-[10px] text-[#6B6357]">
        <span>QC Result column shows what the vision model returned.</span>
        <span className="text-[#C5A869]">
          Yellow = QC fail reason. Green = QC passed.
        </span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto px-3 pb-10">
        <table className="w-full min-w-[1100px] text-xs border-collapse">
          <thead>
            <tr className="text-left text-[10px] uppercase tracking-widest text-[#6B6357] border-b border-[#2B2720]">
              <th className="py-2 px-3 font-semibold w-[120px]">Time (IST)</th>
              <th className="py-2 px-3 font-semibold">ID</th>
              <th className="py-2 px-3 font-semibold">Domain</th>
              <th className="py-2 px-3 font-semibold">Status</th>
              <th className="py-2 px-3 font-semibold">Credit</th>
              <th className="py-2 px-3 font-semibold">Quality</th>
              <th className="py-2 px-3 font-semibold">Model</th>
              <th className="py-2 px-3 font-semibold">Duration</th>
              <th className="py-2 px-3 font-semibold">QC Result</th>
              <th className="py-2 px-3 font-semibold">Error / Reason</th>
            </tr>
          </thead>
          <tbody>
            {(jobs ?? []).map((job, i) => {
              const qcResult = job.qc_result as Record<string, any> | null;
              const qcMatch = qcResult?.qc_match;
              const qcReason = qcResult?.qc_reason || qcResult?.qc_fail_reason || null;
              const isRefunded = qcResult?.refunded === true;

              return (
                <tr
                  key={job.id}
                  className={`border-b border-[#1C1915] transition-colors hover:bg-[#181612] ${
                    i % 2 === 0 ? "bg-transparent" : "bg-[#121009]"
                  }`}
                >
                  {/* Time */}
                  <td className="py-2 px-3 font-mono text-[10px] text-[#6B6357] whitespace-nowrap">
                    {formatTime(job.created_at)}
                  </td>

                  {/* ID */}
                  <td className="py-2 px-3">
                    <span className="font-mono text-[10px] text-[#5C5448]">
                      {job.id.slice(0, 8)}…
                    </span>
                  </td>

                  {/* Domain */}
                  <td className="py-2 px-3">
                    <span className="capitalize text-[#C4BCAD] font-medium">
                      {job.domain || "—"}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="py-2 px-3">
                    <StatusBadge status={job.status} />
                  </td>

                  {/* Credit kind */}
                  <td className="py-2 px-3">
                    <CreditBadge kind={job.credit_kind} />
                  </td>

                  {/* Quality */}
                  <td className="py-2 px-3 text-[#9E9586] capitalize">
                    {job.quality || "preview"}
                  </td>

                  {/* Model */}
                  <td className="py-2 px-3">
                    <span className="font-mono text-[10px] text-[#7A7160] max-w-[160px] truncate block">
                      {job.model || "—"}
                    </span>
                  </td>

                  {/* Duration */}
                  <td className="py-2 px-3 font-mono text-[10px] text-[#6B6357]">
                    {formatDuration(job.created_at, job.finished_at)}
                  </td>

                  {/* QC Result */}
                  <td className="py-2 px-3 max-w-[220px]">
                    {job.status === "done" && qcMatch === true ? (
                      <div className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="text-emerald-300 text-[10px] leading-snug">
                          {qcReason || "Match confirmed"}
                        </span>
                      </div>
                    ) : job.status === "failed" && qcReason ? (
                      <div className="flex items-start gap-1.5">
                        {isRefunded && (
                          <AlertTriangle className="w-3 h-3 text-amber-400 shrink-0 mt-0.5" />
                        )}
                        <span className="text-amber-300 text-[10px] leading-snug break-words">
                          {qcReason}
                        </span>
                      </div>
                    ) : (
                      <span className="text-[#4A443C] text-[10px]">—</span>
                    )}
                  </td>

                  {/* Error / technical reason */}
                  <td className="py-2 px-3 max-w-[220px]">
                    {job.error ? (
                      <span className="text-red-400/80 text-[10px] leading-snug break-words">
                        {job.error}
                      </span>
                    ) : (
                      <span className="text-[#4A443C] text-[10px]">—</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {(jobs ?? []).length === 0 && (
          <div className="text-center py-16 text-[#4A443C] text-xs">
            No jobs found.
          </div>
        )}
      </div>
    </div>
  );
}

export default function DevJobsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#0E0D0A] text-[#EDE7DB] flex items-center justify-center">
          <div className="flex items-center gap-2 text-xs text-[#8F8778]">
            <Loader2 className="w-4 h-4 animate-spin text-[#C5A869]" />
            <span>Loading job monitor...</span>
          </div>
        </div>
      }
    >
      <DevJobsContent />
    </Suspense>
  );
}
