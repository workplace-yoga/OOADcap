# Conceptual System Architecture

## 1. High-Level Decoupled Architecture
The Student Information System is designed as a modern, decoupled three-tier architecture:

```
+---------------------------------------------------------------------------------------------------+
|                                 CLIENT TIER (Single Page Application)                             |
|                                       Target: GitHub Pages                                        |
|  +---------------------------------------------------------------------------------------------+  |
|  |   Admin Portal View    |      Faculty Portal View       |       Student Portal View         |  |
|  +---------------------------------------------------------------------------------------------+  |
+---------------------------------------------------------------------------------------------------+
                                                  ▲
                                                  │ REST APIs (JSON over HTTPS)
                                                  ▼
+---------------------------------------------------------------------------------------------------+
|                                 APPLICATION SERVICE TIER (REST API)                               |
|                                            Target: Render                                         |
|  +---------------------------------------------------------------------------------------------+  |
|  | Presentation Controllers | Auth Middleware & RBAC Filters | Application Services Layer       |  |
|  +---------------------------------------------------------------------------------------------+  |
|  | Domain Entities & Business Rules (Encapsulated OO Model: User, Student, Course, Enrollment)  |  |
|  +---------------------------------------------------------------------------------------------+  |
|  | Infrastructure Adapters  | Repository Data Access Interfaces | Cryptography & Security        |  |
|  +---------------------------------------------------------------------------------------------+  |
+---------------------------------------------------------------------------------------------------+
                                                  ▲
                                                  │ Database Connection (TLS)
                                                  ▼
+---------------------------------------------------------------------------------------------------+
|                                   DATA PERSISTENCE TIER (Relational)                              |
|                                         Target: Cloud Database                                    |
+---------------------------------------------------------------------------------------------------+
```

---

## 2. Separation of Concerns
- **Client Tier**: Manages user interaction, view rendering, and client-side validation.
- **Service Tier**: Hosts domain logic, invariant validation, role authorization, and business workflows.
- **Persistence Tier**: Ensures reliable, transactional storage of relational records.\n