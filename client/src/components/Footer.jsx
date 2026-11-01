import React from "react";
import { MessageCircle, Clock, ShieldCheck, ArrowUp } from "lucide-react";
import { createWhatsAppUrl } from "../utils/whatsapp";
import logoImg from "../assets/logo.png";

export default function Footer() {
  const whatsappUrl = createWhatsAppUrl(
    "Hello Saif Sir, I would like to enquire about admission to your tuition classes."
  );

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-[#F6F1E6] text-charcoal border-t border-border-soft relative overflow-hidden" aria-label="Institutional Footer">
      <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-12 pt-16 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-border-soft">
          {/* Col 1: Identity & Credentials (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3.5 mb-5">
                <a
                  href="#hero"
                  className="w-12 h-12 rounded-xl border border-gold/40 bg-surface-pure flex items-center justify-center p-0.5 shadow-2xs transition-all duration-300 hover:border-gold hover:shadow-[0_0_14px_rgba(198,161,91,0.3)] shrink-0"
                  aria-label="S.V. Tutorial - Return to top"
                >
                  <img
                    src={logoImg}
                    alt="S.V. Tutorial Official Logo"
                    className="w-full h-full object-contain rounded-lg"
                    width={48}
                    height={48}
                  />
                </a>
                <div>
                  <span className="font-serif font-bold text-xl text-charcoal tracking-tight block leading-tight">
                    S.V. Tutorial
                  </span>
                  <span className="text-[9.5px] font-sans font-semibold tracking-[0.22em] text-gold-dark uppercase mt-0.5 block">
                    Saif Barkat Vegdani · Tuition Classes
                  </span>
                </div>
              </div>

              <p className="text-xs sm:text-[13px] text-charcoal-muted leading-relaxed mb-6 font-normal max-w-md">
                Personalised tuition classes for Standards 3–12. Focused on building ironclad
                conceptual fundamentals, consistent daily practice, and confident exam performance under
                the direct guidance of a B.Com & B.Ed qualified educator.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <div className="inline-flex items-center gap-2 text-xs text-charcoal font-semibold px-3.5 py-1.5 rounded-full bg-surface-pure border border-border-soft shadow-2xs">
                <ShieldCheck className="w-3.5 h-3.5 text-gold-dark shrink-0" />
                <span>8 Years Verified Record</span>
              </div>
              <div className="inline-flex items-center gap-1.5 text-xs text-charcoal-muted font-medium px-3 py-1.5 rounded-full bg-surface-pure border border-border-soft">
                <span>B.Com, B.Ed</span>
              </div>
            </div>
          </div>

          {/* Col 2: Academic Divisions (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="font-serif text-xs font-bold text-gold-dark uppercase tracking-widest mb-4">
              Academic Divisions
            </h4>
            <ul className="space-y-3 text-xs text-charcoal/80">
              <li>
                <a
                  href="#classes"
                  className="hover:text-gold-dark transition-colors flex items-center justify-between group"
                >
                  <span className="group-hover:translate-x-1 transition-transform">Primary & Middle (Std 3–8)</span>
                  <span className="text-[10px] text-charcoal-muted">GSEB & CBSE</span>
                </a>
              </li>
              <li>
                <a
                  href="#classes"
                  className="hover:text-gold-dark transition-colors flex items-center justify-between group"
                >
                  <span className="group-hover:translate-x-1 transition-transform">Secondary Board (Std 9–10)</span>
                  <span className="text-[10px] text-charcoal-muted">GSEB Only</span>
                </a>
              </li>
              <li>
                <a
                  href="#classes"
                  className="hover:text-gold-dark transition-colors flex items-center justify-between group"
                >
                  <span className="group-hover:translate-x-1 transition-transform">Higher Secondary (Std 11–12)</span>
                  <span className="text-[10px] text-gold-dark font-medium">Commerce</span>
                </a>
              </li>
              <li>
                <a
                  href="#curriculum-diagnostic"
                  className="hover:text-gold-dark transition-colors block group"
                >
                  <span className="group-hover:translate-x-1 transition-transform inline-block">Curriculum Diagnostic Matcher</span>
                </a>
              </li>
              <li>
                <a
                  href="#philosophy"
                  className="hover:text-gold-dark transition-colors block group"
                >
                  <span className="group-hover:translate-x-1 transition-transform inline-block">Teaching Methodology</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Navigation & Timings (4 cols) */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              <h4 className="font-serif text-xs font-bold text-gold-dark uppercase tracking-widest mb-4">
                Operational Schedule
              </h4>
              <div className="p-4 rounded-[16px] bg-surface-pure border border-border-soft mb-5 shadow-2xs">
                <div className="flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-gold-dark mt-0.5 shrink-0" />
                  <div>
                    <span className="text-charcoal-muted block text-[10.5px] uppercase tracking-wider">
                      Confirmed Evening Window:
                    </span>
                    <strong className="text-charcoal text-sm font-semibold block mt-0.5">
                      4:30 PM – 8:00 PM
                    </strong>
                    <span className="text-[10.5px] text-charcoal-muted block mt-0.5">
                      Monday to Saturday (Evening Batches)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full py-3.5 px-4 rounded-full bg-midnight hover:bg-midnight-card text-gold hover:text-gold-light font-bold text-xs uppercase tracking-wider transition-colors shadow-sm border border-gold/40"
            >
              <MessageCircle className="w-4 h-4 text-gold" />
              <span>WhatsApp Admission Desk</span>
            </a>
          </div>
        </div>

        {/* Bottom Strip: Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-charcoal-muted">
          <p>© 2026 S.V. Tutorial — Saif Barkat Vegdani Tuition Classes. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="text-gold-dark font-medium">
              Standards 3–12 · Concept-First Learning
            </span>
            <button
              type="button"
              onClick={scrollToTop}
              className="p-1.5 rounded-full bg-surface-pure hover:bg-ivory-tint text-charcoal border border-border-soft transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-gold cursor-pointer"
              aria-label="Back to top of page"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
