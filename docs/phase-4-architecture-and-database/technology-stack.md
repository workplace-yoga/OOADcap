# Technology Stack Decision & Evaluation

## 1. Stack Evaluation & Academic Rationale
To ensure maximum academic demonstration of Object-Oriented Design, seamless deployment to GitHub Pages and Render, and clean separation of concerns, we evaluated candidate technology stacks across the three system tiers.

---

## 2. Final Selected Technology Stack

```
+-----------------------------------------------------------------------------------------------+
|                                    FINAL TECHNOLOGY STACK                                     |
+-----------------------------------------------------------------------------------------------+
| Tier          | Technology Chosen              | Version / Target  | Key Justification        |
+---------------+--------------------------------+-------------------+--------------------------+
| Frontend      | HTML5, Vanilla CSS3, ES6+ JS   | ES2022+ Standard  | Zero-build deployment to |
|               | (Modular Object-Oriented SPA)  | GitHub Pages      | GitHub Pages; clean OO   |
|               |                                |                   | component hierarchy.     |
+---------------+--------------------------------+-------------------+--------------------------+
| Backend       | Node.js / Express.js           | Node 20 LTS       | First-class ES6 classes, |
|               | (Layered OO Architecture)      | Render Web Service| clean middleware pipeline|
|               |                                |                   | & lightweight container. |
+---------------+--------------------------------+-------------------+--------------------------+
| Database      | PostgreSQL (Relational DB)     | PostgreSQL 15+    | Strong relational schema,|
|               | (Cloud Managed: Supabase/Neon) | Cloud TLS Instance| foreign keys & ACID locks|
+---------------+--------------------------------+-------------------+--------------------------+
| Auth & Comms  | JWT (JSON Web Tokens) + HTTPS  | RFC 7519 / TLS 1.3| Stateless role-bound auth|
+-----------------------------------------------------------------------------------------------+
```

---

## 3. Comparative Evaluation of Alternatives

### 3.1 Frontend Tier Alternatives
- **Evaluated**: React.js / Vite vs. Modular Vanilla ES6+ JavaScript.
- **Decision**: **Modular ES6+ JavaScript (Object-Oriented Client Architecture)**.
- **Why Chosen**: 
  1. Direct, native execution on **GitHub Pages** without complex CI build pipelines or Node SSR dependencies.
  2. Enables explicit demonstration of client-side OO principles (e.g., `ApiClient`, `AuthService`, `ViewComponent` base classes) rather than framework-abstracted hooks.
  3. Lightning fast load times and clean glassmorphism UI styling.

### 3.2 Backend Tier Alternatives
- **Evaluated**: Java Spring Boot vs. Python FastAPI vs. Node.js Layered Architecture.
- **Decision**: **Node.js (ES6 Classes & Layered Architecture)**.
- **Why Chosen**:
  1. Complete native support for ES6 Class inheritance, polymorphism, private fields (`#field`), and static factory methods.
  2. Instant cold-start and low memory footprint on **Render Free Tier** (Spring Boot frequently exceeds memory limits on free cloud tiers).
  3. Uniform JSON data handling from database through domain services to REST endpoints.

### 3.3 Database Tier Alternatives
- **Evaluated**: MongoDB (NoSQL) vs. PostgreSQL (Relational).
- **Decision**: **PostgreSQL (Cloud Relational Database)**.
- **Why Chosen**:
  1. Preserves relational integrity and strict foreign key relationships (`enrollments` $ightarrow$ `students`, `courses`).
  2. Supports ACID transactions necessary for synchronized attendance registers and grade updates.\n