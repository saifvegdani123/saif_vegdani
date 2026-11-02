# S.V. TUTORIAL — END-TO-END TECHNICAL DOCUMENTATION
**Official Technical Architecture, UI/UX Design System, and Implementation Guide**

* **Institution:** S.V. Tutorial (Saif Barkat Vegdani Tuition Academy)
* **Founder & Principal Educator:** Saif Barkat Vegdani (B.Com, B.Ed — 8+ Years Experience)
* **Curricula Covered:** GSEB & CBSE (Standards 3–12), Specialized Higher Secondary Commerce (11–12)
* **Architecture:** 100% Frontend Static Single-Page Application (React 19 + Vite 8) with Direct WhatsApp & Email Communication
* **Design Philosophy:** Apple/Stripe-level Minimalist Luxury Academic Experience
* **Base Theme:** Editorial Warm Ivory (`#FEF9EF`) with Champagne Gold (`#C6A15B`) and Royal Midnight (`#070817`)

---

## 1. Executive Summary & Brand Identity

The **S.V. Tutorial** digital platform is engineered to deliver a bespoke, high-trust educational experience. Unlike conventional, busy coaching class websites filled with aggressive popups and generic banners, this platform adopts a **prestige academic editorial tone**:

- **Predominantly Light & Editorial:** Built on a foundation of warm cream and ivory tones (`#FEF9EF`, `#FCFAF5`, `#F3EDE4`) to replicate premium archival paper.
- **Institutional Authority:** Grounded in deep charcoal typography (`#1D1C16`) and royal midnight navy (`#070817`) accents.
- **Champagne Gold Detailing:** Hand-crafted hairlines, badges, and progress indicators in refined gold (`#C6A15B`, `#E8D19A`, `#775A1A`).
- **Veracity First:** Strictly honest academic data; no fabricated testimonials, no exaggerated rankings, and clear curriculum boundaries (e.g., explicit exclusion of Science stream in 11–12).
- **Direct Parent-Educator Communication:** Zero backend database overhead or third-party CRM friction. Parents submit their child's details through a validated consultation interface that directly generates formatted WhatsApp (`https://wa.me/`) and Email (`mailto:`) dispatches addressed personally to Saif Sir.

> [!IMPORTANT]
> **Owner Decisions & Production Confirmations:**
> 1. **Production Domain & Canonical URL:** Confirmed as `https://svtutorial.in` (configured across canonical tags, Open Graph, Twitter/X, JSON-LD, sitemap.xml, and robots.txt).
> 2. **Official Business Email:** Confirmed as `saif@svtutorial.in` (configured in `client/.env`, footer, and direct consultation mailto generator).
> 3. **WhatsApp Contact Number:** Configured in `client/.env` as `918238843699`.
> 4. **Career Timeline Flag:** The supplied institutional tenures (Ignite Academy 2 yrs + Saraswati Classes 3 yrs + Good Shepherd Mission School 4 yrs) total 9 years if sequential, whereas overall stated career is 8 years. All durations are preserved exactly and await owner confirmation regarding concurrent roles.

---

## 2. Technology Stack & Architecture

### Frontend Architecture (Static SPA)
- **Runtime & Library:** React 19 (`react`, `react-dom`)
- **Build Tool:** Vite 8 powered by Rolldown
- **CSS Engine:** Tailwind CSS v4 using `@theme` token definitions
- **Smooth Inertial Scrolling:** Lenis 1.3.17 integrated with GSAP ticker
- **Animation & Motion:** 
  - GSAP 3.15 + ScrollTrigger plugin
  - Framer Motion 12.4
  - Web Animations API (`element.animate`) for zero-dependency high-frequency transitions
- **Iconography:** Lucide React (feather-light, tree-shakeable SVG icons)
- **Code Quality:** Oxlint (high-performance Rust-based linter, 0 errors, 0 warnings)
- **Zero Server Overhead:** Completely decoupled from backend servers, MongoDB, or Express. Static HTML/JS/CSS assets can be deployed to any modern CDN (Vercel, Netlify, Cloudflare Pages, GitHub Pages, or AWS S3).

---

## 3. Directory & File Organization

```
saif/
├── package.json                   # Root scripts (dev, build, preview, lint)
├── vercel.json                    # Standalone Vercel deployment configuration
├── README.md                      # Quickstart guide
├── DOCUMENTATION.md               # Full technical documentation
│
└── client/                        # Standalone React 19 + Vite 8 Application
    ├── index.html                 # SEO metadata, Google Fonts, JSON-LD Schema
    ├── vite.config.js             # Vite 8 configuration with optimized code-splitting
    ├── .oxlintrc.json             # Oxlint configuration
    ├── .env                       # Verified environment variables
    ├── .env.example               # Template environment variables
    ├── public/
    │   ├── favicon.svg            # Intertwined SV monogram vector icon
    │   ├── logo.png               # Official brand identity asset
    │   ├── robots.txt             # Search engine crawler policies
    │   └── sitemap.xml            # Search index map
    └── src/
        ├── main.jsx               # React DOM entry point
        ├── App.jsx                # Layout orchestrator, Lenis scroll loop, skip link
        ├── index.css              # Tailwind v4 @theme tokens, typography, utilities
        ├── data/
        │   └── programmes.js      # Structured curriculum information & teacher details
        ├── utils/
        │   └── whatsapp.js        # Reusable WhatsApp & Email URL generator utilities
        ├── components/
        │   ├── Navbar.jsx         # Sticky frosted navigation, active section tracking
        │   ├── Hero.jsx           # Editorial hero with arched portrait & BorderBeam
        │   ├── AcademicMarquee.jsx# Smooth infinite ticker of academic boards
        │   ├── TrustCredentials.jsx # 4-column animated counter metrics
        │   ├── TopPerformers.jsx  # Interactive Board achievers with result banners
        │   ├── ProgramsSection.jsx # Bento grid of Standard 3–12 offerings
        │   ├── CurriculumDiagnostic.jsx # Interactive grade & board advisor
        │   ├── TeachingPhilosophy.jsx # 4-pillar methodology breakdown
        │   ├── TeacherProfile.jsx # Saif Vegdani profile with dual-photo toggle
        │   ├── BatchTimings.jsx   # 4:30 PM–8:00 PM operational schedule
        │   ├── AdmissionsEnquiry.jsx # Validated consultation form & dispatch selector
        │   ├── FAQSection.jsx     # Category-filtered accordion FAQ
        │   ├── Footer.jsx         # Archival institutional footer
        │   └── WhatsAppFloating.jsx # Sticky right-side dock (WhatsApp, Email, LinkedIn) + Top button
        └── components/ui/
            ├── IntroLoader.jsx    # Multilingual Apple-style opening loader
            ├── CustomCursor.jsx   # Dual-layer gold follower (pointer:fine only)
            ├── MagneticButton.jsx # Spring-based cursor pull effect
            ├── SplitText.jsx      # Scroll-triggered masked word reveal
            ├── SectionDivider.jsx # Hairline champagne expanding divider
            ├── NumberTicker.jsx   # Accessible number count-up component
            ├── BorderBeam.jsx     # Animated SVG perimeter beam
            └── NoiseOverlay.jsx   # High-performance SVG grain texture
```

---

## 4. Design System & Token Architecture

All design variables are declared in `client/src/index.css`:

### Color Tokens

| Token | HEX Code | Purpose & Application |
| :--- | :--- | :--- |
| `--color-ivory` | `#FEF9EF` | Primary canvas background; warm paper tone |
| `--color-ivory-light` | `#FCFAF5` | Elevated card surfaces and floating panels |
| `--color-ivory-tint` | `#F3EDE4` | Subtle section alternations and recessed wells |
| `--color-midnight` | `#070817` | High-contrast institutional badges and footer elements |
| `--color-midnight-card`| `#0D1024` | Surface base for midnight elements |
| `--color-midnight-surface`| `#11132B`| Accent depth for dark surfaces |
| `--color-gold` | `#C6A15B` | Champagne gold accent, key CTAs, focus rings |
| `--color-gold-light` | `#E8D19A` | Shimmer sweeps and gradient highlights |
| `--color-gold-dark` | `#775A1A` | Pressed button states and high-contrast text |
| `--color-charcoal` | `#1D1C16` | Primary body typography and sharp headlines |
| `--color-charcoal-muted`| `#69665F`| Secondary body text, dates, and metadata |
| `--color-border-soft` | `#E7DFD0` | 1px hairline dividers and subtle card outlines |

### Typography Scale & Script Fonts

- **Headings:** `Playfair Display` (Serif) — used for all editorial titles, quotations, and large numerals.
- **Body & Controls:** `Manrope` & `Inter` (Sans-Serif) — clean, highly readable typography optimized for screens.
- **Multilingual Native Fonts:**
  - Devanagari (Hindi): `Noto Sans Devanagari`
  - Gujarati: `Noto Sans Gujarati`
  - Urdu: `Noto Nastaliq Urdu` (with native `dir="rtl"`)

---

## 5. Direct Enquiry & Communication Flow

### 5.1 AdmissionsEnquiry.jsx (Direct WhatsApp & Email Dispatch)
1. **Client-Side Validation:**
   - Parent / Guardian name: Required, minimum 2 characters.
   - Student name: Required, minimum 2 characters.
   - Mobile Number: Strict Indian 10-digit mobile number format (`/^[6-9]\d{9}$/`).
   - Standard & Board Enforcement: Standards 9–10 and 11–12 automatically enforce GSEB board.
2. **Instant Dispatch Selector:**
   - On valid submission, the user transitions to an Apple/Stripe-styled confirmation screen.
   - Shows a structured verification summary card with Student Name, Parent Name, Standard, Board, Phone, and Academic Notes.
   - Two large one-click dispatch options:
     - **"Send via WhatsApp (Instant Reply)"**: Launches `https://wa.me/918238843699?text=...` with full pre-filled details.
     - **"Send via Email (Official Record)"**: Launches `mailto:saifvegdani@gmail.com?subject=...&body=...` addressed directly to Saif Sir.
   - Clear helper instructions informing parents that their message is pre-written and only requires tapping "Send" inside their application.
   - Reset option allowing parents to edit details or submit an enquiry for a sibling.

### 5.2 WhatsAppFloating.jsx (Sticky Right Dock & Scroll-to-Top)
- **Desktop Floating Dock:** Compact vertical pill docked to the right edge with 3 quick-action buttons:
  - Email Saif Sir (`mailto:`)
  - WhatsApp Chat (`https://wa.me/`)
  - LinkedIn Profile
- **Scroll-to-Top Button:** Appears smoothly when scrolled past 400px; triggers Lenis smooth inertial scrolling to top of page.
- **Mobile Quick Action Pill:** Dual WhatsApp & Email capsule docked at bottom right (`md:hidden`).

---

## 6. Performance & Code Quality Benchmarks

### Oxlint Static Analysis
```
Command: npm run lint --prefix client
Result: Found 0 warnings and 0 errors across 26 files with 104 rules.
Execution Time: ~39ms
```

### Vite 8 / Rolldown Build Diagnostics
```
Command: npm run build --prefix client
Result: Built in ~1.22s

Asset Distribution:
dist/index.html                           5.30 kB │ gzip:  1.77 kB
dist/assets/index.css                    60.92 kB │ gzip: 10.66 kB
dist/assets/vendor-icons.js              19.03 kB │ gzip:  7.27 kB
dist/assets/index.js                    138.83 kB │ gzip: 30.57 kB
dist/assets/vendor-react.js             210.53 kB │ gzip: 65.70 kB
dist/assets/vendor-motion.js            281.29 kB │ gzip: 99.23 kB
```

---

## 7. Deployment Guide

### Local Development
```bash
# 1. Install client dependencies
npm install --prefix client

# 2. Run local development server
npm run dev
# -> Local: http://localhost:5173
```

### Static Hosting Deployment (Vercel / Netlify / Cloudflare Pages)
- **Build Command:** `npm run build` (or `npm run build --prefix client`)
- **Output Directory:** `client/dist`
- **Root vercel.json:** Included at repository root with single-page routing rewrite rules.
- **Environment Variables:**
  - `VITE_WHATSAPP_NUMBER`: e.g. `918238843699`
  - `VITE_CONTACT_EMAIL`: e.g. `saifvegdani@gmail.com`
  - `VITE_LINKEDIN_URL`: e.g. `https://www.linkedin.com/in/saif-vegdani`
