import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock,
  Calendar,
  CheckCircle2,
  AlertCircle,
  MessageCircle,
  ArrowRight,
  HelpCircle,
  BookOpen,
  ShieldCheck
} from "lucide-react";
import { createWhatsAppUrl } from "../utils/whatsapp";
import SpotlightCard from "./ui/SpotlightCard";

export default function CurriculumDiagnostic() {
  const [selectedStandard, setSelectedStandard] = useState(10);
  const [selectedBoard, setSelectedBoard] = useState("GSEB");

  // Dynamic diagnostic outcome logic
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
        timingSlot: "4:30 PM – 8:00 PM (Fixed on Consultation)",
        pedagogyFocus: "Foundational conceptual clarity, step-by-step arithmetic reasoning, and daily homework guidance without exam anxiety.",
        days: "Monday to Saturday (Evening Window)"
      };
    } else if (std >= 6 && std <= 8) {
      return {
        division: "Middle School Fundamentals (Std 6–8)",
        divisionBadge: "Conceptual Depth",
        allowedBoards: ["GSEB", "CBSE"],
        activeBoard: selectedBoard === "Commerce" ? "GSEB" : selectedBoard,
        subjects: ["Mathematics & Algebra", "Science & Physics/Chemistry Basics", "English Language", "Social Science"],
        scopeNote: "All school subjects included (except Sanskrit)",
        timingSlot: "4:30 PM – 8:00 PM (Fixed on Consultation)",
        pedagogyFocus: "Deconstructing core formula derivations, systematic notebook presentation checks, and regular diagnostic assessments.",
        days: "Monday to Saturday (Evening Window)"
      };
    } else if (std >= 9 && std <= 10) {
      return {
        division: "Secondary Board Preparation (Std 9–10)",
        divisionBadge: "GSEB Dedicated",
        allowedBoards: ["GSEB"],
        activeBoard: "GSEB",
        boardRestrictionNote: "Standards 9 & 10 are exclusively dedicated to Gujarat State Board (GSEB) syllabus preparation.",
        subjects: ["Mathematics", "Science & Technology", "Social Science", "English (Second/First Language)", "Gujarati / Hindi"],
        scopeNote: "All subjects included (except Computer and Sanskrit)",
        timingSlot: "4:30 PM – 8:00 PM (Fixed on Consultation)",
        pedagogyFocus: "Rigorous GSEB board blueprint practice, past-paper presentation drills, full-length simulations, and 1-on-1 doubt clinics.",
        days: "Monday to Saturday (Evening Window)"
      };
    } else {
      // Standards 11 & 12 (Commerce Stream Only)
      return {
        division: "Higher Secondary Commerce (Std 11–12)",
        divisionBadge: "Commerce Stream",
        allowedBoards: ["Commerce"],
        activeBoard: "Commerce (GSEB)",
        boardRestrictionNote: "Coaching is exclusively offered for Higher Secondary Commerce. Science stream is not offered.",
        subjects: [
          "Elements of Book Keeping & Accountancy",
          "Economics",
          "Statistics",
          "Organization of Commerce & Management (B.A.)",
          "Commercial Correspondence / English"
        ],
        scopeNote: "All core commerce subjects covered under direct guidance of Saif Sir (B.Com, B.Ed)",
        timingSlot: "4:30 PM – 8:00 PM (Fixed on Consultation)",
        pedagogyFocus: "Deep numerical derivation in Accountancy & Statistics, commercial terminology mastery, and board examination frameworks by Saif Sir (B.Com, B.Ed).",
        days: "Monday to Saturday (Evening Window)"
      };
    }
  }, [selectedStandard, selectedBoard]);

  const whatsappMessage = `Hello Saif Sir, I used the Curriculum Diagnostic tool for Class ${selectedStandard} (${diagnosticData.activeBoard}). I would like to check available batch timings during your 4:30 PM – 8:00 PM operational window.`;
  const whatsappUrl = createWhatsAppUrl(whatsappMessage);

  const standardsList = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  return (
    <section
      id="curriculum-diagnostic"
      className="py-10 sm:py-16 bg-ivory border-b border-border-soft relative overflow-hidden"
      aria-label="Curriculum Diagnostic Tool"
    >
      <div className="site-container relative z-10">
        {/* Section Eyebrow */}
        <div className="flex items-center justify-between mb-6 pb-3 border-b border-border-soft">
          <div className="eyebrow-badge">
            <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
            <span>04 / CURRICULUM DIAGNOSTIC</span>
          </div>
          <span className="text-xs text-charcoal-muted font-medium hidden sm:inline">
            Interactive Eligibility &amp; Batch Matching
          </span>
        </div>

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-charcoal font-bold tracking-tight leading-tight">
            Find Your Child’s Ideal Batch &amp; Pathway
          </h2>
          <p className="text-sm sm:text-base text-charcoal-muted mt-2.5 leading-relaxed font-normal">
            Select your student’s standard and board to preview the verified subject scope,
            recommended evening timing, and pedagogical focus mentored by Saif Sir.
          </p>
        </div>

        {/* Diagnostic Bento Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Segmented Pill Selectors (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            {/* Standard Selector Pill Bar */}
            <div className="bg-surface-pure p-5 sm:p-6 rounded-2xl border border-border-soft shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-charcoal">
                  1. Select Standard (Class)
                </span>
                <span className="text-xs font-semibold text-gold-dark px-2.5 py-0.5 rounded-full bg-ivory-light border border-gold/30">
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
                      className={`relative min-h-[44px] py-2.5 rounded-xl font-serif font-bold text-sm sm:text-base transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold z-10 cursor-pointer ${
                        isSelected ? "text-gold" : "text-charcoal hover:text-midnight"
                      }`}
                      aria-pressed={isSelected}
                    >
                      {isSelected && (
                        <motion.div
                          layoutId="activeStandardPill"
                          className="absolute inset-0 rounded-xl bg-midnight border border-gold shadow-xs -z-10"
                          transition={{ type: "spring", stiffness: 450, damping: 35 }}
                        />
                      )}
                      <span>{std}</span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-4 flex items-center justify-between text-xs text-charcoal-muted pt-3 border-t border-border-soft">
                <span>Std 3–8: Primary/Middle</span>
                <span>Std 9–10: GSEB Board</span>
                <span>Std 11–12: Commerce</span>
              </div>
            </div>

            {/* Board Selector */}
            <div className="bg-surface-pure p-5 sm:p-6 rounded-2xl border border-border-soft shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-charcoal">
                  2. Select Curriculum Board
                </span>
                <span className="text-xs font-medium text-charcoal-muted">
                  {diagnosticData.activeBoard}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 relative">
                {diagnosticData.allowedBoards.includes("Commerce") ? (
                  <div className="col-span-2 min-h-[44px] p-3 rounded-xl bg-midnight text-gold text-xs font-bold text-center border border-gold/50 flex items-center justify-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-gold" />
                    <span>Commerce Stream (Standards 11–12)</span>
                  </div>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={() => setSelectedBoard("GSEB")}
                      className={`relative min-h-[44px] p-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold z-10 cursor-pointer ${
                        diagnosticData.activeBoard === "GSEB"
                          ? "text-gold"
                          : "text-charcoal bg-ivory border border-border-soft hover:bg-ivory-tint"
                      }`}
                      aria-pressed={diagnosticData.activeBoard === "GSEB"}
                    >
                      {diagnosticData.activeBoard === "GSEB" && (
                        <motion.div
                          layoutId="activeBoardPill"
                          className="absolute inset-0 rounded-xl bg-midnight border border-gold shadow-xs -z-10"
                          transition={{ type: "spring", stiffness: 450, damping: 35 }}
                        />
                      )}
                      <CheckCircle2
                        className={`w-4 h-4 ${
                          diagnosticData.activeBoard === "GSEB" ? "text-gold" : "text-charcoal-muted"
                        }`}
                      />
                      <span>GSEB Board</span>
                    </button>

                    <button
                      type="button"
                      disabled={!diagnosticData.allowedBoards.includes("CBSE")}
                      onClick={() => setSelectedBoard("CBSE")}
                      className={`relative min-h-[44px] p-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold z-10 cursor-pointer ${
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
                          className="absolute inset-0 rounded-xl bg-midnight border border-gold shadow-xs -z-10"
                          transition={{ type: "spring", stiffness: 450, damping: 35 }}
                        />
                      )}
                      <CheckCircle2
                        className={`w-4 h-4 ${
                          diagnosticData.activeBoard === "CBSE" ? "text-gold" : "text-charcoal-muted"
                        }`}
                      />
                      <span>CBSE Board</span>
                    </button>
                  </>
                )}
              </div>

              {diagnosticData.boardRestrictionNote && (
                <div className="mt-3.5 p-3 rounded-xl bg-ivory border border-gold/40 text-xs text-charcoal-muted flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                  <span>{diagnosticData.boardRestrictionNote}</span>
                </div>
              )}
            </div>

            {/* Quick Consultation Prompt */}
            <div className="p-4 rounded-xl bg-surface-pure border border-border-soft flex items-center gap-3 text-xs text-charcoal-muted shadow-xs">
              <HelpCircle className="w-4 h-4 text-gold shrink-0" />
              <span>
                Not sure about syllabus pace or batch vacancy? Connect directly with Saif Sir before enrollment.
              </span>
            </div>
          </div>

          {/* Right Column: Live Sticky Result Bento Card (7 cols) */}
          <div className="lg:col-span-7 lg:sticky lg:top-24">
            <SpotlightCard
              className="bg-surface-pure rounded-2xl p-6 sm:p-8 border border-border-soft shadow-md relative group"
              spotlightColor="rgba(198, 161, 91, 0.12)"
              radius={400}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${selectedStandard}-${diagnosticData.activeBoard}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col justify-between h-full"
                >
                  <div>
                    {/* Header Pill & Title */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-5 border-b border-border-soft">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-gold" />
                        <span className="text-xs font-bold uppercase tracking-wider text-gold-dark">
                          Recommended Academic Route
                        </span>
                      </div>
                      <span className="px-3 py-1 rounded-full bg-midnight text-gold-light text-xs font-bold tracking-wider uppercase border border-gold/40">
                        {diagnosticData.divisionBadge}
                      </span>
                    </div>

                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal tracking-tight mb-2">
                      Standard {selectedStandard} — {diagnosticData.division}
                    </h3>
                    <p className="text-xs sm:text-sm text-charcoal-muted font-medium mb-5">
                      Board Affiliation:{" "}
                      <strong className="text-charcoal font-semibold">{diagnosticData.activeBoard}</strong> · Personal
                      Mentorship by Saif Barkat Vegdani (B.Com, B.Ed)
                    </p>

                    {/* Bento Grid Sub-widgets */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
                      {/* Widget 1: Evening Batch Time */}
                      <div className="p-3.5 rounded-xl bg-ivory border border-border-soft flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-surface-pure border border-gold/40 flex items-center justify-center text-gold-dark shrink-0">
                          <Clock className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="text-xs font-bold uppercase tracking-wider text-charcoal-muted block">
                            Evening Batch Timing
                          </span>
                          <span className="text-xs font-bold text-charcoal block mt-0.5">
                            {diagnosticData.timingSlot}
                          </span>
                          <span className="text-xs text-charcoal-muted">
                            Overall Window: 4:30 PM – 8:00 PM
                          </span>
                        </div>
                      </div>

                      {/* Widget 2: Weekly Cadence */}
                      <div className="p-3.5 rounded-xl bg-ivory border border-border-soft flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-surface-pure border border-gold/40 flex items-center justify-center text-gold-dark shrink-0">
                          <Calendar className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="text-xs font-bold uppercase tracking-wider text-charcoal-muted block">
                            Weekly Cadence
                          </span>
                          <span className="text-xs font-bold text-charcoal block mt-0.5">
                            {diagnosticData.days}
                          </span>
                          <span className="text-xs text-charcoal-muted">
                            Daily attendance &amp; review
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Subject Coverage Box */}
                    <div className="p-4 rounded-xl bg-surface-pure border border-border-soft mb-5">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-bold uppercase tracking-wider text-charcoal flex items-center gap-2">
                          <BookOpen className="w-3.5 h-3.5 text-gold" />
                          <span>Curriculum Subject Coverage</span>
                        </span>
                        <span className="text-xs font-semibold text-gold-dark bg-ivory px-2.5 py-0.5 rounded-full border border-gold/30">
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

                      <div className="pt-2.5 border-t border-border-soft text-xs text-charcoal-muted italic flex items-center gap-1.5">
                        <AlertCircle className="w-3.5 h-3.5 text-gold shrink-0" />
                        <span>{diagnosticData.scopeNote}</span>
                      </div>
                    </div>

                    {/* Pedagogical Focus */}
                    <div className="p-3.5 rounded-xl bg-ivory-light border border-border-soft mb-6">
                      <span className="text-xs font-bold uppercase tracking-wider text-gold-dark block mb-1">
                        Saif Sir&apos;s Instructional Priority
                      </span>
                      <p className="text-xs sm:text-sm text-charcoal/85 leading-relaxed font-normal">
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
                      className="inline-flex items-center justify-between w-full px-5 py-3.5 rounded-full bg-midnight hover:bg-midnight-card text-gold hover:text-gold-light font-bold text-xs tracking-wider uppercase transition-colors shadow-xs border border-gold/40 group min-h-[44px]"
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
