# Non-Functional Requirements Specification

Non-Functional Requirements (NFRs) specify the quality attributes, operational standards, security constraints, and architectural characteristics of the Student Information System.

---

## 1. Quality Attributes Specification

### NFR-01 — Security
- **Requirement**: The system must protect user authentication credentials using industry-standard hashing algorithms and transmit all communication securely over HTTPS.
- **Metric / Standard**: Passwords must never be stored in plain text; authenticated sessions must use secure, signed token mechanisms (e.g., JWT).

### NFR-02 — Authorization
- **Requirement**: The system must enforce strict role-based access control (RBAC). A user authenticated under one role must not be able to invoke operations or query endpoints belonging to another role.
- **Metric / Standard**: Every API endpoint and view state must validate user identity and permissions before execution.

### NFR-03 — Maintainability
- **Requirement**: The codebase must be modular, adhering to clean Object-Oriented Analysis and Design principles (high cohesion, low coupling, single responsibility, well-defined abstraction layers).
- **Metric / Standard**: Clear separation between domain models, presentation layer, and data persistence layer.

### NFR-04 — Scalability
- **Requirement**: The architecture must support seamless expansion, allowing future modules (e.g., examination scheduling, fee payments) to be integrated with minimal refactoring of existing modules.
- **Metric / Standard**: Decoupled RESTful API contract and layered object-oriented boundaries.

### NFR-05 — Usability
- **Requirement**: The web application must provide an intuitive, responsive, and clear user interface suitable for administrative staff, faculty members, and students.
- **Metric / Standard**: Common user actions (e.g., marking attendance, viewing grades) should be accomplishable in 3 or fewer clicks from the primary dashboard.

### NFR-06 — Data Integrity
- **Requirement**: Relational integrity and business consistency must be enforced across students, courses, faculty assignments, attendance records, and grades.
- **Metric / Standard**: Foreign key constraints, transactional consistency, and avoidance of orphaned or conflicting records.

### NFR-07 — Availability
- **Requirement**: The deployed cloud web application must remain accessible across standard modern desktop and mobile web browsers without requiring specialized client-side software.
- **Metric / Standard**: 99% operational uptime during standard academic hours; standard cross-browser compatibility (Chrome, Firefox, Edge, Safari).

### NFR-08 — Performance
- **Requirement**: Routine operational transactions (such as login, viewing dashboards, fetching student records, and submitting attendance) must execute with minimal latency.
- **Metric / Standard**: Backend REST API response times for standard queries should remain under 500ms under normal operating load.\n