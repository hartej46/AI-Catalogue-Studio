"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Diamond,
  Footprints,
  Glasses,
  Sparkles,
  Camera,
  Layers,
  Sliders,
  CheckCircle2,
  Smartphone,
  Maximize2,
  ShieldCheck,
  ChevronRight,
  ArrowRight,
  Flame,
  Wand2,
} from "lucide-react";

import {
  TopBar,
  CategorySwitcher,
  CategoryKey,
  BottomTabBar,
  TabKey,
  SupportChip,
  StepProgress,
  SelectCard,
  StyleCard,
  SizeCard,
  StickyActionBar,
  Button,
  Badge,
  CreditsPill,
  Toast,
  BottomDrawer,
  ListLoadingState,
  ListEmptyState,
  ListErrorState,
} from "@/components";

export default function DevComponentsPage() {
  // Viewport mode toggle (390px mobile container vs full responsive)
  const [isMobileMode, setIsMobileMode] = useState(true);

  // Component state controls
  const [credits, setCredits] = useState(3);
  const [category, setCategory] = useState<CategoryKey>("JEWELLERY");
  const [tab, setTab] = useState<TabKey>("studio");
  const [step, setStep] = useState(2);
  const [selectedProduct, setSelectedProduct] = useState("polki-necklace");
  const [selectedStyle, setSelectedStyle] = useState("heritage-plinth");
  const [selectedSize, setSelectedSize] = useState("1:1");

  // Button state demos
  const [isButtonLoading, setIsButtonLoading] = useState(false);

  // Toast state
  const [activeToast, setActiveToast] = useState<{
    type: "success" | "error" | "info";
    title: string;
    message: string;
  } | null>(null);

  // Drawer state
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // List states toggle
  const [listStateView, setListStateView] = useState<"data" | "loading" | "empty" | "error">("data");

  const triggerToast = (type: "success" | "error" | "info") => {
    if (type === "success") {
      setActiveToast({
        type: "success",
        title: "Atelier Synthesis Initiated",
        message: "Your Polki necklace is being staged on Jaipur heritage plinth.",
      });
    } else if (type === "error") {
      setActiveToast({
        type: "error",
        title: "Synthesis Error",
        message: "Neural stagecraft timed out. No credits were deducted.",
      });
    } else {
      setActiveToast({
        type: "info",
        title: "Editorial Lighting Tip",
        message: "Position footwear at 45° angle for dramatic side-shadow falloff.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F3EC] py-6 px-3 sm:px-6 text-[#1C1917]">
      {/* Dev Header & Controls */}
      <div className="max-w-4xl mx-auto mb-6 bg-white border border-[#E8E6DF] rounded-2xl p-4 shadow-warm-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-serif text-2xl font-bold text-[#1C1917]">
              Catalogue Studio · Design System
            </span>
            <Badge variant="gold" size="sm">
              v2.0 DEV
            </Badge>
          </div>
          <p className="text-xs text-[#78716C] mt-0.5 font-sans">
            Atelier component library &amp; mobile shell preview (/dev/components)
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Mode toggle */}
          <button
            type="button"
            onClick={() => setIsMobileMode(!isMobileMode)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#F5EEDB] text-[#7A6A2E] border border-[#E8DFBE] hover:bg-[#E8DFBE] transition-colors"
          >
            {isMobileMode ? (
              <>
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Responsive View</span>
              </>
            ) : (
              <>
                <Smartphone className="w-3.5 h-3.5" />
                <span>390px Mobile Canvas</span>
              </>
            )}
          </button>

          <Link
            href="/"
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white border border-[#E8E6DF] text-[#57534E] hover:text-[#1C1917] hover:border-[#7A6A2E] transition-colors"
          >
            <span>Landing Page</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>

      {/* Main Container: either simulated 390px mobile canvas or full responsive */}
      <div
        className={`mx-auto transition-all duration-300 ${
          isMobileMode
            ? "max-w-[390px] shadow-2xl rounded-3xl overflow-hidden border border-[#E8E6DF] bg-[#FDF9F3]"
            : "max-w-3xl rounded-2xl border border-[#E8E6DF] bg-[#FDF9F3] p-4 sm:p-6"
        }`}
      >
        {/* ============================================================ */}
        {/* COMPONENT 1: TopBar */}
        {/* ============================================================ */}
        <section className="border-b border-[#E8E6DF] pb-2">
          <div className="px-4 py-2 bg-[#FAF6ED] text-[10px] label-micro text-[#8C867A] flex items-center justify-between border-b border-[#E8E6DF]/60">
            <span>1. TOPBAR</span>
            <span>BRAND · CREDITS · AVATAR</span>
          </div>
          <TopBar
            credits={credits}
            onCreditsClick={() => {
              setCredits((prev) => prev + 1);
              triggerToast("info");
            }}
            onAvatarClick={() => setIsDrawerOpen(true)}
            showBack={true}
            onBack={() => triggerToast("info")}
          />
        </section>

        {/* Content Body */}
        <div className="p-4 space-y-8">
          {/* ============================================================ */}
          {/* COMPONENT 2: CategorySwitcher */}
          {/* ============================================================ */}
          <section className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="label-micro text-[#7A6A2E]">
                2. CATEGORY SWITCHER (3-WAY SEGMENTED)
              </span>
              <span className="text-[10px] text-[#8C867A]">
                Selected: {category}
              </span>
            </div>
            <CategorySwitcher
              selected={category}
              onChange={(newCat) => setCategory(newCat)}
              showIcons={true}
            />
          </section>

          {/* ============================================================ */}
          {/* COMPONENT 5: StepProgress */}
          {/* ============================================================ */}
          <section className="space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="label-micro text-[#7A6A2E]">
                5. STEP PROGRESS (4 SEGMENTS)
              </span>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setStep(s)}
                    className={`w-5 h-5 rounded text-[10px] font-bold transition-colors ${
                      step === s
                        ? "bg-[#7A6A2E] text-white"
                        : "bg-[#F5EEDB] text-[#7A6A2E]"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <StepProgress
              currentStep={step}
              totalSteps={4}
              stepName={
                step === 1
                  ? "Raw Photo"
                  : step === 2
                  ? "Product Type"
                  : step === 3
                  ? "Shot Style"
                  : "Final Output"
              }
            />
          </section>

          {/* ============================================================ */}
          {/* COMPONENT 6: SelectCard */}
          {/* ============================================================ */}
          <section className="space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="label-micro text-[#7A6A2E]">
                6. SELECT CARDS (NORMAL, SELECTED, DISABLED)
              </span>
            </div>
            <div className="space-y-2">
              <SelectCard
                icon={<Diamond className="w-5 h-5" />}
                name="Polki & Kundan Choker"
                label="Uncut diamond staging with velvet drape"
                badge="VOGUE"
                selected={selectedProduct === "polki-necklace"}
                onClick={() => setSelectedProduct("polki-necklace")}
              />

              <SelectCard
                icon={<Sparkles className="w-5 h-5" />}
                name="Temple Gold Kada"
                label="Antique matte 22K finish with warm side light"
                selected={selectedProduct === "temple-gold"}
                onClick={() => setSelectedProduct("temple-gold")}
              />

              <SelectCard
                icon={<Layers className="w-5 h-5" />}
                name="Bespoke Emerald Jhumka"
                label="Requires Studio Atelier Pro license"
                disabled={true}
              />
            </div>
          </section>

          {/* ============================================================ */}
          {/* COMPONENT 7: StyleCard */}
          {/* ============================================================ */}
          <section className="space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="label-micro text-[#7A6A2E]">
                7. STYLE CARDS (SAMPLE IMAGE + DESCRIPTION)
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <StyleCard
                imageUrl="/styles/jewellery_craft.jpg"
                name="Jaipur Travertine Plinth"
                description="Carved raw sand plinth with warm golden-hour rake."
                tag="EDITORIAL"
                selected={selectedStyle === "heritage-plinth"}
                onClick={() => setSelectedStyle("heritage-plinth")}
              />

              <StyleCard
                imageUrl="/styles/footwear_craft.jpg"
                name="Minimalist Sand Podium"
                description="Neutral soft shadow editorial stage for footwear."
                tag="COMMERCIAL"
                selected={selectedStyle === "minimal-podium"}
                onClick={() => setSelectedStyle("minimal-podium")}
              />
            </div>
          </section>

          {/* ============================================================ */}
          {/* COMPONENT 8: SizeCard */}
          {/* ============================================================ */}
          <section className="space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="label-micro text-[#7A6A2E]">
                8. SIZE CARDS (RATIO OUTLINE + LABEL)
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              <SizeCard
                ratio="1:1"
                name="Feed Square"
                recommendedFor="Instagram & Catalog"
                selected={selectedSize === "1:1"}
                onClick={() => setSelectedSize("1:1")}
              />

              <SizeCard
                ratio="4:5"
                name="Vertical Post"
                recommendedFor="Max feed engagement"
                selected={selectedSize === "4:5"}
                onClick={() => setSelectedSize("4:5")}
              />

              <SizeCard
                ratio="9:16"
                name="Story & Reel"
                recommendedFor="Full-screen mobile"
                selected={selectedSize === "9:16"}
                onClick={() => setSelectedSize("9:16")}
              />

              <SizeCard
                ratio="16:9"
                name="Landscape"
                recommendedFor="Web banners & hero"
                selected={selectedSize === "16:9"}
                onClick={() => setSelectedSize("16:9")}
              />
            </div>
          </section>

          {/* ============================================================ */}
          {/* COMPONENT 10: Buttons */}
          {/* ============================================================ */}
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="label-micro text-[#7A6A2E]">
                10. BUTTONS (SOLID, OUTLINE, DISABLED, LOADING)
              </span>
              <button
                type="button"
                onClick={() => setIsButtonLoading(!isButtonLoading)}
                className="text-[10px] text-[#7A6A2E] underline font-semibold"
              >
                Toggle Loading
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="solid"
                size="md"
                loading={isButtonLoading}
                onClick={() => triggerToast("success")}
                icon={<ArrowRight className="w-3.5 h-3.5" />}
              >
                Solid Button
              </Button>

              <Button
                variant="outline"
                size="md"
                onClick={() => triggerToast("info")}
              >
                Outline Button
              </Button>

              <Button
                variant="champagne"
                size="md"
                onClick={() => triggerToast("info")}
              >
                Champagne
              </Button>

              <Button
                variant="solid"
                size="md"
                disabled={true}
              >
                Disabled
              </Button>
            </div>
          </section>

          {/* ============================================================ */}
          {/* COMPONENT 11: Badges, Chips, Credits Pill, Toast, Drawer */}
          {/* ============================================================ */}
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="label-micro text-[#7A6A2E]">
                11. BADGES, CHIPS &amp; TOAST TRIGGER
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-1.5">
              <Badge variant="gold">VOGUE 4K</Badge>
              <Badge variant="champagne">NEURAL STAGE</Badge>
              <Badge variant="outline">NO TEXT PROMPT</Badge>
              <Badge variant="dark">ATELIER LAB</Badge>
              <Badge variant="success">READY</Badge>
              <Badge variant="warning">PROCESSING</Badge>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <CreditsPill credits={credits} showPlus={true} />
              <CreditsPill credits={credits} size="sm" />
            </div>

            <div className="flex items-center gap-2 pt-1">
              <Button
                variant="outline"
                size="sm"
                onClick={() => triggerToast("success")}
              >
                Show Success Toast
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => triggerToast("error")}
                className="border-[#B91C1C] text-[#B91C1C]"
              >
                Show Error Toast
              </Button>
              <Button
                variant="solid"
                size="sm"
                onClick={() => setIsDrawerOpen(true)}
              >
                Open Bottom Drawer
              </Button>
            </div>

            {/* Active Toast Preview */}
            {activeToast && (
              <div className="pt-2">
                <Toast
                  type={activeToast.type}
                  title={activeToast.title}
                  message={activeToast.message}
                  onClose={() => setActiveToast(null)}
                />
              </div>
            )}
          </section>

          {/* ============================================================ */}
          {/* LIST STATES: Loading, Empty, Error */}
          {/* ============================================================ */}
          <section className="space-y-3 pt-2 border-t border-[#E8E6DF]">
            <div className="flex items-center justify-between">
              <span className="label-micro text-[#7A6A2E]">
                LIST STATES: LOADING / EMPTY / ERROR
              </span>
              <div className="flex items-center gap-1">
                {(["data", "loading", "empty", "error"] as const).map((view) => (
                  <button
                    key={view}
                    type="button"
                    onClick={() => setListStateView(view)}
                    className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase transition-colors ${
                      listStateView === view
                        ? "bg-[#7A6A2E] text-white"
                        : "bg-[#F5EEDB] text-[#7A6A2E]"
                    }`}
                  >
                    {view}
                  </button>
                ))}
              </div>
            </div>

            {listStateView === "loading" && (
              <ListLoadingState count={2} type="card" />
            )}

            {listStateView === "empty" && (
              <ListEmptyState
                title="No Custom Plinths Yet"
                description="Tap below to upload your boutique's own marble plinth or select from curated royal heritage sets."
                actionText="EXPLORE PRESET PLINTHS"
                onAction={() => setListStateView("data")}
              />
            )}

            {listStateView === "error" && (
              <ListErrorState
                title="GPU Neural Engine Unavailable"
                message="Our high-fidelity rendering cluster is experiencing temporary load. Please retry in 30 seconds."
                onRetry={() => setListStateView("data")}
              />
            )}

            {listStateView === "data" && (
              <div className="p-3 rounded-xl bg-white border border-[#E8E6DF] text-xs text-[#57534E] flex items-center justify-between">
                <span>Displaying 3 active atelier style items</span>
                <span className="text-[#7A6A2E] font-semibold">100% Synced</span>
              </div>
            )}
          </section>
        </div>

        {/* ============================================================ */}
        {/* COMPONENT 4: SupportChip (Fixed Demo & Inline) */}
        {/* ============================================================ */}
        <div className="px-4 py-2 flex items-center justify-between border-t border-[#E8E6DF] bg-[#FAF6ED]">
          <span className="label-micro text-[#7A6A2E]">4. SUPPORT CHIP</span>
          <SupportChip
            fixed={false}
            onClick={() => triggerToast("info")}
          />
        </div>

        {/* ============================================================ */}
        {/* COMPONENT 9: StickyActionBar */}
        {/* ============================================================ */}
        <section className="border-t border-[#E8E6DF]">
          <div className="px-4 py-1.5 bg-[#FAF6ED] text-[9px] label-micro text-[#8C867A] flex items-center justify-between">
            <span>9. STICKY ACTION BAR</span>
            <span>ABOVE TAB BAR</span>
          </div>
          <StickyActionBar
            pillText="1 CREDIT"
            pillSubtext="4K Atelier Master"
            buttonText="CONTINUE TO MOOD ›"
            buttonLoading={isButtonLoading}
            onButtonClick={() => {
              setIsButtonLoading(true);
              setTimeout(() => {
                setIsButtonLoading(false);
                triggerToast("success");
              }, 1200);
            }}
            onPillClick={() => triggerToast("info")}
          />
        </section>

        {/* ============================================================ */}
        {/* COMPONENT 3: BottomTabBar */}
        {/* ============================================================ */}
        <section className="border-t border-[#E8E6DF]">
          <div className="px-4 py-1 bg-[#FAF6ED] text-[9px] label-micro text-[#8C867A] flex items-center justify-between">
            <span>3. BOTTOM TAB BAR</span>
            <span>STUDIO · LOOKBOOK · CREDITS · ATELIER</span>
          </div>
          <BottomTabBar
            activeTab={tab}
            onChange={(newTab) => setTab(newTab)}
          />
        </section>
      </div>

      {/* Floating Concierge Pill when in responsive mode */}
      <SupportChip fixed={true} onClick={() => triggerToast("info")} />

      {/* Bottom Drawer Demo Modal */}
      <BottomDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title="Atelier Merchant Profile"
        subtitle="Catalogue Studio · Jaipur Heritage Edition"
        footer={
          <div className="flex items-center justify-between gap-3">
            <Button
              variant="outline"
              size="md"
              className="flex-1"
              onClick={() => setIsDrawerOpen(false)}
            >
              Close
            </Button>
            <Button
              variant="solid"
              size="md"
              className="flex-1"
              onClick={() => {
                setIsDrawerOpen(false);
                triggerToast("success");
              }}
            >
              Add Credits
            </Button>
          </div>
        }
      >
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-white border border-[#E8E6DF] shadow-warm-sm flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[#F5EEDB] border border-[#DFD5B0] flex items-center justify-center text-[#7A6A2E] font-serif text-lg font-bold">
              CS
            </div>
            <div>
              <h4 className="font-semibold text-sm text-[#1C1917]">
                Ved Ateliers &amp; Co.
              </h4>
              <p className="text-xs text-[#78716C]">
                itsmeyash0091@gmail.com
              </p>
              <div className="flex items-center gap-1.5 mt-1">
                <Badge variant="gold" size="sm">
                  {credits} CREDITS
                </Badge>
                <Badge variant="champagne" size="sm">
                  PRO PLAN
                </Badge>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="label-micro text-[#7A6A2E]">
              Account Quick Actions
            </label>
            <div className="space-y-1.5">
              <button
                type="button"
                onClick={() => {
                  setCredits((c) => c + 5);
                  setIsDrawerOpen(false);
                  triggerToast("success");
                }}
                className="w-full text-left p-3 rounded-xl bg-white border border-[#E8E6DF] hover:border-[#7A6A2E] text-xs font-semibold flex items-center justify-between transition-colors shadow-2xs"
              >
                <span>Purchase 5 Studio Credits (₹499)</span>
                <ChevronRight className="w-4 h-4 text-[#8C867A]" />
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsDrawerOpen(false);
                  triggerToast("info");
                }}
                className="w-full text-left p-3 rounded-xl bg-white border border-[#E8E6DF] hover:border-[#7A6A2E] text-xs font-semibold flex items-center justify-between transition-colors shadow-2xs"
              >
                <span>Download Lookbook PDF Portfolio</span>
                <ChevronRight className="w-4 h-4 text-[#8C867A]" />
              </button>
            </div>
          </div>
        </div>
      </BottomDrawer>
    </div>
  );
}
