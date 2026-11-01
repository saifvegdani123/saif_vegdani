import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { createWhatsAppUrl } from "../utils/whatsapp";

export default function WhatsAppFloating() {
  const [isHovered, setIsHovered] = useState(false);
  const [isNearSubmit, setIsNearSubmit] = useState(false);

  // Monitor if user is currently viewing the admission form to prevent visual collision
  useEffect(() => {
    const formEl = document.querySelector("#admissions form");
    if (!formEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsNearSubmit(entry.isIntersecting);
      },
      { threshold: 0.6 }
    );

    observer.observe(formEl);
    return () => observer.disconnect();
  }, []);

  const whatsappUrl = createWhatsAppUrl(
    "Hello Saif Sir, I would like to enquire about admission to your tuition classes (Standards 3–12)."
  );

  return (
    <aside
      className={`fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 transition-opacity duration-300 ${
        isNearSubmit ? "opacity-35 pointer-events-none sm:opacity-100 sm:pointer-events-auto" : "opacity-100"
      }`}
    >
      {/* Tooltip */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.95 }}
            transition={{ duration: 0.18 }}
            className="hidden sm:flex absolute bottom-full right-0 mb-3 items-center px-3.5 py-1.5 rounded-full bg-midnight/95 text-white text-[11px] font-medium whitespace-nowrap shadow-xl border border-gold/40 pointer-events-none"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-gold mr-2"></span>
            <span>Chat with Saif Sir · Std 3–12 Admissions</span>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.a
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 240, damping: 22, delay: 0.5 }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contact Saif Barkat Vegdani on WhatsApp"
        className="flex items-center justify-center w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-midnight text-gold border-2 border-gold shadow-[0_4px_20px_rgba(7,8,23,0.4)] hover:shadow-[0_0_20px_rgba(198,161,91,0.45)] focus:outline-none focus-visible:ring-3 focus-visible:ring-gold relative transition-all"
      >
        <MessageCircle className="w-6 h-6 sm:w-6.5 sm:h-6.5" />
      </motion.a>
    </aside>
  );
}
