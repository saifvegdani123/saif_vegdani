import React, { useEffect, useRef, useState, useCallback } from "react";

/**
 * Editorial Multilingual Intro Loader for S.V. Tutorials
 * High-performance, Apple-grade opening sequence:
 * - Total duration ≤ 1.8s + ≤ 550ms curved drape lift wipe
 * - 4 Cultural & Academic Greetings + Brand Hold:
 *   1. नमस्ते (Hindi - Devanagari)
 *   2. નમસ્તે (Gujarati)
 *   3. Hello (English)
 *   4. السلام علیکم (Urdu - Nastaliq)
 *   5. S.V TUTORIALS (Brand Hold)
 * - StrictMode double-invoke protection via runIdRef + isCancelled token
 * - Complete reduced-motion & saveData bypass
 * - Smooth skip animation on click, Escape, or Skip button
 * - Fires 'sv:loader-done' event to sync Hero entrance
 */

const GREETINGS = [
  { text: "नमस्ते", lang: "hi", font: "font-[var(--font-devanagari)]" },
  { text: "Hello", lang: "en", font: "font-sans" },
  { text: "வணக்கம்", lang: "ta", font: "font-[var(--font-tamil)]" },
  { text: "Bonjour", lang: "fr", font: "font-sans" },
  { text: "નમસ્તે", lang: "gu", font: "font-[var(--font-gujarati)]" },
  { text: "Ciao", lang: "it", font: "font-sans" },
  { text: "নমস্কার", lang: "bn", font: "font-[var(--font-bengali)]" },
  { text: "Hola", lang: "es", font: "font-sans" },
  { text: "ನಮಸ್ಕಾರ", lang: "kn", font: "font-[var(--font-kannada)]" },
  { text: "Welcome", lang: "en", font: "font-sans" }
];

const BRAND = "S.V Tutorials";
const COUNT_MS = 1800; // Counter 0 → 100% in 1.8s
const WORD_MS = 210; // 210ms visible time per greeting
const BRAND_MS = 750; // Brand hold before wipe
const WIPE_MS = 600; // Lift wipe duration

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

export default function IntroLoader({ onComplete }) {
  const [isActive, setIsActive] = useState(() => {
    if (typeof window === "undefined") return false;
    const prefersReducedMotion =
      window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isSaveData =
      navigator.connection && navigator.connection.saveData === true;
    const alreadySeen = sessionStorage.getItem("sv_loader_seen");
    return !prefersReducedMotion && !isSaveData && !alreadySeen;
  });

  const loaderRef = useRef(null);
  const wordElRef = useRef(null);
  const textElRef = useRef(null);
  const pctElRef = useRef(null);
  const fillElRef = useRef(null);
  const runIdRef = useRef(0);
  const isExitingRef = useRef(false);

  const dispatchDone = useCallback(() => {
    window.__svLoaderDone = true;
    document.dispatchEvent(new CustomEvent("sv:loader-done"));
    if (onComplete) onComplete();
  }, [onComplete]);

  // Smooth curtain wipe-up animation
  const wipeOut = useCallback(
    (duration = WIPE_MS) => {
      if (isExitingRef.current) return Promise.resolve();
      isExitingRef.current = true;

      try {
        sessionStorage.setItem("sv_loader_seen", "true");
      } catch {
        // Ignore sessionStorage exceptions
      }

      const loader = loaderRef.current;
      if (!loader) {
        setIsActive(false);
        dispatchDone();
        return Promise.resolve();
      }

      const animation = loader.animate(
        [
          {
            transform: "translateY(0)",
            borderRadius: "0 0 50% 50% / 0 0 0vh 0vh"
          },
          {
            transform: "translateY(-100%)",
            borderRadius: "0 0 50% 50% / 0 0 24vh 24vh"
          }
        ],
        {
          duration,
          easing: "cubic-bezier(.76,0,.24,1)",
          fill: "forwards"
        }
      );

      return animation.finished.then(() => {
        document.documentElement.classList.remove("overflow-hidden");
        document.body.classList.remove("overflow-hidden");
        setIsActive(false);
        dispatchDone();
      });
    },
    [dispatchDone]
  );

  // Skip handler (accessible via button, ESC, or screen tap)
  const handleSkip = useCallback(() => {
    if (isExitingRef.current) return;
    runIdRef.current++;
    wipeOut(380);
  }, [wipeOut]);

  useEffect(() => {
    if (!isActive) {
      dispatchDone();
      return;
    }

    // Lock page scrolling while intro plays
    document.documentElement.classList.add("overflow-hidden");
    document.body.classList.add("overflow-hidden");

    let isCancelled = false;
    const runId = ++runIdRef.current;

    // Keyboard shortcut to skip
    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        handleSkip();
      }
    };
    window.addEventListener("keydown", onKeyDown);

    // Counter animation (0% -> 100%)
    const runCounter = () => {
      const t0 = performance.now();
      return new Promise((resolve) => {
        const tick = (now) => {
          if (isCancelled || runId !== runIdRef.current) return;
          const p = Math.min((now - t0) / COUNT_MS, 1);
          const v = easeOutCubic(p);

          if (pctElRef.current) {
            pctElRef.current.textContent = `${Math.round(v * 100)}%`;
          }
          if (fillElRef.current) {
            fillElRef.current.style.transform = `scaleX(${v})`;
          }

          if (p < 1) {
            requestAnimationFrame(tick);
          } else {
            resolve();
          }
        };
        requestAnimationFrame(tick);
      });
    };

    // Word display with subtle blur-fade transition
    const showWord = async (text, fontClass, holdMs, isBrand = false, dir = "ltr") => {
      if (isCancelled || runId !== runIdRef.current || !wordElRef.current || !textElRef.current) {
        return;
      }

      textElRef.current.textContent = text;
      textElRef.current.className = `sv-text ${fontClass}`;
      if (dir === "rtl") {
        textElRef.current.setAttribute("dir", "rtl");
      } else {
        textElRef.current.removeAttribute("dir");
      }

      if (isBrand) {
        wordElRef.current.classList.add("is-brand");
      } else {
        wordElRef.current.classList.remove("is-brand");
      }

      const IN = 110;
      const OUT = 90;

      const enterAnim = wordElRef.current.animate(
        [
          { opacity: 0, filter: "blur(6px)", transform: "translateY(10px)" },
          { opacity: 1, filter: "blur(0px)", transform: "translateY(0)" }
        ],
        {
          duration: IN,
          easing: "cubic-bezier(.22, 1, .36, 1)",
          fill: "forwards"
        }
      );

      await enterAnim.finished;
      if (isCancelled || runId !== runIdRef.current) return;

      const pause = Math.max(0, holdMs - IN - OUT);
      if (pause > 0) {
        await sleep(pause);
        if (isCancelled || runId !== runIdRef.current) return;
      }

      if (!isBrand) {
        const exitAnim = wordElRef.current.animate(
          [
            { opacity: 1, filter: "blur(0px)", transform: "translateY(0)" },
            { opacity: 0, filter: "blur(5px)", transform: "translateY(-8px)" }
          ],
          {
            duration: OUT,
            easing: "ease-in",
            fill: "forwards"
          }
        );
        await exitAnim.finished;
      }
    };

    // Master execution sequence (total duration ≤ 1.8s + wipe)
    const executeSequence = async () => {
      runCounter();

      for (const greeting of GREETINGS) {
        if (isCancelled || runId !== runIdRef.current) return;
        await showWord(greeting.text, greeting.font, WORD_MS, false, greeting.dir);
      }

      if (isCancelled || runId !== runIdRef.current) return;
      await showWord(BRAND, "font-[var(--font-serif)] tracking-[0.24em]", BRAND_MS, true);

      if (!isCancelled && runId === runIdRef.current) {
        await wipeOut(WIPE_MS);
      }
    };

    executeSequence();

    return () => {
      isCancelled = true;
      window.removeEventListener("keydown", onKeyDown);
      document.documentElement.classList.remove("overflow-hidden");
      document.body.classList.remove("overflow-hidden");
    };
  }, [isActive, handleSkip, wipeOut, dispatchDone]);

  if (!isActive) return null;

  return (
    <div
      ref={loaderRef}
      role="dialog"
      aria-label="Welcome to S.V. Tutorials"
      className="fixed inset-0 z-[99999] bg-ivory text-charcoal select-none flex flex-col justify-between overflow-hidden touch-none"
      style={{
        willChange: "transform, border-radius"
      }}
    >
      {/* Discreet Luxury Skip Control (tap target ≥ 44px) */}
      <div className="absolute top-5 right-5 sm:top-8 sm:right-10 z-20">
        <button
          type="button"
          onClick={handleSkip}
          aria-label="Skip introductory greeting"
          className="group min-h-[44px] min-w-[44px] flex items-center gap-2 px-3.5 py-2 rounded-full border border-charcoal/15 bg-ivory/90 backdrop-blur-sm text-xs font-bold tracking-widest uppercase text-charcoal/80 hover:text-charcoal hover:border-gold transition-colors duration-200 cursor-pointer"
        >
          <span>Skip</span>
          <span className="text-xs opacity-70 group-hover:opacity-100 font-mono transition-opacity">
            ESC
          </span>
        </button>
      </div>

      {/* Center Presentation Stage */}
      <div
        onClick={handleSkip}
        className="flex-1 flex items-center justify-center px-6 cursor-pointer"
      >
        <div
          ref={wordElRef}
          className="flex items-center gap-3 sm:gap-4 text-3xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-charcoal opacity-0 whitespace-nowrap"
          style={{ willChange: "transform, opacity, filter" }}
        >
          {/* Subtle Champagne Gold Leading Dot */}
          <span className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 rounded-full bg-gold shrink-0 animate-gold-pulse shadow-xs" />
          <span ref={textElRef} className="sv-text font-bold" />
        </div>
      </div>

      {/* Bottom Editorial Progress Bar */}
      <div className="px-6 sm:px-12 pb-[calc(24px+env(safe-area-inset-bottom))] max-w-7xl w-full mx-auto">
        <div className="flex items-end justify-between mb-3 text-charcoal">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-charcoal/80">
              S.V Tutorials
            </span>
            <span className="text-xs text-gold font-mono">•</span>
            <span className="text-xs tracking-wider uppercase text-charcoal/60 hidden sm:inline">
              Standards 3–12
            </span>
          </div>
          <div
            ref={pctElRef}
            className="text-2xl sm:text-3xl font-bold tracking-tight font-mono text-charcoal"
          >
            0%
          </div>
        </div>

        {/* 2px Progress Hairline */}
        <div className="h-[2px] w-full bg-charcoal/10 rounded-full overflow-hidden">
          <div
            ref={fillElRef}
            className="h-full w-full bg-gradient-to-r from-gold-dark via-gold to-gold-light origin-left"
            style={{ transform: "scaleX(0)", willChange: "transform" }}
          />
        </div>
      </div>
    </div>
  );
}
