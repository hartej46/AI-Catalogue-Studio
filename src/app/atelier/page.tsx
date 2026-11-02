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
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm px-4 pb-6 sm:pb-0">
      <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl space-y-4 border border-[#E8E0D0] animate-in fade-in duration-150">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-red-50 border border-red-200 flex items-center justify-center shrink-0">
            <Trash2 className="w-5 h-5 text-red-600" />
          </div>
          <div>
            <h3 className="font-serif font-bold text-[#1F1C18] text-base">
              Delete account & photos?
            </h3>
            <p className="text-xs text-[#6F675A] mt-1 leading-relaxed">
              This permanently erases your account, all uploaded originals, and
              all generated catalogue photos from our storage servers.
            </p>
          </div>
        </div>

        <div className="bg-red-50 border border-red-100 rounded-xl p-3 text-[11px] text-red-800 leading-relaxed font-medium">
          ⚠️ This action is irreversible. All remaining credits will be permanently forfeited.
        </div>

        {error && (
          <div className="bg-red-100 text-red-800 text-xs p-2.5 rounded-lg">
            {error}
          </div>
        )}

        <div className="flex gap-2.5 pt-2">
          <button
            onClick={onClose}
            disabled={busy}
            className="flex-1 py-2.5 rounded-xl border border-[#E8E0D0] text-xs font-semibold text-[#6F675A] hover:bg-[#F5F0E8] transition-colors disabled:opacity-60"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={busy}
            className="flex-1 py-2.5 rounded-xl bg-red-600 text-white text-xs font-bold hover:bg-red-700 transition-colors flex items-center justify-center gap-1.5 disabled:opacity-60"
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

      <div className="min-h-screen bg-[#FAF8F5] text-[#1F1C18] flex flex-col max-w-md mx-auto shadow-sm border-x border-[#EFEAE1] pb-24">
        <TopBar showBack={false} />

        <main className="px-4 pt-4 pb-6 space-y-4 flex-1">
          {/* Eyebrow */}
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-1.5 bg-[#F0EBE0] text-[#7A6A2E] text-[10px] font-semibold px-2.5 py-0.5 rounded-full border border-[#E3DCCF] uppercase tracking-wider">
              <User className="w-3 h-3" />
              <span>Atelier Account</span>
            </div>
            <span className="text-[10px] uppercase tracking-wider text-[#8C867A] font-semibold">
              Settings & Legal
            </span>
          </div>

          {/* Account Card */}
          <div className="bg-white rounded-2xl p-5 border border-[#E7E0D3] shadow-xs space-y-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#7A6A2E] to-[#5B5226] text-white flex items-center justify-center font-serif text-lg font-bold shrink-0 shadow-xs">
                {identifier.charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[10px] uppercase font-bold tracking-wider text-[#8C867A]">
                  Active Account
                </div>
                <div className="text-sm font-semibold text-[#1F1C18] truncate flex items-center gap-1.5 mt-0.5">
                  {isEmail ? (
                    <Mail className="w-3.5 h-3.5 text-[#7A6A2E] shrink-0" />
                  ) : (
                    <Phone className="w-3.5 h-3.5 text-[#7A6A2E] shrink-0" />
                  )}
                  <span className="truncate">{identifier}</span>
                </div>
              </div>
            </div>

            {/* Quick Credit Overview Link */}
            <Link
              href="/credits"
              className="flex items-center justify-between p-3 rounded-xl bg-[#FAF8F5] border border-[#EFEAE1] hover:bg-[#F5F0E8] transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-[#F0EBE0] text-[#7A6A2E] flex items-center justify-center">
                  <Coins className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-[#1F1C18]">
                    Studio Credits
                  </div>
                  <div className="text-[10px] text-[#8C867A]">
                    {freeCredits} free preview · {paidCredits} paid 4K
                  </div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-[#8C867A]" />
            </Link>
          </div>

          {/* Legal and Support Links */}
          <div className="bg-white rounded-2xl border border-[#E7E0D3] shadow-xs divide-y divide-[#F0EDE6] overflow-hidden">
            <Link
              href="/privacy"
              className="flex items-center justify-between p-4 hover:bg-[#FAF8F5] transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#F0EBE0] text-[#7A6A2E] flex items-center justify-center">
                  <Shield className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-[#1F1C18]">
                    Privacy Policy
                  </div>
                  <div className="text-[10px] text-[#8C867A]">
                    Data protection & image retention rules
                  </div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-[#8C867A]" />
            </Link>

            <Link
              href="/terms"
              className="flex items-center justify-between p-4 hover:bg-[#FAF8F5] transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#F0EBE0] text-[#7A6A2E] flex items-center justify-center">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-[#1F1C18]">
                    Terms of Service
                  </div>
                  <div className="text-[10px] text-[#8C867A]">
                    Commercial license & credit refund terms
                  </div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-[#8C867A]" />
            </Link>
          </div>

          {/* Actions: Sign Out & Delete Account */}
          <div className="space-y-2.5 pt-2">
            <button
              onClick={() => signOut()}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-white border border-[#E3D9C8] text-xs font-semibold text-[#5B5226] hover:bg-[#F5F0E8] transition-colors shadow-2xs"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign out</span>
            </button>

            <button
              onClick={() => setShowDeleteModal(true)}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-red-200 text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
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
