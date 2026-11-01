import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { MessageCircle, ArrowDown, GraduationCap, Award, BookOpen, CheckCircle2 } from "lucide-react";
import { createWhatsAppUrl } from "../utils/whatsapp";
import saifHeroImg from "../assets/saif-vegdani-hero.jpg";
import logoImg from "../assets/logo.png";
import SpotlightCard from "./ui/SpotlightCard";
import BorderBeam from "./ui/BorderBeam";
import MagneticButton from "./ui/MagneticButton";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef(null);
  const eyebrowRef = useRef(null);
  const headlineRef = useRef(null);
  const subtextRef = useRef(null);
  const badgesRef = useRef(null);
  const ctaRef = useRef(null);
  const imageFrameRef = useRef(null);
  const expPillRef = useRef(null);
  const scrollIndicatorRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(eyebrowRef.current, {
        opacity: 0,
        y: -14,
        duration: 0.5,
        delay: 0.05
      })
        .from(
          headlineRef.current,
          {
            opacity: 0,
            y: 32,
            duration: 0.9
          },
          "-=0.35"
        )
        .from(
          subtextRef.current,
          {
            opacity: 0,
            y: 20,
            duration: 0.65
          },
          "-=0.55"
        )
        .from(
          badgesRef.current?.children || [],
          {
            opacity: 0,
            y: 14,
            duration: 0.5,
            stagger: 0.06
          },
          "-=0.4"
        )
        .from(
          ctaRef.current?.children || [],
          {
            opacity: 0,
            y: 16,
            duration: 0.55,
            stagger: 0.08
          },
          "-=0.3"
        )
        .from(
          imageFrameRef.current,
          {
            opacity: 0,
            scale: 0.95,
            y: 26,
            duration: 0.95,
            ease: "power2.out"
          },
          "-=0.75"
        )
        .from(
          expPillRef.current,
          {
            opacity: 0,
            y: 12,
            duration: 0.5
          },
          "-=0.35"
        )
        .from(
          scrollIndicatorRef.current,
          {
            opacity: 0,
            duration: 0.6
          },
          "-=0.2"
        );

      // Subtle scroll parallax on desktop portrait
      if (window.innerWidth >= 1024) {
        gsap.to(imageFrameRef.current, {
          y: 30,
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

    return () => ctx.revert();
  }, []);

  const whatsappGeneralUrl = createWhatsAppUrl(
    "Hello Saif Sir, I would like to enquire about admissions for tuition classes (Standards 3–12)."
  );

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative bg-ivory pt-24 pb-16 sm:pt-28 sm:pb-20 lg:pt-32 lg:pb-24 border-b border-border-soft overflow-hidden"
    >
      {/* Subtle Architectural Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#1D1C16 1px, transparent 1px), linear-gradient(to right, #1D1C16 1px, transparent 1px)",
          backgroundSize: "64px 64px"
        }}
        aria-hidden="true"
      />

      {/* Ambient Gradient Mesh Lighting (Champagne Gold + Midnight) */}
      <div
        className="absolute top-1/4 right-1/4 w-[480px] h-[480px] bg-gold/10 rounded-full blur-3xl pointer-events-none -z-0"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/3 left-1/12 w-[360px] h-[360px] bg-gold/5 rounded-full blur-3xl pointer-events-none -z-0"
        aria-hidden="true"
      />

      <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Hero Editorial Typography (7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-start">
            {/* Academic Session Eyebrow Pill */}
            <div
              ref={eyebrowRef}
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-surface-pure border border-border-soft shadow-2xs mb-6"
            >
              <img
                src={logoImg}
                alt="S.V. Tutorial"
                className="w-4 h-4 rounded-full object-cover border border-gold/40 shrink-0"
                width={16}
                height={16}
              />
              <span className="text-[10px] sm:text-[10.5px] font-bold tracking-[0.18em] uppercase text-midnight">
                S.V. TUTORIAL · ACADEMIC SESSION 2026–27
              </span>
              <span className="text-border-soft hidden sm:inline">|</span>
              <span className="text-[10px] sm:text-[10.5px] font-semibold text-charcoal-muted hidden sm:inline">
                Standards 3–12
              </span>
            </div>

            {/* Signature Headline with Animated Underline on Italic Word */}
            <div ref={headlineRef}>
              <h1 className="font-serif text-[40px] sm:text-[54px] lg:text-[62px] xl:text-[68px] leading-[1.1] text-charcoal tracking-tight font-bold mb-5">
                Strong Foundations.
                <br />
                <span className="relative inline-block mt-1">
                  <span className="font-serif italic font-normal text-gold-dark">
                    Confident Futures.
                  </span>
                  <motion.span
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.7, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute bottom-1 sm:bottom-2 left-0 right-0 h-[2.5px] sm:h-[3px] bg-gradient-to-r from-gold-dark via-gold to-gold-light rounded-full origin-left pointer-events-none"
                  />
                </span>
              </h1>
            </div>

            {/* Supporting Copy */}
            <div ref={subtextRef} className="max-w-xl">
              <p className="text-base sm:text-[18px] text-charcoal/90 leading-relaxed font-medium mb-3">
                Personalised tuition for Classes 3–12, built around clear concepts, consistent
                practice, and a stronger understanding of every subject.
              </p>
              <p className="text-[13.5px] sm:text-[14px] leading-relaxed text-charcoal-muted mb-7 font-normal">
                Direct instruction by <strong>Saif Barkat Vegdani</strong> (B.Com, B.Ed).
                Cultivating critical thinking, disciplined study habits, and calm exam mastery
                across GSEB and CBSE boards.
              </p>
            </div>

            {/* Curriculum Scope Badges */}
            <div ref={badgesRef} className="flex flex-wrap gap-2 sm:gap-2.5 mb-8">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-pure border border-border-soft text-xs font-semibold text-charcoal shadow-2xs">
                <CheckCircle2 className="w-3.5 h-3.5 text-gold shrink-0" />
                <span>GSEB & CBSE Boards</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-pure border border-border-soft text-xs font-semibold text-charcoal shadow-2xs">
                <BookOpen className="w-3.5 h-3.5 text-gold shrink-0" />
                <span>Std 3–12 Comprehensive Focus</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-pure border border-border-soft text-xs font-semibold text-charcoal shadow-2xs">
                <Award className="w-3.5 h-3.5 text-gold shrink-0" />
                <span>Specialized Commerce Stream</span>
              </div>
            </div>

            {/* Primary & Secondary Actions with Magnetic Button on Primary */}
            <div ref={ctaRef} className="flex flex-wrap items-center gap-3 mb-8 w-full sm:w-auto">
              <MagneticButton
                as="a"
                href="#admissions"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-midnight hover:bg-midnight-card text-gold hover:text-gold-light font-bold text-xs tracking-wider uppercase transition-colors shadow-sm border border-gold/40 relative overflow-hidden group cursor-pointer"
              >
                <span>Enquire About Admissions</span>
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />
              </MagneticButton>

              <MagneticButton
                as="a"
                href="#classes"
                className="group inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-surface-pure hover:bg-ivory-light text-charcoal font-semibold text-xs tracking-wider uppercase border border-border-soft transition-colors shadow-2xs cursor-pointer"
              >
                <span>Explore Classes</span>
                <ArrowDown className="w-3.5 h-3.5 text-gold group-hover:translate-y-0.5 transition-transform" />
              </MagneticButton>

              <MagneticButton
                as="a"
                href={whatsappGeneralUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-full bg-gold/15 hover:bg-gold/25 text-charcoal font-bold text-xs tracking-wider uppercase border border-gold/40 transition-colors cursor-pointer"
                aria-label="Enquire directly on WhatsApp"
              >
                <MessageCircle className="w-4 h-4 text-gold-dark" />
                <span>WhatsApp</span>
              </MagneticButton>
            </div>

            {/* Credibility Stamp */}
            <div
              ref={expPillRef}
              className="flex items-center gap-2.5 text-xs text-charcoal-muted px-4 py-2 rounded-full bg-surface-pure border border-border-soft shadow-2xs"
            >
              <GraduationCap className="w-4 h-4 text-gold shrink-0" />
              <span className="font-semibold text-charcoal tracking-wide uppercase text-[10.5px]">
                8 YEARS OF TEACHING EXPERIENCE
              </span>
              <span className="text-border-soft">·</span>
              <span className="text-charcoal-muted text-[11.5px]">B.Com, B.Ed</span>
            </div>
          </div>

          {/* Right Column: Arched Luxury Framed Portrait with BorderBeam (5 cols) */}
          <div className="lg:col-span-5 relative mt-4 lg:mt-0">
            <div ref={imageFrameRef} className="relative mx-auto max-w-[400px] lg:max-w-none">
              {/* Soft gold architectural offset frame */}
              <div
                className="absolute -top-3 -right-3 -bottom-3 -left-3 rounded-[34px] border border-gold/25 pointer-events-none hidden sm:block"
                aria-hidden="true"
              />

              <SpotlightCard
                className="bg-surface-pure p-3 rounded-[30px] border border-border-soft shadow-xl overflow-hidden group relative"
                spotlightColor="rgba(198, 161, 91, 0.15)"
                radius={400}
              >
                {/* 21st.dev Laser BorderBeam on Hero Portrait */}
                <BorderBeam duration={10} borderWidth={1.8} radius={30} />

                <div className="relative overflow-hidden rounded-[24px] bg-midnight/5">
                  <img
                    src={saifHeroImg}
                    alt="Saif Barkat Vegdani - Principal Educator & Founder of S.V. Tutorial"
                    className="w-full h-[460px] sm:h-[500px] object-cover object-top rounded-[24px] transition-transform duration-700 group-hover:scale-[1.015]"
                    loading="eager"
                    fetchPriority="high"
                    width={400}
                    height={500}
                  />
                </div>

                {/* Floating Credential Card with Glassmorphism and subtle float animation */}
                <div className="absolute bottom-5 left-5 right-5 bg-midnight/92 backdrop-blur-md px-4 py-3 rounded-[20px] border border-gold/30 text-white flex items-center justify-between shadow-2xl transition-all duration-300 group-hover:border-gold/50 z-20 animate-subtle-float">
                  <div className="flex items-center gap-3">
                    <img
                      src={logoImg}
                      alt="S.V. Tutorial Monogram"
                      className="w-9 h-9 rounded-xl object-contain bg-midnight border border-gold/40 p-0.5 shrink-0 shadow-xs"
                      width={36}
                      height={36}
                    />
                    <div>
                      <span className="text-[9.5px] font-bold tracking-widest uppercase text-gold block">
                        S.V. Tutorial
                      </span>
                      <span className="text-xs font-semibold text-white">Saif Barkat Vegdani</span>
                    </div>
                  </div>
                  <div className="text-right border-l border-white/10 pl-3">
                    <span className="text-[10px] font-medium text-white/90 block leading-tight">
                      B.Com, B.Ed Qualified
                    </span>
                    <span className="text-[9.5px] text-gold-light block mt-0.5 font-medium">
                      8 Years Record
                    </span>
                  </div>
                </div>
              </SpotlightCard>
            </div>
          </div>
        </div>

        {/* Subtle Scroll-Down Indicator */}
        <div ref={scrollIndicatorRef} className="mt-14 hidden lg:flex items-center justify-center">
          <a
            href="#classes"
            className="inline-flex items-center gap-2 text-[10.5px] font-semibold tracking-widest uppercase text-charcoal-muted hover:text-gold-dark transition-colors group"
          >
            <span>Explore Academic Standards</span>
            <ArrowDown className="w-3.5 h-3.5 text-gold group-hover:translate-y-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}
