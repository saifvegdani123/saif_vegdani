import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

/**
 * SplitText
 * Word-by-word masked reveal animation on scroll with gentle stagger.
 * Safe for reduced motion and screen readers.
 */
export default function SplitText({
  text,
  className = "",
  wordClassName = "",
  delay = 0,
  stagger = 0.04,
  as: Component = "span"
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  const isReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const words = text.split(" ");

  if (isReducedMotion) {
    return <Component className={className}>{text}</Component>;
  }

  return (
    <Component ref={ref} className={`inline-block ${className}`} aria-label={text}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.28em] align-top">
          <motion.span
            className={`inline-block ${wordClassName}`}
            initial={{ y: "110%", opacity: 0 }}
            animate={isInView ? { y: "0%", opacity: 1 } : { y: "110%", opacity: 0 }}
            transition={{
              duration: 0.75,
              ease: [0.22, 1, 0.36, 1],
              delay: delay + i * stagger
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Component>
  );
}

