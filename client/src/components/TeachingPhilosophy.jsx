import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { Lightbulb, RotateCcw, Trophy, UserCheck } from "lucide-react";
import SpotlightCard from "./ui/SpotlightCard";

gsap.registerPlugin(ScrollTrigger);

export default function TeachingPhilosophy() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const gridRef = useRef(null);
  const quoteRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Header
      gsap.from(headerRef.current, {
        opacity: 0,
        y: 24,
        duration: 0.75,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none none"
        }
      });

      // 4 Principles Grid
      gsap.from(gridRef.current?.children || [], {
        opacity: 0,
        y: 32,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 85%",
          toggleActions: "play none none none"
        }
      });

      // Editorial Quote
      gsap.from(quoteRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.75,
        ease: "power2.out",
        scrollTrigger: {
          trigger: quoteRef.current,
          start: "top 88%",
          toggleActions: "play none none none"
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const principles = [
    {
      num: "01",
      icon: Lightbulb,
      title: "Concept Clarity Over Rote Memorisation",
      eyebrow: "Foundational Understanding",
      narrative:
        "Rote learning creates exam anxiety and fails whenever questions deviate from standard textbook templates. We deconstruct syllabus chapters into transparent conceptual steps, ensuring mathematical formulas, scientific laws, and commercial principles are understood from their origins."
    },
    {
      num: "02",
      icon: RotateCcw,
      title: "Daily Structured Problem Solving",
      eyebrow: "Consistent Habitual Rigor",
      narrative:
        "Academic excellence is not built in pre-exam panic; it is the compound result of daily notebook checks, step-by-step problem breakdown, and consistent homework drills completed during our structured evening sessions."
    },
    {
      num: "03",
      icon: Trophy,
      title: "Calm, Confident Exam Temperament",
      eyebrow: "Psychological & Tactical Readiness",
      narrative:
        "Confidence is the natural byproduct of proven competence. Through timed syllabus simulations strictly mirroring Gujarat State Board and CBSE marking blueprints, students learn to pace their answers calmly without second-guessing."
    },
    {
      num: "04",
      icon: UserCheck,
      title: "Direct Educator Accountability",
      eyebrow: "Personal Mentorship Without Intermediaries",
      narrative:
        "Every batch and doubt clinic is taught directly by Saif Barkat Vegdani. No substitute instructors, no generic video recordings. Direct educator accountability ensures continuous parent transparency and individualized student focus."
    }
  ];

  return (
    <section
      ref={sectionRef}
      id="philosophy"
      className="py-20 lg:py-28 bg-ivory border-b border-border-soft"
      aria-label="Teaching Philosophy"
    >
      <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Eyebrow */}
        <div className="flex items-center justify-between mb-8 pb-3 border-b border-border-soft/60">
          <span className="text-[10.5px] font-mono font-bold tracking-[0.22em] text-gold-dark uppercase">
            05 / TEACHING PHILOSOPHY
          </span>
          <span className="text-[11px] font-sans text-charcoal-muted font-medium">
            Core Pedagogical Principles
          </span>
        </div>

        {/* Section Header */}
        <div ref={headerRef} className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[44px] text-charcoal font-bold tracking-tight leading-tight">
            A Disciplined Philosophy of True Mastery
          </h2>
          <p className="text-xs sm:text-sm text-charcoal-muted mt-3 leading-relaxed font-normal">
            Education is not about rushed shortcuts or memorising blindly. It is about steady
            conceptual understanding, disciplined practice, and genuine confidence.
          </p>
        </div>

        {/* Asymmetrical 2x2 Editorial Layout for the 4 Teaching Principles with Large Outlined Numerals */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-14">
          {principles.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                whileHover={{ y: -4, transition: { type: "spring", stiffness: 350, damping: 25 } }}
                className="h-full"
              >
                <SpotlightCard
                  className="bg-surface-pure p-7 sm:p-9 rounded-[24px] border border-border-soft shadow-2xs hover:border-gold/50 transition-all flex flex-col justify-between h-full group relative overflow-hidden"
                  spotlightColor="rgba(198, 161, 91, 0.12)"
                  radius={350}
                >
                  {/* Subtle Large Outlined Numeral in Background */}
                  <span
                    className="absolute top-4 right-6 font-serif text-6xl sm:text-7xl font-bold text-gold/10 select-none pointer-events-none group-hover:text-gold/20 transition-colors"
                    aria-hidden="true"
                  >
                    {item.num}
                  </span>

                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-11 h-11 rounded-[14px] border border-gold/35 flex items-center justify-center text-gold-dark bg-ivory-light shadow-2xs group-hover:border-gold transition-colors">
                        <Icon className="w-5 h-5 text-gold-dark" />
                      </div>
                      <span className="font-serif font-bold text-xl text-gold/80 group-hover:text-gold transition-colors">
                        {item.num}
                      </span>
                    </div>

                    <span className="text-[10px] font-bold tracking-widest uppercase text-gold-dark block mb-1.5">
                      {item.eyebrow}
                    </span>
                    <h3 className="font-serif text-xl sm:text-[22px] font-bold text-charcoal tracking-tight mb-3 group-hover:text-midnight transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-[13px] text-charcoal/80 leading-relaxed font-normal">
                      {item.narrative}
                    </p>
                  </div>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </div>

        {/* Editorial Philosophical Statement Quote */}
        <div
          ref={quoteRef}
          className="max-w-3xl mx-auto p-7 sm:p-9 rounded-[24px] bg-midnight text-white border border-gold/30 text-center relative shadow-lg overflow-hidden"
        >
          {/* Subtle gold top divider */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent opacity-60" />

          <p className="font-serif text-base sm:text-lg italic leading-relaxed text-white/95 mb-4">
            “When students truly grasp the foundational principles, fear disappears. With
            structured guidance and consistent practice, academic confidence becomes second nature.”
          </p>
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-gold-light tracking-wider uppercase">
            <span>— Saif Barkat Vegdani</span>
            <span className="text-white/30">|</span>
            <span className="text-white/70">B.Com, B.Ed</span>
          </div>
        </div>
      </div>
    </section>
  );
}
