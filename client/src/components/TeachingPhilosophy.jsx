import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Lightbulb, RotateCcw, Trophy, UserCheck, BookOpen } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function TeachingPhilosophy() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const listRef = useRef(null);
  const quoteRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Header entrance
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

      // Principles List Items entrance
      gsap.from(listRef.current?.children || [], {
        opacity: 0,
        y: 28,
        duration: 0.8,
        stagger: 0.14,
        ease: "power3.out",
        scrollTrigger: {
          trigger: listRef.current,
          start: "top 85%",
          toggleActions: "play none none none"
        }
      });

      // Full-width quote entrance
      gsap.from(quoteRef.current, {
        opacity: 0,
        y: 24,
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
        "Rote learning creates exam anxiety and breaks down whenever questions deviate from standard textbook templates. We deconstruct syllabus chapters into transparent conceptual steps, ensuring mathematical formulas, scientific laws, and commercial principles are understood from their origins."
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
      className="py-10 sm:py-16 bg-ivory border-b border-border-soft"
      aria-label="Teaching Philosophy"
    >
      <div className="site-container">
        {/* Section Eyebrow & Header */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <div className="eyebrow-badge mb-3">
            <BookOpen className="w-3.5 h-3.5 text-gold-dark shrink-0" />
            <span>05 / TEACHING PHILOSOPHY</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-charcoal tracking-tight mb-4">
            A Disciplined Philosophy of{" "}
            <span className="font-serif italic font-normal text-gold-dark">
              True Mastery.
            </span>
          </h2>

          <p className="text-sm sm:text-base text-charcoal-muted leading-relaxed font-normal mx-auto max-w-2xl">
            Education is not about rushed shortcuts or memorising blindly. It is about steady
            conceptual understanding, disciplined practice, and genuine confidence.
          </p>
        </div>

        {/* Editorial Layout: Portrait of Rigor + 4 Principles */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-10 sm:mb-14">
          {/* Left: Framed Pedagogical Portrait (5 cols) */}
          <div className="lg:col-span-5">
            <div className="bg-surface-pure rounded-2xl p-3 border border-border-soft shadow-md overflow-hidden relative group">
              <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-midnight/5">
                <img
                  src="/images/06_seated_with_open_book.png"
                  alt="Saif Barkat Vegdani demonstrating curriculum textbook breakdown"
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
                  loading="lazy"
                  width={420}
                  height={525}
                />
                {/* Floating Micro-Badge */}
                <div className="absolute bottom-3 left-3 right-3 bg-midnight/90 backdrop-blur-md px-3.5 py-2 rounded-xl border border-gold/30 text-white flex items-center justify-between text-xs shadow-lg">
                  <div>
                    <span className="text-[11px] font-bold text-gold uppercase tracking-wider block font-mono">
                      Method in Practice
                    </span>
                    <span className="text-xs text-white/90 font-medium">
                      Textbook Breakdown &amp; Logic
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-gold-light bg-gold/15 px-2 py-0.5 rounded-full border border-gold/30 shrink-0">
                    B.Com, B.Ed
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: 4 Principles (7 cols) */}
          <div ref={listRef} className="lg:col-span-7 space-y-5 sm:space-y-6">
            {principles.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.num}
                  className="pt-4 border-t border-border-soft group transition-colors"
                >
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div className="flex items-center gap-2.5">
                      <span className="font-serif font-bold text-xl sm:text-2xl text-gold-dark tracking-tight">
                        {item.num}
                      </span>
                      <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.14em] text-gold-dark/90 font-mono">
                        {item.eyebrow}
                      </span>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-surface-pure border border-border-soft flex items-center justify-center text-gold-dark group-hover:border-gold group-hover:bg-ivory-light transition-all shrink-0">
                      <Icon className="w-3.5 h-3.5 text-gold-dark" />
                    </div>
                  </div>

                  <h3 className="font-serif text-lg sm:text-xl font-bold text-charcoal tracking-tight mb-1.5 group-hover:text-midnight transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-charcoal/80 leading-relaxed font-normal">
                    {item.narrative}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Editorial Philosophical Statement Quote - Midnight Band */}
        <div
          ref={quoteRef}
          className="rounded-2xl bg-midnight text-white p-8 sm:p-12 relative overflow-hidden shadow-xl border border-midnight-subtle"
        >
          {/* Subtle gold accent top hairline */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent opacity-70" />

          <div className="max-w-3xl mx-auto text-center relative z-10">
            <span className="font-serif text-5xl text-gold/40 block leading-none select-none mb-2">
              &ldquo;
            </span>
            <p className="font-serif text-lg sm:text-xl md:text-2xl italic leading-relaxed text-ivory-light mb-6">
              When students truly grasp the foundational principles, fear disappears. With structured
              guidance and consistent practice, academic confidence becomes second nature.
            </p>
            <div className="inline-flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-gold tracking-wider uppercase font-mono">
              <span className="text-ivory">Saif Barkat Vegdani</span>
              <span className="text-gold/50">•</span>
              <span className="text-gold-light">B.Com, B.Ed</span>
              <span className="text-gold/50">•</span>
              <span className="text-ivory-light/70 font-normal">Principal Educator</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
