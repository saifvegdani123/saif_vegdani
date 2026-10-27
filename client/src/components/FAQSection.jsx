import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle, MessageCircle } from "lucide-react";
import { createWhatsAppUrl } from "../utils/whatsapp";

gsap.registerPlugin(ScrollTrigger);

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const listRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Header
      gsap.from(headerRef.current, {
        opacity: 0,
        y: 25,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none none"
        }
      });

      // FAQ List items stagger
      gsap.from(listRef.current?.children || [], {
        opacity: 0,
        y: 25,
        duration: 0.7,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: listRef.current,
          start: "top 85%",
          toggleActions: "play none none none"
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const faqs = [
    {
      q: "Which classes do you teach?",
      a: "Saif Barkat Vegdani conducts tuition classes for students from Standard 3 through Standard 12. This spans Primary & Middle School (Standards 3–8), Secondary Board Preparation (Standards 9–10), and Higher Secondary Commerce (Standards 11–12)."
    },
    {
      q: "Which boards are covered?",
      a: "For Standards 3–8, both GSEB (Gujarat State Board) and CBSE (Central Board) are covered. For Standards 9–10, tuition is exclusively dedicated to the GSEB board. For Standards 11–12, tuition covers the GSEB Commerce stream curriculum."
    },
    {
      q: "Which subjects are available?",
      a: "Subject coverage is structured as follows:\n• Standards 3–8 (GSEB & CBSE): All school subjects except Sanskrit.\n• Standards 9–10 (GSEB): All subjects except Computer and Sanskrit.\n• Standards 11–12 (Commerce): All commerce subjects covered, including Elements of Book Keeping & Accountancy, Economics, Statistics, and Organization of Commerce."
    },
    {
      q: "What are the batch timings?",
      a: "Evening batches operate Monday through Saturday between 4:30 PM and 8:00 PM. Individual standard-wise batch schedules and daily timings are assigned during the academic consultation to ensure zero conflicts with school shift hours."
    },
    {
      q: "What are the admission fees?",
      a: "Admission and tuition fees depend on the student's academic standard, subject selection, and individual doubt-clinic requirements. Rather than quoting standardized figures, fees are clearly and transparently shared during direct consultation with parents. We invite you to contact us on WhatsApp or submit the enquiry form for fee details."
    },
    {
      q: "How can I enquire about admission?",
      a: "You can easily submit the Admission Enquiry Form on this website with your child's standard and contact details, or initiate a direct chat with Saif Sir on WhatsApp via the buttons throughout the site. Saif Sir personally reviews enquiries and responds within 24 operational hours."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  const whatsappFaqUrl = createWhatsAppUrl(
    "Hello Saif Sir, I have a question regarding tuition classes and admission details."
  );

  return (
    <section ref={sectionRef} id="faq" className="py-20 lg:py-28 bg-ivory border-b border-border-soft">
      <div className="max-w-[1000px] mx-auto px-4 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-surface-pure border border-border-soft text-[10.5px] font-bold tracking-[0.2em] uppercase text-gold-dark mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-gold" />
            Common Questions
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-charcoal font-bold tracking-tight leading-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-charcoal-muted mt-3 leading-relaxed">
            Essential information for parents and students regarding boards, subject coverage,
            timings, and admissions.
          </p>
        </div>

        {/* Accordion List */}
        <div ref={listRef} className="space-y-3.5">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <motion.div
                key={idx}
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
                className="bg-surface-pure rounded-[20px] border border-border-soft overflow-hidden transition-colors shadow-2xs hover:border-gold/40"
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(idx)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${idx}`}
                >
                  <span className="font-serif font-bold text-base sm:text-lg text-charcoal">
                    {faq.q}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className={`w-8 h-8 rounded-full border border-border-soft flex items-center justify-center shrink-0 transition-colors ${
                      isOpen ? "bg-midnight text-gold border-gold/40" : "text-charcoal-muted bg-ivory-light"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-answer-${idx}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{
                        height: "auto",
                        opacity: 1,
                        transition: {
                          height: { duration: 0.35, ease: [0.04, 0.62, 0.23, 0.98] },
                          opacity: { duration: 0.25, delay: 0.08 }
                        }
                      }}
                      exit={{
                        height: 0,
                        opacity: 0,
                        transition: {
                          height: { duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] },
                          opacity: { duration: 0.15 }
                        }
                      }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-1 text-xs sm:text-[13px] text-charcoal/80 leading-relaxed border-t border-border-soft/60">
                        {faq.a.split("\n").map((line, lIdx) => (
                          <p key={lIdx} className={lIdx > 0 ? "mt-2" : ""}>
                            {line}
                          </p>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Footer Question Trigger */}
        <div className="mt-12 text-center">
          <p className="text-xs text-charcoal-muted mb-3 font-normal">
            Have a question not addressed above?
          </p>
          <motion.a
            whileHover={{ scale: 1.03, boxShadow: "0 0 16px rgba(198,161,91,0.2)" }}
            whileTap={{ scale: 0.97 }}
            href={whatsappFaqUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-surface-pure hover:bg-ivory-tint text-charcoal border border-border-soft text-xs font-semibold uppercase tracking-wider transition-colors shadow-2xs"
          >
            <MessageCircle className="w-3.5 h-3.5 text-gold-dark" />
            <span>Ask Saif Sir on WhatsApp</span>
          </motion.a>
        </div>
      </div>
    </section>
  );
}
