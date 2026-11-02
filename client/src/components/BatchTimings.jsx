import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Clock, AlertCircle, Users, MessageCircle, Calendar } from "lucide-react";
import { createWhatsAppUrl } from "../utils/whatsapp";

gsap.registerPlugin(ScrollTrigger);

export default function BatchTimings() {
  const sectionRef = useRef(null);
  const leftColRef = useRef(null);
  const rightColRef = useRef(null);
  const rowsRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Left Column Schedule
      gsap.from(leftColRef.current, {
        opacity: 0,
        y: 24,
        duration: 0.75,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      });

      // Right Column Dark Card
      gsap.from(rightColRef.current, {
        opacity: 0,
        x: 24,
        scale: 0.98,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      });

      // Staggered batch rows
      gsap.from(rowsRef.current?.children || [], {
        opacity: 0,
        y: 12,
        duration: 0.5,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: {
          trigger: rowsRef.current,
          start: "top 85%",
          toggleActions: "play none none none"
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const whatsappTimingUrl = createWhatsAppUrl(
    "Hello Saif Sir, I would like to check available batch timings between 4:30 PM and 8:00 PM for my child."
  );

  return (
    <section
      ref={sectionRef}
      id="timings"
      className="py-10 sm:py-16 bg-ivory border-b border-border-soft"
      aria-label="Batch Timings & Schedule"
    >
      <div className="site-container">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <div className="eyebrow-badge mb-3">
            <Clock className="w-3.5 h-3.5 text-gold-dark shrink-0" />
            <span>07 / OPERATIONAL SCHEDULE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-charcoal tracking-tight mb-3">
            A Schedule Structured for{" "}
            <span className="font-serif italic font-normal text-gold-dark">
              Deep Focus.
            </span>
          </h2>

          <p className="text-sm sm:text-base text-charcoal-muted leading-relaxed font-normal mx-auto max-w-2xl">
            Our sessions operate during late afternoon and evening hours to comfortably accommodate
            both morning-shift and afternoon-shift school routines.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Left Column: Schedule Details & Operating Window (7 cols) */}
          <div ref={leftColRef} className="lg:col-span-7 flex flex-col justify-between">
            <div className="bg-surface-pure rounded-2xl border border-border-soft p-6 sm:p-8 shadow-xs">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-border-soft">
                <span className="text-xs font-bold uppercase tracking-[0.14em] text-gold-dark font-mono flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-gold animate-pulse"></span>
                  EVENING OPERATIONAL WINDOW
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-ivory-light text-charcoal border border-border-soft flex items-center gap-1.5 font-mono">
                  <Calendar className="w-3.5 h-3.5 text-gold-dark" />
                  Monday – Saturday
                </span>
              </div>

              {/* Large Clock Window Display with whitespace-nowrap to avoid awkward wraps */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4">
                <div className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-charcoal tracking-tight">
                  <span className="whitespace-nowrap">4:30 PM</span>{" "}
                  <span className="text-gold font-light">–</span>{" "}
                  <span className="whitespace-nowrap">8:00 PM</span>
                </div>

                <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-ivory-light border border-gold/30 shadow-2xs shrink-0 self-start sm:self-auto">
                  <Clock className="w-4 h-4 text-gold-dark" />
                  <span className="text-xs font-bold text-charcoal font-mono">3.5 Hours Daily Focus</span>
                </div>
              </div>

              {/* Transparent Advisory Note */}
              <div className="mt-6 p-4 rounded-xl bg-ivory-light border border-border-soft flex items-start gap-3">
                <AlertCircle className="w-4 h-4 text-gold-dark shrink-0 mt-0.5" />
                <p className="text-xs sm:text-sm text-charcoal/80 leading-relaxed font-normal">
                  <strong className="text-charcoal font-semibold">
                    Personalized Slot Allocation:
                  </strong>{" "}
                  The 4:30 PM – 8:00 PM window represents our verified operational timeline. Exact
                  standard-wise batch hours are finalized during direct parent consultation to avoid
                  any school timetable conflicts.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Small Batch Cohorts & Direct CTA (5 cols) */}
          <div
            ref={rightColRef}
            className="lg:col-span-5 bg-midnight text-white rounded-2xl p-6 sm:p-8 border border-midnight-subtle flex flex-col justify-between shadow-xl relative overflow-hidden"
          >
            {/* Subtle top hairline */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent opacity-60" />

            <div>
              <div className="inline-flex items-center gap-2 text-gold font-serif font-bold text-lg mb-2">
                <Users className="w-5 h-5 text-gold" />
                <span>Small-Batch Learning</span>
              </div>

              <p className="text-xs sm:text-sm text-white/75 mb-6 leading-relaxed font-normal">
                To guarantee dedicated individual doubt clarification with Saif Sir, every cohort maintains
                strictly controlled seating.
              </p>

              <div ref={rowsRef} className="space-y-3 mb-6">
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 transition-colors hover:bg-white/10">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                    <span className="text-white font-medium text-xs sm:text-sm">Primary &amp; Middle (Std 3–8)</span>
                    <span className="text-gold text-[11px] font-bold uppercase px-2.5 py-0.5 rounded-full bg-gold/15 border border-gold/30 font-mono w-fit">
                      Fixed on Consultation
                    </span>
                  </div>
                  <span className="text-xs text-white/60 block">
                    GSEB &amp; CBSE • Operational window: 4:30 PM – 8:00 PM
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 transition-colors hover:bg-white/10">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                    <span className="text-white font-medium text-xs sm:text-sm">Secondary Board (Std 9–10)</span>
                    <span className="text-gold text-[11px] font-bold uppercase px-2.5 py-0.5 rounded-full bg-gold/15 border border-gold/30 font-mono w-fit">
                      Fixed on Consultation
                    </span>
                  </div>
                  <span className="text-xs text-white/60 block">
                    GSEB Board prep • Operational window: 4:30 PM – 8:00 PM
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 transition-colors hover:bg-white/10">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                    <span className="text-white font-medium text-xs sm:text-sm">Commerce Stream (Std 11–12)</span>
                    <span className="text-gold text-[11px] font-bold uppercase px-2.5 py-0.5 rounded-full bg-gold/15 border border-gold/30 font-mono w-fit">
                      Fixed on Consultation
                    </span>
                  </div>
                  <span className="text-xs text-white/60 block">
                    Commerce coaching • Operational window: 4:30 PM – 8:00 PM
                  </span>
                </div>
              </div>
            </div>

            <a
              href={whatsappTimingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full min-h-[48px] py-3 px-5 rounded-full bg-gold hover:bg-gold-light text-midnight font-bold text-xs sm:text-sm uppercase tracking-wider text-center transition-all flex items-center justify-center gap-2 shadow-sm border border-gold-light/40"
            >
              <MessageCircle className="w-4 h-4 shrink-0" />
              <span>Check Available Batch Slots</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
