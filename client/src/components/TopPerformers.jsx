import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trophy,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Calendar,
  CheckCircle2
} from "lucide-react";
import SectionDivider from "./ui/SectionDivider";
import BorderBeam from "./ui/BorderBeam";
import MagneticButton from "./ui/MagneticButton";

// Import authentic board result posters
import sscResult2026Img from "../assets/results/ssc-result-2026.jpg";
import sscResult2025Img from "../assets/results/ssc-result-2025.jpg";
import sscResult2024Img from "../assets/results/ssc-result-2024.jpg";

const BATCH_RESULTS = [
  {
    id: "2026",
    year: "2026",
    title: "SSC Result 2026",
    label: "Batch 2026",
    badge: "Latest Batch",
    topperHighlight: "Aafrin Kotadiya (70.84 PR) • Grade B1",
    poster: sscResult2026Img,
    summary: "Congratulations to our outstanding achievers of SSC 2026 for their consistency and dedication."
  },
  {
    id: "2025",
    year: "2025",
    title: "SSC Result 2025",
    label: "Batch 2025",
    badge: "Top Distinction",
    topperHighlight: "Ritika (86.52 PR / 82%) • Grade A2",
    poster: sscResult2025Img,
    summary: "Distinction cohort featuring top A2 grade percentiles across GSEB Board Examinations."
  },
  {
    id: "2024",
    year: "2024",
    title: "SSC Result 2024",
    label: "Batch 2024",
    badge: "100% Cleared",
    topperHighlight: "Ritisha Kotadiya (72.91 PR) • Grade B1",
    poster: sscResult2024Img,
    summary: "Foundational consistency and hard work delivering outstanding results for 5 rank holders."
  }
];

export default function TopPerformers() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxImage, setLightboxImage] = useState(null);

  const activeBatch = BATCH_RESULTS[currentIndex];

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? BATCH_RESULTS.length - 1 : prev - 1));
  }, []);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === BATCH_RESULTS.length - 1 ? 0 : prev + 1));
  }, []);

  // Keyboard navigation (Left/Right arrows + Escape for modal)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxImage) {
        if (e.key === "Escape") setLightboxImage(null);
        return;
      }
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxImage, handlePrev, handleNext]);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (lightboxImage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [lightboxImage]);

  return (
    <section id="results" className="py-20 sm:py-28 bg-ivory relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Eyebrow & Editorial Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold/15 border border-gold/40 text-charcoal text-[11px] font-bold tracking-[0.2em] uppercase mb-4 shadow-2xs">
            <Trophy className="w-3.5 h-3.5 text-gold-dark" />
            <span>02 / PROVEN BOARD RESULTS</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-charcoal tracking-tight mb-4">
            Official Board Results &amp;{" "}
            <span className="font-serif italic font-normal text-gold-dark">
              Top Performers.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-charcoal-muted leading-relaxed font-normal">
            Real outcomes from S.V. Tutorial batches. Verified merit announcements and scorecards
            from GSEB SSC Board Examinations under Saif Sir&apos;s direct mentorship.
          </p>
        </div>

        {/* Clean Segmented Tab Switcher */}
        <div className="flex justify-center mb-8 sm:mb-10">
          <div className="inline-flex items-center p-1.5 rounded-full bg-surface-pure border border-border-soft shadow-xs gap-1 sm:gap-2">
            {BATCH_RESULTS.map((batch, idx) => {
              const isSelected = currentIndex === idx;
              return (
                <button
                  key={batch.id}
                  type="button"
                  onClick={() => setCurrentIndex(idx)}
                  className={`relative px-4 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold tracking-wide transition-colors cursor-pointer select-none ${
                    isSelected ? "text-midnight" : "text-charcoal/70 hover:text-charcoal"
                  }`}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="activeBatchTabPill"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                      className="absolute inset-0 bg-gradient-to-r from-gold-light/40 via-gold/30 to-gold-light/40 border border-gold/60 rounded-full shadow-2xs"
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-gold-dark" />
                    <span>{batch.label}</span>
                    <span
                      className={`text-[9.5px] px-2 py-0.5 rounded-full uppercase tracking-wider font-mono font-bold ${
                        isSelected
                          ? "bg-midnight text-gold"
                          : "bg-charcoal/5 text-charcoal/60"
                      }`}
                    >
                      {batch.badge}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ======================================================== */}
        {/* HERO-SCALE SHOWCASE: Full-Sized Poster Presentation     */}
        {/* ======================================================== */}
        <div className="max-w-5xl mx-auto">
          <div className="relative rounded-2xl sm:rounded-3xl bg-surface-pure border border-border-soft p-3 sm:p-5 shadow-xl hover:shadow-2xl transition-all duration-300">
            {/* Laser Border Beam on the showcase card */}
            <BorderBeam duration={14} borderWidth={2} radius={24} />

            {/* Poster Canvas (Aspect 16:9) */}
            <div
              onClick={() => setLightboxImage(activeBatch.poster)}
              className="group relative w-full aspect-[16/9] rounded-xl sm:rounded-2xl overflow-hidden bg-midnight/5 cursor-zoom-in"
              title="Click to inspect official high-resolution banner"
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeBatch.id}
                  src={activeBatch.poster}
                  alt={`S.V. Tutorial ${activeBatch.title} Official Merit Poster`}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.01 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="w-full h-full object-contain sm:object-cover transition-transform duration-700 group-hover:scale-[1.015]"
                  loading="eager"
                  fetchPriority="high"
                />
              </AnimatePresence>

              {/* Floating Fullscreen Prompt Pill */}
              <div className="absolute bottom-4 right-4 z-20">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxImage(activeBatch.poster);
                  }}
                  className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-midnight/85 backdrop-blur-md border border-gold/40 text-gold hover:text-gold-light hover:bg-midnight text-xs font-bold tracking-wider uppercase shadow-xl transition-all cursor-pointer"
                  aria-label="Expand image to fullscreen"
                >
                  <Maximize2 className="w-3.5 h-3.5 text-gold" />
                  <span className="hidden sm:inline">Inspect Full Size</span>
                </button>
              </div>

              {/* Verified Ribbon Badge (Top Left) */}
              <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-midnight/85 backdrop-blur-md border border-gold/40 text-white text-[11px] font-bold tracking-wider uppercase shadow-lg">
                <CheckCircle2 className="w-3.5 h-3.5 text-gold shrink-0" />
                <span className="text-gold-light font-mono font-semibold">
                  Official S.V. Tutorial Result
                </span>
              </div>

              {/* Previous / Next Arrows on Hover */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-surface-pure/90 hover:bg-surface-pure text-charcoal hover:text-midnight border border-border-soft flex items-center justify-center shadow-lg transition-all cursor-pointer hover:scale-105"
                aria-label="Previous batch poster"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-surface-pure/90 hover:bg-surface-pure text-charcoal hover:text-midnight border border-border-soft flex items-center justify-center shadow-lg transition-all cursor-pointer hover:scale-105"
                aria-label="Next batch poster"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Poster Meta Footer */}
            <div className="mt-4 pt-3 border-t border-border-soft/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-charcoal-muted px-2">
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-gold shrink-0" />
                <span className="font-bold text-charcoal text-sm font-serif">
                  {activeBatch.title}
                </span>
                <span className="text-border-soft">•</span>
                <span className="text-charcoal-muted text-[11.5px]">
                  {activeBatch.topperHighlight}
                </span>
              </div>

              <div className="text-[11px] text-charcoal-muted font-mono flex items-center gap-2">
                <span>Use keyboard</span>
                <kbd className="px-1.5 py-0.5 rounded bg-charcoal/5 border border-border-soft font-bold text-[10px]">
                  ←
                </kbd>
                <kbd className="px-1.5 py-0.5 rounded bg-charcoal/5 border border-border-soft font-bold text-[10px]">
                  →
                </kbd>
                <span>to navigate</span>
              </div>
            </div>
          </div>

          {/* ======================================================== */}
          {/* INTERACTIVE THUMBNAIL REEL: Quick Access to all Posters  */}
          {/* ======================================================== */}
          <div className="mt-8">
            <div className="flex items-center justify-between mb-3 px-1">
              <span className="text-[11px] font-bold tracking-[0.18em] uppercase text-charcoal-muted">
                All Verified SSC Batches
              </span>
              <span className="text-[11px] text-gold-dark font-semibold">
                Click any banner to view
              </span>
            </div>

            <div className="grid grid-cols-3 gap-3 sm:gap-6">
              {BATCH_RESULTS.map((batch, idx) => {
                const isActive = currentIndex === idx;
                return (
                  <button
                    key={batch.id}
                    type="button"
                    onClick={() => setCurrentIndex(idx)}
                    className={`group relative rounded-xl sm:rounded-2xl p-1.5 sm:p-2 border text-left transition-all duration-300 cursor-pointer overflow-hidden ${
                      isActive
                        ? "bg-surface-pure border-gold shadow-md ring-2 ring-gold/30 scale-[1.01]"
                        : "bg-surface-pure/80 hover:bg-surface-pure border-border-soft hover:border-gold/40 shadow-xs opacity-75 hover:opacity-100"
                    }`}
                  >
                    <div className="relative aspect-[16/9] rounded-lg sm:rounded-xl overflow-hidden bg-midnight/5 mb-2">
                      <img
                        src={batch.poster}
                        alt={`${batch.title} thumbnail`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      {isActive && (
                        <div className="absolute inset-0 border-2 border-gold rounded-lg sm:rounded-xl pointer-events-none" />
                      )}
                    </div>

                    <div className="px-1 pb-1 flex items-center justify-between">
                      <div>
                        <span className="font-bold text-xs sm:text-sm text-charcoal block font-serif">
                          {batch.label}
                        </span>
                        <span className="text-[10px] sm:text-[11px] text-charcoal-muted block truncate">
                          {batch.badge}
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ======================================================== */}
          {/* ADMISSION INVITATION CALLOUT BANNER                     */}
          {/* ======================================================== */}
          <div className="mt-10 p-6 sm:p-8 rounded-2xl bg-midnight text-white border border-gold/40 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 text-gold text-xs font-bold tracking-widest uppercase mb-2">
                <Sparkles className="w-4 h-4" />
                <span>Admissions Open for Next Board Batch</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-tight">
                Want Your Child in the Next Achievers List?
              </h3>
              <p className="text-xs sm:text-sm text-white/70 mt-1.5 leading-relaxed">
                Focused coaching for GSEB &amp; CBSE Standards 3–12. Limited batch sizes guarantee
                direct conceptual instruction by Saif Sir.
              </p>
            </div>

            <div className="shrink-0">
              <MagneticButton
                as="a"
                href="#admissions"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-gold hover:bg-gold-light text-midnight font-bold text-xs tracking-wider uppercase transition-colors shadow-lg cursor-pointer"
              >
                <span>Book Academic Consultation</span>
              </MagneticButton>
            </div>
          </div>
        </div>
      </div>

      {/* Center Origin Section Hairline Divider */}
      <div className="mt-20 sm:mt-28">
        <SectionDivider />
      </div>

      {/* ======================================================== */}
      {/* 4K FULL-SCREEN LIGHTBOX MODAL (Crystal Clear Zoom)       */}
      {/* ======================================================== */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setLightboxImage(null)}
            className="fixed inset-0 z-[120] bg-midnight/95 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-6xl w-full bg-surface-pure p-3 sm:p-4 rounded-2xl sm:rounded-3xl border border-gold/40 shadow-2xl overflow-hidden cursor-default"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setLightboxImage(null)}
                className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-midnight/80 text-white hover:text-gold flex items-center justify-center transition-colors cursor-pointer border border-gold/30 shadow-lg"
                aria-label="Close fullscreen view"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Fullscreen High-Resolution Image */}
              <div className="rounded-xl overflow-hidden bg-midnight/5 max-h-[85vh] flex items-center justify-center">
                <img
                  src={lightboxImage}
                  alt="S.V. Tutorial Official Board Result High Resolution Poster"
                  className="w-full h-auto max-h-[82vh] object-contain rounded-xl"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
