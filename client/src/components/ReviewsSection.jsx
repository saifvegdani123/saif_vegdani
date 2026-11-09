import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  ExternalLink,
  MessageSquare,
  Quote,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  X
} from "lucide-react";
import BorderBeam from "./ui/BorderBeam";
import Marquee from "./ui/Marquee";
import {
  GOOGLE_MAPS_URL,
  GOOGLE_WRITE_REVIEW_URL,
  REVIEW_CATEGORIES,
  REVIEWS_DATA
} from "../data/reviews";

gsap.registerPlugin(ScrollTrigger);

// Official Google "G" SVG Component
function GoogleIcon({ className = "w-4 h-4 shrink-0" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
      />
    </svg>
  );
}

// Directional spring variants for smooth card transition
const cardSlideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 32 : -32,
    opacity: 0,
    scale: 0.99
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      x: { type: "spring", stiffness: 380, damping: 32 },
      opacity: { duration: 0.22 },
      scale: { duration: 0.22 }
    }
  },
  exit: (direction) => ({
    zIndex: 0,
    x: direction < 0 ? 32 : -32,
    opacity: 0,
    scale: 0.99,
    transition: {
      x: { type: "spring", stiffness: 380, damping: 32 },
      opacity: { duration: 0.16 }
    }
  })
};

export default function ReviewsSection() {
  const [activeTab, setActiveTab] = useState("all");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [selectedReviewModal, setSelectedReviewModal] = useState(null);

  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const mainCardRef = useRef(null);

  // Filter reviews based on active category
  const filteredReviews = useMemo(() => {
    return activeTab === "all"
      ? REVIEWS_DATA
      : REVIEWS_DATA.filter((rev) => rev.category === activeTab);
  }, [activeTab]);

  const safeIndex = currentIndex >= filteredReviews.length ? 0 : currentIndex;
  const activeReview = filteredReviews[safeIndex] || REVIEWS_DATA[0];

  // Carousel navigation handlers
  const handleNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % (filteredReviews.length || 1));
  }, [filteredReviews.length]);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + (filteredReviews.length || 1)) % (filteredReviews.length || 1));
  }, [filteredReviews.length]);

  // Autoplay timer with pause on interaction
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, handleNext]);

  // Keyboard navigation & modal escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedReviewModal) {
        if (e.key === "Escape") setSelectedReviewModal(null);
        return;
      }
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedReviewModal, handlePrev, handleNext]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedReviewModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedReviewModal]);

  // GSAP ScrollTrigger for smooth section entrance
  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none none"
        }
      });

      gsap.from(mainCardRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.75,
        ease: "power3.out",
        scrollTrigger: {
          trigger: mainCardRef.current,
          start: "top 88%",
          toggleActions: "play none none none"
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Handle touch swipe on mobile card
  const handleDragEnd = (event, info) => {
    const swipeThreshold = 40;
    if (info.offset.x < -swipeThreshold) {
      handleNext();
    } else if (info.offset.x > swipeThreshold) {
      handlePrev();
    }
  };

  return (
    <section
      ref={sectionRef}
      id="reviews"
      className="py-8 sm:py-14 bg-ivory border-b border-border-soft relative overflow-hidden"
      aria-label="Verified Google Reviews and Student Testimonials"
    >
      {/* Background Ambient Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] bg-gold/10 rounded-full blur-3xl pointer-events-none -z-0" />

      <div className="site-container relative z-10">
        {/* ========================================================================= */}
        {/* COMPACT SECTION HEADER (Integrated with Google Social Proof)              */}
        {/* ========================================================================= */}
        <div ref={headerRef} className="text-center max-w-2xl mx-auto mb-4 sm:mb-7">
          {/* Integrated Google 5.0 Eyebrow Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-pure border border-border-soft shadow-2xs mb-2">
            <GoogleIcon className="w-3.5 h-3.5 shrink-0" />
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-gold text-gold shrink-0" />
              ))}
            </div>
            <span className="text-[11px] font-mono font-bold text-charcoal">
              5.0 RATED ON GOOGLE MAPS
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
          </div>

          <h2 className="text-xl sm:text-3xl lg:text-4xl font-serif font-bold text-charcoal tracking-tight mb-1.5">
            Voices of Trust &amp;{" "}
            <span className="font-serif italic font-normal text-gold-dark">
              Proven Results.
            </span>
          </h2>

          <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed font-normal mx-auto max-w-lg mb-3">
            Real feedback from students and parents across Surat on Google Maps. Direct concept
            mentorship under Saif Sir.
          </p>

          {/* Quick External Actions */}
          <div className="flex items-center justify-center gap-2.5 text-xs relative z-20">
            <a
              href={GOOGLE_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-midnight hover:bg-midnight/90 text-gold hover:text-gold-light font-bold text-[11px] uppercase tracking-wider transition-colors shadow-2xs border border-gold/40 cursor-pointer min-h-[36px]"
              title="Open Google Maps listing"
            >
              <GoogleIcon className="w-3.5 h-3.5 shrink-0" />
              <span>Google Maps Listing</span>
              <ExternalLink className="w-3.5 h-3.5 ml-0.5" />
            </a>

            <a
              href={GOOGLE_WRITE_REVIEW_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-surface-pure hover:bg-ivory-light text-charcoal hover:text-midnight font-semibold text-[11px] uppercase tracking-wider transition-colors border border-border-soft cursor-pointer shadow-2xs min-h-[36px]"
              title="Open direct review card on Google"
            >
              <MessageSquare className="w-3.5 h-3.5 text-gold-dark shrink-0" />
              <span>Write Review</span>
            </a>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* COMPACT CATEGORY FILTER PILLS                                             */}
        {/* ========================================================================= */}
        <div className="flex justify-center mb-4 sm:mb-6 px-2 w-full">
          <div className="inline-flex items-center p-1 rounded-full bg-surface-pure border border-border-soft shadow-2xs gap-0.5 sm:gap-1 max-w-full">
            {REVIEW_CATEGORIES.map((cat) => {
              const isSelected = activeTab === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    setActiveTab(cat.id);
                    setCurrentIndex(0);
                  }}
                  className={`relative px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-bold tracking-wide transition-colors cursor-pointer select-none whitespace-nowrap min-h-[30px] sm:min-h-[32px] flex items-center shrink-0 ${
                    isSelected ? "text-midnight" : "text-charcoal/70 hover:text-charcoal"
                  }`}
                  aria-pressed={isSelected}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="activeReviewCategoryPill"
                      transition={{ type: "spring", stiffness: 450, damping: 35 }}
                      className="absolute inset-0 bg-gradient-to-r from-gold-light/40 via-gold/30 to-gold-light/40 border border-gold/60 rounded-full shadow-2xs"
                    />
                  )}
                  <span className="relative z-10">
                    <span className="sm:hidden">{cat.shortLabel || cat.label}</span>
                    <span className="hidden sm:inline">{cat.label}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* COMPACT, MOBILE-OPTIMIZED SPOTLIGHT CARD (Visible at a Single Glance)     */}
        {/* ========================================================================= */}
        <div ref={mainCardRef} className="max-w-2xl mx-auto px-1 sm:px-0">
          <div className="relative rounded-2xl bg-surface-pure border border-border-soft shadow-md p-3.5 sm:p-6 overflow-hidden">
            <BorderBeam duration={16} borderWidth={2} radius={18} />

            {/* Subtle Autoplay Progress Line at Top */}
            {isAutoPlaying && (
              <motion.div
                key={`progress-${activeReview.id}`}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 6, ease: "linear" }}
                className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-gold via-gold-dark to-gold origin-left pointer-events-none z-20 opacity-80"
              />
            )}

            {/* Swipeable Testimonial Card Area */}
            <motion.div
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.15}
              onDragEnd={handleDragEnd}
              className="touch-pan-y cursor-grab active:cursor-grabbing"
              title="Swipe left or right to switch review"
            >
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={activeReview.id}
                  custom={direction}
                  variants={cardSlideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="flex flex-col justify-between"
                >
                  {/* Top Header Row: Reviewer Details + Google Verified Badge */}
                  <div className="flex items-start justify-between gap-2.5 pb-2.5 border-b border-border-soft mb-3">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div
                        className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-gradient-to-br ${activeReview.avatarBg} text-white font-bold font-serif text-xs sm:text-sm flex items-center justify-center shrink-0 shadow-xs ring-1 ring-gold/40`}
                      >
                        {activeReview.initials}
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <h3 className="font-serif font-bold text-charcoal text-sm sm:text-base truncate">
                            {activeReview.author}
                          </h3>
                        </div>
                        <p className="text-[11px] text-charcoal-muted truncate">
                          {activeReview.role}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-mono font-bold border border-emerald-200">
                        <GoogleIcon className="w-3 h-3 shrink-0" />
                        <span>Verified 5.0</span>
                      </span>
                    </div>
                  </div>

                  {/* Stars + Cohort Highlight Pill */}
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <div className="flex items-center gap-1">
                      {[...Array(activeReview.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-3.5 h-3.5 fill-gold text-gold shrink-0 drop-shadow-2xs"
                        />
                      ))}
                      <span className="text-[11px] font-mono font-bold text-gold-dark ml-1">
                        5.0
                      </span>
                    </div>

                    <span className="text-[10px] sm:text-[11px] font-mono font-semibold px-2 py-0.5 rounded-full bg-ivory-light border border-border-soft text-charcoal truncate max-w-[190px] sm:max-w-none">
                      {activeReview.studentHighlight}
                    </span>
                  </div>

                  {/* Highlight Quote */}
                  <div className="mb-2.5 p-2 sm:p-2.5 rounded-xl bg-ivory-light/70 border-l-2 border-gold flex items-start gap-2">
                    <Quote className="w-3.5 h-3.5 text-gold shrink-0 mt-0.5 rotate-180" />
                    <p className="font-serif italic font-semibold text-xs sm:text-sm text-charcoal leading-snug">
                      &ldquo;{activeReview.highlightSnippet}&rdquo;
                    </p>
                  </div>

                  {/* Review Body (Compact & readable, no overflow) */}
                  <p className="text-xs sm:text-sm text-charcoal/85 leading-relaxed font-normal mb-3 line-clamp-3 sm:line-clamp-4">
                    {activeReview.content}
                  </p>

                  {/* Action Link & Lightbox Trigger */}
                  <div className="flex items-center justify-between text-[11px] font-mono pt-2 border-t border-border-soft">
                    <button
                      type="button"
                      onClick={() => setSelectedReviewModal(activeReview)}
                      className="text-gold-dark hover:text-charcoal font-semibold underline underline-offset-2 cursor-pointer transition-colors"
                    >
                      Read Complete Review
                    </button>

                    <a
                      href={GOOGLE_MAPS_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-charcoal-muted hover:text-midnight transition-colors"
                    >
                      <span>Verify on Google Maps</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* =================================================================== */}
            {/* COMPACT BOTTOM CONTROLS (Dots + Counter + Prev/Next Buttons)        */}
            {/* =================================================================== */}
            <div className="mt-3 pt-2.5 border-t border-border-soft flex items-center justify-between gap-2">
              {/* Dot Indicators */}
              <div className="flex items-center gap-1">
                {filteredReviews.map((rev, idx) => {
                  const isActive = safeIndex === idx;
                  return (
                    <button
                      key={rev.id}
                      type="button"
                      onClick={() => {
                        setDirection(idx > safeIndex ? 1 : -1);
                        setCurrentIndex(idx);
                      }}
                      className="min-h-[22px] min-w-[18px] flex items-center justify-center cursor-pointer"
                      aria-label={`Jump to review ${idx + 1}`}
                    >
                      <span
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          isActive ? "w-5 bg-gold-dark" : "w-1.5 bg-charcoal/20 hover:bg-charcoal/40"
                        }`}
                      />
                    </button>
                  );
                })}
              </div>

              {/* Prev / Next & Pause Controls */}
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono font-semibold text-charcoal-muted">
                  {safeIndex + 1} / {filteredReviews.length}
                </span>

                <button
                  type="button"
                  onClick={() => setIsAutoPlaying((prev) => !prev)}
                  className="w-7 h-7 rounded-full bg-surface-pure hover:bg-ivory-light border border-border-soft text-charcoal flex items-center justify-center transition-colors cursor-pointer"
                  aria-label={isAutoPlaying ? "Pause autoplay" : "Play autoplay"}
                  title={isAutoPlaying ? "Pause" : "Play"}
                >
                  {isAutoPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3 ml-0.5" />}
                </button>

                <button
                  type="button"
                  onClick={handlePrev}
                  className="w-8 h-8 rounded-full bg-surface-pure hover:bg-ivory-light border border-border-soft text-charcoal hover:text-midnight flex items-center justify-center transition-all cursor-pointer shadow-2xs active:scale-95"
                  aria-label="Previous review"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  className="w-8 h-8 rounded-full bg-surface-pure hover:bg-ivory-light border border-border-soft text-charcoal hover:text-midnight flex items-center justify-center transition-all cursor-pointer shadow-2xs active:scale-95"
                  aria-label="Next review"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* COMPACT TICKER STREAM OF ALL VERIFIED REVIEWS                             */}
        {/* ========================================================================= */}
        <div className="mt-8 pt-4">
          <div className="text-center mb-3">
            <span className="text-[11px] font-mono uppercase tracking-widest text-charcoal-muted font-bold">
              Continuous Google Reviews Feed · Tap Any Card to Inspect
            </span>
          </div>

          <Marquee pauseOnHover={true} duration={34} gap="gap-3.5" fadeEdges={true}>
            {REVIEWS_DATA.map((rev) => (
              <div
                key={`ticker-${rev.id}`}
                onClick={() => setSelectedReviewModal(rev)}
                className="w-[280px] sm:w-[320px] p-3.5 rounded-xl bg-surface-pure border border-border-soft hover:border-gold/50 shadow-2xs transition-all duration-200 cursor-pointer flex flex-col justify-between shrink-0 select-none group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <div
                        className={`w-7 h-7 rounded-full bg-gradient-to-br ${rev.avatarBg} text-white font-bold font-serif text-xs flex items-center justify-center shrink-0`}
                      >
                        {rev.initials}
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-serif font-bold text-charcoal text-xs truncate">
                          {rev.author}
                        </h4>
                        <p className="text-[10px] text-charcoal-muted truncate">
                          {rev.role}
                        </p>
                      </div>
                    </div>
                    <GoogleIcon className="w-3.5 h-3.5 shrink-0" />
                  </div>

                  <p className="text-[11px] text-charcoal/80 line-clamp-2 leading-relaxed">
                    &ldquo;{rev.content}&rdquo;
                  </p>
                </div>

                <div className="mt-2.5 pt-2 border-t border-border-soft flex items-center justify-between text-[10px] font-mono text-gold-dark font-semibold">
                  <span>{rev.batch}</span>
                  <span className="group-hover:translate-x-0.5 transition-transform">Read ↗</span>
                </div>
              </div>
            ))}
          </Marquee>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* REVIEW LIGHTBOX MODAL (Detailed Full Inspection)                         */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {selectedReviewModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setSelectedReviewModal(null)}
            className="fixed inset-0 z-[120] bg-midnight/90 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0, y: 14 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 14 }}
              transition={{ type: "spring", stiffness: 380, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-lg w-full bg-surface-pure p-5 sm:p-7 rounded-2xl border border-gold/40 shadow-2xl cursor-default max-h-[90vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedReviewModal(null)}
                className="absolute top-4 right-4 z-20 min-h-[36px] min-w-[36px] rounded-full bg-charcoal/5 hover:bg-charcoal/10 text-charcoal flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Reviewer Header */}
              <div className="flex items-center gap-3 mb-4">
                <div
                  className={`w-11 h-11 rounded-full bg-gradient-to-br ${selectedReviewModal.avatarBg} text-white font-bold font-serif text-base flex items-center justify-center shrink-0 shadow-md ring-1 ring-gold/40`}
                >
                  {selectedReviewModal.initials}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-serif font-bold text-charcoal text-base">
                      {selectedReviewModal.author}
                    </h3>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-mono font-bold border border-emerald-200">
                      <GoogleIcon className="w-3 h-3 shrink-0" />
                      <span>Verified Google Review</span>
                    </span>
                  </div>
                  <p className="text-xs text-charcoal-muted">
                    {selectedReviewModal.role} · <span className="font-mono">{selectedReviewModal.timeAgo}</span>
                  </p>
                </div>
              </div>

              {/* Stars & Cohort Tag */}
              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center gap-0.5">
                  {[...Array(selectedReviewModal.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-gold text-gold shrink-0 drop-shadow-2xs"
                    />
                  ))}
                </div>
                <span className="text-xs font-mono font-bold text-gold-dark">
                  5.0 / 5.0
                </span>
                <span className="text-border-soft">•</span>
                <span className="text-xs font-mono text-charcoal-muted">
                  {selectedReviewModal.batch}
                </span>
              </div>

              {/* Highlight callout */}
              <div className="mb-3.5 p-3 rounded-xl bg-ivory-light border border-border-soft">
                <p className="text-xs font-mono font-semibold text-gold-dark">
                  Student Cohort: {selectedReviewModal.studentHighlight}
                </p>
              </div>

              {/* Full Content */}
              <p className="text-xs sm:text-sm text-charcoal/90 leading-relaxed font-normal mb-5">
                &ldquo;{selectedReviewModal.content}&rdquo;
              </p>

              {/* Modal Actions */}
              <div className="pt-3.5 border-t border-border-soft flex items-center justify-between gap-3">
                <span className="text-xs font-mono text-charcoal-muted">
                  S.V Tutorials · Rander, Surat
                </span>

                <a
                  href={GOOGLE_MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-midnight hover:bg-midnight/90 text-gold hover:text-gold-light text-xs font-bold uppercase tracking-wider transition-colors min-h-[38px]"
                >
                  <GoogleIcon className="w-3.5 h-3.5 shrink-0" />
                  <span>Open on Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
