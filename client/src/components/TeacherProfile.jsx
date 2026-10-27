import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, Briefcase, Calendar, Info, CheckCircle2 } from "lucide-react";
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
  const pillsRef = useRef(null);
  const timelineRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Left Column Portrait
      gsap.from(leftColRef.current, {
        opacity: 0,
        x: -35,
        duration: 0.95,
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
        y: 28,
        duration: 0.8,
        stagger: 0.1,
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
        y: 20,
        duration: 0.7,
        stagger: 0.12,
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
      ? "Saif Barkat Vegdani at his teaching desk with curriculum resources"
      : "Saif Barkat Vegdani - Principal Educator & Founder";

  return (
    <section ref={sectionRef} id="about" className="py-20 lg:py-28 bg-ivory border-b border-border-soft">
      <div className="max-w-[1340px] mx-auto px-4 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Portrait & Credentials Overview (5 cols) */}
          <div ref={leftColRef} className="lg:col-span-5">
            <SpotlightCard
              className="bg-surface-pure rounded-[32px] p-3 border border-border-soft shadow-md overflow-hidden group"
              spotlightColor="rgba(198, 161, 91, 0.16)"
              radius={400}
            >
              <div className="relative overflow-hidden rounded-[26px] bg-midnight/5 h-[480px]">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activePhoto}
                    src={currentImage}
                    alt={currentAlt}
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    className="w-full h-[480px] object-cover object-top"
                    loading="lazy"
                  />
                </AnimatePresence>

                {/* Photo Perspective Selector Pill with Framer Motion spring taps */}
                <div className="absolute top-3.5 right-3.5 bg-midnight/85 backdrop-blur-md p-1 rounded-full border border-gold/30 flex items-center gap-1 shadow-md z-10">
                  <motion.button
                    whileTap={{ scale: 0.94 }}
                    type="button"
                    onClick={() => setActivePhoto("desk")}
                    className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase transition-colors ${
                      activePhoto === "desk"
                        ? "bg-gold text-midnight shadow-xs"
                        : "text-white/80 hover:text-white"
                    }`}
                  >
                    Classroom Desk
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.94 }}
                    type="button"
                    onClick={() => setActivePhoto("standing")}
                    className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase transition-colors ${
                      activePhoto === "standing"
                        ? "bg-gold text-midnight shadow-xs"
                        : "text-white/80 hover:text-white"
                    }`}
                  >
                    Executive
                  </motion.button>
                </div>
              </div>

              <div className="mt-3 p-4 rounded-[20px] bg-ivory-light border border-border-soft flex items-center justify-between">
                <div>
                  <h4 className="font-serif font-bold text-charcoal text-base">
                    Saif Barkat Vegdani
                  </h4>
                  <p className="text-[11px] text-charcoal-muted">
                    Tuition Classes · Age {TEACHER_DATA.age} Years
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-[9.5px] font-bold text-charcoal-muted uppercase tracking-wider block">
                    Stated Experience
                  </span>
                  <span className="font-serif font-bold text-charcoal text-sm px-2.5 py-0.5 rounded-full bg-surface-pure border border-border-soft inline-block mt-0.5 shadow-2xs">
                    8 Years
                  </span>
                </div>
              </div>
            </SpotlightCard>
          </div>

          {/* Right Column: Bio, Qualifications & Institutional History Timeline (7 cols) */}
          <div ref={rightColRef} className="lg:col-span-7 flex flex-col items-start">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-surface-pure border border-border-soft text-[10.5px] font-bold tracking-[0.2em] uppercase text-gold-dark mb-3">
              <GraduationCap className="w-3 h-3 text-gold" />
              Teacher Profile & Background
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] text-charcoal font-bold tracking-tight mb-2">
              Saif Barkat Vegdani
            </h2>

            <p className="text-xs sm:text-sm font-semibold text-gold-dark uppercase tracking-wider mb-6">
              Principal Educator · Age 26 · 8 Years Teaching Experience
            </p>

            {/* Qualifications Pills with hover springs */}
            <div ref={pillsRef} className="flex flex-wrap gap-2.5 mb-8">
              <motion.div
                whileHover={{ y: -2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-pure border border-border-soft text-charcoal text-xs font-semibold shadow-2xs cursor-default"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-gold" />
                <span>Bachelor of Commerce (B.Com)</span>
              </motion.div>
              <motion.div
                whileHover={{ y: -2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-pure border border-border-soft text-charcoal text-xs font-semibold shadow-2xs cursor-default"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-gold" />
                <span>Bachelor of Education (B.Ed)</span>
              </motion.div>
              <motion.div
                whileHover={{ y: -2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-pure border border-border-soft text-charcoal text-xs font-semibold shadow-2xs cursor-default"
              >
                <Briefcase className="w-3.5 h-3.5 text-gold" />
                <span>8 Years Professional Teaching</span>
              </motion.div>
            </div>

            <p className="text-sm text-charcoal/85 leading-relaxed mb-6 font-normal">
              With formal pedagogical training (B.Ed) and a comprehensive background in commerce
              studies (B.Com), Saif Barkat Vegdani brings an intentional, patient, and concept-first
              teaching style to students from middle school foundations up to board exam classes.
            </p>

            {/* Teaching History Timeline Box */}
            <div className="w-full bg-surface-pure p-6 sm:p-7 rounded-[26px] border border-border-soft shadow-xs mb-6">
              <div className="text-[11px] font-bold uppercase tracking-wider text-charcoal mb-4 flex items-center justify-between pb-3 border-b border-border-soft">
                <span className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-gold" />
                  <span>Previous Teaching Experience Timeline</span>
                </span>
                <span className="text-[10px] text-charcoal-muted font-semibold tracking-normal">
                  Supplied Records
                </span>
              </div>

              {/* Timeline Cards */}
              <div ref={timelineRef} className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                <motion.div
                  whileHover={{ y: -4, borderColor: "rgba(198,161,91,0.5)" }}
                  className="bg-ivory-light p-4 rounded-[18px] border border-border-soft flex flex-col justify-between transition-colors"
                >
                  <div>
                    <span className="text-xs font-bold text-charcoal block">Ignite Academy</span>
                    <span className="text-[11px] text-charcoal-muted block mt-0.5">
                      Mathematics & Science
                    </span>
                  </div>
                  <div className="mt-3">
                    <span className="text-[10.5px] font-semibold text-gold-dark px-2.5 py-0.5 rounded-full bg-surface-pure border border-border-soft inline-flex items-center gap-1 shadow-2xs">
                      <Calendar className="w-3 h-3 text-gold" />
                      <span>2 Years</span>
                    </span>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ y: -4, borderColor: "rgba(198,161,91,0.5)" }}
                  className="bg-ivory-light p-4 rounded-[18px] border border-border-soft flex flex-col justify-between transition-colors"
                >
                  <div>
                    <span className="text-xs font-bold text-charcoal block">
                      Saraswati Classes
                    </span>
                    <span className="text-[11px] text-charcoal-muted block mt-0.5">
                      Social Science
                    </span>
                  </div>
                  <div className="mt-3">
                    <span className="text-[10.5px] font-semibold text-gold-dark px-2.5 py-0.5 rounded-full bg-surface-pure border border-border-soft inline-flex items-center gap-1 shadow-2xs">
                      <Calendar className="w-3 h-3 text-gold" />
                      <span>3 Years</span>
                    </span>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ y: -4, borderColor: "rgba(198,161,91,0.5)" }}
                  className="bg-ivory-light p-4 rounded-[18px] border border-border-soft flex flex-col justify-between transition-colors"
                >
                  <div>
                    <span className="text-xs font-bold text-charcoal block">
                      Good Shepherd Mission School
                    </span>
                    <span className="text-[11px] text-charcoal-muted block mt-0.5">
                      School Faculty
                    </span>
                  </div>
                  <div className="mt-3">
                    <span className="text-[10.5px] font-semibold text-gold-dark px-2.5 py-0.5 rounded-full bg-surface-pure border border-border-soft inline-flex items-center gap-1 shadow-2xs">
                      <Calendar className="w-3 h-3 text-gold" />
                      <span>4 Years</span>
                    </span>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Discrepancy Notice Card explicitly required by Prompt */}
            <div className="w-full p-4 rounded-[20px] bg-ivory-light border border-gold/30 flex items-start gap-3">
              <Info className="w-4 h-4 text-gold shrink-0 mt-0.5" />
              <div className="text-[11.5px] text-charcoal-muted leading-relaxed">
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
