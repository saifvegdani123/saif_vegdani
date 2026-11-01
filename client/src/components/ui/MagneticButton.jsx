import React, { useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * MagneticButton
 * Subtle magnetic pull interaction for desktop pointer devices.
 * Uses Framer Motion values to avoid React re-renders on mouse movement.
 * Completely inert on touch devices and prefers-reduced-motion.
 */
export default function MagneticButton({
  children,
  className = "",
  strength = 18,
  as: Component = "button",
  ...props
}) {
  const ref = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 300, damping: 20, mass: 0.4 };
  const smoothX = useSpring(x, springConfig);
  const smoothY = useSpring(y, springConfig);

  useEffect(() => {
    const isFinePointer = window.matchMedia && window.matchMedia("(pointer: fine)").matches;
    const prefersReducedMotion =
      window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!isFinePointer || prefersReducedMotion) return;

    const el = ref.current;
    if (!el) return;

    const handleMouseMove = (e) => {
      const { left, top, width, height } = el.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      x.set((e.clientX - centerX) / strength);
      y.set((e.clientY - centerY) / strength);
    };

    const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
    };

    el.addEventListener("mousemove", handleMouseMove, { passive: true });
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [x, y, strength]);

  return (
    <motion.div ref={ref} style={{ x: smoothX, y: smoothY }} className="inline-flex">
      <Component className={className} {...props}>
        {children}
      </Component>
    </motion.div>
  );
}
