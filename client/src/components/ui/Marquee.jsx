import React from "react";

/**
 * 21st.dev Marquee
 * Ultra-smooth infinite marquee ticker with pause-on-hover and edge fade gradients.
 */
export default function Marquee({
  children,
  className = "",
  reverse = false,
  pauseOnHover = true,
  duration = 32,
  fadeEdges = true,
  fadeWidth = "w-20 md:w-32",
  gap = "gap-6",
  ...props
}) {
  return (
    <div
      className={`relative w-full overflow-hidden ${className}`}
      style={{ "--marquee-duration": `${duration}s` }}
      {...props}
    >
      {/* Left Fade Gradient Mask */}
      {fadeEdges && (
        <div
          className={`pointer-events-none absolute left-0 top-0 bottom-0 z-10 ${fadeWidth} bg-gradient-to-r from-ivory to-transparent`}
          aria-hidden="true"
        />
      )}

      {/* Marquee Content Track */}
      <div
        className={`${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        } ${pauseOnHover ? "pause-on-hover" : ""} ${gap} py-1`}
      >
        {/* Set 1 */}
        <div className={`flex shrink-0 items-center ${gap}`}>
          {children}
        </div>
        {/* Set 2 (for seamless loop) */}
        <div className={`flex shrink-0 items-center ${gap}`} aria-hidden="true">
          {children}
        </div>
      </div>

      {/* Right Fade Gradient Mask */}
      {fadeEdges && (
        <div
          className={`pointer-events-none absolute right-0 top-0 bottom-0 z-10 ${fadeWidth} bg-gradient-to-l from-ivory to-transparent`}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
