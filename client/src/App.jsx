import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useScroll, useSpring } from "framer-motion";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import AcademicMarquee from "./components/AcademicMarquee";
import TrustCredentials from "./components/TrustCredentials";
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

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    // Refresh ScrollTrigger calculations after initial layout pass
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="min-h-screen bg-ivory text-charcoal font-sans antialiased flex flex-col selection:bg-gold/25 selection:text-midnight">
      {/* Editorial Champagne Gold Scroll Progress Indicator */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-gold-dark via-gold to-gold-light origin-left z-[60] pointer-events-none"
      />

      {/* Skip to Content for Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 px-4 py-2 bg-midnight text-gold border border-gold rounded-full font-bold text-xs uppercase"
      >
        Skip to main content
      </a>

      {/* Primary Navigation */}
      <Navbar />

      {/* Main Experience Body */}
      <main id="main-content" className="flex-grow">
        <Hero />
        <AcademicMarquee />
        <TrustCredentials />
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

      {/* Persistent WhatsApp Floating Desk */}
      <WhatsAppFloating />
    </div>
  );
}
