import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { createWhatsAppUrl } from "../utils/whatsapp";

export default function WhatsAppFloating() {
  const [isHovered, setIsHovered] = useState(false);

  const whatsappUrl = createWhatsAppUrl(
    "Hello Saif Sir, I would like to enquire about admission to your tuition classes (Standards 3–12)."
  );

  return (
    <aside className="fixed bottom-6 right-6 z-40">
      {/* Tooltip with Framer Motion AnimatePresence */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-full right-0 mb-3 flex items-center px-4 py-2 rounded-full bg-midnight text-white text-xs font-medium whitespace-nowrap shadow-xl border border-gold/40 pointer-events-none"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse mr-2"></span>
            <span>Chat with Saif Sir · Std 3–12 Admissions</span>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.a
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.6 }}
        whileHover={{ scale: 1.1, rotate: 3 }}
        whileTap={{ scale: 0.92 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contact Saif Barkat Vegdani on WhatsApp"
        className="flex items-center justify-center w-14 h-14 rounded-full bg-midnight text-gold border-2 border-gold shadow-[0_4px_24px_rgba(7,8,23,0.45)] hover:shadow-[0_0_24px_rgba(198,161,91,0.55)] focus:outline-none focus-visible:ring-4 focus-visible:ring-gold relative transition-shadow animate-gold-pulse"
      >
        <MessageCircle className="w-7 h-7" />
      </motion.a>
    </aside>
  );
}
