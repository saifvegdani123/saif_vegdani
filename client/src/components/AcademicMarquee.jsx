import React from "react";
import Marquee from "./ui/Marquee";
import { Sparkles, Award, GraduationCap, Clock, BookOpen, CheckCircle, ShieldCheck } from "lucide-react";

/**
 * AcademicMarquee
 * Calm, editorial infinite ticker presenting verified institutional credentials.
 * Text meets hard minimums (≥ 13px), pauses on hover, and respects reduced motion.
 */
export default function AcademicMarquee() {
  const marqueeItems = [
    {
      icon: GraduationCap,
      label: "B.COM & B.ED QUALIFIED",
      detail: "Dual Formal Pedagogical Degrees"
    },
    {
      icon: Award,
      label: "12 YEARS TEACHING RECORD",
      detail: "School Faculty & Academy Tenure"
    },
    {
      icon: BookOpen,
      label: "STANDARDS 3 TO 12",
      detail: "GSEB & CBSE Foundations"
    },
    {
      icon: Clock,
      label: "EVENING BATCHES: 4:30 PM – 8:00 PM",
      detail: "Disciplined 6-Day Schedule"
    },
    {
      icon: Sparkles,
      label: "CONCEPT-FIRST METHODOLOGY",
      detail: "Deep Understanding Over Rote Memorisation"
    },
    {
      icon: CheckCircle,
      label: "SPECIALIZED COMMERCE STREAM",
      detail: "Accountancy, Stats & Economics"
    },
    {
      icon: ShieldCheck,
      label: "DIRECT EDUCATOR ACCOUNTABILITY",
      detail: "Personal Instruction by Saif Sir"
    }
  ];

  return (
    <section
      className="bg-ivory border-y border-border-soft py-3 sm:py-4 overflow-hidden relative"
      aria-label="Academic Highlights"
    >
      <Marquee duration={36} pauseOnHover={true} gap="gap-6 sm:gap-8" fadeWidth="w-12 sm:w-28">
        {marqueeItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-surface-pure border border-border-soft shadow-xs transition-colors cursor-default"
            >
              <div className="w-6 h-6 rounded-full bg-ivory-light border border-gold/40 flex items-center justify-center text-gold-dark shrink-0">
                <Icon className="w-3.5 h-3.5" />
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-[13px]">
                <span className="font-bold tracking-wider uppercase text-charcoal">
                  {item.label}
                </span>
                <span className="text-gold-dark text-xs font-semibold">•</span>
                <span className="text-charcoal-muted font-normal hidden md:inline">
                  {item.detail}
                </span>
              </div>
            </div>
          );
        })}
      </Marquee>
    </section>
  );
}
