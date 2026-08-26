# Production Deployment Architecture

## 1. Cloud Infrastructure Topology
The production deployment decouples static client hosting from backend application compute and persistent relational storage:

```
                            INTERNET (HTTPS / TLS 1.3)
                                       │
                ┌──────────────────────┴──────────────────────┐
                │                                             │
                ▼                                             ▼
     [ GitHub Pages (Frontend) ]                   [ Render (Backend API) ]
   https://yogan.github.io/OOAD-cap/          https://sis-ooad-backend.onrender.com
   - Static Asset Edge CDN                    - Node.js 20 LTS Web Service
   - HTML5 / CSS3 / ES6 SPA                   - Layered OO Application Core
   - Zero-build client delivery               - JWT Authentication & RBAC Filters
                │                                             │
                │ REST API Calls (JSON over HTTPS + JWT)      │
                └─────────────────────────────────────────────┘
                                                              │
                                                              │ TLS Connection Pool
                                                              ▼
                                               [ Cloud Relational Database ]
                                                - 3NF PostgreSQL Relational Schema
                                                - ACID Transaction Guarantees
```

---

## 2. Decoupled Cloud Components
1. **Frontend (GitHub Pages)**:
   - High-availability global edge static hosting.
   - Client-side hash routing (`#/login`, `#/admin/dashboard`, `#/faculty/dashboard`, `#/student/dashboard`).
   - Auto-resolves API base URL to `https://sis-ooad-backend.onrender.com/api/v1`.
2. **Backend (Render Web Service)**:
   - Automated deployment from Git repository root directory `/backend`.
   - Continuous uptime with health check monitoring at `/api/v1/health`.
   - Production CORS whitelist restricting access to authorized GitHub Pages domains.
3. **Data Persistence (Cloud Relational DB)**:
   - Persistent relational tables with foreign key cascades and indexed lookup columns.
