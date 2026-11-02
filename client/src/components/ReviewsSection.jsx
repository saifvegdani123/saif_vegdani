import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  CheckCircle2,
  ExternalLink,
  MessageSquare,
  Sparkles,
  Quote,
  ShieldCheck,
  MapPin
} from "lucide-react";
import SpotlightCard from "./ui/SpotlightCard";
import BorderBeam from "./ui/BorderBeam";
import MagneticButton from "./ui/MagneticButton";
import {
  GOOGLE_MAPS_URL,
  GOOGLE_BUSINESS_STATS,
  REVIEW_CATEGORIES,
  REVIEWS_DATA
} from "../data/reviews";

gsap.registerPlugin(ScrollTrigger);

// Official Google "G" SVG Component
function GoogleIcon({ className = "w-5 h-5 shrink-0" }) {
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

export default function ReviewsSection() {
  const [activeCategory, setActiveCategory] = useState("all");
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const statsBoxRef = useRef(null);
  const cardsGridRef = useRef(null);

  // GSAP ScrollTrigger Entrance Animations
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
        y: 28,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 82%",
          toggleActions: "play none none none"
        }
      });

      // Stats card entrance
      gsap.from(statsBoxRef.current, {
        opacity: 0,
        y: 24,
        scale: 0.98,
        duration: 0.85,
        ease: "power3.out",
        scrollTrigger: {
          trigger: statsBoxRef.current,
          start: "top 85%",
          toggleActions: "play none none none"
        }
      });

      // Cards stagger reveal
      gsap.from(cardsGridRef.current?.children || [], {
        opacity: 0,
        y: 24,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardsGridRef.current,
          start: "top 85%",
          toggleActions: "play none none none"
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const filteredReviews =
    activeCategory === "all"
      ? REVIEWS_DATA
      : REVIEWS_DATA.filter((rev) => rev.category === activeCategory);

  return (
    <section
      ref={sectionRef}
      id="reviews"
      className="py-12 sm:py-20 bg-ivory border-b border-border-soft relative overflow-hidden"
      aria-label="Verified Google Reviews and Parent Testimonials"
    >
      <div className="site-container relative z-10">
        {/* Section Header */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <div className="eyebrow-badge mb-3">
            <GoogleIcon className="w-3.5 h-3.5 shrink-0" />
            <span>08 / VERIFIED GOOGLE REVIEWS</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-charcoal tracking-tight mb-3">
            Voices of Trust &amp;{" "}
            <span className="font-serif italic font-normal text-gold-dark">
              Proven Growth.
            </span>
          </h2>

          <p className="text-sm sm:text-base text-charcoal-muted leading-relaxed font-normal mx-auto max-w-2xl">
            Real, unfiltered feedback from students and parents across Surat on Google Maps.
            Reflecting genuine conceptual transformation and personal mentorship under Saif Sir.
          </p>
        </div>

        {/* Featured Google Rating Banner Card */}
        <div ref={statsBoxRef} className="max-w-4xl mx-auto mb-10 sm:mb-12">
          <div className="relative rounded-2xl bg-surface-pure border border-border-soft p-5 sm:p-7 shadow-lg overflow-hidden">
            <BorderBeam duration={12} borderWidth={2} radius={20} />

            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              {/* Left Column: Rating Score & Stars */}
              <div className="flex items-center gap-4 text-center sm:text-left">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-midnight flex flex-col items-center justify-center p-2 border border-gold/40 shadow-md shrink-0">
                  <span className="font-serif font-bold text-2xl sm:text-3xl text-gold-light leading-none">
                    {GOOGLE_BUSINESS_STATS.rating.toFixed(1)}
                  </span>
                  <div className="flex items-center gap-0.5 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-gold text-gold shrink-0"
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                    <GoogleIcon className="w-4 h-4 shrink-0" />
                    <span className="font-serif font-bold text-base sm:text-lg text-charcoal">
                      Google Verified Business
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-mono font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 border border-emerald-500/30">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      <span>{GOOGLE_BUSINESS_STATS.recommendationRate} Recommended</span>
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-charcoal-muted">
                    Based on authentic student &amp; parent reviews in Rander &amp; Surat.
                  </p>
                  <div className="flex items-center justify-center sm:justify-start gap-2 text-xs text-charcoal/70 mt-1 font-mono">
                    <MapPin className="w-3.5 h-3.5 text-gold-dark shrink-0" />
                    <span>S.V. Tutorial · {GOOGLE_BUSINESS_STATS.location}</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Direct Google Maps Actions */}
              <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
                <a
                  href={GOOGLE_MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-3 rounded-full bg-midnight hover:bg-midnight/90 text-gold hover:text-gold-light font-bold text-xs uppercase tracking-wider transition-all shadow-sm border border-gold/40 min-h-[44px] cursor-pointer"
                  title="View authentic reviews on official Google Maps listing"
                >
                  <GoogleIcon className="w-4 h-4 shrink-0" />
                  <span>View on Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5 ml-0.5" />
                </a>

                <a
                  href={GOOGLE_MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-4 py-3 rounded-full bg-surface-pure hover:bg-ivory-light text-charcoal hover:text-midnight font-bold text-xs uppercase tracking-wider transition-all border border-border-soft min-h-[44px] cursor-pointer"
                  title="Write a Google review for S.V. Tutorial"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-gold-dark shrink-0" />
                  <span>Write a Review</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Category Filter Pills (Mobile Friendly & Non-Wrapping) */}
        <div className="flex justify-center mb-8 sm:mb-10 overflow-x-auto no-scrollbar px-2 max-w-full">
          <div className="inline-flex items-center p-1 rounded-full bg-surface-pure border border-border-soft shadow-2xs gap-1 max-w-full">
            {REVIEW_CATEGORIES.map((cat) => {
              const isSelected = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={`relative px-3.5 sm:px-5 py-2 rounded-full text-xs font-bold tracking-wide transition-colors cursor-pointer select-none whitespace-nowrap min-h-[40px] flex items-center shrink-0 ${
                    isSelected ? "text-midnight" : "text-charcoal/70 hover:text-charcoal"
                  }`}
                  aria-pressed={isSelected}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="activeReviewCategoryPill"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                      className="absolute inset-0 bg-gradient-to-r from-gold-light/40 via-gold/30 to-gold-light/40 border border-gold/60 rounded-full shadow-2xs"
                    />
                  )}
                  <span className="relative z-10">{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Reviews Cards Grid */}
        <div
          ref={cardsGridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredReviews.map((rev) => (
              <motion.div
                key={rev.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.28, ease: "easeOut" }}
              >
                <SpotlightCard className="h-full rounded-2xl bg-surface-pure border border-border-soft p-5 sm:p-6 shadow-xs hover:border-gold/50 transition-all duration-300 flex flex-col justify-between group">
                  <div>
                    {/* Card Top Row: Reviewer Avatar, Name & Google Verified Badge */}
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-midnight via-midnight/90 to-charcoal text-gold font-bold font-serif text-sm flex items-center justify-center shrink-0 border border-gold/40 shadow-xs">
                          {rev.initials}
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-serif font-bold text-charcoal text-base truncate">
                            {rev.author}
                          </h3>
                          <p className="text-[11px] text-charcoal-muted line-clamp-1">
                            {rev.role}
                          </p>
                        </div>
                      </div>

                      <div
                        className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-ivory-light border border-border-soft shrink-0"
                        title="Verified Review on Google Maps"
                      >
                        <GoogleIcon className="w-3.5 h-3.5 shrink-0" />
                        <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                      </div>
                    </div>

                    {/* Star Rating & Batch Tag */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-1">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 fill-gold text-gold shrink-0"
                          />
                        ))}
                      </div>
                      <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-ivory-light border border-border-soft text-charcoal-muted uppercase tracking-wider">
                        {rev.batch}
                      </span>
                    </div>

                    {/* Quote Highlight */}
                    <div className="mb-3 p-2.5 rounded-xl bg-ivory-light/60 border border-border-soft/60 flex items-start gap-2">
                      <Quote className="w-4 h-4 text-gold shrink-0 mt-0.5 rotate-180" />
                      <p className="text-xs font-serif italic text-charcoal font-medium leading-snug">
                        &ldquo;{rev.highlightSnippet}&rdquo;
                      </p>
                    </div>

                    {/* Detailed Review Text */}
                    <p className="text-xs sm:text-sm text-charcoal/80 leading-relaxed font-normal">
                      {rev.content}
                    </p>
                  </div>

                  {/* Card Bottom Meta */}
                  <div className="mt-5 pt-3.5 border-t border-border-soft flex items-center justify-between text-[11px] text-charcoal-muted font-mono">
                    <span className="inline-flex items-center gap-1 text-gold-dark font-semibold">
                      <Sparkles className="w-3 h-3 text-gold" />
                      <span>Verified Google Feedback</span>
                    </span>
                    <a
                      href={GOOGLE_MAPS_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-charcoal/60 hover:text-midnight transition-colors"
                      title="Inspect review on Google Maps"
                    >
                      <span>Google Maps</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Bottom Callout Banner: Direct invitation to read or leave review */}
        <div className="mt-10 sm:mt-12 p-6 sm:p-8 rounded-2xl bg-midnight text-white border border-gold/40 flex flex-col sm:flex-row sm:items-center justify-between gap-5 shadow-xl">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 text-gold text-xs font-bold tracking-widest uppercase mb-1.5 font-mono">
              <ShieldCheck className="w-4 h-4 text-gold shrink-0" />
              <span>Authentic Community Reputation</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-tight">
              Has Your Child Studied at S.V. Tutorial?
            </h3>
            <p className="text-xs sm:text-sm text-white/75 mt-1 leading-relaxed">
              We take deep pride in every student&apos;s academic growth. Read all community reviews
              or share your own experience directly on our official Google Business Profile.
            </p>
          </div>

          <div className="shrink-0">
            <MagneticButton
              as="a"
              href={GOOGLE_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-gold hover:bg-gold-light text-midnight font-bold text-xs tracking-wider uppercase transition-colors shadow-lg cursor-pointer min-h-[44px]"
            >
              <GoogleIcon className="w-4 h-4 shrink-0" />
              <span>Open Google Maps Profile</span>
              <ExternalLink className="w-3.5 h-3.5 ml-1" />
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
}
