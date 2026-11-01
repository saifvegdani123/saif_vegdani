import React, { useState, useEffect } from "react";
import { MessageCircle, Menu, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { createWhatsAppUrl } from "../utils/whatsapp";
import logoImg from "../assets/logo.png";
import MagneticButton from "./ui/MagneticButton";

const NAV_LINKS = [
  { name: "Home", href: "#hero", id: "hero" },
  { name: "Results", href: "#results", id: "results" },
  { name: "Classes", href: "#classes", id: "classes" },
  { name: "Diagnostic", href: "#curriculum-diagnostic", id: "curriculum-diagnostic" },
  { name: "Philosophy", href: "#philosophy", id: "philosophy" },
  { name: "Timings", href: "#timings", id: "timings" },
  { name: "Admissions", href: "#admissions", id: "admissions" }
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  // Directional scroll handler (hides on scroll down, reveals on scroll up)
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 24);

      if (currentScrollY > 120 && currentScrollY > lastScrollY && !mobileMenuOpen) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [mobileMenuOpen]);

  // Track active section via IntersectionObserver
  useEffect(() => {
    const sectionIds = NAV_LINKS.map((l) => l.id);
    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      rootMargin: "-25% 0px -60% 0px",
      threshold: 0
    });

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Body scroll lock on mobile menu open + Escape key handler
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e) => {
        if (e.key === "Escape") setMobileMenuOpen(false);
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "unset";
        window.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      document.body.style.overflow = "unset";
    }
  }, [mobileMenuOpen]);

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  const whatsappGeneralUrl = createWhatsAppUrl(
    "Hello Saif Sir, I am interested in tuition classes for my child and would like to enquire about admission and batch availability."
  );

  return (
    <>
      <motion.header
        animate={{ y: isHidden ? "-100%" : "0%" }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 w-full z-50"
      >
        <div
          className={`w-full transition-all duration-300 ${
            isScrolled
              ? "bg-ivory/90 backdrop-blur-md border-b border-border-soft shadow-[0_4px_24px_-4px_rgba(29,28,22,0.06)]"
              : "bg-ivory/70 backdrop-blur-sm border-b border-border-soft/40"
          }`}
        >
          <div className="max-w-[1340px] mx-auto h-[64px] sm:h-[72px] px-4 sm:px-6 lg:px-12 flex items-center justify-between gap-4">
            {/* Brand Monogram Identity with Official Intertwined SV Logo */}
            <a
              href="#hero"
              className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-xl p-1"
              aria-label="S.V. Tutorial - Saif Barkat Vegdani Tuition Classes"
            >
              <div className="relative">
                <img
                  src={logoImg}
                  alt="S.V. Tutorial Official Logo"
                  className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl object-contain bg-surface-pure border border-gold/40 p-0.5 shadow-2xs shrink-0 transition-all duration-300 group-hover:border-gold group-hover:shadow-[0_0_14px_rgba(198,161,91,0.3)]"
                  width={44}
                  height={44}
                />
              </div>
              <div className="flex flex-col">
                <span className="font-serif font-bold text-[16px] sm:text-[18px] text-charcoal tracking-tight leading-tight group-hover:text-midnight transition-colors">
                  S.V. Tutorial
                </span>
                <span className="text-[8.5px] sm:text-[9px] font-sans font-semibold tracking-[0.22em] text-gold-dark uppercase mt-0.5">
                  Saif Barkat Vegdani · Standards 3–12
                </span>
              </div>
            </a>

            {/* Desktop Nav Links */}
            <nav
              className="hidden lg:flex items-center gap-1 text-[13px] font-medium text-charcoal/80"
              aria-label="Main Navigation"
            >
              {NAV_LINKS.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    className={`relative px-3.5 py-1.5 rounded-full transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold ${
                      isActive
                        ? "text-midnight font-bold bg-gold/10"
                        : "text-charcoal/75 hover:text-charcoal hover:bg-ivory-tint"
                    }`}
                  >
                    <span>{link.name}</span>
                    {isActive && (
                      <motion.span
                        layoutId="navActiveUnderline"
                        className="absolute bottom-0.5 left-3.5 right-3.5 h-[2px] bg-gold-dark rounded-full"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </a>
                );
              })}
            </nav>

            {/* Header Action Button (Desktop Magnetic Button) */}
            <div className="hidden sm:flex items-center gap-3">
              <MagneticButton
                as="a"
                href={whatsappGeneralUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-midnight hover:bg-midnight-card text-gold hover:text-gold-light font-bold text-xs tracking-wider uppercase transition-colors shadow-xs border border-gold/40 relative overflow-hidden group cursor-pointer"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Enquire on WhatsApp</span>
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />
              </MagneticButton>
            </div>

            {/* Mobile Menu Hamburger */}
            <button
              type="button"
              className="lg:hidden p-2 rounded-xl text-charcoal hover:bg-ivory-tint transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-charcoal" />
              ) : (
                <Menu className="w-6 h-6 text-charcoal" />
              )}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Full-Screen Premium Light Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[60] bg-ivory flex flex-col justify-between p-6 sm:p-10 lg:hidden overflow-y-auto"
          >
            {/* Top Bar inside Menu */}
            <div className="flex items-center justify-between pb-6 border-b border-border-soft">
              <div className="flex items-center gap-3">
                <img
                  src={logoImg}
                  alt="S.V. Tutorial"
                  className="w-10 h-10 rounded-xl object-contain bg-surface-pure border border-gold/40 p-0.5"
                  width={40}
                  height={40}
                />
                <div>
                  <span className="font-serif font-bold text-lg text-charcoal block">S.V. Tutorial</span>
                  <span className="text-[9px] font-sans font-semibold tracking-widest text-gold-dark uppercase block">
                    Standards 3–12
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="w-10 h-10 rounded-full bg-ivory-tint border border-border-soft flex items-center justify-center text-charcoal hover:bg-border-soft transition-colors cursor-pointer"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation Links with Editorial Serif Typography */}
            <nav className="flex flex-col gap-4 py-8">
              {NAV_LINKS.map((link, idx) => {
                const isActive = activeSection === link.id;
                return (
                  <motion.a
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * idx, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    href={link.href}
                    onClick={handleLinkClick}
                    className="flex items-baseline justify-between group"
                  >
                    <div className="flex items-baseline gap-3">
                      <span className="text-[11px] font-mono text-gold-dark font-semibold">0{idx + 1}</span>
                      <span
                        className={`font-serif text-2xl sm:text-3xl font-bold transition-colors ${
                          isActive ? "text-gold-dark italic" : "text-charcoal group-hover:text-gold-dark"
                        }`}
                      >
                        {link.name}
                      </span>
                    </div>
                    {isActive && <span className="w-2 h-2 rounded-full bg-gold-dark" />}
                  </motion.a>
                );
              })}
            </nav>

            {/* Bottom Actions */}
            <div className="pt-6 border-t border-border-soft flex flex-col gap-3">
              <a
                href={whatsappGeneralUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleLinkClick}
                className="w-full py-3.5 rounded-full bg-midnight text-gold font-bold text-xs uppercase tracking-wider text-center flex items-center justify-center gap-2 shadow-sm hover:bg-midnight-card transition-colors border border-gold/40"
              >
                <MessageCircle className="w-4 h-4 text-gold" />
                <span>Enquire on WhatsApp</span>
              </a>
              <a
                href="#admissions"
                onClick={handleLinkClick}
                className="w-full py-3.5 rounded-full bg-surface-pure text-charcoal font-semibold text-xs uppercase tracking-wider text-center flex items-center justify-center gap-2 hover:bg-ivory-tint transition-colors border border-border-soft"
              >
                <span>Admission Form</span>
                <ArrowRight className="w-3.5 h-3.5 text-gold-dark" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
