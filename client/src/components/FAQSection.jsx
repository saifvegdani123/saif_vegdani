import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, MessageCircle, HelpCircle } from "lucide-react";
import { createWhatsAppUrl } from "../utils/whatsapp";

gsap.registerPlugin(ScrollTrigger);

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const listRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Header entrance
      gsap.from(headerRef.current, {
        opacity: 0,
        y: 24,
        duration: 0.75,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none none"
        }
      });

      // FAQ List items entrance
      gsap.from(listRef.current?.children || [], {
        opacity: 0,
        y: 20,
        duration: 0.65,
        stagger: 0.07,
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
      a: "Evening batches operate Monday through Saturday within our confirmed 4:30 PM – 8:00 PM operational window. Specific standard-wise slots are fixed on consultation with parents to guarantee zero conflicts with school shift hours and maximize focus."
    },
    {
      q: "What are the admission fees?",
      a: "Admission and tuition fees depend on the student's academic standard, subject selection, and individual doubt-clinic requirements. Rather than quoting standardized figures, fees are clearly and transparently shared during direct consultation with parents. We invite you to contact us on WhatsApp or submit the enquiry form for fee details."
    },
    {
      q: "Where is S.V. Tutorial located in Surat?",
      a: "S.V. Tutorial is located in Rander, Surat, Gujarat. The academy provides a focused, quiet learning environment centrally accessible for GSEB and CBSE students across Surat. Both morning and afternoon school shifts are accommodated during our 4:30 PM to 8:00 PM operational window."
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
    <section
      ref={sectionRef}
      id="faq"
      className="py-10 sm:py-16 bg-ivory border-b border-border-soft"
      aria-label="Frequently Asked Questions"
    >
      <div className="site-container max-w-4xl">
        {/* Section Header */}
        <div ref={headerRef} className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <div className="eyebrow-badge mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-gold-dark shrink-0" />
            <span>09 / COMMON QUESTIONS</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-charcoal tracking-tight mb-3">
            Frequently Asked{" "}
            <span className="font-serif italic font-normal text-gold-dark">
              Questions.
            </span>
          </h2>

          <p className="text-sm sm:text-base text-charcoal-muted leading-relaxed font-normal mx-auto">
            Essential information for parents and students regarding boards, subject coverage,
            timings, and admissions.
          </p>
        </div>

        {/* Accordion List with Hairline Dividers & Plus-to-Cross Icon */}
        <div ref={listRef} className="space-y-3.5">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-surface-pure rounded-2xl border border-border-soft overflow-hidden transition-colors shadow-2xs hover:border-gold/40"
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(idx)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold cursor-pointer min-h-[56px]"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${idx}`}
                >
                  <span className="font-serif font-bold text-base sm:text-lg text-charcoal leading-snug">
                    {faq.q}
                  </span>

                  {/* Plus to Cross Morphing Icon */}
                  <motion.div
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                      isOpen
                        ? "bg-midnight text-gold border-gold"
                        : "text-charcoal-muted bg-ivory border-border-soft"
                    }`}
                  >
                    <Plus className="w-4 h-4" />
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
                          height: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
                          opacity: { duration: 0.22, delay: 0.05 }
                        }
                      }}
                      exit={{
                        height: 0,
                        opacity: 0,
                        transition: {
                          height: { duration: 0.25, ease: [0.22, 1, 0.36, 1] },
                          opacity: { duration: 0.12 }
                        }
                      }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-2 text-sm sm:text-base text-charcoal/80 leading-relaxed border-t border-border-soft/60 font-normal">
                        {faq.a.split("\n").map((line, lIdx) => (
                          <p key={lIdx} className={lIdx > 0 ? "mt-2" : ""}>
                            {line}
                          </p>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Footer Question Trigger */}
        <div className="mt-12 text-center">
          <p className="text-sm text-charcoal-muted mb-3 font-normal">
            Have a question not addressed above?
          </p>
          <a
            href={whatsappFaqUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-surface-pure hover:bg-ivory-light text-charcoal border border-border-soft text-xs sm:text-sm font-semibold uppercase tracking-wider transition-colors shadow-2xs min-h-[44px]"
          >
            <MessageCircle className="w-4 h-4 text-gold-dark" />
            <span>Ask Saif Sir on WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
}
