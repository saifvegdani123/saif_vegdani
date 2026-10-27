import React, { useState, useEffect } from "react";
import { MessageCircle, Menu, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { createWhatsAppUrl } from "../utils/whatsapp";
import logoImg from "../assets/logo.png";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#hero" },
    { name: "About", href: "#about" },
    { name: "Classes", href: "#classes" },
    { name: "Diagnostic", href: "#curriculum-diagnostic" },
    { name: "Teaching Approach", href: "#philosophy" },
    { name: "Batch Timings", href: "#timings" },
    { name: "Contact", href: "#admissions" }
  ];

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  const whatsappGeneralUrl = createWhatsAppUrl(
    "Hello Saif Sir, I am interested in tuition classes for my child and would like to enquire about admission and batch availability."
  );

  return (
    <header className="fixed top-0 left-0 right-0 w-full z-50">

      {/* Main Navigation Bar */}
      <motion.div
        animate={{
          backgroundColor: isScrolled ? "rgba(7, 8, 23, 0.95)" : "rgba(7, 8, 23, 1)",
          boxShadow: isScrolled ? "0 10px 30px -10px rgba(0,0,0,0.5)" : "0 0 0 rgba(0,0,0,0)"
        }}
        transition={{ duration: 0.25 }}
        className={`w-full backdrop-blur-md transition-all ${
          isScrolled
            ? "border-b border-gold/25"
            : "border-b border-gold/10"
        }`}
      >
        <div className="max-w-[1340px] mx-auto h-[68px] px-4 lg:px-12 flex items-center justify-between gap-4">
          {/* Brand Monogram Identity with Official Logo */}
          <motion.a
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            href="#hero"
            className="flex items-center gap-3 group focus:outline-none"
            aria-label="S.V. Tutorial - Saif Barkat Vegdani Tuition Classes"
          >
            <div className="relative">
              <img
                src={logoImg}
                alt="S.V. Tutorial Official Logo"
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl object-contain bg-midnight border border-gold/40 p-0.5 shadow-sm shrink-0 transition-all group-hover:border-gold group-hover:shadow-[0_0_15px_rgba(198,161,91,0.4)]"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-bold text-[17px] text-white tracking-tight leading-tight group-hover:text-gold-light transition-colors">
                S.V. Tutorial
              </span>
              <span className="text-[9px] font-sans font-semibold tracking-[0.22em] text-gold uppercase">
                Saif Barkat Vegdani · Standards 3–12
              </span>
            </div>
          </motion.a>

          {/* Desktop Nav Links */}
          <nav
            className="hidden lg:flex items-center gap-1 text-[13px] font-medium text-white/80"
            aria-label="Main Navigation"
          >
            {navLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                whileHover={{ y: -1, color: "#FFFFFF" }}
                whileTap={{ y: 0 }}
                className="px-3.5 py-1.5 rounded-full hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold relative"
              >
                {link.name}
              </motion.a>
            ))}
          </nav>

          {/* Header Action Button */}
          <div className="hidden sm:flex items-center gap-3">
            <motion.a
              whileHover={{ scale: 1.03, boxShadow: "0 0 20px rgba(198,161,91,0.4)" }}
              whileTap={{ scale: 0.97 }}
              href={whatsappGeneralUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gold text-midnight hover:bg-gold-light font-bold text-xs tracking-wider uppercase transition-colors shadow-sm border border-gold-light/40"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Enquire on WhatsApp</span>
            </motion.a>
          </div>

          {/* Mobile Menu Hamburger */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            type="button"
            className="lg:hidden p-2 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-6 h-6 text-gold" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-6 h-6 text-gold" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.div>

      {/* Mobile Drawer Menu with Framer Motion AnimatePresence */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden bg-midnight/98 border-b border-gold/25 px-6 py-6 text-white shadow-2xl backdrop-blur-xl overflow-hidden"
          >
            <motion.nav
              initial="closed"
              animate="open"
              exit="closed"
              variants={{
                open: {
                  transition: { staggerChildren: 0.05, delayChildren: 0.05 }
                },
                closed: {
                  transition: { staggerChildren: 0.03, staggerDirection: -1 }
                }
              }}
              className="flex flex-col gap-2.5"
            >
              {navLinks.map((link) => (
                <motion.a
                  key={link.name}
                  variants={{
                    open: { opacity: 1, x: 0 },
                    closed: { opacity: 0, x: -16 }
                  }}
                  href={link.href}
                  onClick={handleLinkClick}
                  className="px-4 py-2.5 rounded-xl text-sm font-medium text-white/90 hover:text-gold hover:bg-white/5 transition-colors border border-transparent hover:border-gold/20"
                >
                  {link.name}
                </motion.a>
              ))}
              <motion.div
                variants={{
                  open: { opacity: 1, y: 0 },
                  closed: { opacity: 0, y: 10 }
                }}
                className="pt-4 border-t border-white/10 flex flex-col gap-3"
              >
                <motion.a
                  whileTap={{ scale: 0.98 }}
                  href={whatsappGeneralUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleLinkClick}
                  className="w-full py-3 rounded-full bg-gold text-midnight font-bold text-xs uppercase tracking-wider text-center flex items-center justify-center gap-2 shadow-md hover:bg-gold-light transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Enquire on WhatsApp</span>
                </motion.a>
                <motion.a
                  whileTap={{ scale: 0.98 }}
                  href="#admissions"
                  onClick={handleLinkClick}
                  className="w-full py-3 rounded-full bg-white/10 text-white font-semibold text-xs uppercase tracking-wider text-center flex items-center justify-center gap-2 hover:bg-white/15 transition-colors"
                >
                  <span>Admission Form</span>
                  <ArrowRight className="w-3.5 h-3.5 text-gold" />
                </motion.a>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
