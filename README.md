# S.V. TUTORIAL — Premium Tuition Academy Website

> **High-Converting, Minimalist Academic Web Experience for Saif Barkat Vegdani (Standards 3–12)**

---

## 1. Executive Summary & Brand Identity

This digital platform delivers an editorial, luxury-minimalist web presence for **Saif Barkat Vegdani**'s Tuition Classes. Moving away from generic, overcrowded coaching templates, the visual identity is inspired by heritage private academies, high-culture editorial publications, and architectural clarity.

### Verified Teacher Profile
- **Educator:** Saif Barkat Vegdani
- **Age:** 26 years
- **Formal Qualifications:**
  - Bachelor of Commerce (B.Com)
  - Bachelor of Education (B.Ed)
- **Overall Teaching Experience:** 8 years
- **Institutional Teaching History:**
  - **Ignite Academy:** Mathematics & Science — 2 years
  - **Saraswati Classes:** Social Science — 3 years
  - **Good Shepherd Mission School:** School Faculty — 4 years

---

## 2. Curriculum & Academic Programmes

### Programme 01 — Primary & Middle Foundation (Standards 3–8)
- **Boards:** GSEB & CBSE
- **Scope:** All school subjects **except Sanskrit**
- **Focus:** Concept-first reasoning, step breakdown, foundational study stamina, and daily homework revision.

### Programme 02 — Secondary Board Preparation (Standards 9–10)
- **Board:** GSEB Board Exclusively
- **Scope:** All subjects **except Computer and Sanskrit**
- **Focus:** Board syllabus pacing, Gujarat Board blueprint answer presentation, timed mock simulations, and 1-on-1 doubt clinics.

### Programme 03 — Higher Secondary Commerce (Standards 11–12)
- **Stream:** Commerce Stream (GSEB)
- **Scope:** All Commerce subjects covered (Accountancy, Economics, Statistics, Business Studies/O.C.)
- **Focus:** Conceptual depth in double-entry bookkeeping, numerical worksheets, and specialized commerce guidance from a B.Com & B.Ed mentor.

### Confirmed Batch Window
- **Evening Batches:** **4:30 PM – 8:00 PM** (Monday to Saturday)
- Standard-wise slots are tailored upon personal consultation to ensure zero conflicts with school shift timings.

---

## 3. Technology Stack & Architecture

Built as a lightweight, static **React 19 + Vite 8** Single-Page Application:

### Frontend (`/client`)
- **Framework:** React 19 + Vite 8
- **Styling:** CSS design tokens + Tailwind CSS v4 (`@tailwindcss/vite`)
- **Typography:** Google Fonts — *Playfair Display* (Editorial Serif) & *Manrope* (Geometric Sans)
- **Motion & Interactions:** GSAP 3 + ScrollTrigger & Framer Motion
- **Icons:** Lucide React
- **Direct Communication:** Direct WhatsApp (`https://wa.me/`) & Direct Email (`mailto:`) enquiry dispatch (no backend server or database required).
- **SEO & Accessibility:** Semantic HTML5, Schema.org JSON-LD structured data, Open Graph meta tags, XML sitemap, and robots.txt.

---

## 4. Local Development Setup

### Prerequisites
- Node.js (v18 or higher; tested on v24)
- npm (v9 or higher; tested on v11)

### Installation & Development
```bash
# 1. Install client dependencies
npm install --prefix client

# 2. Start Vite dev server
npm run dev

# 3. Production build
npm run build

# 4. Lint with Oxlint
npm run lint
```

---

## 5. Direct Admission Enquiry System

Parents submit their student's details through a validated client-side form:
1. **Client-side validation:** Validates 10-digit Indian phone numbers (`/^[6-9]\d{9}$/`), student and parent names, and grade/board rules.
2. **Dispatch Choice:** Presents parents with instant **"Send via WhatsApp"** and **"Send via Email"** buttons with all details pre-formatted.
3. **Direct Delivery:** Opens WhatsApp or their email client addressed directly to Saif Sir, where they tap "Send" to deliver their request.
