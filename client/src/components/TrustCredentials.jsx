import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { GraduationCap, Award, Building2, UserCheck } from "lucide-react";
import SpotlightCard from "./ui/SpotlightCard";
import NumberTicker from "./ui/NumberTicker";

gsap.registerPlugin(ScrollTrigger);

export default function TrustCredentials() {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(gridRef.current?.children || [], {
        opacity: 0,
        y: 28,
        duration: 0.75,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none none"
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const credentials = [
    {
      icon: Award,
      num: 8,
      suffix: " Years",
      title: "Teaching Record",
      subtitle: "Verified Career Experience",
      description:
        "Dedicated pedagogical background spanning secondary school faculty and specialized tuition batches."
    },
    {
      icon: GraduationCap,
      num: 2,
      suffix: " Degrees",
      title: "B.Com & B.Ed",
      subtitle: "Dual Formal Qualifications",
      description:
        "Formal pedagogical training in modern teaching methodologies paired with rigorous commercial foundations."
    },
    {
      icon: Building2,
      num: 3,
      suffix: " Institutions",
      title: "Institutional Tenures",
      subtitle: "Multi-School Background",
      description:
        "Proven instruction across Ignite Academy, Saraswati Classes, and Good Shepherd Mission School."
    },
    {
      icon: UserCheck,
      num: 1,
      prefix: "1 : ",
      suffix: " Ratio",
      title: "Direct Mentorship",
      subtitle: "Educator Accountability",
      description:
        "Every batch and doubt clinic is conducted personally by Saif Sir. No substitute instructors or intermediaries."
    }
  ];

  return (
    <section
      ref={sectionRef}
      className="py-16 sm:py-20 bg-ivory border-b border-border-soft relative"
      aria-label="Verified Educator Qualifications"
    >
      <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Minimal Section Eyebrow */}
        <div className="flex items-center justify-between mb-8 pb-3 border-b border-border-soft/60">
          <span className="text-[10.5px] font-mono font-bold tracking-[0.22em] text-gold-dark uppercase">
            01 / VERIFIED CREDENTIALS
          </span>
          <span className="text-[11px] font-sans text-charcoal-muted font-medium">
            Personal Guidance by Saif Sir
          </span>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {credentials.map((cred, idx) => {
            const Icon = cred.icon;
            return (
              <motion.div
                key={idx}
                whileHover={{ y: -4, transition: { type: "spring", stiffness: 350, damping: 25 } }}
                className="h-full"
              >
                <SpotlightCard
                  className="bg-surface-pure p-6 sm:p-7 rounded-[22px] border border-border-soft shadow-2xs hover:border-gold/50 transition-colors h-full flex flex-col justify-between group"
                  spotlightColor="rgba(198, 161, 91, 0.12)"
                  radius={300}
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-10 h-10 rounded-[12px] border border-gold/35 flex items-center justify-center text-gold-dark bg-ivory-light shadow-2xs group-hover:border-gold transition-colors">
                        <Icon className="w-4 h-4 text-gold-dark" />
                      </div>
                      <span className="text-[10px] font-mono text-gold-dark font-semibold">
                        [0{idx + 1}]
                      </span>
                    </div>

                    {/* Huge Serif Numerals */}
                    <div className="font-serif font-bold text-3xl sm:text-4xl text-charcoal tracking-tight flex items-baseline mb-3 group-hover:text-midnight transition-colors">
                      {cred.prefix && <span className="mr-0.5">{cred.prefix}</span>}
                      <NumberTicker value={cred.num} duration={1.5} delay={idx * 0.08} />
                      <span className="text-sm sm:text-base text-gold-dark font-medium ml-1">
                        {cred.suffix}
                      </span>
                    </div>

                    <span className="text-[9.5px] font-bold tracking-widest uppercase text-gold-dark block mb-1">
                      {cred.subtitle}
                    </span>
                    <h3 className="font-serif text-lg font-bold text-charcoal tracking-tight mb-2">
                      {cred.title}
                    </h3>
                    <p className="text-xs text-charcoal-muted leading-relaxed font-normal">
                      {cred.description}
                    </p>
                  </div>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
