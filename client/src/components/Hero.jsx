import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { ArrowDown, ChevronRight } from "lucide-react";
import saifHeroImg from "../assets/saif-vegdani-hero.jpg";
import logoImg from "../assets/logo.png";
import MagneticButton from "./ui/MagneticButton";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const headlineRef = useRef(null);
  const subtextRef = useRef(null);
  const scopeRef = useRef(null);
  const ctaRef = useRef(null);
  const parallaxWrapperRef = useRef(null);
  const imageFrameRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) return;

    let ctx;
    const startEntrance = () => {
      ctx = gsap.context(() => {
        const tl = gsap.timeline({
          defaults: { ease: "power3.out" },
          onComplete: () => {
            gsap.set(
              [headlineRef.current, subtextRef.current, scopeRef.current, ctaRef.current?.children || [], imageFrameRef.current],
              { clearProps: "transform,opacity" }
            );
          }
        });

        tl.from(headlineRef.current, {
          opacity: 0,
          y: 28,
          duration: 0.75,
          delay: 0.05
        })
          .from(
            subtextRef.current,
            {
              opacity: 0,
              y: 18,
              duration: 0.6
            },
            "-=0.45"
          )
          .from(
            scopeRef.current,
            {
              opacity: 0,
              y: 14,
              duration: 0.5
            },
            "-=0.4"
          )
          .from(
            ctaRef.current?.children || [],
            {
              opacity: 0,
              y: 14,
              duration: 0.5,
              stagger: 0.08
            },
            "-=0.35"
          )
          .from(
            imageFrameRef.current,
            {
              opacity: 0,
              scale: 0.96,
              y: 20,
              duration: 0.8,
              ease: "power2.out"
            },
            "-=0.6"
          );

        // Desktop-only gentle scroll parallax (≤ 24px) on a separate wrapper node
        if (window.innerWidth >= 1024 && parallaxWrapperRef.current) {
          gsap.to(parallaxWrapperRef.current, {
            y: 24,
            ease: "none",
            scrollTrigger: {
              trigger: heroRef.current,
              start: "top top",
              end: "bottom top",
              scrub: 1
            }
          });
        }
      }, heroRef);
    };

    // Synchronize entrance with the loader exit event
    if (window.__svLoaderDone || sessionStorage.getItem("sv_loader_seen")) {
      startEntrance();
    } else {
      document.addEventListener("sv:loader-done", startEntrance, { once: true });
    }

    return () => {
      document.removeEventListener("sv:loader-done", startEntrance);
      if (ctx) ctx.revert();
    };
  }, []);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative bg-ivory pt-24 pb-10 sm:pt-28 sm:pb-14 lg:pt-30 lg:pb-16 overflow-hidden"
    >
      <div className="site-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          {/* Left Column: Hero Editorial Typography (7 cols) */}
          <div ref={contentRef} className="lg:col-span-7 flex flex-col items-start">
            {/* Academic Session Eyebrow */}
            <div className="eyebrow-badge mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
              <span>S.V. TUTORIAL · ACADEMIC SESSION 2026–27</span>
            </div>

            {/* Signature Headline */}
            <div ref={headlineRef} className="mb-4">
              <h1 className="font-serif text-[clamp(2.25rem,1.5rem+3.2vw,4.25rem)] leading-[1.12] text-charcoal font-semibold tracking-tight">
                Strong Foundations.
                <br />
                <span className="relative inline-block mt-1">
                  <span className="font-serif italic font-normal text-gold-dark">
                    Confident Futures.
                  </span>
                  <motion.span
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.5, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute bottom-1 sm:bottom-1.5 left-0 right-0 h-[2.5px] bg-gradient-to-r from-gold-dark via-gold to-gold-light rounded-full origin-left pointer-events-none"
                  />
                </span>
              </h1>
            </div>

            {/* Mobile Image (Compact, placed cleanly right under headline on mobile) */}
            <div className="lg:hidden w-full max-w-[280px] mx-auto my-6 aspect-[4/5] rounded-2xl overflow-hidden border border-border-soft bg-surface-pure shadow-md relative">
              <img
                src={saifHeroImg}
                alt="Saif Barkat Vegdani - Principal Educator"
                className="w-full h-full object-cover object-top"
                loading="eager"
                fetchPriority="high"
                width={280}
                height={350}
              />
              <div className="absolute bottom-2.5 left-2.5 right-2.5 bg-midnight/90 backdrop-blur-sm px-3 py-1.5 rounded-xl border border-gold/30 text-white flex items-center justify-between text-xs">
                <span className="font-semibold text-white">Saif Barkat Vegdani</span>
                <span className="text-gold-light font-medium text-xs">8 Yrs Record</span>
              </div>
            </div>

            {/* Single Focused Paragraph */}
            <div ref={subtextRef} className="max-w-xl mb-4">
              <p className="text-base sm:text-lg text-charcoal/90 leading-relaxed font-normal">
                Personalised tuition for Classes 3–12 by <strong>Saif Barkat Vegdani</strong> (B.Com, B.Ed).
                Cultivating conceptual understanding, disciplined study habits, and calm exam mastery
                across GSEB and CBSE boards.
              </p>
            </div>

            {/* Understated Scope Line */}
            <div ref={scopeRef} className="mb-7">
              <p className="text-sm font-semibold tracking-wide text-charcoal/80">
                GSEB &amp; CBSE · Standards 3–12 · Specialized Commerce 11–12
              </p>
            </div>

            {/* Primary Action + Subtle Text Link */}
            <div ref={ctaRef} className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
              <MagneticButton
                as="a"
                href="#admissions"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-midnight hover:bg-midnight-card text-gold hover:text-gold-light font-bold text-xs tracking-wider uppercase transition-colors shadow-sm border border-gold/40 min-h-[44px] cursor-pointer"
              >
                <span>Enquire About Admissions</span>
              </MagneticButton>

              <a
                href="#classes"
                className="group inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold tracking-wider uppercase text-charcoal-muted hover:text-gold-dark transition-colors min-h-[44px]"
              >
                <span>Explore Classes</span>
                <ChevronRight className="w-4 h-4 text-gold-dark group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

          {/* Right Column: Desktop Architectural Framed Portrait (5 cols) */}
          <div className="hidden lg:block lg:col-span-5 relative">
            <div ref={parallaxWrapperRef} className="relative mx-auto max-w-[420px]">
              <div
                ref={imageFrameRef}
                className="relative rounded-[20px] bg-surface-pure p-3 border border-border-soft shadow-lg overflow-hidden group"
              >
                {/* Arch-Framed Image Container with Fixed 4/5 Aspect Ratio */}
                <div className="relative aspect-[4/5] rounded-[14px] overflow-hidden bg-midnight/5">
                  <img
                    src={saifHeroImg}
                    alt="Saif Barkat Vegdani - Principal Educator & Founder of S.V. Tutorial"
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.015]"
                    loading="eager"
                    fetchPriority="high"
                    width={400}
                    height={500}
                  />
                </div>

                {/* Static Floating Credential Card (No infinite bounce) */}
                <div className="absolute bottom-6 left-6 right-6 bg-midnight/95 backdrop-blur-md px-4 py-3 rounded-xl border border-gold/30 text-white flex items-center justify-between shadow-xl">
                  <div className="flex items-center gap-3">
                    <img
                      src={logoImg}
                      alt="S.V. Tutorial Monogram"
                      className="w-9 h-9 rounded-lg object-contain bg-midnight border border-gold/40 p-0.5 shrink-0 shadow-xs"
                      width={36}
                      height={36}
                    />
                    <div>
                      <span className="text-xs font-bold tracking-widest uppercase text-gold block">
                        S.V. Tutorial
                      </span>
                      <span className="text-xs font-semibold text-white">Saif Barkat Vegdani</span>
                    </div>
                  </div>
                  <div className="text-right border-l border-white/10 pl-3">
                    <span className="text-xs font-medium text-white/90 block leading-tight">
                      B.Com, B.Ed Qualified
                    </span>
                    <span className="text-xs text-gold-light block mt-0.5 font-semibold">
                      8 Years Record
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quiet Scroll Indicator */}
        <div className="mt-12 hidden lg:flex items-center justify-center">
          <a
            href="#classes"
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-charcoal-muted hover:text-gold-dark transition-colors group min-h-[44px]"
          >
            <span>Explore Academic Standards</span>
            <ArrowDown className="w-3.5 h-3.5 text-gold-dark group-hover:translate-y-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}
