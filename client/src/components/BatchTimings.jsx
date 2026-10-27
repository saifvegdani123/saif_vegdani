import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { Clock, AlertCircle, Users, MessageCircle } from "lucide-react";
import { createWhatsAppUrl } from "../utils/whatsapp";

gsap.registerPlugin(ScrollTrigger);

export default function BatchTimings() {
  const sectionRef = useRef(null);
  const leftColRef = useRef(null);
  const rightColRef = useRef(null);
  const rowsRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Left Column Schedule
      gsap.from(leftColRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.85,
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
        x: 30,
        scale: 0.96,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      });

      // Staggered batch rows inside right card
      gsap.from(rowsRef.current?.children || [], {
        opacity: 0,
        y: 15,
        duration: 0.6,
        stagger: 0.1,
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
    <section ref={sectionRef} id="timings" className="py-20 lg:py-28 bg-ivory border-b border-border-soft">
      <div className="max-w-[1340px] mx-auto px-4 lg:px-12">
        <div className="bg-surface-pure rounded-[32px] border border-border-soft p-8 lg:p-14 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Column: Schedule Details (7 cols) */}
            <div ref={leftColRef} className="lg:col-span-7 flex flex-col items-start">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-ivory-light border border-border-soft text-gold-dark text-[10.5px] font-bold uppercase tracking-wider mb-4">
                <Clock className="w-3.5 h-3.5 text-gold" />
                <span>Operational Batch Schedule</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] text-charcoal font-bold tracking-tight mb-4 leading-tight">
                A Schedule That Works for You
              </h2>

              <p className="text-xs sm:text-sm text-charcoal-muted mb-8 leading-relaxed max-w-xl font-normal">
                Our classes are structured during the late afternoon and evening to accommodate
                both morning-shift and afternoon-shift school students, providing a focused, quiet
                environment for dedicated study.
              </p>

              {/* Confirmed Operational Evening Window Card */}
              <motion.div
                whileHover={{ y: -2 }}
                className="w-full bg-ivory-light p-6 sm:p-8 rounded-[24px] border border-border-soft mb-6 hover:border-gold/40 transition-colors shadow-2xs"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-charcoal-muted flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold"></span>
                    EVENING BATCHES
                  </span>
                  <span className="px-3 py-1 rounded-full text-[10.5px] font-bold bg-midnight text-gold-light border border-gold/30">
                    Monday – Saturday
                  </span>
                </div>

                <div className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-charcoal tracking-tight leading-none mt-2">
                  4:30 PM <span className="text-gold font-light animate-pulse">–</span> 8:00 PM
                </div>
              </motion.div>

              {/* Transparent Advisory Note */}
              <div className="p-4 sm:p-5 rounded-[20px] bg-ivory border border-border-soft flex items-start gap-3.5">
                <AlertCircle className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                <p className="text-xs text-charcoal-muted leading-relaxed">
                  <strong className="text-charcoal font-semibold">
                    Scheduling Consultation:
                  </strong>{" "}
                  The 4:30 PM – 8:00 PM timeframe represents our confirmed evening operational
                  window. Exact standard-wise batch slots and days are arranged upon consultation to
                  align with the student's school timings and subject needs.
                </p>
              </div>
            </div>

            {/* Right Column: Capacity & Individual Attention Highlight (5 cols) */}
            <div ref={rightColRef} className="lg:col-span-5 bg-midnight text-white rounded-[28px] p-8 lg:p-9 border border-gold/30 flex flex-col justify-between shadow-xl">
              <div>
                <div className="inline-flex items-center gap-2 text-gold-light font-serif font-bold text-lg mb-3">
                  <Users className="w-5 h-5 text-gold" />
                  <span>Small-Batch Environment</span>
                </div>

                <p className="text-xs text-white/75 mb-6 leading-relaxed font-normal">
                  To ensure personal attention and dedicated doubt clarification from Saif Sir, each
                  batch maintains controlled student numbers.
                </p>

                <div ref={rowsRef} className="space-y-3.5 mb-8 text-xs">
                  <motion.div
                    whileHover={{ x: 3, backgroundColor: "rgba(255,255,255,0.08)" }}
                    className="p-3.5 rounded-[18px] bg-white/5 border border-white/10 transition-colors"
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-white font-medium">Primary Wing (Std 3–8)</span>
                      <span className="text-gold-light text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-gold/15">
                        Evening Batches
                      </span>
                    </div>
                    <span className="text-[11px] text-white/60">
                      GSEB & CBSE · Concept foundations
                    </span>
                  </motion.div>

                  <motion.div
                    whileHover={{ x: 3, backgroundColor: "rgba(255,255,255,0.08)" }}
                    className="p-3.5 rounded-[18px] bg-white/5 border border-white/10 transition-colors"
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-white font-medium">Board Prep (Std 9–10)</span>
                      <span className="text-gold-light text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-gold/15">
                        GSEB Focus
                      </span>
                    </div>
                    <span className="text-[11px] text-white/60">
                      Intensive syllabus & board papers
                    </span>
                  </motion.div>

                  <motion.div
                    whileHover={{ x: 3, backgroundColor: "rgba(255,255,255,0.08)" }}
                    className="p-3.5 rounded-[18px] bg-white/5 border border-white/10 transition-colors"
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-white font-medium">Commerce (Std 11–12)</span>
                      <span className="text-gold-light text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-gold/15">
                        Commerce Stream
                      </span>
                    </div>
                    <span className="text-[11px] text-white/60">
                      Accounts, Economics & Stats
                    </span>
                  </motion.div>
                </div>
              </div>

              <motion.a
                whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(198,161,91,0.4)" }}
                whileTap={{ scale: 0.98 }}
                href={whatsappTimingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-6 rounded-full bg-gold hover:bg-gold-light text-midnight font-bold text-xs uppercase tracking-wider text-center transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Check Available Batch Slots</span>
              </motion.a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
