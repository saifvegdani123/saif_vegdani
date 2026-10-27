import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { Lightbulb, Compass, RotateCcw, HelpCircle, Trophy, Sparkles } from "lucide-react";
import SpotlightCard from "./ui/SpotlightCard";
import BorderBeam from "./ui/BorderBeam";

gsap.registerPlugin(ScrollTrigger);

export default function TeachingPhilosophy() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const pillarsGrid1Ref = useRef(null);
  const pillarsGrid2Ref = useRef(null);
  const quoteRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Header
      gsap.from(headerRef.current, {
        opacity: 0,
        y: 25,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none none"
        }
      });

      // Top 3 Pillars
      gsap.from(pillarsGrid1Ref.current?.children || [], {
        opacity: 0,
        y: 40,
        duration: 0.85,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: pillarsGrid1Ref.current,
          start: "top 85%",
          toggleActions: "play none none none"
        }
      });

      // Bottom 2 Pillars
      gsap.from(pillarsGrid2Ref.current?.children || [], {
        opacity: 0,
        y: 40,
        duration: 0.85,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: pillarsGrid2Ref.current,
          start: "top 85%",
          toggleActions: "play none none none"
        }
      });

      // Editorial Quote
      gsap.from(quoteRef.current, {
        opacity: 0,
        scale: 0.96,
        y: 30,
        duration: 0.9,
        ease: "power2.out",
        scrollTrigger: {
          trigger: quoteRef.current,
          start: "top 85%",
          toggleActions: "play none none none"
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const pillars = [
    {
      icon: Lightbulb,
      num: "01",
      title: "Strong Fundamentals",
      summary: "Understanding the 'Why'",
      description:
        "Formulas, grammatical rules, and commercial principles are explained from their core origins, ensuring the logic is intuitive rather than intimidating."
    },
    {
      icon: Compass,
      num: "02",
      title: "Conceptual Clarity",
      summary: "Beyond Mechanical Memorisation",
      description:
        "Rote learning creates exam anxiety. We deconstruct syllabus chapters into transparent conceptual steps that students understand and retain naturally."
    },
    {
      icon: RotateCcw,
      num: "03",
      title: "Consistent Practice",
      summary: "Structured Daily Routine",
      description:
        "Academic excellence is built through regular step-by-step problem solving, notebook checks, and structured homework reviews each week."
    },
    {
      icon: HelpCircle,
      num: "04",
      title: "Encouraging Questions",
      summary: "Doubt-Free Learning",
      description:
        "Every question is valid. We foster an approachable classroom atmosphere where students feel completely comfortable voicing doubts until thoroughly resolved."
    },
    {
      icon: Trophy,
      num: "05",
      title: "Calm Confidence",
      summary: "Prepared for Any Exam",
      description:
        "Confidence is the byproduct of competence. Through disciplined preparation and simulated board papers, students approach tests with calm self-assurance."
    }
  ];

  return (
    <section ref={sectionRef} id="philosophy" className="py-20 lg:py-28 bg-ivory border-b border-border-soft">
      <div className="max-w-[1340px] mx-auto px-4 lg:px-12">
        {/* Section Header */}
        <div ref={headerRef} className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-surface-pure border border-border-soft text-[10.5px] font-bold tracking-[0.2em] uppercase text-gold-dark mb-3">
            <Sparkles className="w-3 h-3 text-gold" />
            Pedagogical Approach
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] text-charcoal font-bold tracking-tight leading-tight">
            A Disciplined Approach to True Mastery
          </h2>
          <p className="text-xs sm:text-sm text-charcoal-muted mt-3 leading-relaxed">
            Education is not about hurried shortcuts or memorising blindly. It is about steady
            conceptual understanding, disciplined practice, and genuine confidence.
          </p>

          {/* Verification Notice */}
          <div className="mt-4 inline-block text-[11px] text-charcoal-muted/80 bg-surface-pure/80 px-3.5 py-1 rounded-full border border-border-soft">
            <em>* Note: Proposed academic philosophy framework — subject to client confirmation.</em>
          </div>
        </div>

        {/* 5 Pillars Grid */}
        <div ref={pillarsGrid1Ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
          {pillars.slice(0, 3).map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                whileHover={{ y: -6, transition: { type: "spring", stiffness: 350, damping: 25 } }}
                className="h-full"
              >
                <SpotlightCard
                  className="bg-surface-pure p-8 rounded-[24px] border border-border-soft shadow-2xs hover:border-gold/60 transition-colors flex flex-col justify-between h-full group"
                  spotlightColor="rgba(198, 161, 91, 0.15)"
                  radius={350}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-11 h-11 rounded-[16px] border border-gold/40 flex items-center justify-center text-gold bg-ivory-light shadow-2xs group-hover:border-gold group-hover:scale-105 transition-all">
                        <Icon className="w-5 h-5 text-gold-dark" />
                      </div>
                      <span className="font-serif font-bold text-lg text-gold/80 group-hover:text-gold transition-colors">{item.num}</span>
                    </div>
                    <span className="text-[10px] font-bold tracking-widest uppercase text-gold-dark block mb-1">
                      {item.summary}
                    </span>
                    <h3 className="font-serif text-xl font-bold text-charcoal tracking-tight mb-2.5">
                      {item.title}
                    </h3>
                    <p className="text-xs text-charcoal-muted leading-relaxed font-normal">
                      {item.description}
                    </p>
                  </div>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom 2 Pillars Balanced Centered Grid */}
        <div ref={pillarsGrid2Ref} className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {pillars.slice(3, 5).map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                whileHover={{ y: -6, transition: { type: "spring", stiffness: 350, damping: 25 } }}
                className="h-full"
              >
                <SpotlightCard
                  className="bg-surface-pure p-8 rounded-[24px] border border-border-soft shadow-2xs hover:border-gold/60 transition-colors flex flex-col justify-between h-full group"
                  spotlightColor="rgba(198, 161, 91, 0.15)"
                  radius={350}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-11 h-11 rounded-[16px] border border-gold/40 flex items-center justify-center text-gold bg-ivory-light shadow-2xs group-hover:border-gold group-hover:scale-105 transition-all">
                        <Icon className="w-5 h-5 text-gold-dark" />
                      </div>
                      <span className="font-serif font-bold text-lg text-gold/80 group-hover:text-gold transition-colors">{item.num}</span>
                    </div>
                    <span className="text-[10px] font-bold tracking-widest uppercase text-gold-dark block mb-1">
                      {item.summary}
                    </span>
                    <h3 className="font-serif text-xl font-bold text-charcoal tracking-tight mb-2.5">
                      {item.title}
                    </h3>
                    <p className="text-xs text-charcoal-muted leading-relaxed font-normal">
                      {item.description}
                    </p>
                  </div>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </div>

        {/* Editorial Philosophical Statement Quote */}
        <motion.div
          ref={quoteRef}
          whileHover={{ scale: 1.01 }}
          className="mt-14 max-w-3xl mx-auto p-8 rounded-[26px] bg-midnight text-white border border-gold/30 text-center relative shadow-xl overflow-hidden group"
        >
          {/* 21st.dev Border Beam on Philosophy Quote */}
          <BorderBeam duration={12} borderWidth={1.5} radius={26} />

          {/* Subtle gold shimmer line */}
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
        </motion.div>
      </div>
    </section>
  );
}
