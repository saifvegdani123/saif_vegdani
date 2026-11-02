import React from "react";
import { MessageCircle, Clock, ShieldCheck, ArrowUp, Mail, MapPin } from "lucide-react";
import { createWhatsAppUrl } from "../utils/whatsapp";
import logoImg from "../assets/logo.png";

export default function Footer() {
  const whatsappUrl = createWhatsAppUrl(
    "Hello Saif Sir, I would like to enquire about admission to your tuition classes."
  );

  const officialEmail = import.meta.env.VITE_CONTACT_EMAIL || "saif@svtutorial.in";

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-[#F6F1E6] text-charcoal border-t border-border-soft relative overflow-hidden" aria-label="Institutional Footer">
      <div className="site-container pt-12 pb-10 sm:pt-14 sm:pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 pb-10 border-b border-border-soft">
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
                  <span className="text-xs font-semibold tracking-[0.14em] text-gold-dark uppercase mt-0.5 block font-mono">
                    Saif Barkat Vegdani · Tuition Classes
                  </span>
                </div>
              </div>

              <p className="text-sm text-charcoal-muted leading-relaxed mb-5 font-normal max-w-md">
                Personalised tuition classes for Standards 3–12 in Surat, Gujarat. Focused on building ironclad
                conceptual fundamentals, consistent daily practice, and confident exam performance under
                the direct guidance of a B.Com &amp; B.Ed qualified educator.
              </p>

              {/* Verified Contact Badges */}
              <div className="space-y-2 mb-6">
                <a
                  href={`mailto:${officialEmail}`}
                  className="inline-flex items-center gap-2 text-xs font-semibold text-charcoal hover:text-gold-dark transition-colors"
                >
                  <Mail className="w-4 h-4 text-gold-dark shrink-0" />
                  <span>{officialEmail}</span>
                </a>
                <div className="flex items-center gap-2 text-xs text-charcoal-muted">
                  <MapPin className="w-4 h-4 text-gold-dark shrink-0" />
                  <span>Rander, Surat, Gujarat — 395005</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <div className="inline-flex items-center gap-2 text-xs text-charcoal font-semibold px-3.5 py-1.5 rounded-full bg-surface-pure border border-border-soft shadow-2xs">
                <ShieldCheck className="w-4 h-4 text-gold-dark shrink-0" />
                <span>9 Years Verified Record</span>
              </div>
              <div className="inline-flex items-center gap-1.5 text-xs text-charcoal-muted font-medium px-3.5 py-1.5 rounded-full bg-surface-pure border border-border-soft font-mono">
                <span>B.Com, B.Ed</span>
              </div>
            </div>
          </div>

          {/* Col 2: Academic Divisions (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="font-serif text-sm font-bold text-gold-dark uppercase tracking-widest mb-4">
              Academic Divisions
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm text-charcoal/80">
              <li>
                <a
                  href="#classes"
                  className="hover:text-gold-dark transition-colors flex items-center justify-between group"
                >
                  <span className="group-hover:translate-x-1 transition-transform">Primary &amp; Middle (Std 3–8)</span>
                  <span className="text-xs text-charcoal-muted font-mono">GSEB &amp; CBSE</span>
                </a>
              </li>
              <li>
                <a
                  href="#classes"
                  className="hover:text-gold-dark transition-colors flex items-center justify-between group"
                >
                  <span className="group-hover:translate-x-1 transition-transform">Secondary Board (Std 9–10)</span>
                  <span className="text-xs text-charcoal-muted font-mono">GSEB Only</span>
                </a>
              </li>
              <li>
                <a
                  href="#classes"
                  className="hover:text-gold-dark transition-colors flex items-center justify-between group"
                >
                  <span className="group-hover:translate-x-1 transition-transform">Higher Secondary (Std 11–12)</span>
                  <span className="text-xs text-gold-dark font-medium font-mono">Commerce</span>
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="hover:text-gold-dark transition-colors block group"
                >
                  <span className="group-hover:translate-x-1 transition-transform inline-block">Principal Educator Profile</span>
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
              <li>
                <a
                  href="#faq"
                  className="hover:text-gold-dark transition-colors block group"
                >
                  <span className="group-hover:translate-x-1 transition-transform inline-block">Frequently Asked Questions</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Navigation & Timings (4 cols) */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              <h4 className="font-serif text-sm font-bold text-gold-dark uppercase tracking-widest mb-4">
                Operational Schedule
              </h4>
              <div className="p-4 rounded-xl bg-surface-pure border border-border-soft mb-5 shadow-2xs">
                <div className="flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-gold-dark mt-0.5 shrink-0" />
                  <div>
                    <span className="text-charcoal-muted block text-xs uppercase tracking-wider font-mono">
                      Confirmed Evening Window:
                    </span>
                    <strong className="text-charcoal text-sm font-semibold block mt-0.5">
                      4:30 PM – 8:00 PM
                    </strong>
                    <span className="text-xs text-charcoal-muted block mt-0.5">
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
              className="inline-flex items-center justify-center gap-2 w-full min-h-[48px] py-3.5 px-4 rounded-full bg-midnight hover:bg-midnight/90 text-gold hover:text-gold-light font-bold text-xs uppercase tracking-wider transition-all shadow-sm border border-gold/40"
            >
              <MessageCircle className="w-4 h-4 text-gold shrink-0" />
              <span>WhatsApp Admission Desk</span>
            </a>
          </div>
        </div>

        {/* Bottom Strip: Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-charcoal-muted">
          <p>© 2026 S.V. Tutorial — Saif Barkat Vegdani Tuition Classes. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="text-gold-dark font-medium">
              Standards 3–12 · Concept-First Learning
            </span>
            <button
              type="button"
              onClick={scrollToTop}
              className="min-h-[44px] min-w-[44px] rounded-full bg-surface-pure hover:bg-ivory-light text-charcoal border border-border-soft transition-colors flex items-center justify-center cursor-pointer shadow-xs"
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
