import React, { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useScroll, useSpring } from "framer-motion";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import AcademicMarquee from "./components/AcademicMarquee";
import TrustCredentials from "./components/TrustCredentials";
import TopPerformers from "./components/TopPerformers";
import ProgramsSection from "./components/ProgramsSection";
import CurriculumDiagnostic from "./components/CurriculumDiagnostic";
import TeachingPhilosophy from "./components/TeachingPhilosophy";
import TeacherProfile from "./components/TeacherProfile";
import BatchTimings from "./components/BatchTimings";
import ClassroomGallery from "./components/ClassroomGallery";
import AdmissionsEnquiry from "./components/AdmissionsEnquiry";
import FAQSection from "./components/FAQSection";
import Footer from "./components/Footer";
import WhatsAppFloating from "./components/WhatsAppFloating";
import CustomCursor from "./components/ui/CustomCursor";
import IntroLoader from "./components/ui/IntroLoader";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 32,
    restDelta: 0.001
  });

  useEffect(() => {
    // Respect prefers-reduced-motion for inertial scroll
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) return;

    // Initialize Lenis smooth inertial scrolling
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.2
    });

    lenis.on("scroll", ScrollTrigger.update);

    const rafCallback = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(rafCallback);
    gsap.ticker.lagSmoothing(0);

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    return () => {
      clearTimeout(timer);
      lenis.destroy();
      gsap.ticker.remove(rafCallback);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="min-h-screen bg-ivory text-charcoal font-sans antialiased flex flex-col selection:bg-gold/25 selection:text-midnight relative">
      {/* Editorial Multilingual Opening Loader with StrictMode Double-Invoke Protection */}
      <IntroLoader />

      {/* Subtle Custom Desktop Cursor Glow (Inert on touch) */}
      <CustomCursor />

      {/* Fine Editorial Champagne Gold Scroll Progress Indicator */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-gold-dark via-gold to-gold-light origin-left z-[70] pointer-events-none"
      />

      {/* Skip to Main Content Landmark */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-[90] px-4 py-2 bg-midnight text-gold border border-gold rounded-full font-bold text-xs uppercase shadow-xl"
      >
        Skip to main content
      </a>

      {/* Primary Sticky Header */}
      <Navbar />

      {/* Main Experience Body */}
      <main id="main-content" className="flex-grow">
        <Hero />
        <AcademicMarquee />
        <TrustCredentials />
        <TopPerformers />
        <ProgramsSection />
        <CurriculumDiagnostic />
        <TeachingPhilosophy />
        <TeacherProfile />
        <BatchTimings />
        <ClassroomGallery />
        <AdmissionsEnquiry />
        <FAQSection />
      </main>

      {/* Institutional Footer */}
      <Footer />

      {/* Persistent Floating WhatsApp Desk Action */}
      <WhatsAppFloating />
    </div>
  );
}
