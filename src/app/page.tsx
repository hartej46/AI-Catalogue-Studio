import Link from "next/link";
import Image from "next/image";
import { Sparkles, ArrowRight, Check, Diamond, Footprints, Glasses, ArrowUpRight } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1F1C18] flex flex-col justify-between max-w-md mx-auto px-4 py-5 shadow-sm border-x border-[#EFEAE1]">
      {/* Top Navigation */}
      <header className="flex items-center justify-between pb-4 border-b border-[#EFEAE1]">
        <div className="flex items-center gap-2">
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-serif text-lg font-bold tracking-tight text-[#1E1B18]">
                Catalogue Studio
              </span>
              <span className="bg-[#EAE4D7] text-[#5B5226] text-[10px] font-semibold px-1.5 py-0.5 rounded tracking-wider">
                LAB
              </span>
            </div>
            <div className="text-[9px] tracking-[0.2em] uppercase text-[#7D766C] font-medium">
              Atelier AI Lab
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/login"
            className="text-xs font-semibold uppercase tracking-wider text-[#575147] hover:text-black transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/login"
            className="flex items-center gap-1 bg-[#5B5226] hover:bg-[#49421D] text-white text-xs font-medium px-3 py-1.5 rounded-md transition-colors shadow-xs"
          >
            <span>Enter Studio</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
          <div className="w-7 h-7 rounded-full overflow-hidden border border-[#D8D0C3] relative">
            <Image
              src="/images/jewellery_craft.jpg"
              alt="Merchant Avatar"
              fill
              className="object-cover"
              sizes="28px"
            />
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="space-y-6 pt-5">
        {/* Status Badge */}
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-1.5 bg-[#F0EBE0] text-[#5B5226] text-[11px] font-medium px-3 py-1 rounded-full border border-[#E3DCCF]">
            <Sparkles className="w-3 h-3 text-[#5B5226]" />
            <span className="tracking-wide">V2.4 LIVE · NEURAL STAGECRAFT</span>
          </div>
        </div>

        {/* Heading & Subtitle */}
        <div className="text-center space-y-2">
          <p className="text-[10px] tracking-[0.25em] uppercase text-[#736A5B] font-semibold">
            Computational Commercial Photography
          </p>
          <h1 className="font-serif text-3xl font-normal leading-tight text-[#1F1C18]">
            Elevate Your Storefront to{" "}
            <span className="italic font-normal font-serif text-[#1F1C18]">
              High Vogue.
            </span>
          </h1>
          <p className="text-xs text-[#6A6357] leading-relaxed max-w-xs mx-auto">
            Turn ordinary phone snapshots of Jewellery, Footwear &amp; Optical
            into Vogue-grade 4K editorial renders in 60 seconds.
          </p>
        </div>

        {/* Start Trial Button */}
        <div className="space-y-2">
          <Link
            href="/login"
            className="flex items-center justify-center gap-2 w-full bg-[#5B5226] hover:bg-[#49421D] text-white py-3.5 rounded-lg text-sm font-semibold tracking-wide transition-all shadow-md active:scale-[0.99]"
          >
            <span>START FREE ATELIER TRIAL</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <div className="flex items-center justify-center gap-1 text-[11px] text-[#6E675B]">
            <Check className="w-3.5 h-3.5 text-[#5B5226]" />
            <span>3 Free Studio Credits · No Card Needed</span>
          </div>
        </div>

        {/* Hero Showcase Card */}
        <div className="relative rounded-2xl overflow-hidden border border-[#E7E0D3] bg-white shadow-sm">
          <div className="relative aspect-[4/3] w-full">
            <Image
              src="/images/hero_multi_craft.jpg"
              alt="4K Atelier Render Showcase"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 480px) 100vw, 420px"
            />
            {/* 4K Atelier Render Badge */}
            <div className="absolute top-2.5 right-2.5 bg-black/60 backdrop-blur-md text-[#E8DFD0] text-[10px] font-semibold px-2 py-0.5 rounded tracking-wider border border-white/10 uppercase">
              4K Atelier Render
            </div>

            {/* Plinth details tag */}
            <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-black/5 text-[10px] text-[#2F2B26] font-medium shadow-xs">
              <div className="flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#5B5226]" />
                <span className="font-semibold uppercase tracking-wider">
                  Jaipur Heritage Travertine Plinth
                </span>
              </div>
              <span className="text-[9px] uppercase tracking-wider text-[#7A7366] font-semibold">
                42S Synthesis
              </span>
            </div>
          </div>

          {/* Multi-asset domain chips */}
          <div className="flex items-center justify-between px-3 py-2.5 bg-[#FAF8F5] border-t border-[#EAE3D6] text-[11px]">
            <span className="uppercase tracking-widest text-[#7C7569] font-semibold text-[9px]">
              Multi-Asset Domain
            </span>
            <div className="flex items-center gap-1.5">
              <span className="bg-[#EBE5D8] text-[#423C32] px-2 py-0.5 rounded text-[10px] font-medium">
                Jewellery
              </span>
              <span className="bg-[#EBE5D8] text-[#423C32] px-2 py-0.5 rounded text-[10px] font-medium">
                Footwear
              </span>
              <span className="bg-[#EBE5D8] text-[#423C32] px-2 py-0.5 rounded text-[10px] font-medium">
                Optical
              </span>
            </div>
          </div>
        </div>

        {/* Tailored Staging Section */}
        <div className="space-y-2.5 pt-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#7A7366] font-semibold">
              Tailored Staging
            </span>
            <span className="text-[10px] uppercase tracking-wider text-[#5B5226] font-semibold">
              Instant Presets
            </span>
          </div>

          <h2 className="font-serif text-xl font-normal text-[#1F1C18]">
            3 Craft Domains
          </h2>

          {/* 3 Domain Cards */}
          <div className="grid grid-cols-3 gap-2">
            <Link
              href="/login"
              className="bg-white rounded-xl p-3 border border-[#E7E0D3] text-center flex flex-col items-center justify-center gap-1.5 shadow-xs hover:border-[#5B5226] transition-colors"
            >
              <div className="w-9 h-9 rounded-full bg-[#F3EFE6] flex items-center justify-center text-[#5B5226]">
                <Diamond className="w-4 h-4" />
              </div>
              <div className="text-[11px] font-semibold text-[#201D1A]">
                Jewellery
              </div>
              <div className="text-[9px] text-[#7A7366] leading-tight">
                Polki &amp; Kundan
              </div>
            </Link>

            <Link
              href="/login"
              className="bg-white rounded-xl p-3 border border-[#E7E0D3] text-center flex flex-col items-center justify-center gap-1.5 shadow-xs hover:border-[#5B5226] transition-colors"
            >
              <div className="w-9 h-9 rounded-full bg-[#F3EFE6] flex items-center justify-center text-[#5B5226]">
                <Footprints className="w-4 h-4" />
              </div>
              <div className="text-[11px] font-semibold text-[#201D1A]">
                Footwear
              </div>
              <div className="text-[9px] text-[#7A7366] leading-tight">
                Leather &amp; Mojari
              </div>
            </Link>

            <Link
              href="/login"
              className="bg-white rounded-xl p-3 border border-[#E7E0D3] text-center flex flex-col items-center justify-center gap-1.5 shadow-xs hover:border-[#5B5226] transition-colors"
            >
              <div className="w-9 h-9 rounded-full bg-[#F3EFE6] flex items-center justify-center text-[#5B5226]">
                <Glasses className="w-4 h-4" />
              </div>
              <div className="text-[11px] font-semibold text-[#201D1A]">
                Optical
              </div>
              <div className="text-[9px] text-[#7A7366] leading-tight">
                Acetate &amp; Wire
              </div>
            </Link>
          </div>
        </div>

        {/* 3 Step Workflow */}
        <div className="bg-[#F4EFE6] rounded-xl p-3 border border-[#E7E0D3] flex items-center justify-between text-center">
          <div className="flex-1">
            <div className="w-6 h-6 rounded-full bg-[#5B5226] text-white text-[11px] font-bold mx-auto flex items-center justify-center mb-1">
              1
            </div>
            <div className="text-[11px] font-semibold text-[#201D1A]">Snap</div>
            <div className="text-[9px] text-[#7A7366]">Phone shot</div>
          </div>

          <div className="text-[#C8BEB0] text-xs font-light px-1">›</div>

          <div className="flex-1">
            <div className="w-6 h-6 rounded-full bg-[#5B5226] text-white text-[11px] font-bold mx-auto flex items-center justify-center mb-1">
              2
            </div>
            <div className="text-[11px] font-semibold text-[#201D1A]">Choose Mood</div>
            <div className="text-[9px] text-[#7A7366]">Indian lighting</div>
          </div>

          <div className="text-[#C8BEB0] text-xs font-light px-1">›</div>

          <div className="flex-1">
            <div className="w-6 h-6 rounded-full bg-[#5B5226] text-white text-[11px] font-bold mx-auto flex items-center justify-center mb-1">
              3
            </div>
            <div className="text-[11px] font-semibold text-[#201D1A]">Export 4K</div>
            <div className="text-[9px] text-[#7A7366]">Campaign ready</div>
          </div>
        </div>

        {/* GMV Proof Banner */}
        <div className="bg-[#ECE6DA] rounded-xl p-3.5 border border-[#DFD7C7] flex items-center justify-between">
          <div className="font-serif text-2xl font-normal text-[#1E1B18] leading-tight">
            ₹4.8<span className="text-xl">Cr+</span>
          </div>
          <div className="text-right text-[11px] text-[#5C5547] max-w-[170px] leading-snug font-medium">
            GMV generated for 250+ luxury ateliers
          </div>
        </div>

        {/* Bottom Enter Studio Button */}
        <div className="pb-4">
          <Link
            href="/login"
            className="flex items-center justify-center gap-2 w-full bg-[#5B5226] hover:bg-[#49421D] text-white py-3.5 rounded-lg text-xs font-semibold tracking-wider uppercase transition-all shadow-md active:scale-[0.99]"
          >
            <span>Enter Studio &amp; Claim 3 Credits</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </main>
    </div>
  );
}
