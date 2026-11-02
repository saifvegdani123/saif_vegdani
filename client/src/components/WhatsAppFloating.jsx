import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, ArrowUp } from "lucide-react";
import { createWhatsAppUrl } from "../utils/whatsapp";

// Environment-backed contact credentials
const emailAddress = import.meta.env.VITE_CONTACT_EMAIL || "saif@svtutorial.in";
const linkedinUrl =
  import.meta.env.VITE_LINKEDIN_URL || "https://www.linkedin.com/in/saif-vegdani";

export default function WhatsAppFloating() {
  const [hoveredButton, setHoveredButton] = useState(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Monitor scroll distance for Sticky Back-to-Top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 320);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = useCallback(() => {
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);

  const emailUrl = `mailto:${emailAddress}?subject=${encodeURIComponent(
    "S.V. Tutorial — Admission Consultation Enquiry"
  )}&body=${encodeURIComponent(
    "Hello Saif Sir,\n\nI would like to enquire about admission to your tuition classes (Standards 3–12). Please share details regarding available batch timings and enrolment.\n\nThank you."
  )}`;

  const whatsappUrl = createWhatsAppUrl(
    "Hello Saif Sir, I would like to enquire about admission to your tuition classes (Standards 3–12)."
  );

  return (
    <>
      {/* ========================================================
          1. DESKTOP & LAPTOP SCREEN: Refined, Slim Vertical Capsule Dock
          (Hidden on mobile, appears on md+ screens)
         ======================================================== */}
      <aside
        className="hidden md:flex fixed right-3.5 sm:right-4 top-1/2 -translate-y-1/2 z-40 flex-col items-center select-none"
        aria-label="Quick Contact Actions"
      >
        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 25, delay: 0.5 }}
          className="bg-surface-pure/95 backdrop-blur-md p-1 rounded-full border border-gold/45 shadow-[0_6px_24px_rgba(29,28,22,0.09)] ring-1 ring-gold/20 flex flex-col items-center gap-1.5"
        >
          {/* 1. EMAIL BUTTON */}
          <div className="relative flex items-center">
            <AnimatePresence>
              {hoveredButton === "email" && (
                <motion.div
                  initial={{ opacity: 0, x: 8, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 6, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-full mr-3 items-center px-3 py-1 rounded-full bg-surface-pure text-charcoal text-xs font-semibold whitespace-nowrap shadow-md border border-gold/50 pointer-events-none z-50 font-mono flex gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
                  <span>Email Saif Sir</span>
                </motion.div>
              )}
            </AnimatePresence>

            <a
              href={emailUrl}
              onMouseEnter={() => setHoveredButton("email")}
              onMouseLeave={() => setHoveredButton(null)}
              aria-label="Email Saif Sir"
              className="w-9 h-9 rounded-full bg-ivory/80 hover:bg-gold/20 text-charcoal/80 hover:text-gold-dark flex items-center justify-center transition-all duration-200 border border-border-soft/60 hover:border-gold/60 shadow-2xs hover:scale-105 active:scale-95 group focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            >
              <Mail className="w-4 h-4 transition-transform duration-200 group-hover:-translate-y-0.5" />
            </a>
          </div>

          {/* 2. WHATSAPP BUTTON */}
          <div className="relative flex items-center">
            <AnimatePresence>
              {hoveredButton === "whatsapp" && (
                <motion.div
                  initial={{ opacity: 0, x: 8, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 6, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-full mr-3 items-center px-3 py-1 rounded-full bg-surface-pure text-charcoal text-xs font-semibold whitespace-nowrap shadow-md border border-gold/50 pointer-events-none z-50 font-mono flex gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse" />
                  <span>WhatsApp (+91 82388 43699)</span>
                </motion.div>
              )}
            </AnimatePresence>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setHoveredButton("whatsapp")}
              onMouseLeave={() => setHoveredButton(null)}
              aria-label="Chat with Saif Sir on WhatsApp"
              className="w-9 h-9 rounded-full bg-ivory/80 hover:bg-[#25D366]/15 text-[#25D366] flex items-center justify-center transition-all duration-200 border border-border-soft/60 hover:border-[#25D366]/60 shadow-2xs hover:scale-105 active:scale-95 group focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            >
              <svg
                className="w-4.5 h-4.5 transition-transform duration-200 group-hover:scale-110"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12.031 2c-5.514 0-10 4.486-10 10 0 1.76.459 3.473 1.332 4.987l-1.417 5.18 5.304-1.391c1.46.799 3.109 1.224 4.781 1.224 5.514 0 10-4.486 10-10s-4.486-10-10-10zm0 18.25c-1.477 0-2.929-.396-4.201-1.144l-.301-.179-3.125.82.834-3.048-.196-.312c-.82-1.306-1.253-2.825-1.253-4.387 0-4.549 3.701-8.25 8.25-8.25 4.549 0 8.25 3.701 8.25 8.25 0 4.549-3.701 8.25-8.25 8.25zm4.524-6.177c-.248-.124-1.467-.724-1.694-.807-.228-.083-.393-.124-.559.124-.165.248-.641.807-.786.973-.145.165-.29.186-.538.062-.248-.124-1.047-.386-1.995-1.232-.738-.658-1.236-1.472-1.381-1.72-.145-.248-.016-.382.108-.506.112-.112.248-.29.372-.435.124-.145.165-.248.248-.414.083-.165.041-.311-.021-.435-.062-.124-.559-1.347-.766-1.844-.201-.484-.406-.418-.559-.426-.145-.008-.311-.01-.477-.01-.165 0-.435.062-.663.311-.228.248-.87.85-.87 2.073 0 1.222.891 2.404 1.015 2.57.124.165 1.753 2.678 4.247 3.755.594.256 1.057.409 1.418.524.597.189 1.14.163 1.569.099.479-.072 1.467-.6 1.674-1.18.207-.58.207-1.077.145-1.18-.062-.103-.228-.165-.476-.289z" />
              </svg>
            </a>
          </div>

          {/* 3. LINKEDIN BUTTON */}
          <div className="relative flex items-center">
            <AnimatePresence>
              {hoveredButton === "linkedin" && (
                <motion.div
                  initial={{ opacity: 0, x: 8, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 6, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-full mr-3 items-center px-3 py-1 rounded-full bg-surface-pure text-charcoal text-xs font-semibold whitespace-nowrap shadow-md border border-gold/50 pointer-events-none z-50 font-mono flex gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0A66C2] animate-pulse" />
                  <span>Saif Sir on LinkedIn</span>
                </motion.div>
              )}
            </AnimatePresence>

            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setHoveredButton("linkedin")}
              onMouseLeave={() => setHoveredButton(null)}
              aria-label="Connect with Saif Sir on LinkedIn"
              className="w-9 h-9 rounded-full bg-ivory/80 hover:bg-[#0A66C2]/15 text-[#0A66C2] flex items-center justify-center transition-all duration-200 border border-border-soft/60 hover:border-[#0A66C2]/60 shadow-2xs hover:scale-105 active:scale-95 group focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            >
              <svg
                className="w-4 h-4 transition-transform duration-200 group-hover:scale-110"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76c.92 0 1.66-.74 1.66-1.66 0-.91-.74-1.66-1.66-1.66s-1.66.75-1.66 1.66c0 .92.74 1.66 1.66 1.66m1.39 9.74v-8.37H5.07v8.37h2.78z" />
              </svg>
            </a>
          </div>
        </motion.div>
      </aside>

      {/* ========================================================
          2. STICKY BACK-TO-TOP BUTTON (DESKTOP & LAPTOP)
          (Smoothly floats at bottom right once user scrolls past 320px)
         ======================================================== */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 12 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="hidden md:flex fixed bottom-6 right-4 sm:right-5 z-40"
          >
            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Scroll back to top of page"
              className="w-10 h-10 rounded-full bg-surface-pure/95 backdrop-blur-md border border-gold/40 hover:border-gold text-gold-dark hover:text-midnight shadow-md hover:shadow-lg flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer group focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            >
              <ArrowUp className="w-4 h-4 transition-transform duration-200 group-hover:-translate-y-0.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================
          3. MOBILE SCREEN: Tailored, Unobtrusive Floating Quick Action Dock
          (Sits safely at bottom right with safe-area-inset padding)
         ======================================================== */}
      <aside
        className="md:hidden fixed bottom-4 right-3 z-40 flex items-center gap-2 select-none"
        aria-label="Mobile Quick Actions"
        style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
      >
        {/* Mobile Back-to-Top Mini Button */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              type="button"
              onClick={scrollToTop}
              aria-label="Scroll to top"
              className="w-9 h-9 rounded-full bg-surface-pure/95 backdrop-blur-md border border-border-soft text-charcoal hover:text-gold-dark shadow-md flex items-center justify-center active:scale-95 transition-transform"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Mobile Dual Action Capsule: WhatsApp & Email */}
        <div className="flex items-center gap-1.5 p-1 rounded-full bg-surface-pure/95 backdrop-blur-md border border-gold/40 shadow-xl">
          <a
            href={emailUrl}
            aria-label="Send email enquiry"
            className="w-9 h-9 rounded-full bg-ivory text-charcoal/80 flex items-center justify-center border border-border-soft active:scale-95 transition-transform"
          >
            <Mail className="w-4 h-4 text-charcoal/80" />
          </a>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            className="w-10 h-10 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-xs active:scale-95 transition-transform"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.031 2c-5.514 0-10 4.486-10 10 0 1.76.459 3.473 1.332 4.987l-1.417 5.18 5.304-1.391c1.46.799 3.109 1.224 4.781 1.224 5.514 0 10-4.486 10-10s-4.486-10-10-10zm0 18.25c-1.477 0-2.929-.396-4.201-1.144l-.301-.179-3.125.82.834-3.048-.196-.312c-.82-1.306-1.253-2.825-1.253-4.387 0-4.549 3.701-8.25 8.25-8.25 4.549 0 8.25 3.701 8.25 8.25 0 4.549-3.701 8.25-8.25 8.25zm4.524-6.177c-.248-.124-1.467-.724-1.694-.807-.228-.083-.393-.124-.559.124-.165.248-.641.807-.786.973-.145.165-.29.186-.538.062-.248-.124-1.047-.386-1.995-1.232-.738-.658-1.236-1.472-1.381-1.72-.145-.248-.016-.382.108-.506.112-.112.248-.29.372-.435.124-.145.165-.248.248-.414.083-.165.041-.311-.021-.435-.062-.124-.559-1.347-.766-1.844-.201-.484-.406-.418-.559-.426-.145-.008-.311-.01-.477-.01-.165 0-.435.062-.663.311-.228.248-.87.85-.87 2.073 0 1.222.891 2.404 1.015 2.57.124.165 1.753 2.678 4.247 3.755.594.256 1.057.409 1.418.524.597.189 1.14.163 1.569.099.479-.072 1.467-.6 1.674-1.18.207-.58.207-1.077.145-1.18-.062-.103-.228-.165-.476-.289z" />
            </svg>
          </a>
        </div>
      </aside>
    </>
  );
}
