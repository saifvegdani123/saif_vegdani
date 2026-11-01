# S.V. TUTORIAL — END-TO-END PROJECT DOCUMENTATION
**Official Technical Architecture, UI/UX Design System, and Implementation Guide**

* **Institution:** S.V. Tutorial (Saif Barkat Vegdani Tuition Academy)
* **Founder & Principal Educator:** Saif Barkat Vegdani (B.Com, B.Ed — 8+ Years Experience)
* **Curricula Covered:** GSEB & CBSE (Standards 3–12), Specialized Higher Secondary Commerce (11–12)
* **Design Philosophy:** Apple/Stripe-level Minimalist Luxury Academic Experience
* **Base Theme:** Editorial Warm Ivory (`#FEF9EF`) with Champagne Gold (`#C6A15B`) and Royal Midnight (`#070817`)

---

## 1. Executive Summary & Brand Identity

The **S.V. Tutorial** digital platform is engineered to deliver a bespoke, high-trust educational experience. Unlike conventional, busy coaching class websites filled with aggressive popups and generic banners, this platform adopts a **prestige academic editorial tone**:

- **Predominantly Light & Editorial:** Built on a foundation of warm cream and ivory tones (`#FEF9EF`, `#FCFAF5`, `#F3EDE4`) to replicate premium archival paper.
- **Institutional Authority:** Grounded in deep charcoal typography (`#1D1C16`) and royal midnight navy (`#070817`) accents.
- **Champagne Gold Detailing:** Hand-crafted hairlines, badges, and progress indicators in refined gold (`#C6A15B`, `#E8D19A`, `#775A1A`).
- **Veracity First:** Strictly honest academic data; no fabricated testimonials, no exaggerated rankings, and clear curriculum boundaries (e.g., explicit exclusion of Science stream in 11–12).

> [!IMPORTANT]
> **Owner Decisions & Confirmations Required:**
> 1. **Production Domain & Canonical URL:** The canonical domain `https://saifvegdani.edu/` in `index.html` and JSON-LD is a development placeholder and must be confirmed with the owner's registered domain (e.g., `.in` or `.com`).
> 2. **WhatsApp Contact Number:** `VITE_WHATSAPP_NUMBER` must be set in `client/.env` to the owner's active WhatsApp business number.
> 3. **Career Timeline Flag:** The supplied institutional tenures (Ignite Academy 2 yrs + Saraswati Classes 3 yrs + Good Shepherd Mission School 4 yrs) total 9 years if sequential, whereas overall stated career is 8 years. All durations are preserved exactly and await owner confirmation regarding concurrent roles.

---

## 2. Technology Stack & Architecture

### Frontend Architecture
- **Runtime & Library:** React 19 (`react`, `react-dom`)
- **Build Tool:** Vite 8 powered by Rolldown
- **CSS Engine:** Tailwind CSS v4 using `@theme` token definitions
- **Smooth Inertial Scrolling:** Lenis 1.3.17 integrated with GSAP ticker
- **Animation & Motion:** 
  - GSAP 3.15 + ScrollTrigger plugin
  - Framer Motion 14.6
  - Web Animations API (`element.animate`) for zero-dependency high-frequency transitions
- **Iconography:** Lucide React (feather-light, tree-shakeable SVG icons)
- **Code Quality:** Oxlint (high-performance Rust-based linter, 0 errors, 0 warnings)

### Backend Architecture
- **Server:** Node.js + Express
- **Database:** MongoDB via Mongoose (with automated in-memory fallback for offline/development environments)
- **Security:** Helmet, CORS with strict origin whitelisting, rate limiting on form submissions
- **Communication:** Direct WhatsApp Web/Business API URI integration

---

## 3. Directory & File Organization

```
saif/
├── package.json                   # Root orchestrator scripts (install:all, dev, build)
├── README.md                      # Quickstart guide
├── DOCUMENTATION.md               # Full end-to-end technical documentation
│
├── client/                        # Frontend application (React 19 + Vite 8)
│   ├── index.html                 # SEO metadata, Google Fonts, JSON-LD Schema
│   ├── vite.config.js             # Vite configuration with Rolldown code-splitting
│   ├── .oxlintrc.json             # Oxlint configuration
│   ├── public/
│   │   ├── favicon.svg            # Intertwined SV monogram vector icon
│   │   ├── logo.png               # Official brand identity asset
│   │   ├── robots.txt             # Search engine crawler policies
│   │   └── sitemap.xml            # Search index map
│   └── src/
│       ├── main.jsx               # React DOM entry point
│       ├── App.jsx                # Layout orchestrator, Lenis scroll loop, skip link
│       ├── index.css              # Tailwind v4 @theme tokens, typography, utilities
│       ├── components/
│       │   ├── Navbar.jsx         # Sticky frosted navigation, scroll direction detect
│       │   ├── Hero.jsx           # Editorial hero with arched portrait & BorderBeam
│       │   ├── AcademicMarquee.jsx# Smooth infinite ticker of academic boards
│       │   ├── TrustCredentials.jsx # 4-column animated counter metrics
│       │   ├── TopPerformers.jsx  # Interactive Board achievers with result banners
│       │   ├── ProgramsSection.jsx # Bento grid of Standard 3–12 offerings
│       │   ├── CurriculumDiagnostic.jsx # Interactive grade & board advisor
│       │   ├── TeachingPhilosophy.jsx # 4-pillar methodology breakdown
│       │   ├── TeacherProfile.jsx # Saif Vegdani profile with dual-photo toggle
│       │   ├── BatchTimings.jsx   # 4:30 PM–8:00 PM operational schedule
│       │   ├── AdmissionsEnquiry.jsx # Validated consultation request form
│       │   ├── FAQSection.jsx     # Category-filtered accordion FAQ
│       │   ├── Footer.jsx         # Archival institutional footer
│       │   └── WhatsAppFloating.jsx # Floating advisory button with auto-dim
│       └── components/ui/
│           ├── IntroLoader.jsx    # Multilingual Apple-style opening loader
│           ├── CustomCursor.jsx   # Dual-layer gold follower (pointer:fine only)
│           ├── MagneticButton.jsx # Spring-based cursor pull effect
│           ├── SplitText.jsx      # Scroll-triggered masked word reveal
│           ├── SectionDivider.jsx # Hairline champagne expanding divider
│           ├── NumberTicker.jsx   # Accessible number count-up component
│           ├── BorderBeam.jsx     # Animated SVG perimeter beam
│           └── NoiseOverlay.jsx   # High-performance SVG grain texture
│
├── server/                        # Backend REST API (Express + MongoDB)
│   ├── package.json
│   ├── .env.example               # Environment variables template
│   └── src/
│       ├── server.js              # Express app bootstrap, CORS, error handling
│       ├── models/
│       │   └── Enquiry.js         # Mongoose schema for admissions enquiries
│       ├── routes/
│       │   ├── enquiryRoutes.js   # POST /api/enquiries validation & dispatch
│       │   └── programmeRoutes.js # GET /api/programmes data provider
│       └── data/
│           └── programmes.js      # Structured curriculum information
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
  - Tamil: `Noto Sans Tamil`
  - Bengali: `Noto Sans Bengali`
  - Kannada: `Noto Sans Kannada`

---

## 5. Key Component Deep Dive

### 5.1 IntroLoader.jsx (Apple-Inspired Multilingual Loader)
- **Lifecycle Protection:** Uses `runIdRef` combined with an `isCancelled` closure variable to guarantee that React 18/19 StrictMode double-invocations in development never cause duplicate counters or overlapping animation loops.
- **Greeting Sequence:** Sequentially transitions through:
  `नमस्ते` (Hindi) → `Hello` → `வணக்கம்` (Tamil) → `Bonjour` → `નમસ્તે` (Gujarati) → `Ciao` → `নমস্কার` (Bengali) → `Hola` → `ನಮಸ್ಕಾರ` (Kannada) → `Welcome` → Brand Hold: `S.V TUTORIALS`.
- **Counter & Progress:** Tabular numbers smoothly transition from `0%` to `100%` over 2400ms using a cubic ease-out curve (`1 - (1 - t)³`), synchronizing with a 2px champagne gold gradient hairline.
- **Curved Bottom Exit Wipe:** On completion or skip, executes a curved bottom drape reveal lifting upwards:
  ```javascript
  loader.animate([
    { transform: 'translateY(0)', borderRadius: '0 0 50% 50% / 0 0 0vh 0vh' },
    { transform: 'translateY(-100%)', borderRadius: '0 0 50% 50% / 0 0 24vh 24vh' }
  ], { duration: 850, easing: 'cubic-bezier(.76,0,.24,1)', fill: 'forwards' });
  ```
- **Skip Mechanics:** Tapping the screen, pressing `Escape`, or clicking the top-right `Skip [ESC]` pill initiates an accelerated smooth curtain wipe (~480ms) without visual stutter.
- **Session Cache:** Sets `sessionStorage.setItem('sv_loader_seen', 'true')` so return visits within the same session load immediately.

### 5.2 Navbar.jsx (Frosted Glass Header)
- **Scroll Direction Intelligence:** Compares current `window.scrollY` with the previous scroll position. Scrolling down gently hides the header (`-translate-y-full`); scrolling up immediately brings it back into view.
- **Active Section Tracking:** An `IntersectionObserver` continuously monitors section landmarks (`#programmes`, `#philosophy`, `#educator`, `#schedule`, `#admissions`) and updates the active navigation indicator.
- **Mobile Drawer:** An accessible full-screen cream overlay with large serif navigation links and direct WhatsApp links.

### 5.3 Hero.jsx (Editorial Entrance)
- **Typography:** Giant serif heading `"Concept-First Education for Confident Futures."` with a gold italic accent and custom animated underline.
- **Arched Portrait Frame:** Houses Saif Vegdani's photograph inside an architectural arch topped by an animated `BorderBeam.jsx`.
- **Floating Credential Badge:** Glassmorphic card highlighting `8+ Years Teaching Excellence` and `GSEB & CBSE Specialized`.
- **Magnetic Action Buttons:** Wrapped with `MagneticButton.jsx` for desktop cursor pull.

### 5.4 CurriculumDiagnostic.jsx (Interactive Grade Advisory)
- **Stateful Selector:** Allows parents to select their child's Board (GSEB / CBSE) and Grade (Standards 3–5, 6–8, 9–10, 11–12 Commerce).
- **Dynamic Output:** Updates in real-time, detailing core subjects, batch schedule, assessment cadence, and providing a pre-filled WhatsApp link:
  `"Hello Saif Sir, I would like to enquire regarding Class [X] ([Board]) batch timings..."`

### 5.5 AdmissionsEnquiry.jsx (Validated Consultation Form)
- **Validation Engine:** Enforces required fields, email formatting, and an exact 10-digit Indian mobile number (`/^[6-9]\d{9}$/`). Invalid numbers trigger a gentle shake animation and inline helper text.
- **Duplicate Prevention:** Disables the submit button and shows an animated spinner during transmission.
- **Backend Bridge:** Posts to `http://localhost:5000/api/enquiries` (or production API). If the backend is unreachable, it falls back to direct WhatsApp dispatch so no parent enquiry is ever lost.

---

## 6. Backend API Specifications

The server runs on Express and mounts at port `5000` (or `process.env.PORT`).

### Endpoints

#### 1. Submit Admissions Enquiry
- **Method:** `POST`
- **Route:** `/api/enquiries`
- **Headers:** `Content-Type: application/json`
- **Request Body:**
  ```json
  {
    "parentName": "Rajesh Patel",
    "studentName": "Aarav Patel",
    "phone": "9876543210",
    "standard": "Standard 10",
    "board": "GSEB",
    "preferredTime": "Evening",
    "notes": "Looking for Mathematics and Accountancy support."
  }
  ```
- **Success Response (`201 Created`):**
  ```json
  {
    "success": true,
    "message": "Enquiry registered successfully.",
    "enquiryId": "65e2f180a9b...",
    "whatsAppUrl": "https://wa.me/919876543210?text=..."
  }
  ```

#### 2. Get Academic Programmes
- **Method:** `GET`
- **Route:** `/api/programmes`
- **Success Response (`200 OK`):**
  Returns structured array of programmes, subject breakdown, eligibility, and features.

---

## 7. Performance & Code Quality Benchmarks

### Oxlint Static Analysis
```
Command: npm run lint --prefix client
Result: Found 0 warnings and 0 errors across 29 files with 104 rules.
Execution Time: ~53ms
```

### Vite 8 / Rolldown Build Diagnostics
```
Command: npm run build --prefix client
Result: Built in 1.52s

Asset Distribution:
dist/index.html                           5.52 kB │ gzip:  1.81 kB
dist/assets/index.css                    63.34 kB │ gzip: 10.62 kB
dist/assets/vendor-icons.js              18.22 kB │ gzip:  7.01 kB
dist/assets/index.js                    125.19 kB │ gzip: 28.00 kB
dist/assets/vendor-react.js             210.53 kB │ gzip: 65.70 kB
dist/assets/vendor-motion.js            281.29 kB │ gzip: 99.23 kB
```

### Motion Performance Safeguards
1. **Zero Layout Shift (CLS = 0):** Dimensions are preserved across all dynamic components; fonts load with `display=swap` and fallback matching.
2. **GPU-Accelerated Transforms:** All animations target only `transform`, `opacity`, and CSS `filter`.
3. **Accessibility (WCAG 2.1 AA):**
   - High text contrast across ivory and charcoal.
   - Visible champagne gold focus rings (`*:focus-visible`).
   - Screen-reader skip link (`#main-content`).
   - Complete `prefers-reduced-motion` compliance.

---

## 8. Deployment & Operation Guide

### Local Development Setup
```bash
# 1. Install dependencies for root, client, and server
npm run install:all

# 2. Run both Client and Server concurrently
# Terminal 1 (Client):
npm run dev:client
# -> Local: http://localhost:5173

# Terminal 2 (Server):
npm run dev:server
# -> Local: http://localhost:5000
```

### Production Build
```bash
# Build client for static hosting (Vercel, Netlify, Cloudflare Pages)
npm run build:client

# Start production Node server
npm start
```

### Recommended Hosting Topology
- **Client (Frontend):** Vercel, Cloudflare Pages, or Netlify. Set Root Directory to `client`, Build Command to `npm run build`, and Output Directory to `dist`.
- **Server (Backend):** Render, Railway, or VPS (Ubuntu/Nginx + PM2). Set Root Directory to `server` and Start Command to `npm start`.
- **Database:** MongoDB Atlas (M0 Free Tier or Dedicated Cluster). Provide connection string in `server/.env` under `MONGODB_URI`.

