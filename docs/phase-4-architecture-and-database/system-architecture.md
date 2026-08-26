# High-Level System Architecture

## 1. Architectural Topology
The Student Information System is architected as a decoupled, three-tier cloud-distributed platform:

```
[ CLIENT BROWSER (User Interface) ]
              │
              │ HTTPS (Static Asset Delivery)
              ▼
+-------------------------------------------------------+
|              TIER 1: FRONTEND (SPA)                   |
|               Hosted on GitHub Pages                  |
|  - Role-Based Dynamic Views (Admin / Faculty / Student)|
|  - Client State & Session Management                  |
|  - Glassmorphism Design System & View Controllers     |
+-------------------------------------------------------+
              │
              │ HTTPS / REST API (JSON Payloads + JWT)
              ▼
+-------------------------------------------------------+
|              TIER 2: BACKEND (REST API)               |
|                  Hosted on Render                     |
|  - Presentation Controllers & Route Handlers          |
|  - Security Middleware (JWT Auth & Role Guards)       |
|  - Domain Model Layer (User, Course, Enrollment, etc.)|
|  - Application Services (Business Invariants)         |
|  - Persistence Data Access Layer (Repositories)       |
+-------------------------------------------------------+
              │
              │ TCP / TLS (PostgreSQL Wire Protocol)
              ▼
+-------------------------------------------------------+
|           TIER 3: DATA PERSISTENCE LAYER              |
|        Hosted on Cloud Database (PostgreSQL)          |
|  - Relational Tables, Constraints & Indices           |
|  - Referential Integrity & ACID Transaction Engine    |
+-------------------------------------------------------+
```

---

## 2. Decoupled Communication Boundary
- **Stateless REST Communication**: The frontend never accesses the database directly. All interactions occur via authenticated REST API calls over HTTPS.
- **CORS Restricted Boundary**: The backend allows cross-origin requests exclusively from the designated GitHub Pages domain origin.
- **Session Tokens**: Authentication tokens (JWT) encapsulate user identity and roles, transmitted in standard `Authorization: Bearer <token>` HTTP headers.\n