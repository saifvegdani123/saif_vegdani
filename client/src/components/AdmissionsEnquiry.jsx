import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Send, CheckCircle2, AlertTriangle, Clock, HelpCircle, Loader2 } from "lucide-react";
import { getFormSubmissionWhatsAppUrl, createWhatsAppUrl } from "../utils/whatsapp";
import saifDeskImg from "../assets/saif-vegdani-desk.jpg";
import logoImg from "../assets/logo.png";
import SpotlightCard from "./ui/SpotlightCard";
import BorderBeam from "./ui/BorderBeam";

gsap.registerPlugin(ScrollTrigger);

export default function AdmissionsEnquiry() {
  const sectionRef = useRef(null);
  const leftColRef = useRef(null);
  const rightColRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(leftColRef.current, {
        opacity: 0,
        x: -35,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      });

      gsap.from(rightColRef.current, {
        opacity: 0,
        x: 35,
        duration: 0.9,
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

  const handleStandardChange = (e) => {
    const val = e.target.value;
    let updatedBoard = formData.board;

    // Board constraints per client specification:
    // Standards 9-10 are GSEB only
    // Standards 11-12 Commerce are GSEB
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
    setIsSubmitting(true);

    // Client-side phone sanity check
    const cleanPhone = formData.phoneNumber.replace(/[^0-9]/g, "");
    if (cleanPhone.length < 10) {
      setSubmissionError("Please provide a valid 10-digit WhatsApp or mobile number.");
      setIsSubmitting(false);
      return;
    }

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
        // Reset form inputs
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
      }
    } catch (err) {
      console.warn("Direct API call encountered network error:", err);
      // If server is not yet booted, provide an immediate resilient fallback to WhatsApp
      setSubmissionError(
        "Direct server connection is currently unavailable. You can connect immediately with Saif Sir via WhatsApp below."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const directWhatsAppUrl = createWhatsAppUrl(
    "Hello Saif Sir, I would like to speak directly regarding admission to tuition classes for Standards 3–12."
  );

  return (
    <section ref={sectionRef} id="admissions" className="py-20 lg:py-28 bg-ivory border-b border-border-soft">
      <div className="max-w-[1340px] mx-auto px-4 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Reassuring Context & Contact Information (5 cols) */}
          <div ref={leftColRef} className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-pure border border-border-soft text-[10.5px] font-bold tracking-[0.16em] uppercase text-midnight mb-3">
                <img
                  src={logoImg}
                  alt="S.V. Tutorial"
                  className="w-4 h-4 rounded-full object-cover border border-gold/40"
                />
                S.V. Tutorial Admissions
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] text-charcoal font-bold tracking-tight mb-4 leading-tight">
                Let's Find the Right Learning Path.
              </h2>

              <p className="text-xs sm:text-sm text-charcoal-muted mb-8 leading-relaxed font-normal">
                Every child has unique learning needs. Share your details and Saif Sir will assess
                the appropriate curriculum division, batch timing, and foundational focus during a
                one-on-one consultation.
              </p>

              {/* Consultation Details List */}
              <div className="space-y-3.5 mb-8">
                <motion.div
                  whileHover={{ y: -2 }}
                  className="flex items-start gap-3.5 p-4 rounded-[20px] bg-surface-pure border border-border-soft shadow-2xs hover:border-gold/40 transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-ivory-light border border-gold/40 flex items-center justify-center text-gold shrink-0 mt-0.5">
                    <Clock className="w-4 h-4 text-gold-dark" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-charcoal uppercase tracking-wider">
                      Confirmed Batch Window
                    </h4>
                    <p className="text-xs text-charcoal mt-0.5 font-medium">
                      4:30 PM – 8:00 PM (Monday to Saturday)
                    </p>
                    <span className="text-[10.5px] text-charcoal-muted block mt-0.5 font-normal">
                      Standard-wise slots tailored upon discussion
                    </span>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ y: -2 }}
                  className="flex items-start gap-3.5 p-4 rounded-[20px] bg-surface-pure border border-border-soft shadow-2xs hover:border-gold/40 transition-colors"
                >
                  <img
                    src={saifDeskImg}
                    alt="Saif Barkat Vegdani"
                    className="w-12 h-12 rounded-full object-cover object-top border-2 border-gold/40 shadow-xs shrink-0 mt-0.5"
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
                </motion.div>
              </div>
            </div>

            {/* Quick WhatsApp Alternative Box */}
            <div className="p-6 rounded-[24px] bg-midnight text-white border border-gold/30 shadow-md">
              <div className="flex items-center gap-3 mb-3">
                <img
                  src={logoImg}
                  alt="S.V. Tutorial"
                  className="w-10 h-10 rounded-xl object-contain bg-midnight border border-gold/40 p-0.5 shrink-0 shadow-sm"
                />
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gold block">
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
              <motion.a
                whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(198,161,91,0.4)" }}
                whileTap={{ scale: 0.98 }}
                href={directWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-3 px-5 rounded-full bg-gold hover:bg-gold-light text-midnight font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Open WhatsApp Chat</span>
              </motion.a>
            </div>
          </div>

          {/* Right Column: High-Converting Admission Form (7 cols) */}
          <div ref={rightColRef} className="lg:col-span-7">
            <SpotlightCard
              className="bg-surface-pure rounded-[32px] border border-border-soft p-8 sm:p-10 shadow-sm relative group"
              spotlightColor="rgba(198, 161, 91, 0.16)"
              radius={450}
            >
              {/* 21st.dev Border Beam on Admission Form */}
              <BorderBeam duration={10} borderWidth={2} radius={32} />

              <div className="mb-8">
                <span className="px-3.5 py-1 rounded-full bg-ivory-light text-gold-dark border border-border-soft text-[10px] font-bold uppercase tracking-wider inline-block">
                  Admission Enquiry Form
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-charcoal font-bold tracking-tight mt-2.5 mb-1.5">
                  Begin Your Academic Journey
                </h3>
                <p className="text-xs sm:text-sm text-charcoal-muted font-normal">
                  Fill in your details below and Saif Sir will reach out within 24 operational hours.
                </p>
              </div>

              {/* Success Notification Box with Framer Motion AnimatePresence */}
              <AnimatePresence>
                {submissionSuccess && (
                  <motion.div
                    role="status"
                    aria-live="polite"
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 350, damping: 25 }}
                    className="mb-8 p-6 rounded-[24px] bg-ivory-light border border-gold/50 shadow-sm"
                  >
                    <div className="flex items-start gap-3.5">
                      <CheckCircle2 className="w-6 h-6 text-gold shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-sm font-bold text-charcoal block">
                          Enquiry Received Successfully
                        </strong>
                        <p className="text-xs text-charcoal-muted mt-1 leading-relaxed">
                          Thank you for reaching out. Your enquiry details have been registered. Saif
                          Sir will contact you via {submittedData?.preferredContact || "WhatsApp"}{" "}
                          promptly.
                        </p>

                        {submittedData && (
                          <div className="mt-4 pt-3 border-t border-border-soft flex flex-wrap gap-2 text-xs text-charcoal">
                            <span className="px-3 py-1 rounded-full bg-surface-pure border border-border-soft">
                              Student: <strong>{submittedData.studentName}</strong>
                            </span>
                            <span className="px-3 py-1 rounded-full bg-surface-pure border border-border-soft">
                              Standard: <strong>{submittedData.standard}</strong>
                            </span>
                            <span className="px-3 py-1 rounded-full bg-surface-pure border border-border-soft">
                              Board: <strong>{submittedData.board}</strong>
                            </span>
                          </div>
                        )}

                        {/* Optional one-click WhatsApp sync */}
                        {submittedData && (
                          <div className="mt-4">
                            <motion.a
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              href={getFormSubmissionWhatsAppUrl(submittedData)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-midnight text-gold text-xs font-bold uppercase tracking-wider hover:bg-midnight-card border border-gold/40 shadow-xs transition-colors"
                            >
                              <MessageCircle className="w-3.5 h-3.5" />
                              <span>Continue on WhatsApp Now</span>
                            </motion.a>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Error Alert Box with Framer Motion Shake Animation */}
              <AnimatePresence>
                {submissionError && (
                  <motion.div
                    role="alert"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: [-6, 6, -4, 4, 0] }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.35 }}
                    className="mb-6 p-4 rounded-[18px] bg-red-50/80 border border-red-200 text-red-900 text-xs flex items-start gap-3"
                  >
                    <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-semibold block">Submission Notice:</strong>
                      <span>{submissionError}</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="parentName"
                      className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-2"
                    >
                      Parent or Guardian Name <span className="text-gold-dark">*</span>
                    </label>
                    <input
                      id="parentName"
                      name="parentName"
                      type="text"
                      required
                      placeholder="e.g. Ramesh Patel"
                      value={formData.parentName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-[16px] bg-ivory-light border border-border-soft text-charcoal placeholder:text-charcoal-muted/60 text-xs focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold transition-colors"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="studentName"
                      className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-2"
                    >
                      Student's Full Name <span className="text-gold-dark">*</span>
                    </label>
                    <input
                      id="studentName"
                      name="studentName"
                      type="text"
                      required
                      placeholder="e.g. Dev Patel"
                      value={formData.studentName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-[16px] bg-ivory-light border border-border-soft text-charcoal placeholder:text-charcoal-muted/60 text-xs focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="standard"
                      className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-2"
                    >
                      Student's Current Standard <span className="text-gold-dark">*</span>
                    </label>
                    <select
                      id="standard"
                      name="standard"
                      required
                      value={formData.standard}
                      onChange={handleStandardChange}
                      className="w-full px-4 py-3 rounded-[16px] bg-ivory-light border border-border-soft text-charcoal text-xs focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold transition-colors cursor-pointer"
                    >
                      <option value="Std 3">Standard 3</option>
                      <option value="Std 4">Standard 4</option>
                      <option value="Std 5">Standard 5</option>
                      <option value="Std 6">Standard 6</option>
                      <option value="Std 7">Standard 7</option>
                      <option value="Std 8">Standard 8</option>
                      <option value="Std 9">Standard 9 (GSEB)</option>
                      <option value="Std 10">Standard 10 (GSEB Board)</option>
                      <option value="Std 11">Standard 11 (Commerce)</option>
                      <option value="Std 12">Standard 12 (Commerce Board)</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="board"
                      className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-2"
                    >
                      Educational Board <span className="text-gold-dark">*</span>
                    </label>
                    <select
                      id="board"
                      name="board"
                      required
                      value={formData.board}
                      onChange={handleChange}
                      disabled={["Std 9", "Std 10", "Std 11", "Std 12"].includes(
                        formData.standard
                      )}
                      className="w-full px-4 py-3 rounded-[16px] bg-ivory-light border border-border-soft text-charcoal text-xs focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold transition-colors disabled:opacity-75 disabled:cursor-not-allowed cursor-pointer"
                    >
                      <option value="GSEB">GSEB (Gujarat State Board)</option>
                      {["Std 3", "Std 4", "Std 5", "Std 6", "Std 7", "Std 8"].includes(
                        formData.standard
                      ) && <option value="CBSE">CBSE (Central Board)</option>}
                    </select>
                    {["Std 9", "Std 10"].includes(formData.standard) && (
                      <span className="text-[10px] text-charcoal-muted mt-1 block">
                        * GSEB board exclusively for Standards 9–10
                      </span>
                    )}
                    {["Std 11", "Std 12"].includes(formData.standard) && (
                      <span className="text-[10px] text-charcoal-muted mt-1 block">
                        * GSEB Commerce stream curriculum
                      </span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="phoneNumber"
                      className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-2"
                    >
                      WhatsApp / Contact Number <span className="text-gold-dark">*</span>
                    </label>
                    <div className="flex">
                      <span className="inline-flex items-center px-4 rounded-l-[16px] bg-ivory border border-r-0 border-border-soft text-charcoal-muted text-xs font-semibold">
                        +91
                      </span>
                      <input
                        id="phoneNumber"
                        name="phoneNumber"
                        type="tel"
                        required
                        placeholder="98765 43210"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-r-[16px] bg-ivory-light border border-border-soft text-charcoal placeholder:text-charcoal-muted/60 text-xs focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <span className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-2">
                      Preferred Contact Method
                    </span>
                    <div className="grid grid-cols-2 gap-2 pt-0.5">
                      <label className="flex items-center gap-2 p-3 rounded-[16px] bg-ivory-light border border-border-soft cursor-pointer hover:bg-ivory transition-colors">
                        <input
                          type="radio"
                          name="preferredContact"
                          value="WhatsApp"
                          checked={formData.preferredContact === "WhatsApp"}
                          onChange={handleChange}
                          className="accent-midnight"
                        />
                        <span className="text-xs font-medium text-charcoal">WhatsApp</span>
                      </label>

                      <label className="flex items-center gap-2 p-3 rounded-[16px] bg-ivory-light border border-border-soft cursor-pointer hover:bg-ivory transition-colors">
                        <input
                          type="radio"
                          name="preferredContact"
                          value="Phone Call"
                          checked={formData.preferredContact === "Phone Call"}
                          onChange={handleChange}
                          className="accent-midnight"
                        />
                        <span className="text-xs font-medium text-charcoal">Phone Call</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-2"
                  >
                    Subject Focus or Notes (Optional)
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="3"
                    placeholder="Tell us about specific subjects (e.g. Maths, Science, Accountancy), current school, or batch timing queries..."
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-[16px] bg-ivory-light border border-border-soft text-charcoal placeholder:text-charcoal-muted/60 text-xs focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold transition-colors"
                  ></textarea>
                </div>

                <div className="pt-2">
                  <motion.button
                    whileHover={{ scale: 1.015, boxShadow: "0 10px 25px -5px rgba(7,8,23,0.3)" }}
                    whileTap={{ scale: 0.985 }}
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 px-6 rounded-full bg-midnight hover:bg-midnight-card text-gold hover:text-gold-light font-bold text-xs tracking-widest uppercase transition-colors shadow-md flex items-center justify-center gap-2 border border-gold/40 disabled:opacity-70 disabled:cursor-wait"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin text-gold" />
                        <span>Submitting Enquiry...</span>
                      </span>
                    ) : (
                      <>
                        <span>Submit Admission Enquiry</span>
                        <Send className="w-3.5 h-3.5 text-gold" />
                      </>
                    )}
                  </motion.button>
                </div>

                <p className="text-[11px] text-charcoal-muted text-center pt-1 font-normal">
                  Your contact details are treated with strict confidentiality solely to address
                  your academic enquiry. Zero spam.
                </p>
              </form>
            </SpotlightCard>
          </div>
        </div>
      </div>
    </section>
  );
}
