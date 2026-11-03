"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  User,
  Mail,
  Phone,
  LogOut,
  Trash2,
  Shield,
  FileText,
  ChevronRight,
  AlertTriangle,
  Loader2,
  Coins,
  Sparkles,
} from "lucide-react";
import { TopBar, BottomTabBar, SupportChip } from "@/components";
import { useAuth } from "@/lib/auth-context";

// ── Confirmation Modal ───────────────────────────────────────────────────────
function DeleteAccountDialog({
  isOpen,
  onClose,
  onConfirm,
  busy,
  error,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  busy: boolean;
  error: string | null;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-ink/50 px-4 pb-6 sm:pb-0">
      <div className="bg-surface rounded-[8px] p-6 max-w-sm w-full shadow-warm-md space-y-4 border border-border">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-[4px] bg-bg border border-border flex items-center justify-center shrink-0">
            <Trash2 className="w-4 h-4 text-accent" />
          </div>
          <div>
            <h3 className="font-serif font-bold text-ink text-base">
              Delete account &amp; photos?
            </h3>
            <p className="text-xs text-muted mt-1 leading-relaxed">
              This permanently erases your account, all uploaded originals, and
              all generated catalogue photos from our storage servers.
            </p>
          </div>
        </div>

        <div className="bg-bg border border-border rounded-[4px] p-3 text-[11px] text-ink leading-relaxed">
          Notice: This action is irreversible. All remaining credits will be permanently forfeited.
        </div>

        {error && (
          <div className="bg-surface border border-accent text-accent text-xs p-2.5 rounded-[4px]">
            {error}
          </div>
        )}

        <div className="flex gap-2.5 pt-2">
          <button
            onClick={onClose}
            disabled={busy}
            className="flex-1 py-2.5 rounded-[4px] border border-border bg-surface text-xs font-semibold text-muted hover:text-ink hover:bg-bg transition-colors duration-150 disabled:opacity-60"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={busy}
            className="flex-1 py-2.5 rounded-[4px] bg-accent text-bg text-xs font-bold hover:bg-accent-hover transition-colors duration-150 flex items-center justify-center gap-1.5 disabled:opacity-60"
          >
            {busy ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Trash2 className="w-3.5 h-3.5" />
            )}
            {busy ? "Deleting…" : "Yes, delete"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Atelier Page ─────────────────────────────────────────────────────────────
export default function AtelierPage() {
  const router = useRouter();
  const { user, profile, freeCredits, paidCredits, signOut, loading } = useAuth();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteBusy, setDeleteBusy] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const identifier =
    profile?.email ||
    user?.email ||
    profile?.phone ||
    user?.phone ||
    (loading ? "Loading account…" : "Signed-in Merchant");

  const isEmail = identifier.includes("@");

  const handleTabChange = (tab: "studio" | "lookbook" | "credits" | "atelier") => {
    if (tab === "studio") router.push("/studio/jewellery");
    else if (tab === "lookbook") router.push("/lookbook");
    else if (tab === "credits") router.push("/credits");
  };

  const handleDeleteAccount = async () => {
    setDeleteBusy(true);
    setDeleteError(null);
    try {
      const res = await fetch("/api/account/delete", {
        method: "DELETE",
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to delete account");
      }
      // Successfully deleted — clear auth session and navigate to login
      await signOut();
    } catch (err: any) {
      setDeleteError(err.message || "Failed to delete account");
      setDeleteBusy(false);
    }
  };

  return (
    <>
      <DeleteAccountDialog
        isOpen={showDeleteModal}
        onClose={() => {
          if (!deleteBusy) {
            setShowDeleteModal(false);
            setDeleteError(null);
          }
        }}
        onConfirm={handleDeleteAccount}
        busy={deleteBusy}
        error={deleteError}
      />

      <div className="min-h-screen bg-bg text-ink flex flex-col pb-24">
        <TopBar showBack={false} />

        <main className="max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-6 pb-12 space-y-6 flex-1">
          {/* Eyebrow */}
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-1.5 bg-surface text-ink text-[10px] font-semibold px-2.5 py-1 rounded-[4px] border border-border uppercase tracking-wider">
              <User className="w-3.5 h-3.5 text-brass" />
              <span>Atelier Account</span>
            </div>
            <span className="text-xs uppercase tracking-wider text-muted font-medium">
              Settings &amp; Legal
            </span>
          </div>

          {/* Account Card */}
          <div className="bg-surface rounded-[8px] p-5 sm:p-7 border border-border shadow-warm-card space-y-5">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-[4px] bg-accent text-bg flex items-center justify-center font-serif text-base font-bold shrink-0">
                {identifier.charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[10px] uppercase font-semibold tracking-wider text-muted">
                  Active Account
                </div>
                <div className="text-sm font-semibold text-ink truncate flex items-center gap-1.5 mt-0.5">
                  {isEmail ? (
                    <Mail className="w-3.5 h-3.5 text-brass shrink-0" />
                  ) : (
                    <Phone className="w-3.5 h-3.5 text-brass shrink-0" />
                  )}
                  <span className="truncate">{identifier}</span>
                </div>
              </div>
            </div>

            {/* Quick Credit Overview Link */}
            <Link
              href="/credits"
              className="flex items-center justify-between p-3 rounded-[4px] bg-bg border border-border hover:bg-surface transition-colors duration-150"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-[3px] bg-surface border border-border text-brass flex items-center justify-center">
                  <Coins className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-ink">
                    Studio Credits
                  </div>
                  <div className="text-[10px] text-muted">
                    {freeCredits} free preview · {paidCredits} paid 4K
                  </div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-muted" />
            </Link>
          </div>

          {/* Legal and Support Links */}
          <div className="bg-surface rounded-[6px] border border-border shadow-warm-sm divide-y divide-border overflow-hidden">
            <Link
              href="/privacy"
              className="flex items-center justify-between p-3.5 hover:bg-bg transition-colors duration-150"
            >
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-[3px] bg-bg border border-border text-brass flex items-center justify-center">
                  <Shield className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-ink">
                    Privacy Policy
                  </div>
                  <div className="text-[10px] text-muted">
                    Data protection &amp; image retention rules
                  </div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-muted" />
            </Link>

            <Link
              href="/terms"
              className="flex items-center justify-between p-3.5 hover:bg-bg transition-colors duration-150"
            >
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-[3px] bg-bg border border-border text-brass flex items-center justify-center">
                  <FileText className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-ink">
                    Terms of Service
                  </div>
                  <div className="text-[10px] text-muted">
                    Commercial license &amp; credit refund terms
                  </div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-muted" />
            </Link>
          </div>

          {/* Actions: Sign Out & Delete Account */}
          <div className="space-y-2 pt-2">
            <button
              onClick={() => signOut()}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-[4px] bg-surface border border-border text-xs font-semibold text-ink hover:bg-bg transition-colors duration-150 shadow-warm-sm"
            >
              <LogOut className="w-3.5 h-3.5 text-muted" />
              <span>Sign out</span>
            </button>

            <button
              onClick={() => setShowDeleteModal(true)}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-[4px] border border-border bg-bg text-xs font-medium text-accent hover:border-accent transition-colors duration-150"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete my account and photos</span>
            </button>
          </div>
        </main>

        <SupportChip />
        <BottomTabBar activeTab="atelier" onChange={handleTabChange} isFixed={true} />
      </div>
    </>
  );
}
