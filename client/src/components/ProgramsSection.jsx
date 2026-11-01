import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { CheckCircle2, MessageCircle, ArrowRight, BookOpen, AlertCircle, Compass, Award, Sparkles } from "lucide-react";
import { PROGRAMMES_DATA } from "../data/programmes";
import { getProgrammeWhatsAppUrl } from "../utils/whatsapp";
import SpotlightCard from "./ui/SpotlightCard";
import BorderBeam from "./ui/BorderBeam";

gsap.registerPlugin(ScrollTrigger);

export default function ProgramsSection() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef(null);
  const advisoryRef = useRef(null);

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

      // Cards staggered entrance
      gsap.from(cardsRef.current?.children || [], {
        opacity: 0,
        y: 36,
        duration: 0.85,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 85%",
          toggleActions: "play none none none"
        }
      });

      // Advisory consultation banner
      gsap.from(advisoryRef.current, {
        opacity: 0,
        y: 18,
        duration: 0.65,
        ease: "power3.out",
        scrollTrigger: {
          trigger: advisoryRef.current,
          start: "top 90%",
          toggleActions: "play none none none"
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const getProgramIcon = (id) => {
    if (id === "std-3-8") return Compass;
    if (id === "std-9-10") return Award;
    return Sparkles;
  };

  return (
    <section
      ref={sectionRef}
      id="classes"
      className="py-20 lg:py-28 bg-ivory border-b border-border-soft"
      aria-label="Academic Programmes"
    >
      <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Eyebrow */}
        <div className="flex items-center justify-between mb-8 pb-3 border-b border-border-soft/60">
          <span className="text-[10.5px] font-mono font-bold tracking-[0.22em] text-gold-dark uppercase">
            03 / ACADEMIC PROGRAMMES
          </span>
          <span className="text-[11px] font-sans text-charcoal-muted font-medium">
            Evening Batches (4:30 PM – 8:00 PM)
          </span>
        </div>

        {/* Section Header */}
        <div ref={headerRef} className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div className="max-w-2xl">
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[44px] text-charcoal font-bold tracking-tight leading-tight">
              Learning Designed for Every Stage
            </h2>
            <p className="text-xs sm:text-sm text-charcoal-muted mt-3 leading-relaxed font-normal">
              Three focused academic pathways built on disciplined syllabus pacing, conceptual clarity,
              and direct mentoring by Saif Barkat Vegdani.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-2 px-4 py-2 rounded-full bg-surface-pure border border-border-soft text-xs font-semibold text-charcoal shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-gold"></span>
            <span>Monday to Saturday (Evening Batches)</span>
          </div>
        </div>

        {/* 3 Bento-Style Programme Cards */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-7 lg:gap-8 items-stretch">
          {PROGRAMMES_DATA.map((prog) => {
            const isFeatured = prog.cardTone === "featured";
            const whatsappUrl = getProgrammeWhatsAppUrl(prog.title, prog.highlightTag);
            const ProgIcon = getProgramIcon(prog.id);

            return (
              <motion.div
                key={prog.id}
                whileHover={{ y: -6, transition: { type: "spring", stiffness: 300, damping: 22 } }}
                className="h-full"
              >
                <SpotlightCard
                  className={`rounded-[26px] p-7 sm:p-8 lg:p-9 flex flex-col justify-between transition-all relative group h-full ${
                    isFeatured
                      ? "bg-surface-pure border-2 border-gold shadow-md hover:shadow-xl"
                      : "bg-surface-pure border border-border-soft shadow-2xs hover:border-gold/50 hover:shadow-lg"
                  }`}
                  spotlightColor={isFeatured ? "rgba(198, 161, 91, 0.16)" : "rgba(198, 161, 91, 0.1)"}
                  radius={380}
                >
                  {/* Featured Card Laser BorderBeam */}
                  {isFeatured && <BorderBeam duration={9} borderWidth={1.8} radius={26} />}

                  {/* Floating Badge for Featured Card */}
                  {isFeatured && (
                    <div className="absolute -top-3.5 left-7 bg-midnight text-gold-light px-3.5 py-1 rounded-full text-[9.5px] font-bold tracking-widest uppercase border border-gold/40 shadow-xs flex items-center gap-1.5 z-30">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold"></span>
                      <span>{prog.badge}</span>
                    </div>
                  )}

                  <div>
                    {/* Card Header & Circular Gold Icon */}
                    <div className="flex items-center justify-between mb-5 pb-3 border-b border-border-soft pt-1">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full border border-gold/50 flex items-center justify-center text-gold-dark bg-ivory shadow-2xs group-hover:border-gold transition-colors">
                          <ProgIcon className="w-4 h-4 text-gold-dark" />
                        </div>
                        <span className="font-serif font-bold text-lg text-gold">{prog.num}</span>
                      </div>
                      <span className="text-[10px] font-semibold text-charcoal-muted px-2.5 py-0.5 rounded-full bg-ivory-light border border-border-soft">
                        {prog.highlightTag}
                      </span>
                    </div>

                    <h3 className="font-serif text-2xl sm:text-[26px] text-charcoal font-bold tracking-tight mb-1">
                      {prog.title}
                    </h3>
                    <p className="text-xs font-semibold text-charcoal-muted mb-4 uppercase tracking-wider">
                      {prog.subtitle}
                    </p>

                    <p className="text-xs text-charcoal/85 leading-relaxed mb-6 font-normal">
                      {prog.description}
                    </p>

                    {/* Curriculum Scope Box */}
                    <div
                      className={`p-4 rounded-[16px] border mb-6 transition-colors ${
                        isFeatured
                          ? "bg-ivory border-gold/40"
                          : "bg-ivory-light border-border-soft"
                      }`}
                    >
                      <span className="text-[9.5px] font-bold uppercase tracking-wider text-charcoal-muted block mb-1">
                        Curriculum Scope & Exclusions
                      </span>
                      <p className="text-xs text-charcoal font-semibold">{prog.scope}</p>
                      <p className="text-[10.5px] text-charcoal-muted mt-1 italic flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 text-gold shrink-0" />
                        <span>{prog.scopeNote}</span>
                      </p>
                    </div>

                    {/* Highlights Bullet List */}
                    <ul className="space-y-2.5 mb-8 text-xs text-charcoal/85 font-normal">
                      {prog.highlights.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-gold mt-0.5 shrink-0" />
                          <span className="leading-snug">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Card CTA */}
                  <div className="pt-2">
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center justify-between w-full px-5 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider transition-colors ${
                        isFeatured
                          ? "bg-midnight hover:bg-midnight-card text-gold hover:text-gold-light border border-gold/40 shadow-xs"
                          : "bg-ivory hover:bg-gold hover:text-midnight text-charcoal border border-border-soft hover:border-gold shadow-2xs"
                      }`}
                      aria-label={`Enquire for ${prog.title} on WhatsApp`}
                    >
                      <span className="flex items-center gap-2">
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Enquire on WhatsApp</span>
                      </span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </div>

        {/* Advisory Consultation Notice */}
        <div
          ref={advisoryRef}
          className="mt-12 p-5 sm:p-6 rounded-[22px] bg-surface-pure border border-border-soft flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-2xs hover:border-gold/30 transition-colors"
        >
          <div className="flex items-start gap-3.5">
            <BookOpen className="w-5 h-5 text-gold shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-charcoal uppercase tracking-wider">
                Need Guidance on Selecting the Right Pathway?
              </h4>
              <p className="text-xs text-charcoal-muted mt-0.5 font-normal">
                Saif Sir reviews the student's previous marksheet, textbooks, and learning pace during an initial direct consultation.
              </p>
            </div>
          </div>
          <a
            href="#admissions"
            className="shrink-0 px-5 py-2.5 rounded-full bg-midnight hover:bg-midnight-card text-gold text-xs font-bold uppercase tracking-wider transition-colors border border-gold/40"
          >
            Book Consultation
          </a>
        </div>
      </div>
    </section>
  );
}
