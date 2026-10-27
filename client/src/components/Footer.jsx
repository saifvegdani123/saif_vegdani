import React from "react";
import { motion } from "framer-motion";
import { MessageCircle, Clock, ShieldCheck } from "lucide-react";
import { createWhatsAppUrl } from "../utils/whatsapp";
import logoImg from "../assets/logo.png";

export default function Footer() {
  const whatsappUrl = createWhatsAppUrl(
    "Hello Saif Sir, I would like to enquire about admission to your tuition classes."
  );

  return (
    <footer className="w-full bg-midnight text-white/80 border-t border-gold/20">
      <div className="max-w-[1340px] mx-auto px-4 lg:px-12 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          {/* Col 1: Identity */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="w-12 h-12 rounded-xl border border-gold/40 bg-midnight flex items-center justify-center p-0.5 shadow-md cursor-pointer transition-colors hover:border-gold"
              >
                <img
                  src={logoImg}
                  alt="S.V. Tutorial Official Logo"
                  className="w-full h-full object-contain rounded-lg"
                />
              </motion.div>
              <div>
                <span className="font-serif font-bold text-lg text-white tracking-tight block leading-tight">
                  S.V. Tutorial
                </span>
                <span className="text-[9.5px] font-sans font-semibold tracking-[0.2em] text-gold uppercase">
                  Saif Barkat Vegdani · Tuition Classes
                </span>
              </div>
            </div>

            <p className="text-xs text-white/65 leading-relaxed mb-5 font-normal">
              Personalised tuition classes for Standards 3–12. Focused on building strong
              conceptual fundamentals, consistent practice, and confident exam performance under
              the direct instruction of a B.Com & B.Ed qualified educator.
            </p>

            <div className="inline-flex items-center gap-2 text-xs text-gold-light font-semibold px-3 py-1 rounded-full bg-white/5 border border-gold/20">
              <ShieldCheck className="w-3.5 h-3.5 text-gold" />
              <span>8 Years Stated Experience</span>
            </div>
          </div>

          {/* Col 2: Academic Divisions */}
          <div>
            <h4 className="font-serif text-xs font-bold text-gold uppercase tracking-widest mb-4">
              Academic Programmes
            </h4>
            <ul className="space-y-2.5 text-xs text-white/70">
              <li>
                <a
                  href="#classes"
                  className="hover:text-gold transition-colors flex items-center justify-between group"
                >
                  <span className="group-hover:translate-x-1 transition-transform">Standards 3–8 (GSEB & CBSE)</span>
                  <span className="text-[10px] text-white/40">Excl. Sanskrit</span>
                </a>
              </li>
              <li>
                <a
                  href="#classes"
                  className="hover:text-gold transition-colors flex items-center justify-between group"
                >
                  <span className="group-hover:translate-x-1 transition-transform">Standards 9–10 (GSEB Board)</span>
                  <span className="text-[10px] text-white/40">Excl. Comp & Skt</span>
                </a>
              </li>
              <li>
                <a
                  href="#classes"
                  className="hover:text-gold transition-colors flex items-center justify-between group"
                >
                  <span className="group-hover:translate-x-1 transition-transform">Standards 11–12 (Commerce Stream)</span>
                  <span className="text-[10px] text-gold-light">All Subjects</span>
                </a>
              </li>
              <li>
                <a href="#philosophy" className="hover:text-gold transition-colors block hover:translate-x-1 duration-200">
                  Concept Clarification & Doubt Clinics
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Navigation */}
          <div>
            <h4 className="font-serif text-xs font-bold text-gold uppercase tracking-widest mb-4">
              Quick Navigation
            </h4>
            <ul className="space-y-2.5 text-xs text-white/70">
              <li>
                <a href="#hero" className="hover:text-gold transition-colors inline-block hover:translate-x-1 duration-200">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-gold transition-colors inline-block hover:translate-x-1 duration-200">
                  About Saif Vegdani Sir
                </a>
              </li>
              <li>
                <a href="#classes" className="hover:text-gold transition-colors inline-block hover:translate-x-1 duration-200">
                  Classes & Curriculum
                </a>
              </li>
              <li>
                <a href="#philosophy" className="hover:text-gold transition-colors inline-block hover:translate-x-1 duration-200">
                  Teaching Approach
                </a>
              </li>
              <li>
                <a href="#timings" className="hover:text-gold transition-colors inline-block hover:translate-x-1 duration-200">
                  Batch Timings & Schedule
                </a>
              </li>
              <li>
                <a href="#admissions" className="hover:text-gold transition-colors inline-block hover:translate-x-1 duration-200">
                  Admission Consultation Desk
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-gold transition-colors inline-block hover:translate-x-1 duration-200">
                  Frequently Asked Questions
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Timings & WhatsApp Action */}
          <div>
            <h4 className="font-serif text-xs font-bold text-gold uppercase tracking-widest mb-4">
              Operational Schedule
            </h4>
            <div className="space-y-3 text-xs text-white/70 mb-5">
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-gold mt-0.5 shrink-0" />
                <div>
                  <span className="text-white/60 block text-[11px] uppercase tracking-wider">
                    Confirmed Evening Batches:
                  </span>
                  <strong className="text-white text-sm font-semibold">
                    4:30 PM – 8:00 PM
                  </strong>
                  <span className="text-[10.5px] text-white/50 block">Monday to Saturday</span>
                </div>
              </div>
            </div>

            <motion.a
              whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(198,161,91,0.4)" }}
              whileTap={{ scale: 0.98 }}
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-full bg-gold hover:bg-gold-light text-midnight font-bold text-xs uppercase tracking-wider transition-colors shadow-sm border border-gold-light/40"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp Admission Desk</span>
            </motion.a>
          </div>
        </div>

        {/* Bottom Copyright & Location Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-white/50">
          <p>© 2026 S.V. Tutorial — Saif Barkat Vegdani Tuition Classes. All rights reserved.</p>
          <p className="text-gold-light font-medium tracking-wide">
            Personalised Academic Excellence · Standards 3–12
          </p>
        </div>
      </div>
    </footer>
  );
}
