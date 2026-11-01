import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, Calendar, Info, CheckCircle2 } from "lucide-react";
import { TEACHER_DATA } from "../data/programmes";
import saifDeskImg from "../assets/saif-vegdani-desk.jpg";
import saifStandingImg from "../assets/saif-vegdani-standing.jpg";
import SpotlightCard from "./ui/SpotlightCard";

gsap.registerPlugin(ScrollTrigger);

export default function TeacherProfile() {
  const [activePhoto, setActivePhoto] = useState("desk");

  const sectionRef = useRef(null);
  const leftColRef = useRef(null);
  const rightColRef = useRef(null);
  const timelineRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Left Column Portrait
      gsap.from(leftColRef.current, {
        opacity: 0,
        x: -25,
        duration: 0.85,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      });

      // Right Column Content Stagger
      gsap.from(rightColRef.current?.children || [], {
        opacity: 0,
        y: 24,
        duration: 0.75,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      });

      // Timeline cards stagger
      gsap.from(timelineRef.current?.children || [], {
        opacity: 0,
        y: 18,
        duration: 0.65,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: timelineRef.current,
          start: "top 85%",
          toggleActions: "play none none none"
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const currentImage = activePhoto === "desk" ? saifDeskImg : saifStandingImg;
  const currentAlt =
    activePhoto === "desk"
      ? "Saif Barkat Vegdani at his study desk with curriculum resources"
      : "Saif Barkat Vegdani - Principal Educator & Founder";

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-20 lg:py-28 bg-ivory border-b border-border-soft"
      aria-label="Teacher Profile"
    >
      <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Eyebrow */}
        <div className="flex items-center justify-between mb-8 pb-3 border-b border-border-soft/60">
          <span className="text-[10.5px] font-mono font-bold tracking-[0.22em] text-gold-dark uppercase">
            06 / PRINCIPAL EDUCATOR
          </span>
          <span className="text-[11px] font-sans text-charcoal-muted font-medium">
            Saif Barkat Vegdani (B.Com, B.Ed)
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Portrait & Perspective Switcher (5 cols) */}
          <div ref={leftColRef} className="lg:col-span-5">
            <SpotlightCard
              className="bg-surface-pure rounded-[28px] p-3 border border-border-soft shadow-md overflow-hidden group"
              spotlightColor="rgba(198, 161, 91, 0.12)"
              radius={380}
            >
              <div className="relative overflow-hidden rounded-[22px] bg-midnight/5 h-[440px] sm:h-[480px]">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activePhoto}
                    src={currentImage}
                    alt={currentAlt}
                    initial={{ opacity: 0, scale: 1.02 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="w-full h-[440px] sm:h-[480px] object-cover object-top"
                    loading="lazy"
                    width={400}
                    height={480}
                  />
                </AnimatePresence>

                {/* Perspective Selector Pill */}
                <div className="absolute top-3.5 right-3.5 bg-midnight/90 backdrop-blur-md p-1 rounded-full border border-gold/30 flex items-center gap-1 shadow-md z-10">
                  <button
                    type="button"
                    onClick={() => setActivePhoto("desk")}
                    className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase transition-colors ${
                      activePhoto === "desk"
                        ? "bg-gold text-midnight shadow-2xs"
                        : "text-white/80 hover:text-white"
                    }`}
                    aria-pressed={activePhoto === "desk"}
                  >
                    Classroom Desk
                  </button>
                  <button
                    type="button"
                    onClick={() => setActivePhoto("standing")}
                    className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase transition-colors ${
                      activePhoto === "standing"
                        ? "bg-gold text-midnight shadow-2xs"
                        : "text-white/80 hover:text-white"
                    }`}
                    aria-pressed={activePhoto === "standing"}
                  >
                    Executive
                  </button>
                </div>
              </div>

              <div className="mt-3 p-4 rounded-[18px] bg-ivory-light border border-border-soft flex items-center justify-between">
                <div>
                  <h4 className="font-serif font-bold text-charcoal text-base">
                    Saif Barkat Vegdani
                  </h4>
                  <p className="text-[11px] text-charcoal-muted font-medium">
                    Principal Educator · Age {TEACHER_DATA.age} Years
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-[9.5px] font-bold text-charcoal-muted uppercase tracking-wider block">
                    Verified Experience
                  </span>
                  <span className="font-serif font-bold text-charcoal text-sm px-2.5 py-0.5 rounded-full bg-surface-pure border border-border-soft inline-block mt-0.5 shadow-2xs">
                    8 Years Record
                  </span>
                </div>
              </div>
            </SpotlightCard>
          </div>

          {/* Right Column: Bio, Qualifications & Institutional History Timeline (7 cols) */}
          <div ref={rightColRef} className="lg:col-span-7 flex flex-col items-start">
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[44px] text-charcoal font-bold tracking-tight mb-2">
              Saif Barkat Vegdani
            </h2>

            <p className="text-xs sm:text-sm font-semibold text-gold-dark uppercase tracking-wider mb-6">
              Principal Educator · Age 26 · 8 Years Teaching Experience
            </p>

            {/* Qualifications Badges as Refined Chips */}
            <div className="flex flex-wrap gap-2 sm:gap-2.5 mb-7">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-pure border border-border-soft text-charcoal text-xs font-semibold shadow-2xs">
                <CheckCircle2 className="w-3.5 h-3.5 text-gold shrink-0" />
                <span>Bachelor of Commerce (B.Com)</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-pure border border-border-soft text-charcoal text-xs font-semibold shadow-2xs">
                <CheckCircle2 className="w-3.5 h-3.5 text-gold shrink-0" />
                <span>Bachelor of Education (B.Ed)</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-pure border border-border-soft text-charcoal text-xs font-semibold shadow-2xs">
                <Briefcase className="w-3.5 h-3.5 text-gold shrink-0" />
                <span>8 Years Professional Teaching</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-charcoal/85 leading-relaxed mb-6 font-normal">
              With formal pedagogical training (B.Ed) and a comprehensive background in commerce
              studies (B.Com), Saif Barkat Vegdani brings an intentional, patient, and concept-first
              teaching style to students from middle school foundations up to board exam classes.
            </p>

            {/* Teaching History Timeline Box with Gold Connecting Track */}
            <div className="w-full bg-surface-pure p-5 sm:p-6 rounded-[22px] border border-border-soft shadow-2xs mb-6 relative">
              <div className="text-[11px] font-bold uppercase tracking-wider text-charcoal mb-4 flex items-center justify-between pb-3 border-b border-border-soft">
                <span className="flex items-center gap-2">
                  <Briefcase className="w-3.5 h-3.5 text-gold" />
                  <span>Previous Teaching Experience Timeline</span>
                </span>
                <span className="text-[10px] text-charcoal-muted font-semibold tracking-normal">
                  Supplied Records
                </span>
              </div>

              {/* Timeline Cards */}
              <div ref={timelineRef} className="grid grid-cols-1 sm:grid-cols-3 gap-3 relative">
                <div className="bg-ivory-light p-4 rounded-[16px] border border-border-soft flex flex-col justify-between transition-colors hover:border-gold/40">
                  <div>
                    <span className="text-xs font-bold text-charcoal block">Ignite Academy</span>
                    <span className="text-[11px] text-charcoal-muted block mt-0.5">
                      Mathematics & Science
                    </span>
                  </div>
                  <div className="mt-3">
                    <span className="text-[10px] font-semibold text-gold-dark px-2.5 py-0.5 rounded-full bg-surface-pure border border-border-soft inline-flex items-center gap-1 shadow-2xs">
                      <Calendar className="w-3 h-3 text-gold" />
                      <span>2 Years</span>
                    </span>
                  </div>
                </div>

                <div className="bg-ivory-light p-4 rounded-[16px] border border-border-soft flex flex-col justify-between transition-colors hover:border-gold/40">
                  <div>
                    <span className="text-xs font-bold text-charcoal block">Saraswati Classes</span>
                    <span className="text-[11px] text-charcoal-muted block mt-0.5">
                      Social Science
                    </span>
                  </div>
                  <div className="mt-3">
                    <span className="text-[10px] font-semibold text-gold-dark px-2.5 py-0.5 rounded-full bg-surface-pure border border-border-soft inline-flex items-center gap-1 shadow-2xs">
                      <Calendar className="w-3 h-3 text-gold" />
                      <span>3 Years</span>
                    </span>
                  </div>
                </div>

                <div className="bg-ivory-light p-4 rounded-[16px] border border-border-soft flex flex-col justify-between transition-colors hover:border-gold/40">
                  <div>
                    <span className="text-xs font-bold text-charcoal block">Good Shepherd Mission School</span>
                    <span className="text-[11px] text-charcoal-muted block mt-0.5">
                      School Faculty
                    </span>
                  </div>
                  <div className="mt-3">
                    <span className="text-[10px] font-semibold text-gold-dark px-2.5 py-0.5 rounded-full bg-surface-pure border border-border-soft inline-flex items-center gap-1 shadow-2xs">
                      <Calendar className="w-3 h-3 text-gold" />
                      <span>4 Years</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Record Verification Note */}
            <div className="w-full p-4 rounded-[18px] bg-ivory-light border border-gold/30 flex items-start gap-3">
              <Info className="w-4 h-4 text-gold shrink-0 mt-0.5" />
              <div className="text-[11.5px] text-charcoal-muted leading-relaxed font-normal">
                <strong className="text-charcoal font-semibold">
                  Record Verification Note:
                </strong>{" "}
                The supplied institutional tenures (2 yrs + 3 yrs + 4 yrs) total 9 years if viewed
                as distinct non-overlapping intervals, while the stated overall teaching career is 8
                years. All original durations are preserved exactly as provided and flagged for
                client confirmation regarding concurrent roles.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
