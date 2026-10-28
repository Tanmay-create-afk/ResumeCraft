# 📄 ResumeCraft — Executive AI Resume Builder & ATS Studio

<p align="center">
  <a href="https://resumecraft-sigma.vercel.app/" target="_blank">
    <img src="https://img.shields.io/badge/🚀_LIVE_DEMO-resumecraft--sigma.vercel.app-6366F1?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Demo" />
  </a>
</p>

<p align="center">
  <strong>🌐 Live App:</strong> <a href="https://resumecraft-sigma.vercel.app/">https://resumecraft-sigma.vercel.app/</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React 19" />
  <img src="https://img.shields.io/badge/Vite-6.0-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Node.js-24.x-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express-4.x-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express" />
  <img src="https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB Atlas" />
  <img src="https://img.shields.io/badge/Google_Gemini-2.5_Flash-4285F4?style=for-the-badge&logo=google&logoColor=white" alt="Google Gemini AI" />
  <img src="https://img.shields.io/badge/Security-Hardened-emerald?style=for-the-badge&logo=shield" alt="Security Hardened" />
</p>

A full-stack, enterprise-grade AI resume builder engineered to create **100% ATS-compliant, recruiter-ready resumes**. Features split-screen real-time editing, physical 3D desk presentations, an AI bullet enhancer, a real-time ATS job description scanner, PDF resume parsing, public shareable web portfolios, and lossless 300 DPI vector PDF export.

---

## 🌟 Key Features

### 1. 🤖 AI Intelligence Engine (Dual-Engine Architecture)
- **One-Click Bullet Enhancer**: Highlight any work experience description and click **"Improve with AI"** to transform rough duty notes into quantified, high-impact achievements led by strong action verbs.
- **AI Executive Summary Generator**: Automatically synthesizes a compelling professional summary tailored to target job titles, years of experience, and top core competencies.
- **Fail-Safe Offline Resilience**: Integrates with the official **Google Gemini API** (`@google/genai`). If external APIs are unavailable or quota-limited, built-in domain-specific heuristic engines ensure **zero downtime or crashes**.

### 2. 🎯 Real-Time ATS Job Match Scanner
- **Job Description Matcher**: Paste any job posting into the in-studio scanner modal.
- **Instant Match Metrics**: Computes real-time **Match Score %**, detects matched technical keywords, surfaces high-priority missing keywords, and gives actionable recommendations before applying.

### 3. 📐 Interactive 3D Workstation (ThreeDTiltCard)
- **3D Physical Desk View**: Renders the resume as a physical document lying on an executive desk with 35° slant, optical foreshortening (`880px` perspective), physical stacked paper ream edges (`stackedPaper`), and layered cast shadows.
- **Dynamic 6DOF Tilt**: Responsive interactive cursor tracking (up to `±32°`) with sweeping specular glare sheen.
- **Flat 1:1 Focus Canvas**: True 0° frontal view for precision text editing and proofreading.
- **Fast Mode Transitions**: Snappy 250ms spring transitions between perspectives.

### 4. 📄 PDF Resume Parser & 1-Click Import
- Upload existing `.pdf` resumes directly from the dashboard.
- Uses server-side memory extraction (`pdf-parse`) to parse candidate details, contact links, career summaries, and technical skills straight into structured form data.

### 5. 🌐 Live Public Portfolio URLs (`/u/:shareSlug`)
- Generate unique, secure public share links (e.g. `/u/alex-morgan-3f9b1c`) in 1 click.
- Allows recruiters and hiring managers to inspect a clean, live browser portfolio without creating an account.

### 6. 📑 6 Recruiter-Grade ATS Templates
1. **Classic ATS**: Universal single-column chronological standard favored by Fortune 500 ATS systems (Taleo, Workday, Greenhouse).
2. **Harvard / Executive**: Standard Ivy League legal, corporate, and executive format.
3. **Jake's Resume**: Top-rated Silicon Valley software engineering layout.
4. **Modern Clean**: Left-accented leadership layout for Product Managers and Design Technologists.
5. **Tech Minimal**: Compact high-density layout tailored for Cloud, DevOps, and Systems Engineers.
6. **Gen Z Creative (Deedy)**: Dual-column modern layout for creative engineers.

### 7. 🖨️ Lossless Vector PDF Export & Custom Paper
- High-fidelity 300 DPI vector PDF export using `jspdf` and `html2canvas`.
- 6 executive paper backgrounds: Pure White, Warm Ivory, Slate, Nordic Sky, Sage Green, and Blush Velvet.
- Auto-Fit scaling engine and zoom controls (50% to 150%).

### 8. 🛡️ Hardened Production Security
- **NoSQL Injection Defense**: `express-mongo-sanitize` strips malicious query operators.
- **DDoS & Brute-Force Rate Limiting**: 25 auth attempts / 15 mins; 300 requests / 15 mins for general APIs.
- **HTTP Security Headers**: Complete `helmet` suite (HSTS, X-Frame-Options, CSP, nosniff).
- **In-Memory File Processing**: PDF uploads use memory buffers (`multer.memoryStorage()`) with strict `.pdf` MIME filtering — zero temporary files written to server disk.
- **Multi-Tenant Isolation**: All database operations strictly scoped to the authenticated user's ID.

---

## 🏗️ Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 19, Vite 6, Tailwind CSS 4, Lucide Icons, Canvas / WebGL |
| **PDF Engine** | jsPDF, html2canvas (Client-side 300 DPI Vector) |
| **Backend** | Node.js (v24+), Express 4 (ESM), Multer, pdf-parse |
| **Database** | MongoDB Atlas / Mongoose ORM |
| **AI Integration** | Google Gemini API (`@google/genai`) + Heuristic Algorithmic Engine |
| **Security** | Helmet, express-rate-limit, express-mongo-sanitize, bcryptjs, JWT |

---

## 📁 Project Structure

```
ResumeCraft/
├── Frontend/                           # React 19 + Vite Frontend Application
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/                 # Reusable UI (Button, Input, Navbar, ThreeDTiltCard, ATSScannerModal)
│   │   │   ├── forms/                  # Resume section editors (Personal, Experience, Skills, Education, etc.)
│   │   │   └── templates/              # 6 ATS Resume Templates (Classic, Harvard, Jake's, Modern, etc.)
│   │   ├── context/                    # AuthContext.jsx & ResumeContext.jsx (Dual-layer state sync)
│   │   ├── pages/                      # Home.jsx, Builder.jsx, Dashboard.jsx, Login.jsx, PublicPortfolio.jsx
│   │   ├── services/                   # api.js (Client API client with offline fallback handlers)
│   │   ├── routes.jsx                  # React Router application routes
│   │   └── App.jsx
│   ├── package.json
│   └── vite.config.js
│
├── backend/                            # Node.js + Express API Backend
│   ├── src/
│   │   ├── config/                     # db.js (MongoDB Atlas connection)
│   │   ├── controllers/                # authControllers.js, resumeController.js, aiController.js
│   │   ├── middleware/                 # authMiddleware.js (JWT Bearer token verification)
│   │   ├── models/                     # User.js (Bcrypt hashed), Resume.js (Public slug & data)
│   │   ├── routes/                     # authRoutes.js, resumeRoutes.js, aiRoutes.js
│   │   └── services/                   # aiService.js (Gemini SDK & Rule-based fallback algorithms)
│   ├── server.js                       # Express server entry point, Helmet & rate-limiting setup
│   └── package.json
│
├── .gitignore                          # Security-hardened git exclusion rules
└── README.md
```

---

## 📡 API Reference

### 🔐 Authentication (`/api/auth`)
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Public | Register user account with hashed password (`bcryptjs`). |
| `POST` | `/api/auth/login` | Public | Authenticate credentials and receive signed 30-day JWT. |
| `GET` | `/api/auth/me` | Protected | Fetch authenticated profile details. |

### 📑 Resumes (`/api/resumes`)
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/resumes` | Protected | List all saved resumes for the authenticated user. |
| `POST` | `/api/resumes` | Protected | Create and save a new resume document. |
| `GET` | `/api/resumes/:id` | Protected | Retrieve a single resume by its ID. |
| `PUT` | `/api/resumes/:id` | Protected | Update resume title, sections, and formatting. |
| `DELETE` | `/api/resumes/:id` | Protected | Remove a resume from the database. |
| `POST` | `/api/resumes/:id/duplicate` | Protected | Clone an existing resume document. |
| `POST` | `/api/resumes/:id/share` | Protected | Toggle public visibility and generate a share slug. |
| `GET` | `/api/resumes/public/:shareSlug` | Public | Fetch public resume for live portfolio display. |

### 🤖 AI & ATS Tools (`/api/ai`)
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/ai/enhance-bullet` | Public / Protected | Rewrites raw experience notes into quantified ATS bullets. |
| `POST` | `/api/ai/generate-summary` | Public / Protected | Generates tailored executive summaries from role & skills. |
| `POST` | `/api/ai/ats-scan` | Public / Protected | Scans resume against job description for match score & gaps. |
| `POST` | `/api/ai/parse-resume-pdf` | Public / Protected | Uploads and extracts contact, summary, and skills from PDF. |

### 🩺 Health & Diagnostics
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/health` | Public | Server status, security verification, and timestamp. |

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: `v20.x` or higher installed
- **MongoDB**: MongoDB Community Server locally or a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster

---

### 1. Backend Setup
1. Open a terminal and navigate to `backend/`:
   ```bash
   cd backend
   npm install
   ```
2. Configure your environment variables in `backend/.env`:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/resumecraft
   JWT_SECRET=your_super_secret_jwt_key_here
   CLIENT_URL=http://localhost:5173

   # Optional: Add Google Gemini API Key for live AI generation
   GEMINI_API_KEY=your_gemini_api_key_here
   ```
3. Start the backend development server:
   ```bash
   npm run dev
   ```
   *The backend will boot up on **`http://localhost:5000`** with MongoDB connected.*

---

### 2. Frontend Setup
1. In a new terminal, navigate to `Frontend/`:
   ```bash
   cd Frontend
   npm install
   ```
2. Configure environment settings in `Frontend/.env` (optional):
   ```env
   VITE_API_URL=http://localhost:5000
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. Open **`http://localhost:5173`** in your browser.

---

## 🔒 Security Posture & Hardening

- **Cryptographic Hashing**: Salted passwords using `bcryptjs` with cost factor 10.
- **JWT Protection**: Tokens signed with high-entropy keys and standard expiration.
- **Strict Authorization Boundary**: Multi-tenant isolation guarantees no user can access or alter another candidate's resumes.
- **NoSQL Query Sanitization**: Automatic stripping of `$` and `.` inputs blocks operator injection.
- **In-Memory File Parsing**: Uploaded `.pdf` files are parsed entirely in RAM buffers and discarded — no executable files or scripts can be uploaded or executed on the host.
- **Rate-Limited API Surfaces**: Automated brute-force prevention on credential endpoints and DDoS protection across all `/api/*` routes.

---

## 📄 License
This project is open-source and available under the **MIT License**.
