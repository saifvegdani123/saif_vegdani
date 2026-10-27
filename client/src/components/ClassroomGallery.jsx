import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, X, Maximize2 } from "lucide-react";
import saifDeskImg from "../assets/saif-vegdani-desk.jpg";

gsap.registerPlugin(ScrollTrigger);

export default function ClassroomGallery() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Header
      gsap.from(headerRef.current, {
        opacity: 0,
        y: 25,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none none"
        }
      });

      // Gallery Cards Stagger
      gsap.from(gridRef.current?.children || [], {
        opacity: 0,
        y: 40,
        duration: 0.85,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 85%",
          toggleActions: "play none none none"
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setSelectedPhoto(null);
    };
    if (selectedPhoto) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [selectedPhoto]);

  const photos = [
    {
      title: "Quiet Study Environment",
      tag: "Classroom Space",
      description: "Dedicated study desks designed for focused reading and individual practice.",
      imageUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuApyfS_VO2cL6MIixFWOoM-ZjADEaRyXlgxJwL8UPBs-PeSQLYCm38tOQEBQtXVuFDexY02RrowUK-FPh6sE4LAc6J6nIZsmS053WoT7fKEMuywI3TNdSTTnO19ZWpqZU6tP8uD8r8_sjX1p-q6elCT31Z80OTsleGRXHpEtcYaDXe9uNmSOz6OIiuVUrLwM9JPAQKxg791bC4c6nmIEX0nwtw6SE2pj18j5_F-a6AhGSJFsvNQ2F9l",
      alt: "Clean academic tutoring study room with organized wooden desks and notebooks"
    },
    {
      title: "Interactive Problem Solving",
      tag: "Whiteboard Instruction",
      description: "Step-by-step whiteboard breakdowns for mathematics and commerce numericals.",
      imageUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuB3u9tQlrXib6McGHRQJsMvuBl5WZctzk0ylv74hdm1ef1HXJ491sH-QNpm0zf7ZEjIRniUnB1abrtEHpnZOwyYzNAatLT8nHXIThtOleXba8qxoEbCkZzd9N_xvY0Cqf0jje2x3XCPkmZEA4ht33z9sLA8-FdqwEk3XW-Bly7fsbrwjIOwR7ZGgWGoiU9EG85TLyVP6QMsEpXIKtUkG2sOql3-hXStrNkSvQNCJuySTXpq_GhxKO8F",
      alt: "Whiteboard showing neat step-by-step mathematical formulas and accountancy ledger entries"
    },
    {
      title: "Academic Reference Library",
      tag: "Curriculum Resources",
      description: "Comprehensive NCERT and Gujarat Board GSEB textbooks, blueprints, and materials.",
      imageUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDYiYAX7SzwNHYugOVAGcVszfM_g9Sd1ncDZI5Ge_Q6BxI_sxQf7yaSCLhmN-ibgaplKRnM7NJZQLhz_Nz8mOi6ogwqICTN3LiAJle1jgbm5zG1xiOGS_BCxwCtS1iilOpkhyulBmMXfzSIheuBj6tcnS8N0mP5DcrEHlg6JYiMd9JLDapqFvKvAE41vfgMgk8xR6UNFt_b9AqM2hODrK1XqelyoBfmK9FSqjrsBTh1ylV2j8kkCwB4",
      alt: "Neat bookshelf with GSEB and NCERT guides, standard 10 science manuals, and Commerce reference books"
    },
    {
      title: "1-on-1 Mentorship Corner",
      tag: "Doubt Resolution",
      description: "Dedicated desk for post-lecture doubt clarification and individual student feedback.",
      imageUrl: saifDeskImg,
      alt: "Saif Barkat Vegdani at his study desk for personalized academic mentoring"
    }
  ];

  return (
    <section ref={sectionRef} id="gallery" className="py-20 lg:py-28 bg-ivory border-b border-border-soft">
      <div className="max-w-[1340px] mx-auto px-4 lg:px-12">
        {/* Header */}
        <div ref={headerRef} className="max-w-2xl mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-surface-pure border border-border-soft text-[10.5px] font-bold tracking-[0.2em] uppercase text-gold-dark mb-3">
            <Camera className="w-3.5 h-3.5 text-gold" />
            Classroom Environment
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] text-charcoal font-bold tracking-tight leading-tight">
            A Place to Learn, Practice and Grow
          </h2>
          <p className="text-xs sm:text-sm text-charcoal-muted mt-3 leading-relaxed">
            A disciplined, quiet, and well-lit atmosphere where students feel focused, supported,
            and motivated to do their best academic work. Click on any photograph to view in full resolution.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {photos.map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -6, transition: { type: "spring", stiffness: 350, damping: 25 } }}
              onClick={() => setSelectedPhoto(item)}
              className="group bg-surface-pure rounded-[24px] border border-border-soft overflow-hidden shadow-2xs hover:shadow-xl hover:border-gold/50 transition-colors flex flex-col justify-between cursor-pointer"
            >
              <div>
                <div className="h-56 overflow-hidden relative rounded-t-[24px] bg-midnight/5">
                  <img
                    src={item.imageUrl}
                    alt={item.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute bottom-3 left-3 bg-midnight/90 backdrop-blur-xs px-3 py-1 rounded-full text-[10.5px] font-semibold text-white border border-white/10">
                    {item.tag}
                  </div>
                  <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-midnight/80 backdrop-blur-xs text-gold flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-gold/30">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-xs font-bold text-charcoal uppercase tracking-wider mb-1.5 group-hover:text-gold-dark transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-[11px] text-charcoal-muted leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* High-End Framer Motion Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 z-50 bg-midnight/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 15 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-3xl w-full bg-surface-pure rounded-[28px] overflow-hidden shadow-2xl border border-gold/30"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedPhoto(null)}
                aria-label="Close photo preview"
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-midnight/80 hover:bg-midnight text-white flex items-center justify-center transition-colors border border-white/20 focus:outline-none focus:ring-2 focus:ring-gold"
              >
                <X className="w-5 h-5 text-gold" />
              </button>

              {/* Lightbox Image */}
              <div className="max-h-[65vh] overflow-hidden bg-midnight/10 flex items-center justify-center">
                <img
                  src={selectedPhoto.imageUrl}
                  alt={selectedPhoto.alt}
                  className="w-full h-full max-h-[65vh] object-contain"
                />
              </div>

              {/* Lightbox Caption */}
              <div className="p-6 bg-surface-pure border-t border-border-soft flex items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-bold tracking-widest uppercase text-gold-dark block mb-1">
                    {selectedPhoto.tag}
                  </span>
                  <h3 className="font-serif text-lg font-bold text-charcoal">
                    {selectedPhoto.title}
                  </h3>
                  <p className="text-xs text-charcoal-muted mt-1 leading-relaxed">
                    {selectedPhoto.description}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedPhoto(null)}
                  className="shrink-0 px-4 py-2 rounded-full bg-midnight text-gold text-xs font-bold uppercase tracking-wider hover:bg-midnight-card transition-colors border border-gold/30"
                >
                  Done
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
