import React, { useEffect, useRef } from "react";

/**
 * World-Class Custom Cursor for S.V. Tutorials
 * - Small champagne-gold central dot with smooth outer circular follower
 * - 60-120fps requestAnimationFrame with buttery lerp (linear interpolation)
 * - 0 React state re-renders during mouse move (pure DOM transform)
 * - Automatically expands and highlights over links, buttons, and interactive elements
 * - Completely inert and hidden on touch/coarse devices and reduced motion
 */
export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    // Check for fine pointer (mouse/trackpad only, NOT mobile or tablet touch)
    if (typeof window === "undefined") return;
    const isFinePointer = window.matchMedia && window.matchMedia("(pointer: fine)").matches;
    const prefersReducedMotion =
      window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!isFinePointer || prefersReducedMotion) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let isHovering = false;
    let isClicking = false;
    let isVisible = false;
    let rafId = null;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible) {
        isVisible = true;
        dot.style.opacity = "1";
        ring.style.opacity = "1";
      }

      // Check for interactive targets
      const target = e.target;
      if (target && target.closest) {
        const interactive = target.closest(
          "a, button, input, select, textarea, [role='button'], [data-cursor], .cursor-pointer"
        );
        isHovering = !!interactive;
      }
    };

    const onMouseDown = () => {
      isClicking = true;
    };

    const onMouseUp = () => {
      isClicking = false;
    };

    const onMouseLeave = () => {
      isVisible = false;
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    };

    const onMouseEnter = () => {
      isVisible = true;
      dot.style.opacity = "1";
      ring.style.opacity = "1";
    };

    // Render loop with lerp (linear interpolation)
    const render = () => {
      // Lerp for outer ring (0.16 factor produces a soft, luxurious trailing delay)
      ringX += (mouseX - ringX) * 0.16;
      ringY += (mouseY - ringY) * 0.16;

      const ringScale = isClicking ? 0.85 : isHovering ? 1.75 : 1;
      const dotScale = isClicking ? 0.7 : isHovering ? 0.5 : 1;

      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%) scale(${dotScale})`;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%) scale(${ringScale})`;

      if (isHovering) {
        ring.style.borderColor = "#C6A15B";
        ring.style.backgroundColor = "rgba(198, 161, 91, 0.12)";
      } else {
        ring.style.borderColor = "rgba(198, 161, 91, 0.45)";
        ring.style.backgroundColor = "transparent";
      }

      rafId = requestAnimationFrame(render);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown, { passive: true });
    window.addEventListener("mouseup", onMouseUp, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave, { passive: true });
    document.addEventListener("mouseenter", onMouseEnter, { passive: true });

    rafId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden select-none hidden md:block">
      {/* Outer Luxury Circular Follower */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-gold/45 pointer-events-none transition-[border-color,background-color] duration-200 opacity-0 will-change-transform"
        style={{
          boxShadow: "0 0 12px rgba(198, 161, 91, 0.15)"
        }}
      />

      {/* Central Precision Champagne Gold Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-gold pointer-events-none opacity-0 will-change-transform"
        style={{
          boxShadow: "0 0 6px rgba(198, 161, 91, 0.6)"
        }}
      />
    </div>
  );
}

