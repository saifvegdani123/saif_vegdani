import React, { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

/**
 * NumberTicker
 * Animated number counter that counts up smoothly when scrolled into view.
 * Fully safe for prefers-reduced-motion.
 */
export default function NumberTicker({
  value,
  direction = "up",
  delay = 0,
  duration = 1.6,
  className = "",
  decimalPlaces = 0
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px" });
  
  const isReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const [displayValue, setDisplayValue] = useState(
    isReducedMotion ? value : direction === "down" ? value : 0
  );

  useEffect(() => {
    if (isReducedMotion || !isInView) return;

    let startTimestamp = null;
    const startVal = direction === "down" ? value : 0;
    const endVal = direction === "down" ? 0 : value;
    const durationMs = duration * 1000;
    let animationFrameId;

    const timeoutId = setTimeout(() => {
      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / durationMs, 1);
        
        // EaseOutExpo curve
        const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        const current = startVal + (endVal - startVal) * easeProgress;

        setDisplayValue(Number(current.toFixed(decimalPlaces)));

        if (progress < 1) {
          animationFrameId = requestAnimationFrame(step);
        }
      };

      animationFrameId = requestAnimationFrame(step);
    }, delay * 1000);

    return () => {
      clearTimeout(timeoutId);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [isInView, value, direction, delay, duration, decimalPlaces, isReducedMotion]);

  const outputValue = isReducedMotion ? value : displayValue;

  return (
    <span ref={ref} className={`inline-block tabular-nums tracking-tight ${className}`}>
      {Intl.NumberFormat("en-IN", {
        minimumFractionDigits: decimalPlaces,
        maximumFractionDigits: decimalPlaces
      }).format(outputValue)}
    </span>
  );
}
