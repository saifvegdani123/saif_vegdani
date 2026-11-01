import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import { X, Maximize2 } from "lucide-react";
import saifDeskImg from "../assets/saif-vegdani-desk.jpg";

gsap.registerPlugin(ScrollTrigger);

export default function ClassroomGallery() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Header
      gsap.from(headerRef.current, {
        opacity: 0,
        y: 24,
        duration: 0.75,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none none"
        }
      });

      // Gallery Cards Stagger with subtle clip-path reveal
      gsap.from(gridRef.current?.children || [], {
        opacity: 0,
        y: 32,
        clipPath: "inset(0% 0% 15% 0%)",
        duration: 0.85,
        stagger: 0.1,
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

  // Handle ESC key to close modal & lock body scroll
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
      description: "Dedicated study desks designed for quiet reading, individual practice, and concentration.",
      imageUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuApyfS_VO2cL6MIixFWOoM-ZjADEaRyXlgxJwL8UPBs-PeSQLYCm38tOQEBQtXVuFDexY02RrowUK-FPh6sE4LAc6J6nIZsmS053WoT7fKEMuywI3TNdSTTnO19ZWpqZU6tP8uD8r8_sjX1p-q6elCT31Z80OTsleGRXHpEtcYaDXe9uNmSOz6OIiuVUrLwM9JPAQKxg791bC4c6nmIEX0nwtw6SE2pj18j5_F-a6AhGSJFsvNQ2F9l",
      alt: "Clean academic tutoring study room with organized wooden desks and notebooks",
      span: "md:col-span-1"
    },
    {
      title: "Step-by-Step Problem Solving",
      tag: "Whiteboard Instruction",
      description: "Careful whiteboard derivations for mathematics formulas and commerce accountancy ledgers.",
      imageUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuB3u9tQlrXib6McGHRQJsMvuBl5WZctzk0ylv74hdm1ef1HXJ491sH-QNpm0zf7ZEjIRniUnB1abrtEHpnZOwyYzNAatLT8nHXIThtOleXba8qxoEbCkZzd9N_xvY0Cqf0jje2x3XCPkmZEA4ht33z9sLA8-FdqwEk3XW-Bly7fsbrwjIOwR7ZGgWGoiU9EG85TLyVP6QMsEpXIKtUkG2sOql3-hXStrNkSvQNCJuySTXpq_GhxKO8F",
      alt: "Whiteboard showing neat step-by-step mathematical formulas and ledger entries",
      span: "md:col-span-1"
    },
    {
      title: "Curriculum Reference Resources",
      tag: "Academic Library",
      description: "Official NCERT and Gujarat Board GSEB textbooks, blueprints, and past exam question papers.",
      imageUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDYiYAX7SzwNHYugOVAGcVszfM_g9Sd1ncDZI5Ge_Q6BxI_sxQf7yaSCLhmN-ibgaplKRnM7NJZQLhz_Nz8mOi6ogwqICTN3LiAJle1jgbm5zG1xiOGS_BCxwCtS1iilOpkhyulBmMXfzSIheuBj6tcnS8N0mP5DcrEHlg6JYiMd9JLDapqFvKvAE41vfgMgk8xR6UNFt_b9AqM2hODrK1XqelyoBfmK9FSqjrsBTh1ylV2j8kkCwB4",
      alt: "Neat bookshelf with GSEB and NCERT guides, standard 10 science manuals, and Commerce reference books",
      span: "md:col-span-1"
    },
    {
      title: "1-on-1 Mentorship Corner",
      tag: "Doubt Resolution",
      description: "Dedicated desk for post-class doubt resolution and individualized student feedback by Saif Sir.",
      imageUrl: saifDeskImg,
      alt: "Saif Barkat Vegdani at his study desk for personalized academic mentoring",
      span: "md:col-span-1"
    }
  ];

  return (
    <section
      ref={sectionRef}
      id="gallery"
      className="py-20 lg:py-28 bg-ivory border-b border-border-soft"
      aria-label="Classroom Environment Gallery"
    >
      <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Eyebrow */}
        <div className="flex items-center justify-between mb-8 pb-3 border-b border-border-soft/60">
          <span className="text-[10.5px] font-mono font-bold tracking-[0.22em] text-gold-dark uppercase">
            08 / LEARNING ENVIRONMENT
          </span>
          <span className="text-[11px] font-sans text-charcoal-muted font-medium">
            Classroom & Study Desks
          </span>
        </div>

        {/* Header */}
        <div ref={headerRef} className="max-w-2xl mb-14">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[44px] text-charcoal font-bold tracking-tight leading-tight">
            A Place to Learn, Practice and Grow
          </h2>
          <p className="text-xs sm:text-sm text-charcoal-muted mt-3 leading-relaxed font-normal">
            A disciplined, quiet, and well-lit atmosphere where students feel focused, supported,
            and motivated to do their best academic work. Click on any photograph to preview.
          </p>
        </div>

        {/* Asymmetric Editorial Grid */}
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {photos.map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -4, transition: { type: "spring", stiffness: 350, damping: 25 } }}
              onClick={() => setSelectedPhoto(item)}
              className="group bg-surface-pure rounded-[22px] border border-border-soft overflow-hidden shadow-2xs hover:shadow-lg hover:border-gold/50 transition-all flex flex-col justify-between cursor-pointer focus-within:ring-2 focus-within:ring-gold"
              tabIndex={0}
              role="button"
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setSelectedPhoto(item);
                }
              }}
              aria-label={`Enlarge photo: ${item.title}`}
            >
              <div>
                <div className="h-52 sm:h-56 overflow-hidden relative rounded-t-[22px] bg-midnight/5">
                  <img
                    src={item.imageUrl}
                    alt={item.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    width={320}
                    height={224}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-midnight/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                  <div className="absolute bottom-3 left-3 bg-midnight/90 backdrop-blur-xs px-2.5 py-1 rounded-full text-[10px] font-semibold text-white border border-white/10">
                    {item.tag}
                  </div>
                  <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-midnight/80 backdrop-blur-xs text-gold flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-gold/30">
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

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 z-[80] bg-midnight/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
            role="dialog"
            aria-modal="true"
            aria-label={selectedPhoto.title}
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0, y: 16 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 12 }}
              transition={{ type: "spring", stiffness: 320, damping: 26 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-3xl w-full bg-surface-pure rounded-[26px] overflow-hidden shadow-2xl border border-gold/30"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedPhoto(null)}
                aria-label="Close photo preview"
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-midnight/80 hover:bg-midnight text-white flex items-center justify-center transition-colors border border-white/20 focus:outline-none focus:ring-2 focus:ring-gold cursor-pointer"
              >
                <X className="w-4 h-4 text-gold" />
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
              <div className="p-5 sm:p-6 bg-surface-pure border-t border-border-soft flex items-center justify-between gap-4">
                <div>
                  <span className="text-[9.5px] font-bold tracking-widest uppercase text-gold-dark block mb-1">
                    {selectedPhoto.tag}
                  </span>
                  <h3 className="font-serif text-base sm:text-lg font-bold text-charcoal">
                    {selectedPhoto.title}
                  </h3>
                  <p className="text-xs text-charcoal-muted mt-1 leading-relaxed font-normal">
                    {selectedPhoto.description}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedPhoto(null)}
                  className="shrink-0 px-4 py-2 rounded-full bg-midnight text-gold text-xs font-bold uppercase tracking-wider hover:bg-midnight-card transition-colors border border-gold/30 cursor-pointer"
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
