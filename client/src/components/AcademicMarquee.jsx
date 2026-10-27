import React from "react";
import Marquee from "./ui/Marquee";
import { Sparkles, Award, GraduationCap, Clock, BookOpen, CheckCircle, ShieldCheck } from "lucide-react";

/**
 * 21st.dev AcademicMarquee
 * Editorial luxury infinite ticker highlighting verified institutional facts and credentials.
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
      label: "SPECIALIZED COMMERCE GUIDANCE",
      detail: "Accountancy, Stats & Economics"
    },
    {
      icon: ShieldCheck,
      label: "ETHICAL & TRANSPARENT",
      detail: "Direct 1-on-1 Guidance by Saif Sir"
    }
  ];

  return (
    <section className="bg-ivory border-y border-border-soft py-4 overflow-hidden relative shadow-2xs">
      {/* Background Accent Sheen */}
      <div className="absolute inset-0 bg-gradient-to-r from-gold/5 via-gold/10 to-gold/5 pointer-events-none" />

      <Marquee duration={30} pauseOnHover={true} gap="gap-8" fadeWidth="w-16 sm:w-28">
        {marqueeItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-surface-pure/90 border border-gold/30 shadow-2xs hover:border-gold hover:shadow-xs transition-all cursor-default group"
            >
              <div className="w-6 h-6 rounded-full bg-ivory-light border border-gold/40 flex items-center justify-center text-gold-dark group-hover:scale-110 transition-transform">
                <Icon className="w-3.5 h-3.5" />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold tracking-wider uppercase text-charcoal group-hover:text-midnight transition-colors">
                  {item.label}
                </span>
                <span className="text-border-soft">✦</span>
                <span className="text-[10px] font-medium text-charcoal-muted hidden sm:inline">
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
