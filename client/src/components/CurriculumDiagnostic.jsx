import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  Clock,
  Calendar,
  MessageCircle,
  BookOpen,
  ArrowRight,
  AlertCircle,
  HelpCircle,
  ShieldCheck
} from "lucide-react";
import SpotlightCard from "./ui/SpotlightCard";
import { createWhatsAppUrl } from "../utils/whatsapp";

/**
 * Interactive Curriculum & Batch Diagnostic
 * Segmented pill selectors with sliding layoutId active highlight,
 * animated result panel, and prefilled WhatsApp CTA.
 */
export default function CurriculumDiagnostic() {
  const [selectedStandard, setSelectedStandard] = useState(10);
  const [selectedBoard, setSelectedBoard] = useState("GSEB");

  // Determine Division & Rules based on Selected Standard
  const diagnosticData = useMemo(() => {
    const std = selectedStandard;

    if (std >= 3 && std <= 5) {
      return {
        division: "Primary Foundation (Std 3–5)",
        divisionBadge: "Early Habits",
        allowedBoards: ["GSEB", "CBSE"],
        activeBoard: selectedBoard === "Commerce" ? "GSEB" : selectedBoard,
        subjects: ["Mathematics", "General Science / EVS", "English Grammar & Reader", "Social Studies"],
        scopeNote: "All school subjects included (except Sanskrit)",
        timingSlot: "4:30 PM – 5:45 PM (Evening)",
        pedagogyFocus: "Concrete illustrations, daily homework tracking, and building quiet study focus without rote pressure.",
        days: "Monday to Saturday (6 Days/Wk)"
      };
    } else if (std >= 6 && std <= 8) {
      return {
        division: "Middle School Fundamentals (Std 6–8)",
        divisionBadge: "Conceptual Depth",
        allowedBoards: ["GSEB", "CBSE"],
        activeBoard: selectedBoard === "Commerce" ? "GSEB" : selectedBoard,
        subjects: ["Mathematics & Algebra", "Science & Physics/Chemistry Basics", "English Language", "Social Science"],
        scopeNote: "All school subjects included (except Sanskrit)",
        timingSlot: "5:00 PM – 6:15 PM (Evening)",
        pedagogyFocus: "Strengthening analytical reasoning, formula derivation, and step-by-step problem breakdown before board years.",
        days: "Monday to Saturday (6 Days/Wk)"
      };
    } else if (std >= 9 && std <= 10) {
      return {
        division: "Secondary Board Preparation (Std 9–10)",
        divisionBadge: "GSEB Board Focus",
        allowedBoards: ["GSEB"],
        activeBoard: "GSEB",
        boardRestrictionNote: "Standards 9–10 are exclusively offered for the Gujarat State Board (GSEB).",
        subjects: ["Mathematics", "Science & Technology", "English (FL/SL)", "Social Science"],
        scopeNote: "All subjects included (except Computer and Sanskrit)",
        timingSlot: "6:00 PM – 7:30 PM (Evening)",
        pedagogyFocus: "Full-length board blueprint mock tests, answer-sheet presentation techniques, and strict GSEB paper pacing.",
        days: "Monday to Saturday + Mock Evaluations"
      };
    } else {
      // 11 or 12
      return {
        division: "Higher Secondary Commerce (Std 11–12)",
        divisionBadge: "Commerce Stream",
        allowedBoards: ["Commerce"],
        activeBoard: "Commerce",
        boardRestrictionNote: "Exclusively tailored for Higher Secondary Commerce stream under B.Com & B.Ed specialist guidance.",
        subjects: ["Elements of Accountancy", "Organization of Commerce & Management (OC)", "Statistics", "Economics"],
        scopeNote: "Comprehensive coverage of all core Commerce stream subjects",
        timingSlot: "6:30 PM – 8:00 PM (Evening)",
        pedagogyFocus: "Double-entry accounting principles, balance-sheet problem solving, economic reasoning, and board blueprints.",
        days: "Monday to Saturday + Weekly Evaluation"
      };
    }
  }, [selectedStandard, selectedBoard]);

  const standardsList = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  // Dynamic WhatsApp prefilled query
  const whatsappUrl = createWhatsAppUrl(
    `Hello Saif Sir, I used the interactive curriculum matcher on your website for Standard ${selectedStandard} (${diagnosticData.activeBoard}). Please share batch slot availability within the 4:30 PM – 8:00 PM window and admission details.`
  );

  return (
    <section
      id="curriculum-diagnostic"
      className="py-20 lg:py-28 bg-ivory-light border-b border-border-soft relative overflow-hidden"
      aria-label="Curriculum Diagnostic Tool"
    >
      {/* Decorative ambient warm golden glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[540px] h-[540px] bg-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        {/* Section Eyebrow */}
        <div className="flex items-center justify-between mb-8 pb-3 border-b border-border-soft/60">
          <span className="text-[10.5px] font-mono font-bold tracking-[0.22em] text-gold-dark uppercase">
            04 / CURRICULUM DIAGNOSTIC
          </span>
          <span className="text-[11px] font-sans text-charcoal-muted font-medium">
            Interactive Eligibility & Batch Matching
          </span>
        </div>

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[44px] text-charcoal font-bold tracking-tight leading-tight">
            Find Your Child’s Ideal Batch & Pathway
          </h2>
          <p className="text-xs sm:text-sm text-charcoal-muted mt-3 leading-relaxed font-normal">
            Select your student’s standard and board to preview the verified subject scope,
            recommended evening timing, and pedagogical focus mentored by Saif Sir.
          </p>
        </div>

        {/* Diagnostic Bento Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Segmented Pill Selectors (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-5 sm:gap-6">
            {/* Standard Selector Pill Bar */}
            <div className="bg-surface-pure p-5 sm:p-6 rounded-[22px] border border-border-soft shadow-2xs">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-charcoal">
                  1. Select Standard (Class)
                </span>
                <span className="text-[10.5px] font-semibold text-gold-dark px-2.5 py-0.5 rounded-full bg-ivory-light border border-gold/30">
                  Std {selectedStandard} Selected
                </span>
              </div>

              {/* Standard Selector Grid with sliding layoutId highlight */}
              <div className="grid grid-cols-5 gap-2 relative">
                {standardsList.map((std) => {
                  const isSelected = selectedStandard === std;
                  return (
                    <button
                      key={std}
                      type="button"
                      onClick={() => {
                        setSelectedStandard(std);
                        if (std >= 9 && std <= 10) setSelectedBoard("GSEB");
                        if (std >= 11) setSelectedBoard("Commerce");
                      }}
                      className={`relative py-2.5 sm:py-3 rounded-[14px] font-serif font-bold text-sm sm:text-base transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold z-10 ${
                        isSelected ? "text-gold" : "text-charcoal hover:text-midnight"
                      }`}
                      aria-pressed={isSelected}
                    >
                      {isSelected && (
                        <motion.div
                          layoutId="activeStandardPill"
                          className="absolute inset-0 rounded-[14px] bg-midnight border border-gold shadow-xs -z-10"
                          transition={{ type: "spring", stiffness: 450, damping: 35 }}
                        />
                      )}
                      <span>{std}</span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-4 flex items-center justify-between text-[10.5px] sm:text-[11px] text-charcoal-muted pt-3 border-t border-border-soft">
                <span>Std 3–8: Primary/Middle</span>
                <span>Std 9–10: GSEB Board</span>
                <span>Std 11–12: Commerce</span>
              </div>
            </div>

            {/* Board Selector */}
            <div className="bg-surface-pure p-5 sm:p-6 rounded-[22px] border border-border-soft shadow-2xs">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-charcoal">
                  2. Select Curriculum Board
                </span>
                <span className="text-[10.5px] font-medium text-charcoal-muted">
                  {diagnosticData.activeBoard}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2.5 sm:gap-3 relative">
                {diagnosticData.allowedBoards.includes("Commerce") ? (
                  <div className="col-span-2 p-3 sm:p-3.5 rounded-[14px] bg-midnight text-gold text-xs font-bold text-center border border-gold/50 flex items-center justify-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-gold" />
                    <span>Commerce Stream (Standards 11–12)</span>
                  </div>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={() => setSelectedBoard("GSEB")}
                      className={`relative p-3 sm:p-3.5 rounded-[14px] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold z-10 ${
                        diagnosticData.activeBoard === "GSEB"
                          ? "text-gold"
                          : "text-charcoal bg-ivory border border-border-soft hover:bg-ivory-tint"
                      }`}
                      aria-pressed={diagnosticData.activeBoard === "GSEB"}
                    >
                      {diagnosticData.activeBoard === "GSEB" && (
                        <motion.div
                          layoutId="activeBoardPill"
                          className="absolute inset-0 rounded-[14px] bg-midnight border border-gold shadow-xs -z-10"
                          transition={{ type: "spring", stiffness: 450, damping: 35 }}
                        />
                      )}
                      <CheckCircle2
                        className={`w-3.5 h-3.5 ${
                          diagnosticData.activeBoard === "GSEB" ? "text-gold" : "text-charcoal-muted"
                        }`}
                      />
                      <span>GSEB Board</span>
                    </button>

                    <button
                      type="button"
                      disabled={!diagnosticData.allowedBoards.includes("CBSE")}
                      onClick={() => setSelectedBoard("CBSE")}
                      className={`relative p-3 sm:p-3.5 rounded-[14px] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold z-10 ${
                        !diagnosticData.allowedBoards.includes("CBSE")
                          ? "opacity-40 cursor-not-allowed bg-ivory/50 border border-border-soft text-charcoal-muted"
                          : diagnosticData.activeBoard === "CBSE"
                          ? "text-gold"
                          : "text-charcoal bg-ivory border border-border-soft hover:bg-ivory-tint"
                      }`}
                      aria-pressed={diagnosticData.activeBoard === "CBSE"}
                    >
                      {diagnosticData.activeBoard === "CBSE" && (
                        <motion.div
                          layoutId="activeBoardPill"
                          className="absolute inset-0 rounded-[14px] bg-midnight border border-gold shadow-xs -z-10"
                          transition={{ type: "spring", stiffness: 450, damping: 35 }}
                        />
                      )}
                      <CheckCircle2
                        className={`w-3.5 h-3.5 ${
                          diagnosticData.activeBoard === "CBSE" ? "text-gold" : "text-charcoal-muted"
                        }`}
                      />
                      <span>CBSE Board</span>
                    </button>
                  </>
                )}
              </div>

              {diagnosticData.boardRestrictionNote && (
                <div className="mt-3.5 p-3 rounded-[12px] bg-ivory border border-gold/40 text-[11px] text-charcoal-muted flex items-start gap-2">
                  <AlertCircle className="w-3.5 h-3.5 text-gold shrink-0 mt-0.5" />
                  <span>{diagnosticData.boardRestrictionNote}</span>
                </div>
              )}
            </div>

            {/* Quick Consultation Prompt */}
            <div className="p-4 rounded-[18px] bg-surface-pure/90 border border-border-soft flex items-center gap-3 text-xs text-charcoal-muted">
              <HelpCircle className="w-4 h-4 text-gold shrink-0" />
              <span>
                Not sure about syllabus pace or batch vacancy? Connect directly with Saif Sir before enrollment.
              </span>
            </div>
          </div>

          {/* Right Column: Live Result Bento Card (7 cols) */}
          <div className="lg:col-span-7">
            <SpotlightCard
              className="bg-surface-pure rounded-[26px] p-7 sm:p-9 border border-border-soft shadow-md relative group"
              spotlightColor="rgba(198, 161, 91, 0.12)"
              radius={400}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${selectedStandard}-${diagnosticData.activeBoard}`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col justify-between h-full"
                >
                  <div>
                    {/* Header Pill & Title */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-6 border-b border-border-soft">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-gold" />
                        <span className="text-[11px] font-bold uppercase tracking-widest text-gold-dark">
                          Recommended Academic Route
                        </span>
                      </div>
                      <span className="px-3 py-1 rounded-full bg-midnight text-gold-light text-[10.5px] font-bold tracking-wider uppercase border border-gold/40">
                        {diagnosticData.divisionBadge}
                      </span>
                    </div>

                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal tracking-tight mb-2">
                      Standard {selectedStandard} — {diagnosticData.division}
                    </h3>
                    <p className="text-xs sm:text-sm text-charcoal-muted font-medium mb-6">
                      Board Affiliation:{" "}
                      <strong className="text-charcoal font-semibold">{diagnosticData.activeBoard}</strong> · Personal
                      Mentorship by Saif Barkat Vegdani (B.Com, B.Ed)
                    </p>

                    {/* Bento Grid Sub-widgets */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-6">
                      {/* Widget 1: Evening Batch Time */}
                      <div className="p-4 rounded-[16px] bg-ivory border border-border-soft flex items-start gap-3">
                        <div className="w-8 h-8 rounded-[10px] bg-surface-pure border border-gold/40 flex items-center justify-center text-gold-dark shrink-0">
                          <Clock className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="text-[9.5px] font-bold uppercase tracking-wider text-charcoal-muted block">
                            Evening Batch Timing
                          </span>
                          <span className="text-xs font-bold text-charcoal block mt-0.5">
                            {diagnosticData.timingSlot}
                          </span>
                          <span className="text-[10px] text-charcoal-muted">
                            Overall Window: 4:30 PM – 8:00 PM
                          </span>
                        </div>
                      </div>

                      {/* Widget 2: Weekly Cadence */}
                      <div className="p-4 rounded-[16px] bg-ivory border border-border-soft flex items-start gap-3">
                        <div className="w-8 h-8 rounded-[10px] bg-surface-pure border border-gold/40 flex items-center justify-center text-gold-dark shrink-0">
                          <Calendar className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="text-[9.5px] font-bold uppercase tracking-wider text-charcoal-muted block">
                            Weekly Cadence
                          </span>
                          <span className="text-xs font-bold text-charcoal block mt-0.5">
                            {diagnosticData.days}
                          </span>
                          <span className="text-[10px] text-charcoal-muted">
                            Daily attendance & review
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Subject Coverage Box */}
                    <div className="p-5 rounded-[18px] bg-surface-pure border border-border-soft mb-6">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-bold uppercase tracking-wider text-charcoal flex items-center gap-2">
                          <BookOpen className="w-3.5 h-3.5 text-gold" />
                          <span>Curriculum Subject Coverage</span>
                        </span>
                        <span className="text-[10px] font-semibold text-gold-dark bg-ivory px-2.5 py-0.5 rounded-full border border-gold/30">
                          Core Syllabus
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
                        {diagnosticData.subjects.map((subj, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-xs text-charcoal font-medium">
                            <CheckCircle2 className="w-3.5 h-3.5 text-gold shrink-0" />
                            <span>{subj}</span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-2.5 border-t border-border-soft text-[10.5px] text-charcoal-muted italic flex items-center gap-1.5">
                        <AlertCircle className="w-3 h-3 text-gold shrink-0" />
                        <span>{diagnosticData.scopeNote}</span>
                      </div>
                    </div>

                    {/* Pedagogical Focus */}
                    <div className="p-4 rounded-[16px] bg-ivory-light border border-border-soft mb-7">
                      <span className="text-[9.5px] font-bold uppercase tracking-widest text-gold-dark block mb-1">
                        Saif Sir's Instructional Priority
                      </span>
                      <p className="text-xs text-charcoal/85 leading-relaxed font-normal">
                        {diagnosticData.pedagogyFocus}
                      </p>
                    </div>
                  </div>

                  {/* 1-Click WhatsApp Consultation Action */}
                  <div className="pt-1">
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-between w-full px-5 py-3.5 rounded-full bg-midnight hover:bg-midnight-card text-gold hover:text-gold-light font-bold text-xs tracking-wider uppercase transition-colors shadow-xs border border-gold/40 group"
                      aria-label={`Enquire for Standard ${selectedStandard} on WhatsApp`}
                    >
                      <span className="flex items-center gap-2.5">
                        <MessageCircle className="w-4 h-4 text-gold" />
                        <span>Enquire for Standard {selectedStandard} on WhatsApp</span>
                      </span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-gold" />
                    </a>
                  </div>
                </motion.div>
              </AnimatePresence>
            </SpotlightCard>
          </div>
        </div>
      </div>
    </section>
  );
}
