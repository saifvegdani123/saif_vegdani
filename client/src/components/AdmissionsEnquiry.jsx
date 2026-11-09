import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Mail, Send, CheckCircle2, AlertTriangle, Clock, Sparkles, ExternalLink, RefreshCw, MapPin, Phone, Navigation } from "lucide-react";
import { getFormSubmissionWhatsAppUrl, getFormSubmissionEmailUrl, createWhatsAppUrl } from "../utils/whatsapp";
import { GOOGLE_MAPS_URL } from "../data/reviews";
import logoImg from "../assets/logo.png";

gsap.registerPlugin(ScrollTrigger);

export default function AdmissionsEnquiry() {
  const sectionRef = useRef(null);
  const leftColRef = useRef(null);
  const rightColRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(leftColRef.current, {
        opacity: 0,
        x: -25,
        duration: 0.85,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      });

      gsap.from(rightColRef.current, {
        opacity: 0,
        x: 25,
        duration: 0.85,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const [formData, setFormData] = useState({
    parentName: "",
    studentName: "",
    standard: "Std 10",
    board: "GSEB",
    phoneNumber: "",
    preferredContact: "WhatsApp",
    message: ""
  });

  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [submissionError, setSubmissionError] = useState("");
  const [submittedData, setSubmittedData] = useState(null);
  const [hasShakeError, setHasShakeError] = useState(false);

  const handleStandardChange = (e) => {
    const val = e.target.value;
    let updatedBoard = formData.board;

    if (["Std 9", "Std 10", "Std 11", "Std 12"].includes(val)) {
      updatedBoard = "GSEB";
    }

    setFormData({
      ...formData,
      standard: val,
      board: updatedBoard
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmissionError("");
    setHasShakeError(false);

    // Validate parent / guardian name
    const pName = formData.parentName.trim();
    if (!pName || pName.length < 2) {
      setSubmissionError("Please provide the parent or guardian's full name (at least 2 characters).");
      setHasShakeError(true);
      return;
    }

    // Validate student name
    const sName = formData.studentName.trim();
    if (!sName || sName.length < 2) {
      setSubmissionError("Please provide the student's full name (at least 2 characters).");
      setHasShakeError(true);
      return;
    }

    // Strict 10-digit Indian mobile validation: starts with 6, 7, 8, or 9
    const cleanPhone = formData.phoneNumber.replace(/[^0-9]/g, "");
    const indianPhoneRegex = /^[6-9]\d{9}$/;
    if (!indianPhoneRegex.test(cleanPhone)) {
      setSubmissionError("Please provide a valid 10-digit Indian mobile number (starting with 6, 7, 8, or 9).");
      setHasShakeError(true);
      return;
    }

    // Enforce academic rules: Standards 9-12 are GSEB
    let finalBoard = formData.board;
    if (["Std 9", "Std 10", "Std 11", "Std 12"].includes(formData.standard)) {
      finalBoard = "GSEB";
    }

    const payload = {
      parentName: pName,
      studentName: sName,
      standard: formData.standard,
      board: finalBoard,
      phoneNumber: cleanPhone,
      preferredContact: formData.preferredContact,
      message: formData.message.trim()
    };

    setSubmittedData(payload);
    setSubmissionSuccess(true);
  };

  const directWhatsAppUrl = createWhatsAppUrl(
    "Hello Saif Sir, I would like to speak directly regarding admission to tuition classes for Standards 3–12."
  );

  return (
    <section
      ref={sectionRef}
      id="admissions"
      className="py-10 sm:py-16 bg-ivory border-b border-border-soft"
      aria-label="Admissions Consultation Desk"
    >
      <div className="site-container">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <div className="eyebrow-badge mb-3">
            <Sparkles className="w-3.5 h-3.5 text-gold-dark shrink-0" />
            <span>09 / ADMISSION CONSULTATION</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-charcoal tracking-tight mb-3">
            Let&apos;s Find the Right{" "}
            <span className="font-serif italic font-normal text-gold-dark">
              Learning Path.
            </span>
          </h2>

          <p className="text-sm sm:text-base text-charcoal-muted leading-relaxed font-normal mx-auto max-w-2xl">
            Every child has unique learning needs. Share your details and Saif Sir will assess
            the appropriate curriculum division, batch timing, and foundational focus.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Context & Direct Contact Information (5 cols) */}
          <div ref={leftColRef} className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="bg-surface-pure rounded-2xl border border-border-soft p-5 sm:p-7 shadow-xs">
              {/* Educator Consultation Header with Portrait */}
              <div className="flex items-center gap-4 pb-5 mb-5 border-b border-border-soft">
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border border-gold/40 shadow-sm shrink-0 bg-midnight/5">
                  <img
                    src="/images/05_thoughtful_portrait.png"
                    alt="Saif Barkat Vegdani - Academic Consultation Advisor"
                    className="w-full h-full object-cover object-top"
                    width={80}
                    height={80}
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 border border-gold/30 rounded-2xl pointer-events-none" />
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-gold-dark font-mono block">
                    Principal Faculty Advisor
                  </span>
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-charcoal tracking-tight">
                    Saif Barkat Vegdani
                  </h3>
                  <p className="text-xs text-charcoal-muted mt-0.5 font-medium">
                    B.Com, B.Ed · 9 Years Verified Record
                  </p>
                </div>
              </div>

              <h4 className="font-serif text-base sm:text-lg font-bold text-charcoal tracking-tight mb-2">
                Direct Educator Consultation
              </h4>

              <p className="text-xs sm:text-sm text-charcoal-muted mb-5 leading-relaxed font-normal">
                No administrative sales representatives or intermediaries. You speak directly with the
                principal educator who will guide your child across standards and batch slots.
              </p>

              {/* Consultation Details List */}
              <div className="space-y-3.5">
                <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-ivory-light border border-border-soft">
                  <div className="w-9 h-9 rounded-full bg-surface-pure border border-gold/40 flex items-center justify-center text-gold-dark shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-charcoal uppercase tracking-wider font-mono">
                      Confirmed Evening Window
                    </h4>
                    <p className="text-sm text-charcoal mt-0.5 font-medium">
                      4:30 PM – 8:00 PM (Monday to Saturday)
                    </p>
                    <span className="text-xs text-charcoal-muted block mt-0.5 font-normal">
                      Standard-wise slots tailored upon discussion
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-ivory-light border border-border-soft">
                  <div className="w-9 h-9 rounded-full bg-surface-pure border border-gold/40 flex items-center justify-center text-gold-dark shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-charcoal uppercase tracking-wider font-mono">
                      Direct Accountability
                    </h4>
                    <p className="text-sm text-charcoal mt-0.5 font-medium">
                      Zero Substitute Teachers
                    </p>
                    <span className="text-xs text-charcoal-muted block mt-0.5 font-normal">
                      Direct phone &amp; classroom instruction by Saif Sir
                    </span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-ivory-light border border-border-soft space-y-2.5">
                  <div className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-full bg-surface-pure border border-gold/40 flex items-center justify-center text-gold-dark shrink-0 mt-0.5">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-charcoal uppercase tracking-wider font-mono">
                        Academy Location
                      </h4>
                      <p className="text-xs sm:text-sm text-charcoal mt-0.5 font-medium leading-snug">
                        Gulistan Nagar Society, 16, Old Olpad Road, near Hanuman Tekri Road, Rander, Surat, Gujarat 395005
                      </p>
                      <span className="text-[11px] text-charcoal-muted block mt-1 font-normal">
                        Centrally accessible for GSEB &amp; CBSE students across Rander, Adajan &amp; Surat
                      </span>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-border-soft/60 flex flex-wrap gap-2">
                    <a
                      href={GOOGLE_MAPS_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-pure border border-gold/40 text-gold-dark hover:text-midnight hover:bg-gold/15 text-[11px] font-semibold transition-colors"
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      <span>Get Directions on Google Maps</span>
                    </a>
                    <a
                      href="tel:+917862943917"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-pure border border-border-soft text-charcoal hover:text-gold-dark text-[11px] font-semibold transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5 text-gold-dark" />
                      <span>Call: 078629 43917</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick WhatsApp Alternative Card */}
            <div className="p-6 rounded-2xl bg-midnight text-white border border-midnight-subtle shadow-lg relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent opacity-70" />

              <div className="flex items-center gap-3 mb-3">
                <img
                  src={logoImg}
                  alt="S.V Tutorials"
                  className="w-9 h-9 rounded-xl object-contain bg-midnight border border-gold/40 p-0.5 shrink-0 shadow-xs"
                  width={36}
                  height={36}
                />
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-gold block font-mono">
                    S.V Tutorials
                  </span>
                  <h4 className="font-serif text-base font-bold text-white">
                    Direct Admission Desk
                  </h4>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-white/75 mb-4 leading-relaxed font-normal">
                Prefer immediate answers regarding batch seats, syllabus, and enrolment? Connect
                directly with Saif Sir on WhatsApp.
              </p>
              <a
                href={directWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full min-h-[48px] py-3 px-5 rounded-full bg-gold hover:bg-gold-light text-midnight font-bold text-xs uppercase tracking-wider transition-all shadow-sm"
              >
                <MessageCircle className="w-4 h-4 shrink-0" />
                <span>Open WhatsApp Chat</span>
              </a>
            </div>
          </div>

          {/* Right Column: Admission Form with 16px font inputs (7 cols) */}
          <div ref={rightColRef} className="lg:col-span-7">
            <div className="bg-surface-pure rounded-2xl border border-border-soft p-6 sm:p-8 lg:p-10 shadow-xs relative">
              <div className="mb-6 pb-4 border-b border-border-soft">
                <span className="text-xs font-bold uppercase tracking-[0.14em] text-gold-dark font-mono block mb-1">
                  Enrolment Consultation
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-charcoal font-bold tracking-tight">
                  Reserve a Consultation Slot
                </h3>
                <p className="text-xs sm:text-sm text-charcoal-muted mt-1 leading-relaxed font-normal">
                  Submit the student details below. Saif Sir will personally review and contact you within 24 operational hours.
                </p>
              </div>

              {/* Submission Error Banner */}
              <AnimatePresence>
                {submissionError && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      x: hasShakeError ? [-6, 6, -4, 4, -2, 2, 0] : 0
                    }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.4 }}
                    className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm flex items-start gap-3"
                  >
                    <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="font-medium">{submissionError}</p>
                      <a
                        href={directWhatsAppUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 mt-2 text-xs font-bold text-midnight underline hover:text-gold-dark"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Connect via WhatsApp Instead</span>
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Form or Direct Dispatch State */}
              <AnimatePresence mode="wait">
                {submissionSuccess && submittedData ? (
                  <motion.div
                    key="dispatch-screen"
                    initial={{ opacity: 0, y: 12, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="p-6 sm:p-8 rounded-2xl bg-ivory-light border border-gold/40 text-center"
                  >
                    {/* Status Badge */}
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold/15 border border-gold/40 text-gold-dark text-xs font-mono font-bold uppercase tracking-wider mb-4">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Details Validated &amp; Ready to Send</span>
                    </div>

                    <h4 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal mb-2 tracking-tight">
                      Choose Your Preferred Channel
                    </h4>
                    <p className="text-xs sm:text-sm text-charcoal-muted max-w-lg mx-auto mb-6 leading-relaxed font-normal">
                      Your admission enquiry has been formatted. Choose WhatsApp or Email below to deliver it directly to Saif Sir.
                    </p>

                    {/* Structured Summary Card */}
                    <div className="bg-surface-pure p-5 rounded-xl border border-border-soft max-w-lg mx-auto text-left text-xs sm:text-sm mb-6 space-y-2.5 shadow-2xs">
                      <div className="text-[11px] font-mono uppercase tracking-wider text-gold-dark font-bold border-b border-border-soft pb-1.5 flex items-center justify-between">
                        <span>Enquiry Summary</span>
                        <span className="text-charcoal-muted font-normal">Personal Educator Review</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-charcoal">
                        <div>
                          <span className="text-charcoal-muted text-xs block">Student Name</span>
                          <strong className="text-sm font-semibold">{submittedData.studentName}</strong>
                        </div>
                        <div>
                          <span className="text-charcoal-muted text-xs block">Parent / Guardian</span>
                          <strong className="text-sm font-semibold">{submittedData.parentName}</strong>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 border-t border-border-soft/60 text-charcoal">
                        <div>
                          <span className="text-charcoal-muted text-xs block">Standard &amp; Board</span>
                          <strong className="text-sm font-semibold">{submittedData.standard} ({submittedData.board})</strong>
                        </div>
                        <div>
                          <span className="text-charcoal-muted text-xs block">Contact Phone</span>
                          <strong className="text-sm font-semibold font-mono">+91 {submittedData.phoneNumber}</strong>
                        </div>
                      </div>

                      {submittedData.message && (
                        <div className="pt-2 border-t border-border-soft/60 text-charcoal">
                          <span className="text-charcoal-muted text-xs block">Academic Notes</span>
                          <p className="text-xs text-charcoal mt-0.5 italic">&ldquo;{submittedData.message}&rdquo;</p>
                        </div>
                      )}
                    </div>

                    {/* Primary Channel Actions */}
                    <div className="space-y-3 max-w-lg mx-auto">
                      {/* WhatsApp Option */}
                      <a
                        href={getFormSubmissionWhatsAppUrl(submittedData)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center justify-between w-full min-h-[52px] p-3.5 sm:px-5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition-all shadow-sm hover:shadow-md"
                      >
                        <div className="flex items-center gap-3 text-left">
                          <div className="w-9 h-9 rounded-lg bg-white/20 flex items-center justify-center shrink-0">
                            <MessageCircle className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <span className="text-xs sm:text-sm font-bold block tracking-wide">
                              Send via WhatsApp (Instant Reply)
                            </span>
                            <span className="text-[11px] text-white/80 font-normal block">
                              Opens WhatsApp with pre-filled message for Saif Sir
                            </span>
                          </div>
                        </div>
                        <ExternalLink className="w-4 h-4 text-white/80 shrink-0 ml-2 group-hover:translate-x-0.5 transition-transform" />
                      </a>

                      {/* Email Option */}
                      <a
                        href={getFormSubmissionEmailUrl(submittedData)}
                        className="group flex items-center justify-between w-full min-h-[52px] p-3.5 sm:px-5 rounded-xl bg-surface-pure hover:bg-ivory border-2 border-gold/60 text-charcoal hover:border-gold transition-all shadow-2xs hover:shadow-sm"
                      >
                        <div className="flex items-center gap-3 text-left">
                          <div className="w-9 h-9 rounded-lg bg-gold/15 flex items-center justify-center shrink-0 text-gold-dark">
                            <Mail className="w-5 h-5" />
                          </div>
                          <div>
                            <span className="text-xs sm:text-sm font-bold block text-charcoal tracking-wide">
                              Send via Email (Official Record)
                            </span>
                            <span className="text-[11px] text-charcoal-muted font-normal block">
                              Opens your default email app addressed to Saif Sir
                            </span>
                          </div>
                        </div>
                        <ExternalLink className="w-4 h-4 text-gold-dark shrink-0 ml-2 group-hover:translate-x-0.5 transition-transform" />
                      </a>
                    </div>

                    {/* Clear Instructions */}
                    <div className="mt-5 p-3 rounded-xl bg-gold/10 border border-gold/20 max-w-lg mx-auto text-center">
                      <p className="text-[11px] sm:text-xs text-charcoal leading-relaxed font-normal">
                        <span className="font-semibold text-gold-dark font-mono uppercase mr-1">Instructions:</span>
                        Clicking either button opens WhatsApp or your email client with your message pre-written.
                        Please tap <strong>&ldquo;Send&rdquo;</strong> inside your app to complete your enquiry.
                      </p>
                    </div>

                    {/* Reset Button */}
                    <div className="mt-5 pt-4 border-t border-border-soft flex items-center justify-center">
                      <button
                        type="button"
                        onClick={() => {
                          setSubmissionSuccess(false);
                        }}
                        className="inline-flex items-center gap-2 text-xs font-semibold text-charcoal-muted hover:text-charcoal underline underline-offset-4 transition-colors cursor-pointer"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>Edit details or submit another enquiry</span>
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Parent's Name */}
                      <div>
                        <label
                          htmlFor="parentName"
                          className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-1.5 font-mono"
                        >
                          Parent / Guardian Name <span className="text-gold-dark">*</span>
                        </label>
                        <input
                          type="text"
                          id="parentName"
                          name="parentName"
                          required
                          autoComplete="name"
                          value={formData.parentName}
                          onChange={handleChange}
                          placeholder="e.g. Ramesh Patel"
                          className="w-full min-h-[48px] px-4 py-2.5 rounded-xl bg-ivory border border-border-soft text-base text-charcoal placeholder:text-charcoal-muted/50 focus:bg-surface-pure focus:outline-none focus:border-gold transition-colors"
                        />
                      </div>

                      {/* Student's Name */}
                      <div>
                        <label
                          htmlFor="studentName"
                          className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-1.5 font-mono"
                        >
                          Student Name <span className="text-gold-dark">*</span>
                        </label>
                        <input
                          type="text"
                          id="studentName"
                          name="studentName"
                          required
                          autoComplete="off"
                          value={formData.studentName}
                          onChange={handleChange}
                          placeholder="e.g. Aryan Patel"
                          className="w-full min-h-[48px] px-4 py-2.5 rounded-xl bg-ivory border border-border-soft text-base text-charcoal placeholder:text-charcoal-muted/50 focus:bg-surface-pure focus:outline-none focus:border-gold transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Standard Selection */}
                      <div>
                        <label
                          htmlFor="standard"
                          className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-1.5 font-mono"
                        >
                          Standard / Class <span className="text-gold-dark">*</span>
                        </label>
                        <select
                          id="standard"
                          name="standard"
                          value={formData.standard}
                          onChange={handleStandardChange}
                          className="w-full min-h-[48px] px-4 py-2.5 rounded-xl bg-ivory border border-border-soft text-base text-charcoal focus:bg-surface-pure focus:outline-none focus:border-gold transition-colors cursor-pointer"
                        >
                          <option value="Std 3">Standard 3 (Primary)</option>
                          <option value="Std 4">Standard 4 (Primary)</option>
                          <option value="Std 5">Standard 5 (Primary)</option>
                          <option value="Std 6">Standard 6 (Middle)</option>
                          <option value="Std 7">Standard 7 (Middle)</option>
                          <option value="Std 8">Standard 8 (Middle)</option>
                          <option value="Std 9">Standard 9 (Secondary - GSEB)</option>
                          <option value="Std 10">Standard 10 (Board - GSEB)</option>
                          <option value="Std 11">Standard 11 (Commerce)</option>
                          <option value="Std 12">Standard 12 (Commerce Board)</option>
                        </select>
                      </div>

                      {/* Board Selection */}
                      <div>
                        <label
                          htmlFor="board"
                          className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-1.5 font-mono"
                        >
                          Curriculum Board <span className="text-gold-dark">*</span>
                        </label>
                        <select
                          id="board"
                          name="board"
                          value={formData.board}
                          onChange={handleChange}
                          disabled={["Std 9", "Std 10", "Std 11", "Std 12"].includes(formData.standard)}
                          className={`w-full min-h-[48px] px-4 py-2.5 rounded-xl bg-ivory border border-border-soft text-base text-charcoal focus:bg-surface-pure focus:outline-none focus:border-gold transition-colors ${
                            ["Std 9", "Std 10", "Std 11", "Std 12"].includes(formData.standard)
                              ? "opacity-60 cursor-not-allowed"
                              : "cursor-pointer"
                          }`}
                        >
                          <option value="GSEB">Gujarat State Board (GSEB)</option>
                          <option value="CBSE">Central Board (CBSE)</option>
                        </select>
                        {["Std 9", "Std 10"].includes(formData.standard) && (
                          <span className="text-xs text-charcoal-muted mt-1 block">
                            * Standards 9–10 are exclusively GSEB
                          </span>
                        )}
                        {["Std 11", "Std 12"].includes(formData.standard) && (
                          <span className="text-xs text-charcoal-muted mt-1 block">
                            * Higher Secondary Commerce Stream
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Phone Number */}
                      <div>
                        <label
                          htmlFor="phoneNumber"
                          className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-1.5 font-mono"
                        >
                          Mobile / WhatsApp Number <span className="text-gold-dark">*</span>
                        </label>
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-charcoal-muted">
                            +91
                          </span>
                          <input
                            type="tel"
                            id="phoneNumber"
                            name="phoneNumber"
                            required
                            autoComplete="tel"
                            inputMode="numeric"
                            pattern="[6-9][0-9]{9}"
                            maxLength={10}
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            placeholder="98765 43210"
                            className="w-full min-h-[48px] pl-14 pr-4 py-2.5 rounded-xl bg-ivory border border-border-soft text-base text-charcoal placeholder:text-charcoal-muted/50 focus:bg-surface-pure focus:outline-none focus:border-gold transition-colors font-medium tracking-wide"
                          />
                        </div>
                      </div>

                      {/* Preferred Contact Mode */}
                      <div>
                        <label
                          htmlFor="preferredContact"
                          className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-1.5 font-mono"
                        >
                          Preferred Mode of Contact
                        </label>
                        <select
                          id="preferredContact"
                          name="preferredContact"
                          value={formData.preferredContact}
                          onChange={handleChange}
                          className="w-full min-h-[48px] px-4 py-2.5 rounded-xl bg-ivory border border-border-soft text-base text-charcoal focus:bg-surface-pure focus:outline-none focus:border-gold transition-colors cursor-pointer"
                        >
                          <option value="WhatsApp">WhatsApp (Recommended)</option>
                          <option value="Phone Call">Phone Call</option>
                        </select>
                      </div>
                    </div>

                    {/* Additional Notes */}
                    <div>
                      <label
                        htmlFor="message"
                        className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-1.5 font-mono"
                      >
                        Academic Notes / Specific Queries (Optional)
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={3}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Mention any specific subject difficulty, school shift timings, or previous marks..."
                        className="w-full px-4 py-3 rounded-xl bg-ivory border border-border-soft text-base text-charcoal placeholder:text-charcoal-muted/50 focus:bg-surface-pure focus:outline-none focus:border-gold transition-colors resize-none font-normal"
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        className="inline-flex items-center justify-center gap-2.5 w-full min-h-[48px] py-3.5 px-6 rounded-full bg-midnight hover:bg-midnight/90 text-gold hover:text-gold-light font-bold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-sm border border-gold/40 cursor-pointer"
                      >
                        <Send className="w-4 h-4" />
                        <span>Continue to Direct WhatsApp / Email</span>
                      </button>
                    </div>

                    <p className="text-xs text-charcoal-muted text-center pt-1 font-normal">
                      Direct educator review • No intermediaries • Connect immediately with Saif Barkat Vegdani.
                    </p>
                  </form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
