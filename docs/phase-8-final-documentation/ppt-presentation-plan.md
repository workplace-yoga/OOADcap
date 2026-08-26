# Academic PPT Presentation Plan (20 Slides)

## Slide Deck Outline & Layout

### Slide 1: Title Slide
- **Title**: Student Information System Using Object-Oriented Design (SIS-OOAD)
- **Subtitle**: Academic Capstone Project Presentation & Defense
- **Team**: Capstone Project Team
- **Key Visual**: SIS Capstone Crest & Tech Badges (OOAD • Node.js • Vanilla SPA • PostgreSQL)

### Slide 2: Introduction & Motivation
- **Context**: Growth of digital campus administrative requirements.
- **Purpose**: Moving from unorganized spreadsheets to a centralized, reliable object-oriented software system.
- **Key Takeaway**: Forward-engineered from formal OOAD analysis to cloud deployment.

### Slide 3: Problem Statement
- **Identified Deficiencies**: Manual data handling, duplicate entries, lack of role security, uncalculated attendance percentages, and difficulty generating transcripts.

### Slide 4: Project Objectives & Scope
- **Core Pillars**: Centralized institutional records, strict OO design, JWT role security, automated grade computations, and high availability.

### Slide 5: System Actors & Module Boundaries
- **3 Actors**: `ADMIN`, `FACULTY`, `STUDENT`.
- **6 Modules**: Auth, Student CRUD, Faculty Directory, Course & Enrollment, Attendance, Academic Records.

### Slide 6: Use Case Analysis & Diagram
- **Visual**: Use Case Diagram (`uml/use-case-diagram.svg`).
- **Discussion**: 18 specialized use cases with clear boundaries between Administrative governance, Faculty instruction, and Student self-service.

### Slide 7: Object-Oriented Analysis & CRC Modeling
- **Transition**: Extracting candidate domain objects from requirement statements using CRC (Class-Responsibility-Collaborator) cards.

### Slide 8: Master UML Class Diagram
- **Visual**: Class Diagram (`uml/class-diagram.svg`).
- **Key Concepts**: `User` hierarchy, `Enrollment` aggregate root, `Attendance` and `AcademicRecord` composition.

### Slide 9: OOAD Principles in System Design
- **Table**: Concrete mapping of Encapsulation, Abstraction, Inheritance, Polymorphism, Association, Composition, High Cohesion, and Low Coupling.

### Slide 10: Dynamic Object Interaction (Sequence Diagrams)
- **Visuals**: Attendance Recording & Grade Evaluation sequence flows.
- **Explanation**: How presentation controllers delegate to services, which trigger domain methods to compute invariants.

### Slide 11: Workflow Modeling (Activity & State Diagrams)
- **Visual**: Lifecycle of Enrollment and Assessment State Transitions (`uml/state-diagram.svg`).

### Slide 12: Layered System Architecture
- **Visual**: 5-Layer Backend Architecture (`architecture/system-architecture.svg`).
- **Layers**: Presentation $ightarrow$ Application Services $ightarrow$ Domain Model $ightarrow$ Persistence Repositories $ightarrow$ Relational Database.

### Slide 13: Database Design & Normalization
- **Visual**: 3NF Relational ER Diagram (`architecture/er-diagram.svg`).
- **Highlights**: 8 Normalized tables, foreign key constraints, cascading deletions.

### Slide 14: Frontend Architecture & Glassmorphic UI
- **Design System**: Vanilla CSS3 glassmorphism, responsive data tables, role-based dashboards, modal forms, toast notifications.

### Slide 15: OOAD Evidence in Implementation
- **Direct Code References**: `#passwordHash` in `User.js`, `validateScores()` in `AcademicRecord.js`, Polymorphic `getDashboardRoute()`.

### Slide 16: Verification & Testing Results
- **Results**: 28 / 28 Automated Integration Tests Passed (100% Success Rate).
- **Categories**: Functional, RBAC authorization, IDOR protection, domain invariants, and SQL injection parameterization.

### Slide 17: Production Cloud Deployment
- **Visual**: Deployment Topology (`architecture/deployment-diagram.svg`).
- **URLs**: GitHub Pages (`https://yogan.github.io/OOAD-cap/`) + Render (`https://sis-ooad-backend.onrender.com`).

### Slide 18: Engineering Challenges & Resolutions
- **Addressed Challenges**: Port collision during test imports, client-side routing on static CDNs, IDOR prevention in profile lookups.

### Slide 19: Future Scope
- **Extensions**: Fee payment gateway integration, hostel & library management modules, native mobile applications.

### Slide 20: Conclusion & Summary
- **Final Summary**: Successfully engineered a robust, secure, and maintainable Student Information System strictly following OOAD lifecycle forward engineering.
