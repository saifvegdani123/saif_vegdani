import React, { useRef, useEffect } from "react";

/**
 * High-Performance SpotlightCard
 * Tracks mouse position via direct CSS variable manipulation to eliminate React re-renders.
 * Gracefully inactive on touch devices and reduced-motion environments.
 */
export default function SpotlightCard({
  children,
  className = "",
  spotlightColor = "rgba(198, 161, 91, 0.12)",
  radius = 350,
  as: Component = "div",
  ...props
}) {
  const cardRef = useRef(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const isFinePointer = window.matchMedia && window.matchMedia("(pointer: fine)").matches;
    const prefersReducedMotion =
      window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!isFinePointer || prefersReducedMotion) return;

    const handleMouseMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      el.style.setProperty("--mouse-x", `${x}px`);
      el.style.setProperty("--mouse-y", `${y}px`);
      el.style.setProperty("--spotlight-opacity", "1");
    };

    const handleMouseLeave = () => {
      el.style.setProperty("--spotlight-opacity", "0");
    };

    el.addEventListener("mousemove", handleMouseMove, { passive: true });
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <Component
      ref={cardRef}
      className={`relative overflow-hidden ${className}`}
      style={{
        "--mouse-x": "0px",
        "--mouse-y": "0px",
        "--spotlight-opacity": "0"
      }}
      {...props}
    >
      {/* Dynamic Cursor-Tracking Ambient Spotlight Overlay via CSS variables */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 ease-out z-10"
        style={{
          opacity: "var(--spotlight-opacity)",
          background: `radial-gradient(${radius}px circle at var(--mouse-x) var(--mouse-y), ${spotlightColor}, transparent 80%)`
        }}
        aria-hidden="true"
      />

      {/* Card Content Layer */}
      <div className="relative z-20 h-full w-full">{children}</div>
    </Component>
  );
}
