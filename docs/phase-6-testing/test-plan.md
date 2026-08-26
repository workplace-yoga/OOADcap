# Master System Test Plan & Quality Assurance Strategy

## 1. Overview & Objectives
The purpose of Phase 6 testing is to systematically validate that the Student Information System implementation satisfies all formal requirements (FR-01 to FR-21), complies with non-functional quality standards (NFR-01 to NFR-08), and faithfully realizes the Object-Oriented Design models produced in Phases 2, 3, and 4.

---

## 2. Test Scope & Categorization
The test suite spans 13 core dimensions:
1. **Functional Testing**: Verification of all student, faculty, course, enrollment, attendance, and marks capabilities.
2. **API Testing**: Verification of all 15 REST endpoints, request payloads, and status codes.
3. **Authentication Testing**: Verification of bcrypt hash matching, token issuance, and expired/missing token handling.
4. **Role-Based Authorization & IDOR**: Server-side RBAC verification across `ADMIN`, `FACULTY`, and `STUDENT` roles.
5. **Database Integration**: Verification of 3NF schema tables, foreign key cascades, and atomic writes.
6. **Frontend Integration**: Verification of SPA routing, glassmorphism UI components, modals, and toasts.
7. **Validation & Business Invariants**: Verification of domain constraints (score bounds, attendance statuses).
8. **Error Handling**: Standardized JSON error structures and status codes (`400`, `401`, `403`, `404`, `409`, `500`).
9. **Security Testing**: SQL injection pattern neutralization, JWT signing, password hash sanitization.
10. **OOAD Design Validation**: Code-level verification of encapsulation, inheritance, polymorphism, and DIP.
11. **UML ↔ Code Consistency**: Audit of domain classes against Phase 3 diagrams.
12. **End-to-End Cross-Module Flows**: Verification of the 5 primary multi-actor business flows.
13. **Performance Sanity**: API latency verification under standard operational queries.
