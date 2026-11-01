import React, { useId } from "react";
import { motion } from "framer-motion";

/**
 * BorderBeam
 * An animated, glowing subtle border beam that orbits smoothly around containers.
 * Uses unique SVG IDs and respects reduced motion.
 */
export default function BorderBeam({
  className = "",
  duration = 8,
  delay = 0,
  borderWidth = 1.5,
  radius = 28,
  color = "#C6A15B",
  glowColor = "rgba(198, 161, 91, 0.45)",
  dashLength = 100,
  gapLength = 340
}) {
  const uniqueId = useId().replace(/:/g, "_");
  const gradId = `goldBeamGrad_${uniqueId}`;
  const glowId = `beamGlow_${uniqueId}`;

  const isReducedMotion = typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <div
      className={`pointer-events-none absolute inset-0 z-20 overflow-hidden rounded-[inherit] ${className}`}
      aria-hidden="true"
    >
      <svg
        className="absolute inset-0 h-full w-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#775A1A" stopOpacity="0.2" />
            <stop offset="50%" stopColor={color} stopOpacity="1" />
            <stop offset="100%" stopColor="#E8D19A" stopOpacity="0.8" />
          </linearGradient>
          <filter id={glowId}>
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Ambient Halo */}
        {!isReducedMotion && (
          <motion.rect
            x={borderWidth / 2}
            y={borderWidth / 2}
            width={`calc(100% - ${borderWidth}px)`}
            height={`calc(100% - ${borderWidth}px)`}
            rx={radius}
            fill="none"
            stroke={glowColor}
            strokeWidth={borderWidth * 1.8}
            strokeDasharray={`${dashLength} ${gapLength}`}
            strokeLinecap="round"
            filter={`url(#${glowId})`}
            animate={{
              strokeDashoffset: [0, -(dashLength + gapLength)]
            }}
            transition={{
              duration,
              repeat: Infinity,
              ease: "linear",
              delay
            }}
          />
        )}

        {/* Crisp Laser Sharp Core */}
        <motion.rect
          x={borderWidth / 2}
          y={borderWidth / 2}
          width={`calc(100% - ${borderWidth}px)`}
          height={`calc(100% - ${borderWidth}px)`}
          rx={radius}
          fill="none"
          stroke={`url(#${gradId})`}
          strokeWidth={borderWidth}
          strokeDasharray={`${dashLength} ${gapLength}`}
          strokeLinecap="round"
          animate={isReducedMotion ? {} : {
            strokeDashoffset: [0, -(dashLength + gapLength)]
          }}
          transition={{
            duration,
            repeat: Infinity,
            ease: "linear",
            delay
          }}
        />
      </svg>
    </div>
  );
}
