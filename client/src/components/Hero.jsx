import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { MessageCircle, ArrowDown, GraduationCap, Award, BookOpen, CheckCircle2 } from "lucide-react";
import { createWhatsAppUrl } from "../utils/whatsapp";
import saifStandingImg from "../assets/saif-vegdani-standing.jpg";
import logoImg from "../assets/logo.png";
import SpotlightCard from "./ui/SpotlightCard";
import BorderBeam from "./ui/BorderBeam";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef(null);
  const bgGridRef = useRef(null);
  const eyebrowRef = useRef(null);
  const headlineRef = useRef(null);
  const subtextRef = useRef(null);
  const ctaRef = useRef(null);
  const badgesRef = useRef(null);
  const imageFrameRef = useRef(null);
  const expPillRef = useRef(null);

  useEffect(() => {
    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Orchestrated Entrance
      tl.from(eyebrowRef.current, {
        opacity: 0,
        y: -15,
        duration: 0.6,
        delay: 0.1
      })
        .from(
          headlineRef.current,
          {
            opacity: 0,
            y: 32,
            duration: 0.95
          },
          "-=0.4"
        )
        .from(
          subtextRef.current,
          {
            opacity: 0,
            y: 22,
            duration: 0.75
          },
          "-=0.6"
        )
        .from(
          badgesRef.current?.children || [],
          {
            opacity: 0,
            scale: 0.92,
            y: 16,
            duration: 0.55,
            stagger: 0.08
          },
          "-=0.45"
        )
        .from(
          ctaRef.current?.children || [],
          {
            opacity: 0,
            y: 18,
            duration: 0.6,
            stagger: 0.1
          },
          "-=0.35"
        )
        .from(
          imageFrameRef.current,
          {
            opacity: 0,
            scale: 0.94,
            y: 30,
            duration: 1.1,
            ease: "power2.out"
          },
          "-=0.9"
        )
        .from(
          expPillRef.current,
          {
            opacity: 0,
            y: 15,
            duration: 0.6
          },
          "-=0.4"
        );

      // ScrollTrigger Parallax on Framed Portrait & Architectural Grid
      gsap.to(imageFrameRef.current, {
        y: 40,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1
        }
      });

      gsap.to(bgGridRef.current, {
        y: -30,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.2
        }
      });
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
      className="relative bg-ivory pt-24 pb-16 lg:pt-28 lg:pb-24 border-b border-border-soft overflow-hidden"
    >
      {/* Subtle Architectural Grid Lines with Scroll Parallax */}
      <div
        ref={bgGridRef}
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(#222 1px, transparent 1px), linear-gradient(to right, #222 1px, #FEF9EF 1px)",
          backgroundSize: "72px 72px"
        }}
        aria-hidden="true"
      />

      {/* Ambient Champagne Gold Lighting Glow */}
      <div
        className="absolute top-1/4 right-1/4 w-96 h-96 bg-gold/10 rounded-full blur-3xl pointer-events-none -z-0"
        aria-hidden="true"
      />

      <div className="max-w-[1340px] mx-auto px-4 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Column: Hero Editorial Typography (7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-start">
            {/* Academic Session Eyebrow Pill with Official Logo */}
            <div
              ref={eyebrowRef}
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-surface-pure border border-border-soft shadow-xs mb-6"
            >
              <img
                src={logoImg}
                alt="S.V. Tutorial"
                className="w-5 h-5 rounded-full object-cover border border-gold/40 shrink-0"
              />
              <span className="text-[10.5px] font-bold tracking-[0.16em] uppercase text-midnight">
                S.V. TUTORIAL · ADMISSIONS 2026–27
              </span>
              <span className="text-border-soft">|</span>
              <span className="text-[10.5px] font-semibold text-charcoal-muted">
                Standards 3–12
              </span>
            </div>

            {/* Headline */}
            <div ref={headlineRef}>
              <h1 className="font-serif text-[42px] sm:text-[54px] lg:text-[62px] leading-[1.12] text-charcoal tracking-tight font-bold mb-5">
                Strong Foundations.
                <br />
                <span className="font-serif italic font-medium text-gold-dark">
                  Confident Futures.
                </span>
              </h1>
            </div>

            {/* Supporting Copy */}
            <div ref={subtextRef} className="max-w-xl">
              <p className="text-base sm:text-[18px] text-charcoal/90 leading-relaxed font-medium mb-3">
                Personalised tuition for Classes 3–12, built around clear concepts, consistent
                practice and a stronger understanding of every subject.
              </p>
              <p className="text-[14px] leading-relaxed text-charcoal-muted mb-7">
                Under the direct academic instruction of <strong>Saif Barkat Vegdani</strong> (B.Com,
                B.Ed). Fostering critical thinking, disciplined study habits, and calm exam mastery.
              </p>
            </div>

            {/* Curriculum Scope Pills */}
            <div ref={badgesRef} className="flex flex-wrap gap-2.5 mb-8">
              <motion.div
                whileHover={{ y: -2, scale: 1.02 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-pure border border-border-soft text-xs font-semibold text-charcoal shadow-2xs cursor-default transition-colors hover:border-gold/50"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-gold" />
                <span>GSEB & CBSE Boards</span>
              </motion.div>
              <motion.div
                whileHover={{ y: -2, scale: 1.02 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-pure border border-border-soft text-xs font-semibold text-charcoal shadow-2xs cursor-default transition-colors hover:border-gold/50"
              >
                <BookOpen className="w-3.5 h-3.5 text-gold" />
                <span>Std 3–12 Comprehensive Focus</span>
              </motion.div>
              <motion.div
                whileHover={{ y: -2, scale: 1.02 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-pure border border-border-soft text-xs font-semibold text-charcoal shadow-2xs cursor-default transition-colors hover:border-gold/50"
              >
                <Award className="w-3.5 h-3.5 text-gold" />
                <span>Specialized Commerce Guidance</span>
              </motion.div>
            </div>

            {/* CTAs with Framer Motion spring interactions */}
            <div ref={ctaRef} className="flex flex-wrap items-center gap-3.5 mb-8 w-full sm:w-auto">
              <motion.a
                whileHover={{ scale: 1.03, y: -1, boxShadow: "0 10px 25px -5px rgba(7,8,23,0.3)" }}
                whileTap={{ scale: 0.97 }}
                href="#admissions"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-midnight hover:bg-midnight-card text-gold hover:text-gold-light font-bold text-xs tracking-wider uppercase transition-colors shadow-md border border-gold/40"
              >
                <span>Enquire About Admissions</span>
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.02, y: -1, backgroundColor: "#FAF6ED" }}
                whileTap={{ scale: 0.98 }}
                href="#classes"
                className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-surface-pure text-charcoal font-semibold text-xs tracking-wider uppercase border border-border-soft transition-colors shadow-2xs"
              >
                <span>Explore Classes</span>
                <ArrowDown className="w-3.5 h-3.5 text-gold group-hover:translate-y-0.5 transition-transform" />
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.03, y: -1, backgroundColor: "rgba(198, 161, 91, 0.25)" }}
                whileTap={{ scale: 0.97 }}
                href={whatsappGeneralUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-gold/15 text-charcoal font-bold text-xs tracking-wider uppercase border border-gold/40 transition-colors"
                aria-label="Enquire directly on WhatsApp"
              >
                <MessageCircle className="w-4 h-4 text-gold-dark" />
                <span>WhatsApp</span>
              </motion.a>
            </div>

            {/* Credibility Stamp */}
            <div
              ref={expPillRef}
              className="flex items-center gap-2.5 text-xs text-charcoal-muted px-4 py-2 rounded-full bg-surface-pure/90 border border-border-soft shadow-2xs"
            >
              <GraduationCap className="w-4 h-4 text-gold" />
              <span className="font-semibold text-charcoal tracking-wide uppercase text-[11px]">
                8 YEARS OF TEACHING EXPERIENCE
              </span>
              <span className="text-border-soft">·</span>
              <span className="text-charcoal-muted">B.Com, B.Ed</span>
            </div>
          </div>

          {/* Right Column: Luxury Editorial Framed Portrait (5 cols) */}
          <div className="lg:col-span-5 relative mt-4 lg:mt-0">
            <div ref={imageFrameRef} className="relative mx-auto max-w-[420px]">
              {/* Subtle Gold Hairline Offset Ring with generous 36px radius */}
              <div
                className="absolute -top-3 -right-3 -bottom-3 -left-3 rounded-[36px] border border-gold/30 pointer-events-none"
                aria-hidden="true"
              />

              {/* 21st.dev Spotlight & Border Beam Portrait Container */}
              <SpotlightCard
                className="bg-surface-pure p-3 rounded-[32px] border border-border-soft shadow-xl overflow-hidden group relative"
                spotlightColor="rgba(198, 161, 91, 0.16)"
                radius={420}
              >
                {/* 21st.dev Glowing Laser Border Beam */}
                <BorderBeam duration={11} borderWidth={1.5} radius={32} />

                <div className="relative overflow-hidden rounded-[26px]">
                  <img
                    src={saifStandingImg}
                    alt="Saif Barkat Vegdani - Principal Educator & Founder"
                    className="w-full h-[480px] object-cover object-top rounded-[26px] transition-transform duration-700 group-hover:scale-[1.02]"
                    loading="eager"
                    fetchPriority="high"
                  />
                </div>

                {/* Editorial Floating Credential Pill with micro-glassmorphism and official logo */}
                <div className="absolute bottom-6 left-6 right-6 bg-midnight/95 backdrop-blur-md px-4 py-3 rounded-[22px] border border-gold/30 text-white flex items-center justify-between shadow-2xl transition-all duration-300 group-hover:border-gold/60 z-20">
                  <div className="flex items-center gap-3">
                    <img
                      src={logoImg}
                      alt="S.V. Tutorial"
                      className="w-10 h-10 rounded-xl object-contain bg-midnight border border-gold/40 p-0.5 shrink-0 shadow-sm"
                    />
                    <div>
                      <span className="text-[10px] font-bold tracking-widest uppercase text-gold block">
                        S.V. Tutorial
                      </span>
                      <span className="text-xs font-semibold text-white">Saif Barkat Vegdani</span>
                    </div>
                  </div>
                  <div className="text-right border-l border-white/10 pl-3">
                    <span className="text-[10.5px] font-medium text-white/90 block leading-tight">
                      B.Com, B.Ed Qualified
                    </span>
                    <span className="text-[9.5px] text-gold-light block mt-0.5">
                      8 Years Record
                    </span>
                  </div>
                </div>
              </SpotlightCard>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
