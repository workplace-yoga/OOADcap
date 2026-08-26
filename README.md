# Student Information System Using Object-Oriented Design (SIS-OOAD)

An academic Object-Oriented Analysis and Design (OOAD) capstone project.

---

## 📌 Project Overview
The **Student Information System (SIS)** is a centralized, web-based platform engineered to manage student records, faculty data, course catalog and enrollments, attendance tracking, and academic performance/marks. Developed strictly following Object-Oriented Analysis and Design principles, the project emphasizes domain modeling, modularity, encapsulation, loose coupling, and clean object-oriented architecture.

---

## 🌐 Production Cloud Deployment URLs

- **Live Web Application (Frontend)**: [https://yogan.github.io/OOAD-cap/](https://yogan.github.io/OOAD-cap/) *(Hosted on GitHub Pages)*
- **Live Backend REST API**: [https://sis-ooad-backend.onrender.com/api/v1](https://sis-ooad-backend.onrender.com/api/v1) *(Hosted on Render)*
- **API Health Check**: [https://sis-ooad-backend.onrender.com/api/v1/health](https://sis-ooad-backend.onrender.com/api/v1/health)

---

## 🏛️ Project Directory Structure
```text
OOAD cap/
├── .github/workflows/deploy.yml         # GitHub Actions CI/CD for GitHub Pages
├── render.yaml                          # Render Infrastructure-as-Code blueprint
├── docs/
│   ├── phase-1-requirements/           # Requirements & Scope Freeze
│   ├── phase-2-object-oriented-analysis/# Use Cases, CRC & Domain Models
│   ├── phase-3-object-oriented-design/ # UML Class, Sequence, Activity & State Diagrams
│   ├── phase-4-architecture-and-database/# 5-Layer Backend & 3NF Database Design
│   ├── phase-5-implementation/         # Implementation Overview & Evidence
│   ├── phase-6-testing/                # 28 Automated Test Suites & Quality Reports
│   └── phase-7-deployment/             # Production Deployment Architecture & Live Guides
├── backend/                             # Layered Object-Oriented REST API (Node.js/Express)
│   ├── package.json
│   ├── server.js
│   ├── src/
│   │   ├── domain/model/                # Pure OO Domain Entities (User, Student, Course, etc.)
│   │   ├── application/                 # Use Case Services (AuthService, StudentService, etc.)
│   │   ├── infrastructure/              # Repositories & Security (SQL, bcrypt, JWT)
│   │   └── presentation/                # REST Controllers, Routes & Role Guards
│   └── tests/                           # Master Automated Verification Suite (28 Tests)
└── frontend/                            # Modular Object-Oriented Client SPA (HTML5/CSS3/ES6)
    ├── index.html
    ├── css/                             # Glassmorphism Design System
    └── js/                              # ApiClient, Router, StateManager, Views
```

---

## 🚀 How to Run Locally

### 1. Start the Backend REST API Server
```bash
cd backend
npm install
npm start
```
Server runs on **`http://localhost:5000`** with automatic database seed generation.

### 2. Run the Automated Verification Suite
```bash
cd backend
node tests/comprehensive.test.js
```
Runs all 28 automated integration tests spanning Authentication, RBAC, Domain Invariants, and Security.

### 3. Launch the Frontend Web Client
Open **`frontend/index.html`** in any modern web browser or serve locally:
```bash
cd frontend
npx serve .
```

---

## 🔑 Demo Login Credentials

| Role | Username | Password | Key Capabilities |
| :--- | :--- | :--- | :--- |
| **Admin** | `admin` | `Admin@123` | Student CRUD, Course creation, Faculty allocation, Enrollment management. |
| **Faculty** | `dr_alan` | `Faculty@123` | Assigned to CS301 (OOAD): Record session attendance, Enter continuous marks. |
| **Faculty** | `prof_grace`| `Faculty@123` | Assigned to CS302 (DBMS): Class roster, Submit marks. |
| **Student** | `alice_smith` | `Student@123` | Enrolled in CS301 & CS302: View attendance percentage, Academic transcript & grades. |

---

## 🧭 OOAD Engineering Lifecycle
```text
Requirements (Phase 1) [COMPLETED]
       ↓
Object-Oriented Analysis & Use Cases (Phase 2) [COMPLETED]
       ↓
Domain Modeling & OO Design (Phase 3) [COMPLETED]
       ↓
System Architecture & DB Design (Phase 4) [COMPLETED]
       ↓
Full Application Implementation (Phase 5) [COMPLETED]
       ↓
Integration & Quality Validation (Phase 6) [COMPLETED]
       ↓
Production Deployment & Live Validation (Phase 7) [COMPLETED]
```
