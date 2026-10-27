import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { GraduationCap, Award, Building2, ShieldCheck } from "lucide-react";
import SpotlightCard from "./ui/SpotlightCard";
import NumberTicker from "./ui/NumberTicker";

gsap.registerPlugin(ScrollTrigger);

export default function TrustCredentials() {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(gridRef.current?.children || [], {
        opacity: 0,
        y: 35,
        duration: 0.8,
        stagger: 0.12,
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
      title: "Teaching Experience",
      subtitle: "Stated Overall Record",
      description:
        "Dedicated pedagogical background across school faculty and specialised academy mentorship."
    },
    {
      icon: GraduationCap,
      num: 2,
      suffix: " Degrees",
      title: "B.Com & B.Ed Qualified",
      subtitle: "Dual Formal Qualifications",
      description:
        "Formal pedagogical training in teaching methodologies paired with rigorous commercial foundations."
    },
    {
      icon: Building2,
      num: 3,
      suffix: " Institutions",
      title: "Pedagogy Background",
      subtitle: "Multi-Environment Background",
      description:
        "Proven instruction tenure across Ignite Academy, Saraswati Classes, and Good Shepherd Mission School."
    },
    {
      icon: ShieldCheck,
      num: 100,
      suffix: "%",
      title: "Concept-First Clarity",
      subtitle: "Zero Fabricated Claims",
      description:
        "Committed to genuine concept clarity and transparent parent communication without inflated guarantees."
    }
  ];

  return (
    <section ref={sectionRef} className="py-16 bg-ivory border-b border-border-soft relative">
      <div className="max-w-[1340px] mx-auto px-4 lg:px-12">
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {credentials.map((cred, idx) => {
            const Icon = cred.icon;
            return (
              <motion.div
                key={idx}
                whileHover={{ y: -6, transition: { type: "spring", stiffness: 350, damping: 25 } }}
                className="h-full"
              >
                <SpotlightCard
                  className="bg-surface-pure p-6 rounded-[24px] border border-border-soft shadow-2xs hover:border-gold/60 transition-colors h-full flex flex-col justify-between group"
                  spotlightColor="rgba(198, 161, 91, 0.14)"
                  radius={320}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-11 h-11 rounded-[14px] border border-gold/40 flex items-center justify-center text-gold bg-ivory-light shadow-2xs group-hover:border-gold group-hover:scale-105 transition-all">
                        <Icon className="w-5 h-5 text-gold-dark" />
                      </div>
                      <div className="font-serif font-bold text-lg text-gold flex items-baseline">
                        <NumberTicker value={cred.num} duration={1.6} delay={idx * 0.1} />
                        <span>{cred.suffix}</span>
                      </div>
                    </div>

                    <span className="text-[10px] font-bold tracking-widest uppercase text-gold-dark block mb-1">
                      {cred.subtitle}
                    </span>
                    <h3 className="font-serif text-lg font-bold text-charcoal tracking-tight mb-2 group-hover:text-midnight transition-colors">
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
