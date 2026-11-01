import React from "react";
import Marquee from "./ui/Marquee";
import { Sparkles, Award, GraduationCap, Clock, BookOpen, CheckCircle, ShieldCheck } from "lucide-react";

/**
 * AcademicMarquee
 * Calm, editorial infinite ticker presenting verified institutional credentials.
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
      label: "8 YEARS TEACHING RECORD",
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
    <section className="bg-ivory border-y border-border-soft py-3.5 sm:py-4 overflow-hidden relative shadow-2xs" aria-label="Academic Highlights">
      {/* Subtle Sheen */}
      <div className="absolute inset-0 bg-gradient-to-r from-gold/5 via-gold/10 to-gold/5 pointer-events-none" />

      <Marquee duration={34} pauseOnHover={true} gap="gap-6 sm:gap-8" fadeWidth="w-12 sm:w-28">
        {marqueeItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="inline-flex items-center gap-2.5 px-4 sm:px-5 py-2 rounded-full bg-surface-pure/90 border border-gold/30 shadow-2xs transition-all cursor-default group"
            >
              <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-ivory-light border border-gold/40 flex items-center justify-center text-gold-dark shrink-0">
                <Icon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] sm:text-[11px] font-bold tracking-wider uppercase text-charcoal group-hover:text-midnight transition-colors">
                  {item.label}
                </span>
                <span className="text-border-soft text-xs">✦</span>
                <span className="text-[10px] font-medium text-charcoal-muted hidden md:inline">
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
