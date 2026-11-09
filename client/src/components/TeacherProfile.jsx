import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase,
  Calendar,
  CheckCircle2,
  User,
  Award,
  GraduationCap,
  Building2,
  UserCheck,
  Lightbulb,
  RotateCcw,
  Trophy
} from "lucide-react";
import { TEACHER_DATA } from "../data/programmes";
import NumberTicker from "./ui/NumberTicker";

gsap.registerPlugin(ScrollTrigger);

const TEACHER_PERSPECTIVES = [
  {
    id: "classroom",
    label: "Classroom",
    src: "/images/01_standing_by_whiteboard.png",
    alt: "Saif Barkat Vegdani teaching in the classroom at the whiteboard",
    caption: "Active Whiteboard Instruction"
  },
  {
    id: "executive",
    label: "Executive",
    src: "/images/03_arms_crossed.png",
    alt: "Saif Barkat Vegdani - Principal Educator & Founder",
    caption: "Founder & Lead Faculty"
  },
  {
    id: "desk",
    label: "Study Desk",
    src: "/images/02_seated_at_desk.png",
    alt: "Saif Barkat Vegdani at his instructional desk with curriculum books",
    caption: "Personalized Doubt Clinic"
  }
];

export default function TeacherProfile() {
  const [activePhoto, setActivePhoto] = useState("classroom");

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

  const currentPerspective =
    TEACHER_PERSPECTIVES.find((p) => p.id === activePhoto) || TEACHER_PERSPECTIVES[0];

  const credentials = [
    {
      icon: Award,
      num: 9,
      suffix: " Years",
      title: "Teaching Record",
      subtitle: "Verified Career Experience",
      description:
        "Pedagogical background spanning secondary school faculty and specialized tuition batches with 9 years of continuous teaching experience."
    },
    {
      icon: GraduationCap,
      num: 2,
      suffix: " Degrees",
      title: "B.Com & B.Ed",
      subtitle: "Dual Formal Qualifications",
      description:
        "Formal pedagogical training in modern teaching methodologies paired with commercial foundations."
    },
    {
      icon: Building2,
      num: 3,
      suffix: " Institutions",
      title: "Prior Tenures",
      subtitle: "School & Academy Background",
      description:
        "Instruction across Ignite Academy, Saraswati Classes (Coaching & Commerce), and Good Shepherd Mission School."
    },
    {
      icon: UserCheck,
      num: 1,
      prefix: "1 : ",
      suffix: " Ratio",
      title: "Direct Mentorship",
      subtitle: "Personal Accountability",
      description:
        "Every batch and doubt clinic is conducted personally by Saif Sir with zero intermediaries."
    }
  ];

  const principles = [
    {
      num: "01",
      icon: Lightbulb,
      title: "Concept Clarity Over Rote",
      eyebrow: "Foundational Understanding",
      narrative:
        "Deconstructing chapters into transparent conceptual steps, ensuring mathematical formulas, scientific laws, and commerce principles are understood from origins."
    },
    {
      num: "02",
      icon: RotateCcw,
      title: "Daily Problem Solving",
      eyebrow: "Habitual Rigor",
      narrative:
        "Daily notebook checks, step-by-step problem breakdown, and consistent homework drills completed during our structured evening sessions."
    },
    {
      num: "03",
      icon: Trophy,
      title: "Calm Exam Temperament",
      eyebrow: "Tactical Readiness",
      narrative:
        "Timed simulations mirroring GSEB and CBSE marking blueprints, building calm, steady execution under exam conditions."
    },
    {
      num: "04",
      icon: UserCheck,
      title: "Direct Accountability",
      eyebrow: "Personal Mentorship",
      narrative:
        "Every batch taught directly by Saif Barkat Vegdani. Zero substitute instructors, ensuring full parent transparency and personal guidance."
    }
  ];

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-8 sm:py-12 lg:py-14 bg-ivory border-b border-border-soft"
      aria-label="Teacher Profile & About S.V Tutorials"
    >
      <div className="site-container">
        {/* Section Eyebrow */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8">
          <div className="eyebrow-badge mb-3">
            <User className="w-3.5 h-3.5 text-gold-dark shrink-0" />
            <span>01 / ABOUT THE EDUCATOR</span>
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
                    src={currentPerspective.src}
                    alt={currentPerspective.alt}
                    initial={{ opacity: 0, scale: 1.02 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="w-full h-[440px] sm:h-[480px] object-cover object-top"
                    loading="lazy"
                    decoding="async"
                    width={400}
                    height={480}
                  />
                </AnimatePresence>

                {/* Perspective Selector Pill */}
                <div className="absolute top-3 right-3 bg-midnight/90 backdrop-blur-md p-1 rounded-full border border-gold/30 flex items-center gap-1 shadow-md z-10">
                  {TEACHER_PERSPECTIVES.map((persp) => (
                    <button
                      key={persp.id}
                      type="button"
                      onClick={() => setActivePhoto(persp.id)}
                      className={`px-2.5 sm:px-3 py-1.5 min-h-[34px] rounded-full text-[11px] sm:text-xs font-bold tracking-wide uppercase transition-colors cursor-pointer ${
                        activePhoto === persp.id
                          ? "bg-gold text-midnight shadow-xs"
                          : "text-white/80 hover:text-white"
                      }`}
                      aria-pressed={activePhoto === persp.id}
                    >
                      {persp.label}
                    </button>
                  ))}
                </div>

                {/* Floating Caption on Image Bottom */}
                <div className="absolute bottom-3 left-3 right-3 bg-midnight/85 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-gold/25 text-white flex items-center justify-between text-xs">
                  <span className="text-gold-light font-mono text-[11px]">
                    {currentPerspective.caption}
                  </span>
                  <span className="text-white/60 text-[10px] uppercase font-mono">
                    Direct Instruction
                  </span>
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
                    9 Years Record
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
              Age {TEACHER_DATA.age} • 9 Years Dedicated Classroom Teaching
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
                <span>9 Years Continuous Record</span>
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
              <div ref={timelineRef} className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 relative">
                {TEACHER_DATA.previousExperience.map((exp, idx) => (
                  <div
                    key={idx}
                    className="bg-ivory-light p-4 rounded-xl border border-border-soft flex flex-col justify-between transition-colors hover:border-gold/40 shadow-2xs"
                  >
                    <div>
                      <span className="text-sm font-bold text-charcoal block">{exp.institution}</span>
                      {exp.subTitle && (
                        <span className="text-[11px] font-semibold text-gold-dark block mt-0.5">
                          {exp.subTitle}
                        </span>
                      )}
                      <span className="text-xs text-charcoal-muted block mt-0.5">
                        {exp.subjects}
                      </span>
                    </div>
                    <div className="mt-3.5">
                      <span className="text-xs font-semibold text-gold-dark px-2.5 py-1 rounded-full bg-surface-pure border border-border-soft inline-flex items-center gap-1.5 shadow-2xs">
                        <Calendar className="w-3.5 h-3.5 text-gold" />
                        <span>{exp.duration}</span>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Verified Credentials 4-Stat Strip */}
        <div className="mt-8 pt-8 border-t border-border-soft">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-[0.14em] text-gold-dark font-mono flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-gold"></span>
              VERIFIED EDUCATOR CREDENTIALS
            </span>
            <span className="text-xs text-charcoal-muted font-medium hidden sm:inline font-mono">
              Direct Instruction by Saif Sir
            </span>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {credentials.map((cred, idx) => {
              const Icon = cred.icon;
              return (
                <div
                  key={idx}
                  className="bg-surface-pure p-4 sm:p-5 rounded-xl border border-border-soft shadow-2xs flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2.5">
                      <div className="w-8 h-8 rounded-lg border border-border-soft flex items-center justify-center text-gold-dark bg-ivory">
                        <Icon className="w-4 h-4 text-gold-dark" />
                      </div>
                      <span className="text-[11px] font-mono text-gold-dark font-semibold">
                        0{idx + 1}
                      </span>
                    </div>

                    <div className="font-serif font-bold text-2xl sm:text-3xl text-charcoal tracking-tight flex items-baseline mb-1">
                      {cred.prefix && <span className="mr-0.5">{cred.prefix}</span>}
                      <NumberTicker value={cred.num} duration={1.2} delay={idx * 0.05} />
                      <span className="text-xs sm:text-sm text-gold-dark font-medium ml-1">
                        {cred.suffix}
                      </span>
                    </div>

                    <span className="text-[10px] sm:text-xs font-semibold tracking-wider uppercase text-gold-dark block mb-0.5 font-mono">
                      {cred.subtitle}
                    </span>
                    <h3 className="font-serif text-sm font-bold text-charcoal tracking-tight mb-1">
                      {cred.title}
                    </h3>
                    <p className="text-xs text-charcoal-muted leading-relaxed font-normal">
                      {cred.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Core Teaching Philosophy Statement & 4 Pillars */}
        <div className="mt-6 rounded-2xl bg-midnight text-white p-6 sm:p-8 border border-midnight-subtle shadow-lg relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent opacity-70" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Guiding Quote (5 cols) */}
            <div className="lg:col-span-5 border-b lg:border-b-0 lg:border-r border-white/10 pb-5 lg:pb-0 lg:pr-6">
              <span className="text-[11px] font-bold uppercase tracking-wider text-gold font-mono block mb-2">
                Pedagogical Core Principle
              </span>
              <p className="font-serif text-base sm:text-lg italic leading-relaxed text-ivory-light mb-4">
                &ldquo;When students truly grasp foundational principles, fear disappears. With structured guidance and consistent practice, academic confidence becomes second nature.&rdquo;
              </p>
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-gold tracking-wider uppercase font-mono">
                <span className="text-white">Saif Barkat Vegdani</span>
                <span className="text-gold/50">•</span>
                <span className="text-gold-light">B.Com, B.Ed</span>
              </div>
            </div>

            {/* 4 Teaching Pillars (7 cols) */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {principles.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.num} className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-6 h-6 rounded-md bg-gold/15 border border-gold/30 flex items-center justify-center shrink-0">
                        <Icon className="w-3.5 h-3.5 text-gold" />
                      </div>
                      <span className="text-xs font-bold text-white tracking-tight">
                        {item.title}
                      </span>
                    </div>
                    <p className="text-[11px] text-white/70 leading-relaxed font-normal">
                      {item.narrative}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
