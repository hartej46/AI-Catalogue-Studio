"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  BookOpen,
  Loader2,
  RefreshCw,
  Trash2,
  AlertCircle,
  Sparkles,
  ArrowRight,
  X,
  RotateCcw,
} from "lucide-react";
import { TopBar, BottomTabBar, SupportChip } from "@/components";

interface LookbookItem {
  id: string;
  domain: string;
  status: "queued" | "running" | "done" | "failed";
  quality: "preview" | "final";
  credit_kind: "free" | "paid" | null;
  product_name: string | null;
  style_label: string | null;
  error: string | null;
  thumb_url: string | null;
  created_at: string;
  finished_at: string | null;
}

const DOMAIN_FILTERS = ["all", "jewellery", "optical", "footwear"] as const;
type DomainFilter = (typeof DOMAIN_FILTERS)[number];

const DOMAIN_LABELS: Record<DomainFilter, string> = {
  all: "All",
  jewellery: "Jewellery",
  optical: "Optical",
  footwear: "Footwear",
};

function formatDate(ts: string): string {
  return new Date(ts).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

// ── Confirmation dialog ─────────────────────────────────────────────────────
function DeleteDialog({
  item,
  onConfirm,
  onCancel,
  busy,
}: {
  item: LookbookItem;
  onConfirm: () => void;
  onCancel: () => void;
  busy: boolean;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-ink/50 px-4 pb-6 sm:pb-0">
      <div className="bg-surface rounded-[8px] p-6 max-w-sm w-full shadow-warm-md space-y-4 border border-border">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-[4px] bg-bg border border-border flex items-center justify-center shrink-0">
            <Trash2 className="w-4 h-4 text-accent" />
          </div>
          <div>
            <h3 className="font-serif font-bold text-ink text-base">
              Delete this photo?
            </h3>
            <p className="text-xs text-muted mt-1 leading-relaxed">
              This permanently removes the generated image and your original
              upload from storage. <strong className="text-ink">No credit is returned.</strong>
            </p>
          </div>
        </div>

        {item.product_name && (
          <div className="bg-bg border border-border rounded-[4px] px-3 py-2 text-xs text-ink font-medium">
            "{item.product_name}"
          </div>
        )}

        <div className="flex gap-2.5 pt-1">
          <button
            onClick={onCancel}
            disabled={busy}
            className="flex-1 py-2.5 rounded-[4px] border border-border bg-surface text-xs font-semibold text-muted hover:text-ink hover:bg-bg transition-colors duration-150"
          >
            Keep it
          </button>
          <button
            onClick={onConfirm}
            disabled={busy}
            className="flex-1 py-2.5 rounded-[4px] bg-accent text-bg text-xs font-bold hover:bg-accent-hover transition-colors duration-150 flex items-center justify-center gap-1.5"
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

// ── Individual Grid Card ────────────────────────────────────────────────────
function LookbookCard({
  item,
  onDelete,
  onClick,
}: {
  item: LookbookItem;
  onDelete: (item: LookbookItem) => void;
  onClick: (item: LookbookItem) => void;
}) {
  const isDone = item.status === "done";
  const isFailed = item.status === "failed";
  const isRunning = item.status === "running" || item.status === "queued";

  return (
    <div className="relative group rounded-[6px] overflow-hidden bg-bg border border-border shadow-warm-sm aspect-[3/4]">
      {/* Thumbnail / state layer */}
      <button
        onClick={() => onClick(item)}
        className="absolute inset-0 w-full h-full focus:outline-none"
        aria-label={`Open ${item.product_name || item.domain} review`}
      >
        {isDone && item.thumb_url ? (
          <Image
            src={item.thumb_url}
            alt={item.product_name || item.domain}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 50vw, 33vw"
            unoptimized // signed URLs already optimised
          />
        ) : isRunning ? (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-surface">
            <Loader2 className="w-5 h-5 text-brass animate-spin" />
            <span className="text-[9px] uppercase tracking-wider text-muted font-semibold">
              Creating…
            </span>
          </div>
        ) : isFailed ? (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-surface">
            <AlertCircle className="w-5 h-5 text-accent" />
            <span className="text-[9px] uppercase tracking-wider text-accent font-semibold">
              Credit returned
            </span>
          </div>
        ) : null}

        {/* Quality badge */}
        {isDone && (
          <div className="absolute top-1.5 left-1.5">
            <span className="text-[8px] font-semibold uppercase px-1.5 py-0.5 rounded-[2px] bg-ink/80 text-bg border border-border/20">
              {item.quality === "final" ? "4K" : "Preview"}
            </span>
          </div>
        )}
      </button>

      {/* Delete button — accessible on touch and hover */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete(item);
        }}
        className="absolute top-1.5 right-1.5 w-6 h-6 rounded-[3px] bg-ink/70 text-bg flex items-center justify-center opacity-80 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity hover:bg-accent shadow-warm-sm"
        aria-label="Delete photo"
      >
        <Trash2 className="w-3 h-3" />
      </button>

      {/* Caption strip - flat dark backdrop, no heavy gradients */}
      <div className="absolute bottom-0 left-0 right-0 bg-ink/85 px-2.5 py-2 pointer-events-none">
        <div className="text-bg text-[10px] font-medium leading-tight truncate">
          {item.product_name || `${item.domain} shoot`}
        </div>
        <div className="flex items-center gap-1.5 mt-0.5">
          <span className="text-bg/70 text-[8px] capitalize">{item.domain}</span>
          {item.style_label && (
            <>
              <span className="text-bg/40 text-[8px]">·</span>
              <span className="text-bg/70 text-[8px] truncate">{item.style_label}</span>
            </>
          )}
          <span className="ml-auto text-bg/50 text-[8px] shrink-0">
            {formatDate(item.created_at)}
          </span>
        </div>
      </div>
    </div>
  );
}

// ── Main Page ───────────────────────────────────────────────────────────────
export default function LookbookPage() {
  const router = useRouter();
  const [filter, setFilter] = useState<DomainFilter>("all");
  const [items, setItems] = useState<LookbookItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Delete dialog state
  const [deletingItem, setDeletingItem] = useState<LookbookItem | null>(null);
  const [deletesBusy, setDeletesBusy] = useState(false);

  const fetchItems = useCallback(
    async (domain: DomainFilter, cursor: string | null, append: boolean) => {
      try {
        const params = new URLSearchParams();
        if (domain !== "all") params.set("domain", domain);
        if (cursor) params.set("cursor", cursor);
        const res = await fetch(`/api/lookbook?${params}`);
        if (!res.ok) throw new Error((await res.json()).error || "Failed to load");
        const data = await res.json();
        setItems((prev) => (append ? [...prev, ...data.items] : data.items));
        setNextCursor(data.nextCursor);
      } catch (e: any) {
        setError(e.message);
      }
    },
    []
  );

  // Initial load + filter change
  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchItems(filter, null, false).finally(() => setLoading(false));
  }, [filter, fetchItems]);

  const handleLoadMore = async () => {
    if (!nextCursor || loadingMore) return;
    setLoadingMore(true);
    await fetchItems(filter, nextCursor, true);
    setLoadingMore(false);
  };

  const handleDelete = async () => {
    if (!deletingItem || deletesBusy) return;
    setDeletesBusy(true);
    try {
      const res = await fetch(`/api/jobs/${deletingItem.id}/delete`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error((await res.json()).error || "Delete failed");
      setItems((prev) => prev.filter((i) => i.id !== deletingItem.id));
      setDeletingItem(null);
    } catch (e: any) {
      alert(e.message);
    } finally {
      setDeletesBusy(false);
    }
  };

  const handleCardClick = (item: LookbookItem) => {
    router.push(`/studio/${item.domain}/review/${item.id}`);
  };

  const handleTabChange = (tab: "studio" | "lookbook" | "credits" | "atelier") => {
    if (tab === "studio") router.push("/studio/jewellery");
    else if (tab === "credits") router.push("/credits");
    else if (tab === "atelier") router.push("/atelier");
  };

  return (
    <>
      {deletingItem && (
        <DeleteDialog
          item={deletingItem}
          onConfirm={handleDelete}
          onCancel={() => setDeletingItem(null)}
          busy={deletesBusy}
        />
      )}

      <div className="min-h-screen bg-bg text-ink flex flex-col pb-24">
        <TopBar showBack={false} />

        <main className="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-6 pb-12 space-y-6 flex-1">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-1.5 bg-surface text-ink text-[10px] font-semibold px-2.5 py-1 rounded-[4px] border border-border uppercase tracking-wider">
              <BookOpen className="w-3.5 h-3.5 text-brass" />
              <span>Lookbook Gallery</span>
            </div>
            <span className="text-xs uppercase tracking-wider text-muted font-medium">
              Your Atelier Archive
            </span>
          </div>

          {/* Domain filter chips */}
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            {DOMAIN_FILTERS.map((d) => (
              <button
                key={d}
                onClick={() => setFilter(d)}
                className={`shrink-0 px-3.5 py-2 rounded-[4px] text-xs font-semibold border transition-colors duration-150 ${
                  filter === d
                    ? "bg-accent text-bg border-accent shadow-warm-sm"
                    : "bg-surface text-muted border-border hover:border-muted hover:text-ink"
                }`}
              >
                {DOMAIN_LABELS[d]}
              </button>
            ))}
          </div>

          {/* Content */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-16 gap-3">
              <Loader2 className="w-5 h-5 text-accent animate-spin" />
              <span className="text-xs text-muted">Loading your gallery…</span>
            </div>
          ) : error ? (
            <div className="bg-surface border border-accent rounded-[6px] p-4 text-xs text-accent flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {error}
            </div>
          ) : items.length === 0 ? (
            <div className="bg-surface rounded-[6px] p-6 border border-border shadow-warm-sm text-center space-y-3 mt-2">
              <div className="w-10 h-10 rounded-[4px] bg-bg border border-border text-brass flex items-center justify-center mx-auto">
                <BookOpen className="w-5 h-5" />
              </div>
              <h1 className="font-serif text-lg font-bold text-ink">
                {filter === "all" ? "No photos yet" : `No ${DOMAIN_LABELS[filter]} photos yet`}
              </h1>
              <p className="text-xs text-muted max-w-xs mx-auto leading-relaxed">
                Your styled catalogue renders will appear here once you create your first shoot.
              </p>
              <button
                onClick={() => router.push("/studio/jewellery")}
                className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-bg px-5 py-2.5 rounded-[4px] text-xs font-semibold uppercase tracking-wider transition-colors duration-150 shadow-warm-sm"
              >
                <span>Start Studio Shoot</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <>
              {/* Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {items.map((item) => (
                  <LookbookCard
                    key={item.id}
                    item={item}
                    onDelete={setDeletingItem}
                    onClick={handleCardClick}
                  />
                ))}
              </div>

              {/* Load more */}
              {nextCursor && (
                <div className="pt-2 flex justify-center">
                  <button
                    onClick={handleLoadMore}
                    disabled={loadingMore}
                    className="flex items-center gap-2 px-5 py-2 rounded-[4px] border border-border bg-surface text-xs font-semibold text-ink hover:bg-bg transition-colors duration-150 disabled:opacity-60 shadow-warm-sm"
                  >
                    {loadingMore ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <RotateCcw className="w-3.5 h-3.5" />
                    )}
                    {loadingMore ? "Loading…" : "Load more"}
                  </button>
                </div>
              )}
            </>
          )}
        </main>

        <SupportChip />
        <BottomTabBar activeTab="lookbook" onChange={handleTabChange} isFixed={true} />
      </div>
    </>
  );
}
