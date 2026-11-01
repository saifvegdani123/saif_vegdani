import React from "react";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  MessageCircle,
  ArrowRight,
  BookOpen,
  Compass,
  Award,
  Sparkles,
  AlertCircle,
  Calendar
} from "lucide-react";
import { PROGRAMMES_DATA } from "../data/programmes";
import { getProgrammeWhatsAppUrl } from "../utils/whatsapp";

export default function ProgramsSection() {
  const getProgramIcon = (id) => {
    if (id === "std-3-8") return Compass;
    if (id === "std-9-10") return Award;
    return Sparkles;
  };

  return (
    <section
      id="classes"
      className="py-10 sm:py-16 bg-ivory-light border-b border-border-soft"
      aria-label="Academic Programmes"
    >
      <div className="site-container">
        {/* Section Eyebrow */}
        <div className="flex items-center justify-between mb-6 pb-3 border-b border-border-soft">
          <div className="eyebrow-badge">
            <BookOpen className="w-3.5 h-3.5 text-gold-dark shrink-0" />
            <span>03 / ACADEMIC PROGRAMMES</span>
          </div>
          <span className="text-xs text-charcoal-muted font-medium hidden sm:inline font-mono">
            Evening Batches (4:30 PM – 8:00 PM)
          </span>
        </div>

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-5">
          <div className="max-w-2xl">
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-charcoal font-bold tracking-tight leading-tight">
              Learning Designed for{" "}
              <span className="font-serif italic font-normal text-gold-dark">
                Every Stage.
              </span>
            </h2>
            <p className="text-sm sm:text-base text-charcoal-muted mt-2.5 leading-relaxed font-normal">
              Three focused academic pathways built on disciplined syllabus pacing, conceptual clarity,
              and direct mentoring by Saif Barkat Vegdani.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-pure border border-border-soft text-xs font-semibold text-charcoal shadow-xs">
            <Calendar className="w-3.5 h-3.5 text-gold-dark" />
            <span>Monday to Saturday (Evening Batches)</span>
          </div>
        </div>

        {/* 3 Programme Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {PROGRAMMES_DATA.map((prog, index) => {
            const isFeatured = prog.cardTone === "featured";
            const whatsappUrl = getProgrammeWhatsAppUrl(prog.title, prog.highlightTag);
            const ProgIcon = getProgramIcon(prog.id);

            // Re-order on mobile so featured (Std 9–10) appears at the top
            const mobileOrder = isFeatured
              ? "order-1 md:order-2"
              : prog.id === "std-3-8"
              ? "order-2 md:order-1"
              : "order-3";

            return (
              <motion.div
                key={prog.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className={`rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 relative ${mobileOrder} ${
                  isFeatured
                    ? "bg-midnight text-white border border-gold/50 shadow-xl ring-1 ring-gold/20"
                    : "bg-surface-pure text-charcoal border border-border-soft shadow-xs hover:border-gold/50 hover:shadow-md"
                }`}
              >
                {/* Featured Badge for Crucial Board Phase */}
                {isFeatured && (
                  <div className="absolute -top-3 left-6 bg-gold text-midnight px-3.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase border border-gold-light shadow-xs flex items-center gap-1.5 font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-midnight animate-pulse"></span>
                    <span>{prog.badge}</span>
                  </div>
                )}

                <div>
                  {/* Card Header & Numeral */}
                  <div className="flex items-center justify-between mb-5 pb-3 border-b border-border-soft/40 pt-1">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center border shrink-0 ${
                          isFeatured
                            ? "border-gold/50 text-gold bg-white/5"
                            : "border-gold/40 text-gold-dark bg-ivory"
                        }`}
                      >
                        <ProgIcon className="w-4 h-4" />
                      </div>
                      <span className={`font-serif font-bold text-xl ${isFeatured ? "text-gold" : "text-gold-dark"}`}>
                        {prog.num}
                      </span>
                    </div>

                    <span
                      className={`text-xs font-semibold px-2.5 py-1 rounded-full border font-mono ${
                        isFeatured
                          ? "bg-white/10 text-gold-light border-gold/40"
                          : "bg-ivory text-charcoal-muted border-border-soft"
                      }`}
                    >
                      {prog.highlightTag}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h3
                    className={`font-serif text-2xl sm:text-3xl font-bold tracking-tight mb-1 ${
                      isFeatured ? "text-white" : "text-charcoal"
                    }`}
                  >
                    {prog.title}
                  </h3>
                  <p
                    className={`text-xs font-semibold uppercase tracking-wider mb-3 font-mono ${
                      isFeatured ? "text-gold" : "text-gold-dark"
                    }`}
                  >
                    {prog.subtitle}
                  </p>

                  <p
                    className={`text-sm leading-relaxed mb-6 font-normal ${
                      isFeatured ? "text-white/80" : "text-charcoal/80"
                    }`}
                  >
                    {prog.description}
                  </p>

                  {/* Clean Curriculum Scope Box */}
                  <div
                    className={`mb-6 p-4 rounded-xl border ${
                      isFeatured
                        ? "bg-white/5 border-white/10"
                        : "bg-ivory border-border-soft"
                    }`}
                  >
                    <span
                      className={`text-xs font-bold uppercase tracking-wider block mb-1 font-mono ${
                        isFeatured ? "text-gold" : "text-gold-dark"
                      }`}
                    >
                      Curriculum Coverage &amp; Exclusions
                    </span>
                    <p className={`text-sm font-semibold ${isFeatured ? "text-white" : "text-charcoal"}`}>
                      {prog.scope}
                    </p>
                    <p
                      className={`text-xs mt-1.5 italic flex items-center gap-1.5 ${
                        isFeatured ? "text-white/70" : "text-charcoal-muted"
                      }`}
                    >
                      <AlertCircle className="w-3.5 h-3.5 text-gold shrink-0" />
                      <span>{prog.scopeNote}</span>
                    </p>
                  </div>

                  {/* Key Highlights Bullet List */}
                  <ul className="space-y-2.5 mb-8 text-sm font-normal">
                    {prog.highlights.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <CheckCircle2
                          className={`w-4 h-4 mt-0.5 shrink-0 ${isFeatured ? "text-gold" : "text-gold-dark"}`}
                        />
                        <span className={`leading-snug ${isFeatured ? "text-white/85" : "text-charcoal/85"}`}>
                          {item}
                        </span>
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
                    className={`inline-flex items-center justify-between w-full px-5 py-3.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider transition-all min-h-[48px] ${
                      isFeatured
                        ? "bg-gold hover:bg-gold-light text-midnight border border-gold-light shadow-md"
                        : "bg-ivory hover:bg-gold hover:text-midnight text-charcoal border border-border-soft hover:border-gold shadow-xs"
                    }`}
                    aria-label={`Enquire for ${prog.title} on WhatsApp`}
                  >
                    <span className="flex items-center gap-2">
                      <MessageCircle className="w-4 h-4 shrink-0" />
                      <span>Enquire on WhatsApp</span>
                    </span>
                    <ArrowRight className="w-4 h-4 shrink-0" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Advisory Consultation Notice */}
        <div className="mt-10 p-5 sm:p-6 rounded-2xl bg-surface-pure border border-border-soft flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
          <div className="flex items-start gap-3">
            <BookOpen className="w-5 h-5 text-gold-dark shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm sm:text-base font-bold text-charcoal font-serif">
                Need Help Selecting the Appropriate Pathway?
              </h4>
              <p className="text-xs sm:text-sm text-charcoal-muted mt-0.5 leading-relaxed font-normal">
                Try our interactive Curriculum Diagnostic Tool below to instantly match your child&apos;s standard and board.
              </p>
            </div>
          </div>
          <a
            href="#curriculum-diagnostic"
            className="shrink-0 text-xs sm:text-sm font-bold uppercase tracking-wider text-gold-dark hover:text-midnight transition-colors inline-flex items-center gap-1.5 py-2 min-h-[44px]"
          >
            <span>Open Diagnostic Tool</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
