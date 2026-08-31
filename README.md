# Student Information System Using Object-Oriented Design (SIS-OOAD)

An academic Object-Oriented Analysis and Design (OOAD) capstone project.

---

## 📌 Executive Summary
The **Student Information System (SIS)** is a centralized, web-based software platform engineered to manage student lifecycles, faculty directories, course offerings, enrollment links, lecture attendance registers, and continuous academic performance/marks. Developed strictly following forward **Object-Oriented Analysis and Design (OOAD)** principles, this project demonstrates end-to-end software engineering from requirement gathering and UML modeling to a 5-layer layered architecture, automated integration testing, and cloud deployment.

---

## 🌐 Production Cloud Deployment URLs

- **Live Web Application (Frontend)**: [https://workplace-yoga.github.io/OOADcap/](https://workplace-yoga.github.io/OOADcap/) *(Hosted on GitHub Pages)*
- **Live Backend REST API**: [https://ooadcap.onrender.com/api/v1](https://ooadcap.onrender.com/api/v1) *(Hosted on Render)*
- **API Health Check Endpoint**: [https://ooadcap.onrender.com/api/v1/health](https://ooadcap.onrender.com/api/v1/health)

---

## 🧭 Complete OOAD Engineering Lifecycle (Phases 1–8)

```text
Requirements & Project Scope (Phase 1) [COMPLETED]
       ↓
Object-Oriented Analysis & Use Cases (Phase 2) [COMPLETED]
       ↓
Object-Oriented Design & UML Modeling (Phase 3) [COMPLETED]
       ↓
System Architecture & 3NF Database Design (Phase 4) [COMPLETED]
       ↓
Full Layered Application Implementation (Phase 5) [COMPLETED]
       ↓
System Testing & Quality Validation (Phase 6) [COMPLETED]
       ↓
Production Cloud Deployment (Phase 7) [COMPLETED]
       ↓
Final Documentation, PPT & Viva Preparation (Phase 8) [COMPLETED]
```

---

## 🏛️ Project Directory Structure
```text
OOAD cap/
├── .github/workflows/deploy.yml         # GitHub Actions CI/CD for GitHub Pages
├── render.yaml                          # Render Infrastructure-as-Code blueprint
├── docs/
│   ├── phase-1-requirements/           # Requirements Analysis & Scope Freeze
│   ├── phase-2-object-oriented-analysis/# Use Cases, CRC Cards & Domain Models
│   ├── phase-3-object-oriented-design/ # UML Class, Sequence, Activity & State Diagrams
│   ├── phase-4-architecture-and-database/# 5-Layer Backend & 3NF Database Design
│   ├── phase-5-implementation/         # Implementation Overview & Evidence
│   ├── phase-6-testing/                # 28 Automated Test Suites & QA Reports
│   ├── phase-7-deployment/             # Production Deployment Architecture & Live Guides
│   └── phase-8-final-documentation/    # PPT Plan, Speaker Notes, Viva Guide & Audit
├── backend/                             # Layered Object-Oriented REST API (Node.js/Express)
│   ├── package.json
│   ├── server.js
│   ├── src/
│   │   ├── domain/model/                # Pure Domain Entities (User, Student, Course, etc.)
│   │   ├── application/                 # Use Case Services (AuthService, StudentService, etc.)
│   │   ├── infrastructure/              # Repositories & Security (SQL, bcrypt, JWT)
│   │   └── presentation/                # REST Controllers, Routes & Role Guards
│   └── tests/                           # Master Automated Verification Suite (28 Tests)
└── frontend/                            # Modular Client SPA (HTML5/Vanilla CSS3/ES6)
    ├── index.html
    ├── css/                             # Glassmorphism Design System
    └── js/                              # ApiClient, Router, StateManager, Views
```

---

## 🚀 How to Run Locally & Verify

### 1. Prerequisites
- **Node.js**: v18+ or v20+ LTS installed.

### 2. Start the Backend REST API Server
```bash
cd backend
npm install
npm start
```
Starts on **`http://localhost:5000`** with automatic database seed generation.

### 3. Run the Automated Verification Suite
```bash
cd backend
node tests/comprehensive.test.js
```
Executes all 28 automated integration test cases spanning Authentication, RBAC, Domain Invariants, and Security.

### 4. Launch the Frontend Web Client
Open **`frontend/index.html`** in any modern web browser or serve locally:
```bash
cd frontend
npx serve .
```

---

## 🔑 Preconfigured Demo Accounts

| Role | Username | Password | Key Capabilities |
| :--- | :--- | :--- | :--- |
| **Admin** | `admin` | `Admin@123` | Student CRUD, Course creation, Faculty allocation, Enrollment management. |
| **Faculty** | `dr_alan` | `Faculty@123` | Assigned to CS301 (OOAD): Record session attendance, Enter continuous marks. |
| **Faculty** | `prof_grace`| `Faculty@123` | Assigned to CS302 (DBMS): Class roster, Submit marks. |
| **Student** | `alice_smith` | `Student@123` | Enrolled in CS301 & CS302: View attendance percentage, Academic transcript & grades. |

---

## 🎓 Viva & Presentation Resources
- **PPT Presentation Plan (20 Slides)**: [`docs/phase-8-final-documentation/ppt-presentation-plan.md`](docs/phase-8-final-documentation/ppt-presentation-plan.md)
- **Speaker Notes**: [`docs/phase-8-final-documentation/speaker-notes.md`](docs/phase-8-final-documentation/speaker-notes.md)
- **Viva Defense Guide (50 Q&As)**: [`docs/phase-8-final-documentation/viva-preparation.md`](docs/phase-8-final-documentation/viva-preparation.md)
- **Live Demo Script**: [`docs/phase-8-final-documentation/live-demo-script.md`](docs/phase-8-final-documentation/live-demo-script.md)
- **"Point-and-Explain" Code Guide**: [`docs/phase-8-final-documentation/point-and-explain-guide.md`](docs/phase-8-final-documentation/point-and-explain-guide.md)
