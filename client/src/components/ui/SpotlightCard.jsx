import React, { useRef, useState, useCallback } from "react";

/**
 * 21st.dev SpotlightCard
 * Premium cursor-tracking radial spotlight glow component.
 * Tracks mouse position and casts an ambient gold/champagne spotlight across the card surface.
 */
export default function SpotlightCard({
  children,
  className = "",
  spotlightColor = "rgba(198, 161, 91, 0.14)",
  radius = 350,
  as: Component = "div",
  ...props
}) {
  const cardRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  }, []);

  const handleMouseEnter = useCallback(() => {
    setOpacity(1);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setOpacity(0);
  }, []);

  return (
    <Component
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden ${className}`}
      {...props}
    >
      {/* 21st.dev Dynamic Cursor-Tracking Ambient Spotlight Overlay */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 ease-out z-10"
        style={{
          opacity,
          background: `radial-gradient(${radius}px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 80%)`
        }}
        aria-hidden="true"
      />

      {/* Card Content Layer */}
      <div className="relative z-20 h-full w-full">
        {children}
      </div>
    </Component>
  );
}
