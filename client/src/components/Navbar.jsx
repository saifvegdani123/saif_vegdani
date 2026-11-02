import React, { useState, useEffect, useRef } from "react";
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
  { name: "Educator", href: "#about", id: "about" },
  { name: "Timings", href: "#timings", id: "timings" },
  { name: "Reviews", href: "#reviews", id: "reviews" },
  { name: "Admissions", href: "#admissions", id: "admissions" },
  { name: "FAQ", href: "#faq", id: "faq" }
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const menuButtonRef = useRef(null);

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

    const observerOptions = {
      root: null,
      rootMargin: "-25% 0px -65% 0px",
      threshold: 0
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Lock body scroll and trap ESC on mobile menu open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e) => {
        if (e.key === "Escape") {
          setMobileMenuOpen(false);
          if (menuButtonRef.current) menuButtonRef.current.focus();
        }
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
          className={`w-full transition-colors duration-300 ${
            isScrolled
              ? "bg-ivory/95 backdrop-blur-md border-b border-border-soft shadow-xs"
              : "bg-ivory/80 backdrop-blur-sm border-b border-border-soft/60"
          }`}
        >
          <div className="site-container h-[68px] sm:h-[72px] flex items-center justify-between gap-3">
            {/* Brand Monogram Identity */}
            <a
              href="#hero"
              className="flex items-center gap-3 shrink-0 group focus:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-xl p-1"
              aria-label="S.V. Tutorial - Saif Barkat Vegdani Tuition Classes"
            >
              <div className="relative shrink-0">
                <img
                  src={logoImg}
                  alt="S.V. Tutorial Official Logo"
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl object-contain bg-surface-pure border border-gold/40 p-0.5 shadow-2xs shrink-0 transition-transform duration-300 group-hover:scale-105"
                  width={40}
                  height={40}
                />
              </div>
              <div className="flex flex-col shrink-0">
                <span className="font-serif font-bold text-base sm:text-lg text-charcoal tracking-tight leading-tight group-hover:text-midnight transition-colors">
                  S.V. Tutorial
                </span>
                <span className="text-xs font-sans font-semibold tracking-wider text-gold-dark uppercase mt-0.5 hidden xl:block">
                  Saif Barkat Vegdani · Standards 3–12
                </span>
              </div>
            </a>

            {/* Desktop Nav Links (Engages strictly at ≥ 1180px to avoid crowding) */}
            <nav
              className="hidden min-[1180px]:flex items-center gap-0.5 xl:gap-1 text-[12.5px] xl:text-[13px] font-medium text-charcoal/80"
              aria-label="Main Navigation"
            >
              {NAV_LINKS.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    className={`relative px-2.5 xl:px-3 py-1.5 rounded-full transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold min-h-[36px] flex items-center ${
                      isActive
                        ? "text-midnight font-bold bg-gold/15"
                        : "text-charcoal/75 hover:text-charcoal hover:bg-ivory-tint"
                    }`}
                  >
                    <span>{link.name}</span>
                    {isActive && (
                      <motion.span
                        layoutId="navActiveUnderline"
                        className="absolute bottom-0.5 left-3 right-3 h-[2px] bg-gold-dark rounded-full"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </a>
                );
              })}
            </nav>

            {/* Header Action Button (Desktop Magnetic Button) */}
            <div className="hidden sm:flex items-center gap-2.5 shrink-0">
              <MagneticButton
                as="a"
                href={whatsappGeneralUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-midnight hover:bg-midnight-card text-gold hover:text-gold-light font-bold text-xs tracking-wider uppercase transition-colors shadow-xs border border-gold/40 whitespace-nowrap min-h-[44px] cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 shrink-0 text-gold" />
                <span className="hidden min-[1280px]:inline">Enquire on WhatsApp</span>
                <span className="min-[1280px]:hidden">WhatsApp</span>
              </MagneticButton>
            </div>

            {/* Mobile Menu Hamburger (Visible below 1180px) */}
            <button
              ref={menuButtonRef}
              type="button"
              className="min-[1180px]:hidden min-h-[44px] min-w-[44px] p-2.5 rounded-xl text-charcoal hover:bg-ivory-tint transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold flex items-center justify-center cursor-pointer"
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
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[60] bg-ivory flex flex-col justify-between p-6 sm:p-10 min-[1180px]:hidden overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation Menu"
          >
            {/* Top Bar inside Menu */}
            <div className="flex items-center justify-between pb-5 border-b border-border-soft">
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
                  <span className="text-xs font-sans font-semibold tracking-wider text-gold-dark uppercase block">
                    Standards 3–12
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="min-h-[44px] min-w-[44px] rounded-full bg-ivory-tint border border-border-soft flex items-center justify-center text-charcoal hover:bg-border-soft transition-colors cursor-pointer"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation Links with Editorial Serif Typography */}
            <nav className="flex flex-col gap-3 py-6" aria-label="Mobile Navigation Links">
              {NAV_LINKS.map((link, idx) => {
                const isActive = activeSection === link.id;
                return (
                  <motion.a
                    key={link.name}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.03 * idx, duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    href={link.href}
                    onClick={handleLinkClick}
                    className="flex items-center justify-between py-2 min-h-[44px] group"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono text-gold-dark font-semibold">
                        0{idx + 1}
                      </span>
                      <span
                        className={`font-serif text-2xl font-bold transition-colors ${
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
            <div className="pt-5 border-t border-border-soft flex flex-col gap-3">
              <a
                href={whatsappGeneralUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleLinkClick}
                className="w-full min-h-[48px] py-3.5 rounded-full bg-midnight text-gold font-bold text-xs uppercase tracking-wider text-center flex items-center justify-center gap-2 shadow-sm hover:bg-midnight-card transition-colors border border-gold/40"
              >
                <MessageCircle className="w-4 h-4 text-gold" />
                <span>Enquire on WhatsApp</span>
              </a>
              <a
                href="#admissions"
                onClick={handleLinkClick}
                className="w-full min-h-[48px] py-3.5 rounded-full bg-surface-pure text-charcoal font-semibold text-xs uppercase tracking-wider text-center flex items-center justify-center gap-2 hover:bg-ivory-tint transition-colors border border-border-soft"
              >
                <span>Admission Form</span>
                <ArrowRight className="w-4 h-4 text-gold-dark" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
