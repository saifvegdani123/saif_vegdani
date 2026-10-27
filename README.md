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

> [!NOTE]
> **Experience Duration Flag for Client Confirmation:**  
> The supplied institutional tenures (2 yrs + 3 yrs + 4 yrs) total **9 years** if viewed as sequential non-overlapping periods, whereas the overall stated experience is **8 years**. Per master specifications, all dates are preserved faithfully, and this item is flagged for client verification regarding concurrent roles.

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

Built as a modern, decoupled **MERN** fullstack architecture:

### Frontend (`/client`)
- **Framework:** React 19 + Vite 8
- **Styling:** Vanilla CSS design tokens + Tailwind CSS v4 (`@tailwindcss/vite`)
- **Typography:** Google Fonts — *Playfair Display* (Editorial Serif) & *Manrope* (Geometric Sans)
- **Motion & Interactions:** GSAP 3 + ScrollTrigger (with automatic `prefers-reduced-motion` detection and React Strict Mode context cleanup)
- **Icons:** Lucide React
- **SEO & Accessibility:** Semantic HTML5, WCAG 2.2 AA compliant focus states, accessible accordion, Schema.org JSON-LD structured data, Open Graph meta tags, XML sitemap, and robots.txt.

### Backend (`/server`)
- **Runtime:** Node.js + Express 4 (ES Modules)
- **Database:** MongoDB with Mongoose (featuring a resilient in-memory fallback mode so the server boots and responds instantly even before database credentials are provided)
- **Security:** Helmet headers, Express Rate Limiting (customized for general traffic and anti-spam form submissions), CORS whitelist configuration
- **Validation:** Strict server-side schema validation, input trimming, sanitization, and board rule enforcement (e.g. automatically validating that Standards 9–10 and 11–12 align with GSEB).

---

## 4. Local Development Setup

### Prerequisites
- Node.js (v18 or higher; tested on v24)
- npm (v9 or higher; tested on v11)

### Installation
From the root workspace directory, install dependencies for both client and server:

```bash
# Install server dependencies
cd server && npm install

# Install client dependencies
cd ../client && npm install
```

### Running Locally

1. **Start the Express API Server (Port 5000):**
   ```bash
   cd server
   npm run dev
   ```

2. **Start the Vite Frontend Development Server (Port 5173):**
   ```bash
   cd client
   npm run dev
   ```

3. Open **`http://localhost:5173`** in your browser. All requests to `/api/*` are automatically proxied to `http://localhost:5000`.

---

## 5. API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Healthcheck and MongoDB connection status |
| `GET` | `/api/programmes` | Returns confirmed academic curricula and subject scopes |
| `POST` | `/api/enquiries` | Validates, sanitizes, and stores student admission enquiries |
| `GET` | `/api/enquiries/summary` | Audit count of received enquiries |

### Sample POST `/api/enquiries` Payload
```json
{
  "parentName": "Rajesh Shah",
  "studentName": "Aarav Shah",
  "standard": "Std 10",
  "board": "GSEB",
  "phoneNumber": "9876543210",
  "preferredContact": "WhatsApp",
  "message": "Enquiring about Maths & Science batch availability"
}
```

---

## 6. Environment Variables Configuration

### Server (`server/.env`)
Copy `server/.env.example` to `server/.env`:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/saif_tuition_academy
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000,https://your-production-domain.com
WHATSAPP_PHONE=919876543210
```

### Client (`client/.env`)
Copy `client/.env.example` to `client/.env`:
```env
VITE_WHATSAPP_NUMBER=919876543210
```

---

## 7. Deployment Instructions

### Frontend (Vercel / Netlify / Cloudflare Pages)
1. Set the root directory to `client`.
2. Build command: `npm run build`
3. Output directory: `dist`
4. Set Environment Variable: `VITE_WHATSAPP_NUMBER` to the teacher's verified WhatsApp number.

### Backend (Render / Railway / VPS / AWS)
1. Set the root directory to `server`.
2. Start command: `node src/server.js`
3. Provide environment variables: `MONGODB_URI`, `ALLOWED_ORIGINS`, `NODE_ENV=production`.
