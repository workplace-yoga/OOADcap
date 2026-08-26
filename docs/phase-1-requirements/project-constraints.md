# Project Constraints

## 1. Academic Constraints
- **OOAD Foundation**: The project is developed specifically for an academic Object-Oriented Analysis and Design course. Technical success is measured by the clarity and depth of OOAD principles applied, not merely by working code.
- **Explicit Principle Visibility**: Object-oriented principles (abstraction, encapsulation, inheritance, polymorphism, cohesion, loose coupling, single responsibility, design patterns) must be explicitly demonstrated and documented.
- **No Backward Engineering**: Implementation must not precede analysis and design. The project must proceed strictly through defined lifecycle phases.
- **Demonstrability**: The system scope must remain focused and manageable to ensure complete end-to-end realization and demonstration within the project timeline.

---

## 2. Technical & Architectural Constraints
- **Separation of Concerns**: The project architecture mandates strict separation between the Frontend client and Backend REST API service.
- **Stateless REST Communication**: Frontend and backend must interact strictly via RESTful JSON endpoints over HTTPS.
- **Persistence Strategy**: A cloud-accessible relational database will provide persistent storage.
- **Platform-Independent Web Client**: The frontend must run in standard modern web browsers without requiring proprietary client-side runtimes.

---

## 3. Planned Deployment Constraints
- **Frontend Target**: GitHub Pages (Static / Single Page Application hosting).
- **Backend Target**: Render (Cloud container / web service hosting).
- **Database Target**: Cloud-managed SQL database (e.g., PostgreSQL / MySQL).
- **Deployment Timing**: Actual provisioning, deployment scripts, and CI/CD pipelines will be established during the later implementation and deployment phases.

---

## 4. Phase-Specific Boundary Constraints
- **Phase 1 Prohibition**:
  - ❌ Do NOT generate frontend or backend application code.
  - ❌ Do NOT create database schemas, tables, or migrations.
  - ❌ Do NOT configure or deploy cloud services.
  - ❌ Do NOT finalize implementation class diagrams prematurely.\n