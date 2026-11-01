import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

/**
 * SectionDivider
 * Fine champagne gold hairline divider that gently expands from center on scroll.
 */
export default function SectionDivider({ className = "" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <div ref={ref} className={`w-full max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-12 ${className}`} aria-hidden="true">
      <div className="relative h-[1px] w-full overflow-hidden">
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={isInView ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/40 to-transparent origin-center"
        />
      </div>
    </div>
  );
}

