import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, Calendar, CheckCircle2, User, Award } from "lucide-react";
import { TEACHER_DATA } from "../data/programmes";
import saifDeskImg from "../assets/saif-vegdani-desk.jpg";
import saifStandingImg from "../assets/saif-vegdani-standing.jpg";

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
      className="py-10 sm:py-16 bg-ivory border-b border-border-soft"
      aria-label="Teacher Profile"
    >
      <div className="site-container">
        {/* Section Eyebrow */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <div className="eyebrow-badge mb-3">
            <User className="w-3.5 h-3.5 text-gold-dark shrink-0" />
            <span>06 / PRINCIPAL EDUCATOR</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-charcoal tracking-tight mb-3">
            Dedicated Mentorship by{" "}
            <span className="font-serif italic font-normal text-gold-dark">
              Saif Sir.
            </span>
          </h2>

          <p className="text-sm sm:text-base text-charcoal-muted leading-relaxed font-normal mx-auto max-w-2xl">
            Every batch is taught directly by Saif Barkat Vegdani — ensuring zero substitute teachers,
            uncompromised academic rigor, and constant parent transparency.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Portrait & Perspective Switcher (5 cols) */}
          <div ref={leftColRef} className="lg:col-span-5">
            <div className="bg-surface-pure rounded-2xl p-3 border border-border-soft shadow-lg overflow-hidden group">
              <div className="relative overflow-hidden rounded-xl bg-midnight/5 h-[440px] sm:h-[480px]">
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
                    className={`px-3 py-1.5 min-h-[36px] rounded-full text-xs font-bold tracking-wide uppercase transition-colors cursor-pointer ${
                      activePhoto === "desk"
                        ? "bg-gold text-midnight shadow-xs"
                        : "text-white/80 hover:text-white"
                    }`}
                    aria-pressed={activePhoto === "desk"}
                  >
                    Classroom
                  </button>
                  <button
                    type="button"
                    onClick={() => setActivePhoto("standing")}
                    className={`px-3 py-1.5 min-h-[36px] rounded-full text-xs font-bold tracking-wide uppercase transition-colors cursor-pointer ${
                      activePhoto === "standing"
                        ? "bg-gold text-midnight shadow-xs"
                        : "text-white/80 hover:text-white"
                    }`}
                    aria-pressed={activePhoto === "standing"}
                  >
                    Executive
                  </button>
                </div>
              </div>

              <div className="mt-3 p-4 rounded-xl bg-ivory-light border border-border-soft flex items-center justify-between">
                <div>
                  <h4 className="font-serif font-bold text-charcoal text-base">
                    Saif Barkat Vegdani
                  </h4>
                  <p className="text-xs text-charcoal-muted font-medium">
                    Principal Educator · Age {TEACHER_DATA.age} Years
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-charcoal-muted uppercase tracking-wider block font-mono">
                    Experience
                  </span>
                  <span className="font-serif font-bold text-charcoal text-sm px-2.5 py-0.5 rounded-full bg-surface-pure border border-border-soft inline-block mt-0.5 shadow-2xs">
                    8 Years Record
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Bio, Qualifications & Institutional History Timeline (7 cols) */}
          <div ref={rightColRef} className="lg:col-span-7 flex flex-col items-start">
            <div className="mb-2">
              <span className="text-xs font-bold uppercase tracking-[0.14em] text-gold-dark font-mono block mb-1">
                Founder &amp; Lead Faculty
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl text-charcoal font-bold tracking-tight">
                Saif Barkat Vegdani
              </h3>
            </div>

            <p className="text-xs sm:text-sm font-semibold text-charcoal-muted uppercase tracking-wider mb-6 font-mono">
              Age {TEACHER_DATA.age} • 8 Years Dedicated Classroom Teaching
            </p>

            {/* Qualifications Badges as Refined Chips */}
            <div className="flex flex-wrap gap-2.5 mb-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-surface-pure border border-border-soft text-charcoal text-xs sm:text-sm font-semibold shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />
                <span>Bachelor of Commerce (B.Com)</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-surface-pure border border-border-soft text-charcoal text-xs sm:text-sm font-semibold shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />
                <span>Bachelor of Education (B.Ed)</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-surface-pure border border-border-soft text-charcoal text-xs sm:text-sm font-semibold shadow-2xs">
                <Award className="w-4 h-4 text-gold shrink-0" />
                <span>8 Years Continuous Record</span>
              </div>
            </div>

            <p className="text-sm sm:text-base text-charcoal/85 leading-relaxed mb-6 font-normal">
              With formal pedagogical training (B.Ed) and a comprehensive background in commerce
              studies (B.Com), Saif Barkat Vegdani brings an intentional, patient, and concept-first
              teaching style to students across Surat, from middle school foundations up to board exam classes.
            </p>

            {/* Teaching History Timeline Box */}
            <div className="w-full bg-surface-pure p-5 sm:p-6 rounded-2xl border border-border-soft shadow-xs mb-4 relative">
              <div className="text-xs font-bold uppercase tracking-wider text-charcoal mb-4 flex items-center justify-between pb-3 border-b border-border-soft font-mono">
                <span className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-gold" />
                  <span>Previous Institutional Experience</span>
                </span>
                <span className="text-xs text-charcoal-muted font-semibold tracking-normal font-sans">
                  Supplied Records
                </span>
              </div>

              {/* Timeline Cards */}
              <div ref={timelineRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 relative">
                {TEACHER_DATA.previousExperience.map((exp, idx) => (
                  <div
                    key={idx}
                    className="bg-ivory-light p-3.5 sm:p-4 rounded-xl border border-border-soft flex flex-col justify-between transition-colors hover:border-gold/40"
                  >
                    <div>
                      <span className="text-sm font-bold text-charcoal block">{exp.institution}</span>
                      <span className="text-xs text-charcoal-muted block mt-0.5">
                        {exp.subjects}
                      </span>
                    </div>
                    <div className="mt-3">
                      <span className="text-xs font-semibold text-gold-dark px-2.5 py-1 rounded-full bg-surface-pure border border-border-soft inline-flex items-center gap-1 shadow-2xs">
                        <Calendar className="w-3.5 h-3.5 text-gold" />
                        <span>{exp.duration}</span>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Internal Auditor Note (Preserved in code for owner review):
                Supplied institutional tenures (Ignite Academy 3 yrs + Saraswati Coaching Classes 4 yrs +
                Saraswati Commerce Classes 4 yrs + Good Shepherd Mission School 5 yrs) if viewed as distinct non-overlapping
                intervals, while the stated overall career is 8 years. Flagged for owner confirmation. */}
          </div>
        </div>
      </div>
    </section>
  );
}
