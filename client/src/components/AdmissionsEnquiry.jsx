import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Send, CheckCircle2, AlertTriangle, Clock, Loader2 } from "lucide-react";
import { getFormSubmissionWhatsAppUrl, createWhatsAppUrl } from "../utils/whatsapp";
import saifDeskImg from "../assets/saif-vegdani-desk.jpg";
import logoImg from "../assets/logo.png";
import SpotlightCard from "./ui/SpotlightCard";

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

  const [isSubmitting, setIsSubmitting] = useState(false);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmissionError("");
    setHasShakeError(false);

    // Phone validation
    const cleanPhone = formData.phoneNumber.replace(/[^0-9]/g, "");
    if (cleanPhone.length < 10) {
      setSubmissionError("Please provide a valid 10-digit WhatsApp or mobile number.");
      setHasShakeError(true);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          parentName: formData.parentName,
          studentName: formData.studentName,
          standard: formData.standard,
          board: formData.board,
          phoneNumber: formData.phoneNumber,
          preferredContact: formData.preferredContact,
          message: formData.message
        })
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmissionSuccess(true);
        setSubmittedData({ ...formData });
        setFormData({
          parentName: "",
          studentName: "",
          standard: "Std 10",
          board: "GSEB",
          phoneNumber: "",
          preferredContact: "WhatsApp",
          message: ""
        });
      } else {
        const errorMsg =
          result.errors && result.errors.length > 0
            ? result.errors.join(", ")
            : result.message || "Failed to submit enquiry. Please try again.";
        setSubmissionError(errorMsg);
        setHasShakeError(true);
      }
    } catch (err) {
      console.warn("Direct API call encountered network error:", err);
      setSubmissionError(
        "Direct server connection is currently unavailable. You can connect immediately with Saif Sir via WhatsApp below."
      );
      setHasShakeError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const directWhatsAppUrl = createWhatsAppUrl(
    "Hello Saif Sir, I would like to speak directly regarding admission to tuition classes for Standards 3–12."
  );

  return (
    <section
      ref={sectionRef}
      id="admissions"
      className="py-20 lg:py-28 bg-ivory border-b border-border-soft"
      aria-label="Admissions Consultation Desk"
    >
      <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Eyebrow */}
        <div className="flex items-center justify-between mb-8 pb-3 border-b border-border-soft/60">
          <span className="text-[10.5px] font-mono font-bold tracking-[0.22em] text-gold-dark uppercase">
            09 / ADMISSION CONSULTATION
          </span>
          <span className="text-[11px] font-sans text-charcoal-muted font-medium">
            Direct Parent Communication
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Left Column: Context & Contact Information (5 cols) */}
          <div ref={leftColRef} className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-[44px] text-charcoal font-bold tracking-tight mb-4 leading-tight">
                Let's Find the Right Learning Path.
              </h2>

              <p className="text-xs sm:text-sm text-charcoal-muted mb-8 leading-relaxed font-normal">
                Every child has unique learning needs. Share your details and Saif Sir will assess
                the appropriate curriculum division, batch timing, and foundational focus during a
                direct consultation.
              </p>

              {/* Consultation Details List */}
              <div className="space-y-3 mb-8">
                <div className="flex items-start gap-3.5 p-4 rounded-[18px] bg-surface-pure border border-border-soft shadow-2xs">
                  <div className="w-9 h-9 rounded-full bg-ivory-light border border-gold/40 flex items-center justify-center text-gold-dark shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-charcoal uppercase tracking-wider">
                      Confirmed Evening Window
                    </h4>
                    <p className="text-xs text-charcoal mt-0.5 font-medium">
                      4:30 PM – 8:00 PM (Monday to Saturday)
                    </p>
                    <span className="text-[10.5px] text-charcoal-muted block mt-0.5 font-normal">
                      Standard-wise slots tailored upon discussion
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-4 rounded-[18px] bg-surface-pure border border-border-soft shadow-2xs">
                  <img
                    src={saifDeskImg}
                    alt="Saif Barkat Vegdani"
                    className="w-11 h-11 rounded-full object-cover object-top border-2 border-gold/40 shadow-xs shrink-0 mt-0.5"
                    width={44}
                    height={44}
                  />
                  <div>
                    <h4 className="text-xs font-bold text-charcoal uppercase tracking-wider">
                      Direct Mentor Interaction
                    </h4>
                    <p className="text-xs text-charcoal mt-0.5 font-medium">
                      Saif Barkat Vegdani (B.Com, B.Ed)
                    </p>
                    <span className="text-[10.5px] text-charcoal-muted block mt-0.5 font-normal">
                      No intermediaries. Direct communication with the teacher.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick WhatsApp Alternative Box */}
            <div className="p-6 rounded-[22px] bg-midnight text-white border border-gold/30 shadow-md">
              <div className="flex items-center gap-3 mb-3">
                <img
                  src={logoImg}
                  alt="S.V. Tutorial"
                  className="w-9 h-9 rounded-xl object-contain bg-midnight border border-gold/40 p-0.5 shrink-0 shadow-xs"
                  width={36}
                  height={36}
                />
                <div>
                  <span className="text-[9.5px] font-bold uppercase tracking-widest text-gold block">
                    S.V. Tutorial
                  </span>
                  <h4 className="font-serif text-base font-bold text-white">
                    Direct Admission Desk
                  </h4>
                </div>
              </div>
              <p className="text-xs text-white/70 mb-4 leading-relaxed font-normal">
                Parents who prefer immediate answers regarding batch seats and admissions can
                connect directly with Saif Sir.
              </p>
              <a
                href={directWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-3 px-5 rounded-full bg-gold hover:bg-gold-light text-midnight font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Open WhatsApp Chat</span>
              </a>
            </div>
          </div>

          {/* Right Column: Admission Form with Floating Focus Lines (7 cols) */}
          <div ref={rightColRef} className="lg:col-span-7">
            <SpotlightCard
              className="bg-surface-pure rounded-[28px] border border-border-soft p-7 sm:p-9 lg:p-10 shadow-sm relative group"
              spotlightColor="rgba(198, 161, 91, 0.12)"
              radius={400}
            >
              <div className="mb-7">
                <span className="px-3.5 py-1 rounded-full bg-ivory-light text-gold-dark border border-border-soft text-[10px] font-bold uppercase tracking-wider inline-block">
                  Admission Enquiry Form
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-charcoal font-bold tracking-tight mt-2.5 mb-1.5">
                  Begin Your Academic Journey
                </h3>
                <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed font-normal">
                  Submit the student details below. Saif Sir will personally review and contact you within 24 operational hours.
                </p>
              </div>

              {/* Submission Error Banner with Gentle Shake Animation */}
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
                    className="mb-6 p-4 rounded-[16px] bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-3"
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

              {/* Form or Calm Success State */}
              <AnimatePresence mode="wait">
                {submissionSuccess ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="p-7 sm:p-8 rounded-[22px] bg-ivory border border-gold/40 text-center"
                  >
                    <div className="w-14 h-14 rounded-full bg-gold/15 border-2 border-gold flex items-center justify-center text-gold-dark mx-auto mb-4">
                      <CheckCircle2 className="w-7 h-7" />
                    </div>

                    <h4 className="font-serif text-2xl font-bold text-charcoal mb-2">
                      Enquiry Received
                    </h4>
                    <p className="text-xs sm:text-sm text-charcoal-muted max-w-md mx-auto mb-6 leading-relaxed font-normal">
                      Thank you. Your admission enquiry has been safely received. Saif Sir will review and reach out to you directly regarding batch availability.
                    </p>

                    {submittedData && (
                      <div className="bg-surface-pure p-4 rounded-[16px] border border-border-soft max-w-md mx-auto text-left text-xs mb-6 space-y-1.5">
                        <div className="flex justify-between text-charcoal">
                          <span className="text-charcoal-muted">Student:</span>
                          <strong>{submittedData.studentName}</strong>
                        </div>
                        <div className="flex justify-between text-charcoal">
                          <span className="text-charcoal-muted">Standard & Board:</span>
                          <strong>{submittedData.standard} ({submittedData.board})</strong>
                        </div>
                        <div className="flex justify-between text-charcoal">
                          <span className="text-charcoal-muted">Contact:</span>
                          <strong>+91 {submittedData.phoneNumber}</strong>
                        </div>
                      </div>
                    )}

                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      {submittedData && (
                        <a
                          href={getFormSubmissionWhatsAppUrl(submittedData)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-gold hover:bg-gold-light text-midnight font-bold text-xs uppercase tracking-wider transition-colors shadow-xs"
                        >
                          <MessageCircle className="w-4 h-4" />
                          <span>Speed up via WhatsApp</span>
                        </a>
                      )}
                      <button
                        type="button"
                        onClick={() => {
                          setSubmissionSuccess(false);
                          setSubmittedData(null);
                        }}
                        className="px-5 py-3 rounded-full bg-surface-pure hover:bg-ivory-light border border-border-soft text-charcoal font-semibold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                      >
                        Submit Another Enquiry
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
                          className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-1.5"
                        >
                          Parent / Guardian Name <span className="text-gold-dark">*</span>
                        </label>
                        <input
                          type="text"
                          id="parentName"
                          name="parentName"
                          required
                          value={formData.parentName}
                          onChange={handleChange}
                          placeholder="e.g. Ramesh Patel"
                          className="w-full px-4 py-3 rounded-[14px] bg-ivory border border-border-soft text-xs text-charcoal placeholder:text-charcoal-muted/50 focus:bg-surface-pure focus:outline-none focus:border-gold transition-colors"
                        />
                      </div>

                      {/* Student's Name */}
                      <div>
                        <label
                          htmlFor="studentName"
                          className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-1.5"
                        >
                          Student Name <span className="text-gold-dark">*</span>
                        </label>
                        <input
                          type="text"
                          id="studentName"
                          name="studentName"
                          required
                          value={formData.studentName}
                          onChange={handleChange}
                          placeholder="e.g. Aryan Patel"
                          className="w-full px-4 py-3 rounded-[14px] bg-ivory border border-border-soft text-xs text-charcoal placeholder:text-charcoal-muted/50 focus:bg-surface-pure focus:outline-none focus:border-gold transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Standard Selection */}
                      <div>
                        <label
                          htmlFor="standard"
                          className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-1.5"
                        >
                          Standard / Class <span className="text-gold-dark">*</span>
                        </label>
                        <select
                          id="standard"
                          name="standard"
                          value={formData.standard}
                          onChange={handleStandardChange}
                          className="w-full px-4 py-3 rounded-[14px] bg-ivory border border-border-soft text-xs text-charcoal focus:bg-surface-pure focus:outline-none focus:border-gold transition-colors"
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
                          className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-1.5"
                        >
                          Curriculum Board <span className="text-gold-dark">*</span>
                        </label>
                        <select
                          id="board"
                          name="board"
                          value={formData.board}
                          onChange={handleChange}
                          disabled={["Std 9", "Std 10", "Std 11", "Std 12"].includes(formData.standard)}
                          className={`w-full px-4 py-3 rounded-[14px] bg-ivory border border-border-soft text-xs text-charcoal focus:bg-surface-pure focus:outline-none focus:border-gold transition-colors ${
                            ["Std 9", "Std 10", "Std 11", "Std 12"].includes(formData.standard)
                              ? "opacity-60 cursor-not-allowed"
                              : ""
                          }`}
                        >
                          <option value="GSEB">Gujarat State Board (GSEB)</option>
                          <option value="CBSE">Central Board (CBSE)</option>
                        </select>
                        {["Std 9", "Std 10"].includes(formData.standard) && (
                          <span className="text-[10px] text-charcoal-muted mt-1 block">
                            * Standards 9–10 are exclusively GSEB
                          </span>
                        )}
                        {["Std 11", "Std 12"].includes(formData.standard) && (
                          <span className="text-[10px] text-charcoal-muted mt-1 block">
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
                          className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-1.5"
                        >
                          Mobile / WhatsApp Number <span className="text-gold-dark">*</span>
                        </label>
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-charcoal-muted">
                            +91
                          </span>
                          <input
                            type="tel"
                            id="phoneNumber"
                            name="phoneNumber"
                            required
                            maxLength={10}
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            placeholder="98765 43210"
                            className="w-full pl-12 pr-4 py-3 rounded-[14px] bg-ivory border border-border-soft text-xs text-charcoal placeholder:text-charcoal-muted/50 focus:bg-surface-pure focus:outline-none focus:border-gold transition-colors font-medium tracking-wide"
                          />
                        </div>
                      </div>

                      {/* Preferred Contact Mode */}
                      <div>
                        <label
                          htmlFor="preferredContact"
                          className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-1.5"
                        >
                          Preferred Mode of Contact
                        </label>
                        <select
                          id="preferredContact"
                          name="preferredContact"
                          value={formData.preferredContact}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-[14px] bg-ivory border border-border-soft text-xs text-charcoal focus:bg-surface-pure focus:outline-none focus:border-gold transition-colors"
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
                        className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-1.5"
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
                        className="w-full px-4 py-3 rounded-[14px] bg-ivory border border-border-soft text-xs text-charcoal placeholder:text-charcoal-muted/50 focus:bg-surface-pure focus:outline-none focus:border-gold transition-colors resize-none font-normal"
                      />
                    </div>

                    {/* Submit Button with Morphing State */}
                    <div className="pt-2">
                      <motion.button
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        disabled={isSubmitting}
                        className="inline-flex items-center justify-center gap-2.5 w-full py-3.5 px-6 rounded-full bg-midnight hover:bg-midnight-card text-gold hover:text-gold-light font-bold text-xs uppercase tracking-wider transition-colors shadow-sm border border-gold/40 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin text-gold" />
                            <span>Submitting Enquiry...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-3.5 h-3.5" />
                            <span>Submit Admission Enquiry</span>
                          </>
                        )}
                      </motion.button>
                    </div>

                    <p className="text-[10.5px] text-charcoal-muted text-center pt-1 font-normal">
                      Information is securely stored and directly reviewed by Saif Barkat Vegdani.
                    </p>
                  </form>
                )}
              </AnimatePresence>
            </SpotlightCard>
          </div>
        </div>
      </div>
    </section>
  );
}
