import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Clock, AlertCircle, Users, MessageCircle } from "lucide-react";
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

      // Right Column Dark Luxury Card
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
      className="py-20 lg:py-28 bg-ivory border-b border-border-soft"
      aria-label="Batch Timings & Schedule"
    >
      <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Eyebrow */}
        <div className="flex items-center justify-between mb-8 pb-3 border-b border-border-soft/60">
          <span className="text-[10.5px] font-mono font-bold tracking-[0.22em] text-gold-dark uppercase">
            07 / OPERATIONAL SCHEDULE
          </span>
          <span className="text-[11px] font-sans text-charcoal-muted font-medium">
            Evening Batches (Monday to Saturday)
          </span>
        </div>

        <div className="bg-surface-pure rounded-[28px] border border-border-soft p-7 sm:p-10 lg:p-12 shadow-2xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Schedule Details with Clock Arc (7 cols) */}
            <div ref={leftColRef} className="lg:col-span-7 flex flex-col items-start">
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-[44px] text-charcoal font-bold tracking-tight mb-4 leading-tight">
                A Schedule Structured for Focus
              </h2>

              <p className="text-xs sm:text-sm text-charcoal-muted mb-7 leading-relaxed max-w-xl font-normal">
                Our classes operate during late afternoon and evening hours to comfortably accommodate
                both morning-shift and afternoon-shift school students, providing a calm, quiet
                atmosphere for focused learning.
              </p>

              {/* Confirmed Operational Evening Window Card with Clock Indicator */}
              <div className="w-full bg-ivory-light p-6 sm:p-7 rounded-[22px] border border-border-soft mb-6 hover:border-gold/40 transition-colors shadow-2xs relative overflow-hidden">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <span className="text-[10.5px] font-bold uppercase tracking-wider text-charcoal-muted flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold"></span>
                    EVENING OPERATIONAL WINDOW
                  </span>
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-midnight text-gold-light border border-gold/30">
                    Monday to Saturday
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-2">
                  <div className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-charcoal tracking-tight leading-none">
                    4:30 PM <span className="text-gold font-light">–</span> 8:00 PM
                  </div>

                  {/* Visual Clock Progress Indicator */}
                  <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-surface-pure border border-gold/30 shadow-2xs shrink-0 self-start sm:self-auto">
                    <Clock className="w-4 h-4 text-gold-dark animate-pulse" />
                    <span className="text-[11px] font-semibold text-charcoal">3.5 Hours Daily Focus</span>
                  </div>
                </div>
              </div>

              {/* Transparent Advisory Note */}
              <div className="p-4 rounded-[16px] bg-ivory border border-border-soft flex items-start gap-3">
                <AlertCircle className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                <p className="text-xs text-charcoal-muted leading-relaxed font-normal">
                  <strong className="text-charcoal font-semibold">
                    Scheduling Consultation:
                  </strong>{" "}
                  The 4:30 PM – 8:00 PM timeframe represents our confirmed evening operational
                  window. Standard-wise batch slots are confirmed during direct parent consultation to
                  prevent any overlap with regular school shift hours.
                </p>
              </div>
            </div>

            {/* Right Column: Capacity & Individual Attention Highlight (5 cols) */}
            <div
              ref={rightColRef}
              className="lg:col-span-5 bg-midnight text-white rounded-[24px] p-7 sm:p-8 border border-gold/30 flex flex-col justify-between shadow-xl"
            >
              <div>
                <div className="inline-flex items-center gap-2 text-gold-light font-serif font-bold text-lg mb-2.5">
                  <Users className="w-5 h-5 text-gold" />
                  <span>Small-Batch Learning</span>
                </div>

                <p className="text-xs text-white/75 mb-6 leading-relaxed font-normal">
                  To ensure dedicated doubt clarification and personal attention from Saif Sir, each
                  batch maintains controlled student capacity.
                </p>

                <div ref={rowsRef} className="space-y-3 mb-7 text-xs">
                  <div className="p-3 rounded-[14px] bg-white/5 border border-white/10 transition-colors hover:bg-white/10">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-white font-medium">Primary & Middle (Std 3–8)</span>
                      <span className="text-gold-light text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-gold/15">
                        Evening Batches
                      </span>
                    </div>
                    <span className="text-[11px] text-white/60">
                      GSEB & CBSE · Concept foundations
                    </span>
                  </div>

                  <div className="p-3 rounded-[14px] bg-white/5 border border-white/10 transition-colors hover:bg-white/10">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-white font-medium">Secondary Board Prep (Std 9–10)</span>
                      <span className="text-gold-light text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-gold/15">
                        GSEB Focus
                      </span>
                    </div>
                    <span className="text-[11px] text-white/60">
                      Intensive syllabus & board paper drills
                    </span>
                  </div>

                  <div className="p-3 rounded-[14px] bg-white/5 border border-white/10 transition-colors hover:bg-white/10">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-white font-medium">Commerce Stream (Std 11–12)</span>
                      <span className="text-gold-light text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-gold/15">
                        Commerce Stream
                      </span>
                    </div>
                    <span className="text-[11px] text-white/60">
                      Accountancy, Economics & Statistics
                    </span>
                  </div>
                </div>
              </div>

              <a
                href={whatsappTimingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-5 rounded-full bg-gold hover:bg-gold-light text-midnight font-bold text-xs uppercase tracking-wider text-center transition-colors flex items-center justify-center gap-2 shadow-sm border border-gold-light/40"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Check Available Batch Slots</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
