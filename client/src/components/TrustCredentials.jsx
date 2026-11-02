import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Award, GraduationCap, Building2, UserCheck } from "lucide-react";
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
        y: 20,
        duration: 0.65,
        stagger: 0.08,
        ease: "power2.out",
        clearProps: "transform,opacity",
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
      num: 12,
      suffix: " Years",
      title: "Teaching Record",
      subtitle: "Verified Career Experience",
      description:
        "Pedagogical background spanning secondary school faculty and specialized tuition batches."
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

  return (
    <section
      ref={sectionRef}
      className="py-10 sm:py-14 lg:py-16 bg-ivory-light border-b border-border-soft relative"
      aria-label="Verified Educator Qualifications"
    >
      <div className="site-container">
        {/* Minimal Section Eyebrow */}
        <div className="flex items-center justify-between mb-8 pb-3 border-b border-border-soft">
          <div className="eyebrow-badge">
            <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
            <span>01 / VERIFIED CREDENTIALS</span>
          </div>
          <span className="text-xs text-charcoal-muted font-medium hidden sm:inline">
            Direct Instruction by Saif Sir
          </span>
        </div>

        {/* 2x2 Grid on Mobile, 4 Columns on Desktop */}
        <div ref={gridRef} className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {credentials.map((cred, idx) => {
            const Icon = cred.icon;
            return (
              <div
                key={idx}
                className="bg-surface-pure p-5 sm:p-6 rounded-2xl border border-border-soft shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-9 h-9 rounded-xl border border-border-soft flex items-center justify-center text-gold-dark bg-ivory">
                      <Icon className="w-4 h-4 text-gold-dark" />
                    </div>
                    <span className="text-xs font-mono text-gold-dark font-semibold">
                      0{idx + 1}
                    </span>
                  </div>

                  {/* Large Serif Numerals */}
                  <div className="font-serif font-bold text-2xl sm:text-4xl text-charcoal tracking-tight flex items-baseline mb-2">
                    {cred.prefix && <span className="mr-0.5">{cred.prefix}</span>}
                    <NumberTicker value={cred.num} duration={1.2} delay={idx * 0.05} />
                    <span className="text-sm sm:text-base text-gold-dark font-medium ml-1">
                      {cred.suffix}
                    </span>
                  </div>

                  <span className="text-xs font-semibold tracking-wider uppercase text-gold-dark block mb-1">
                    {cred.subtitle}
                  </span>
                  <h3 className="font-serif text-base sm:text-lg font-bold text-charcoal tracking-tight mb-2">
                    {cred.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed font-normal">
                    {cred.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
