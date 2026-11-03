import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Check,
  ArrowUpRight,
  Camera,
} from "lucide-react";
import { CurrentYear } from "@/components/CurrentYear";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-bg text-ink flex flex-col">
      {/* Top Header */}
      <header className="sticky top-0 z-50 w-full bg-[#FBF8F3] border-b border-[#DDD4C7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Brand Mark */}
          <Link href="/" className="flex items-center gap-3 focus:outline-none group">
            <div className="w-8 h-8 rounded-[4px] bg-[#FBF8F3] border border-[#DDD4C7] flex items-center justify-center text-[#B08D57] transition-colors duration-150 group-hover:border-[#5B1A1F]">
              <Camera className="w-4 h-4 text-[#B08D57]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif text-lg sm:text-xl font-bold tracking-tight text-[#1C1714] group-hover:text-[#5B1A1F] transition-colors duration-150">
                  Catalogue Studio
                </span>
                <span className="bg-[#F4EFE8] text-[#6E655C] border border-[#DDD4C7] text-[9px] font-semibold px-1.5 py-0.5 rounded-[2px] tracking-wider uppercase">
                  LAB
                </span>
              </div>
              <div className="label-micro text-[#6E655C] tracking-[0.22em] text-[9px]">
                Product Photography Studio
              </div>
            </div>
          </Link>

          {/* Navigation Actions (Avatar removed) */}
          <div className="flex items-center gap-4 sm:gap-6">
            <Link
              href="/login"
              className="text-xs sm:text-sm font-medium tracking-wider uppercase text-[#6E655C] hover:text-[#1C1714] transition-colors duration-150"
            >
              Sign In
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center gap-1.5 bg-[#5B1A1F] hover:bg-[#471418] text-[#F4EFE8] text-xs sm:text-sm font-semibold px-4 py-2 rounded-[4px] transition-colors duration-150 shadow-warm-sm"
            >
              <span>Enter Studio</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#F4EFE8]" />
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-14 space-y-16 sm:space-y-24">
        
        {/* HERO SECTION: Asymmetric & Proof-Led (Breaking the box grid) */}
        <section className="space-y-8 lg:space-y-12">
          
          {/* Hero Copy (Plain language, one calm eyebrow, no fake single-italic word trick) */}
          <div className="max-w-3xl space-y-4">
            <p className="text-xs sm:text-sm text-[#6E655C] font-medium">
              Product photography for Indian jewellery, footwear &amp; eyewear
            </p>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal leading-[1.12] text-[#1C1714]">
              Turn phone photos of your jewellery into catalogue-ready images.
            </h1>

            <p className="text-sm sm:text-base text-[#6E655C] leading-relaxed max-w-2xl pt-1">
              Place your piece on any shop counter or table, take a quick photo on your phone, and get studio-lit images on travertine, slate, and raw silk in 60 seconds.
            </p>

            {/* Action Row */}
            <div className="pt-3 flex flex-col sm:flex-row sm:items-center gap-4">
              <Link
                href="/login"
                className="inline-flex items-center justify-center gap-2 bg-[#5B1A1F] hover:bg-[#471418] text-[#F4EFE8] py-3.5 sm:py-4 px-7 sm:px-8 rounded-[4px] text-xs sm:text-sm font-semibold tracking-wider uppercase transition-colors duration-150 shadow-warm-sm"
              >
                <span>Start with 3 Free Photos</span>
                <ArrowRight className="w-4 h-4 text-[#F4EFE8]" />
              </Link>
              
              <div className="flex items-center gap-2 text-xs text-[#6E655C]">
                <Check className="w-4 h-4 text-[#B08D57] shrink-0" />
                <span>Takes 60 seconds · No credit card required</span>
              </div>
            </div>
          </div>

          {/* VISUAL PROOF: Expansive Interactive Before & After (Breaks the symmetry) */}
          <div className="w-full">
            <div className="bg-[#FBF8F3] p-3 sm:p-5 rounded-[8px] border border-[#DDD4C7] shadow-warm-sm">
              <BeforeAfterSlider
                beforeImage="/images/raw_phone_snapshot.jpg"
                afterImage="/images/jewellery_craft.jpg"
                beforeLabel="Ordinary phone photo on velvet shop counter"
                afterLabel="Finished catalogue render on Jaipur travertine"
              />
            </div>
          </div>

        </section>

        {/* 3 IMAGE-LED CRAFT DOMAINS (No boxed icons, photography-led) */}
        <section className="space-y-6 sm:space-y-8 pt-4">
          <div className="border-b border-[#DDD4C7] pb-4 space-y-1">
            <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#1C1714]">
              Built for three distinct Indian crafts
            </h2>
            <p className="text-xs sm:text-sm text-[#6E655C] max-w-2xl">
              Each craft requires different lighting physics. 22K gold needs specular reflection control, hand-burnished leather needs rake lighting for grain texture, and lenses need zero-glare tuning.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Jewellery Card (Image-Led) */}
            <Link
              href="/login"
              className="group bg-[#FBF8F3] rounded-[6px] border border-[#DDD4C7] overflow-hidden hover:border-[#6E655C] transition-colors duration-150 shadow-warm-sm flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[4/3] w-full bg-[#F4EFE8] overflow-hidden">
                  <Image
                    src="/images/jewellery_craft.jpg"
                    alt="Fine Jewellery Photography"
                    fill
                    className="object-cover group-hover:scale-[1.01] transition-transform duration-200"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute top-3 left-3 bg-[#1C1714]/80 text-[#F4EFE8] text-[10px] font-medium px-2 py-0.5 rounded-[2px] tracking-wider uppercase">
                    Jewellery
                  </div>
                </div>

                <div className="p-5 space-y-2">
                  <h3 className="font-serif text-lg font-semibold text-[#1C1714] group-hover:text-[#5B1A1F] transition-colors duration-150">
                    Fine Jewellery &amp; Polki
                  </h3>
                  <p className="text-xs text-[#6E655C] leading-relaxed">
                    Reflection control calibrated for 22K yellow gold, uncut polki foils, and diamond facets without harsh glare or blown-out highlights.
                  </p>
                  <div className="pt-2 flex flex-wrap gap-1.5 text-[10px] text-[#6E655C]">
                    <span className="bg-[#F4EFE8] border border-[#DDD4C7] px-2 py-0.5 rounded-[2px]">Kundan &amp; Polki</span>
                    <span className="bg-[#F4EFE8] border border-[#DDD4C7] px-2 py-0.5 rounded-[2px]">Temple Gold</span>
                    <span className="bg-[#F4EFE8] border border-[#DDD4C7] px-2 py-0.5 rounded-[2px]">Solitaires</span>
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0 border-t border-[#DDD4C7]/60 flex items-center justify-between text-xs text-[#6E655C] mt-2">
                <span>4 Camera Presets</span>
                <span className="text-[#5B1A1F] flex items-center gap-1 font-medium group-hover:underline">
                  Open Studio <ArrowRight className="w-3 h-3 text-[#5B1A1F]" />
                </span>
              </div>
            </Link>

            {/* Footwear Card (Image-Led) */}
            <Link
              href="/login"
              className="group bg-[#FBF8F3] rounded-[6px] border border-[#DDD4C7] overflow-hidden hover:border-[#6E655C] transition-colors duration-150 shadow-warm-sm flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[4/3] w-full bg-[#F4EFE8] overflow-hidden">
                  <Image
                    src="/images/footwear_craft.jpg"
                    alt="Artisanal Footwear Photography"
                    fill
                    className="object-cover group-hover:scale-[1.01] transition-transform duration-200"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute top-3 left-3 bg-[#1C1714]/80 text-[#F4EFE8] text-[10px] font-medium px-2 py-0.5 rounded-[2px] tracking-wider uppercase">
                    Footwear
                  </div>
                </div>

                <div className="p-5 space-y-2">
                  <h3 className="font-serif text-lg font-semibold text-[#1C1714] group-hover:text-[#5B1A1F] transition-colors duration-150">
                    Artisanal Footwear &amp; Mojaris
                  </h3>
                  <p className="text-xs text-[#6E655C] leading-relaxed">
                    Low-angle rake lighting that brings out genuine leather grain, intricate zardozi needlework, and contrast sole welts.
                  </p>
                  <div className="pt-2 flex flex-wrap gap-1.5 text-[10px] text-[#6E655C]">
                    <span className="bg-[#F4EFE8] border border-[#DDD4C7] px-2 py-0.5 rounded-[2px]">Bridal Mojaris</span>
                    <span className="bg-[#F4EFE8] border border-[#DDD4C7] px-2 py-0.5 rounded-[2px]">Leather Loafers</span>
                    <span className="bg-[#F4EFE8] border border-[#DDD4C7] px-2 py-0.5 rounded-[2px]">Kolhapuris</span>
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0 border-t border-[#DDD4C7]/60 flex items-center justify-between text-xs text-[#6E655C] mt-2">
                <span>4 Camera Presets</span>
                <span className="text-[#5B1A1F] flex items-center gap-1 font-medium group-hover:underline">
                  Open Studio <ArrowRight className="w-3 h-3 text-[#5B1A1F]" />
                </span>
              </div>
            </Link>

            {/* Eyewear Card (Image-Led) */}
            <Link
              href="/login"
              className="group bg-[#FBF8F3] rounded-[6px] border border-[#DDD4C7] overflow-hidden hover:border-[#6E655C] transition-colors duration-150 shadow-warm-sm flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[4/3] w-full bg-[#F4EFE8] overflow-hidden">
                  <Image
                    src="/images/optical_craft.jpg"
                    alt="Luxury Optical Photography"
                    fill
                    className="object-cover group-hover:scale-[1.01] transition-transform duration-200"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute top-3 left-3 bg-[#1C1714]/80 text-[#F4EFE8] text-[10px] font-medium px-2 py-0.5 rounded-[2px] tracking-wider uppercase">
                    Eyewear
                  </div>
                </div>

                <div className="p-5 space-y-2">
                  <h3 className="font-serif text-lg font-semibold text-[#1C1714] group-hover:text-[#5B1A1F] transition-colors duration-150">
                    Eyewear &amp; Sunglasses
                  </h3>
                  <p className="text-xs text-[#6E655C] leading-relaxed">
                    Anti-reflection tuning that removes messy room reflections from lenses while keeping bevel highlights along acetate and wire rims.
                  </p>
                  <div className="pt-2 flex flex-wrap gap-1.5 text-[10px] text-[#6E655C]">
                    <span className="bg-[#F4EFE8] border border-[#DDD4C7] px-2 py-0.5 rounded-[2px]">Acetate Frames</span>
                    <span className="bg-[#F4EFE8] border border-[#DDD4C7] px-2 py-0.5 rounded-[2px]">Titanium Wire</span>
                    <span className="bg-[#F4EFE8] border border-[#DDD4C7] px-2 py-0.5 rounded-[2px]">Gradient Tints</span>
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0 border-t border-[#DDD4C7]/60 flex items-center justify-between text-xs text-[#6E655C] mt-2">
                <span>4 Camera Presets</span>
                <span className="text-[#5B1A1F] flex items-center gap-1 font-medium group-hover:underline">
                  Open Studio <ArrowRight className="w-3 h-3 text-[#5B1A1F]" />
                </span>
              </div>
            </Link>

          </div>
        </section>

        {/* 3-STEP WORKFLOW IN PLAIN LANGUAGE */}
        <section className="bg-[#FBF8F3] rounded-[6px] p-6 sm:p-10 border border-[#DDD4C7] shadow-warm-sm space-y-8">
          <div className="space-y-1">
            <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#1C1714]">
              How it works
            </h2>
            <p className="text-xs sm:text-sm text-[#6E655C]">
              No prompting, no complex photo editing tools.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-2 text-left">
              <div className="text-xs font-semibold text-[#B08D57] tracking-wider">
                01
              </div>
              <h3 className="font-serif text-base font-semibold text-[#1C1714]">
                Snap on your phone
              </h3>
              <p className="text-xs text-[#6E655C] leading-relaxed">
                Take a standard photo on any smartphone against any plain table or counter. The tool cleans the background and isolates your product.
              </p>
            </div>

            <div className="space-y-2 text-left">
              <div className="text-xs font-semibold text-[#B08D57] tracking-wider">
                02
              </div>
              <h3 className="font-serif text-base font-semibold text-[#1C1714]">
                Choose a background surface
              </h3>
              <p className="text-xs text-[#6E655C] leading-relaxed">
                Pick from real materials like Jaipur travertine, dark slate, raw silk, or minimalist gallery pedestals.
              </p>
            </div>

            <div className="space-y-2 text-left">
              <div className="text-xs font-semibold text-[#B08D57] tracking-wider">
                03
              </div>
              <h3 className="font-serif text-base font-semibold text-[#1C1714]">
                Download in 4K
              </h3>
              <p className="text-xs text-[#6E655C] leading-relaxed">
                Receive high-resolution photos sized for your Shopify website, WhatsApp catalogue, and Instagram feed in 60 seconds.
              </p>
            </div>
          </div>
        </section>

        {/* HONEST INVITATION / TRIAL SECTION */}
        <section className="bg-[#F4EFE8] rounded-[6px] border border-[#DDD4C7] p-8 sm:p-12 text-center space-y-4 max-w-2xl mx-auto shadow-warm-sm">
          <div className="space-y-1.5">
            <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#1C1714]">
              Try it with your own products
            </h3>
            <p className="text-xs sm:text-sm text-[#6E655C] max-w-md mx-auto">
              Start with 3 free photo renders. Upload directly from your phone to test the quality on your jewellery, shoes, or eyewear.
            </p>
          </div>

          <div className="pt-2">
            <Link
              href="/login"
              className="inline-flex items-center justify-center gap-2 bg-[#5B1A1F] hover:bg-[#471418] text-[#F4EFE8] py-3.5 px-8 rounded-[4px] text-xs sm:text-sm font-semibold tracking-wider uppercase transition-colors duration-150 shadow-warm-sm"
            >
              <span>Start with 3 Free Photos</span>
              <ArrowRight className="w-4 h-4 text-[#F4EFE8]" />
            </Link>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="w-full border-t border-[#DDD4C7] bg-[#FBF8F3] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#6E655C]">
          <div>
            &copy; <CurrentYear /> Catalogue Studio. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-[#1C1714] transition-colors duration-150">
              Privacy Policy
            </Link>
            <span>·</span>
            <Link href="/terms" className="hover:text-[#1C1714] transition-colors duration-150">
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
