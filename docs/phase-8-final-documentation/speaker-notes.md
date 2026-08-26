# Comprehensive Presentation Speaker Notes

## Slide-by-Slide Speaking Script

### Slide 1: Title
> *"Good morning, respected examiners. Today we present our capstone project: 'Student Information System Using Object-Oriented Design'. Our objective was to demonstrate how rigorous Object-Oriented Analysis and Design transforms real-world academic requirements into a clean, maintainable, production-ready software system."*

### Slide 6: Use Case Analysis
> *"In Phase 2, we derived 18 distinct use cases across three well-defined actors: Admin, Faculty, and Student. As shown in our Use Case Diagram, responsibilities are strictly separated—students can only view their own courses and transcripts, faculty manage attendance and marks for their assigned courses, and administrators oversee institutional directories."*

### Slide 8: Master UML Class Diagram
> *"Here is the structural core of our system. Notice that `User` serves as an abstract base class, which is specialized by `Admin`, `Faculty`, and `Student`. `Enrollment` serves as an Aggregate Root that composes both `Attendance` logs and `AcademicRecord` assessments. Business calculations—such as computing attendance percentage and letter grades—reside directly in the domain entities, not in anemic database tables."*

### Slide 15: OOAD in Implementation
> *"During implementation, we avoided anemic CRUD models. For instance, in `User.js`, the password hash is completely private using ES6 `#passwordHash`. In `AcademicRecord.js`, the invariant that a score cannot exceed the maximum score is enforced internally inside `validateScores()`. Polymorphic routing in `getDashboardRoute()` enables the client router to dispatch dashboards cleanly without switch statements."*

### Slide 17: Deployment & Live Architecture
> *"Our production deployment decouples the frontend Single Page Application on GitHub Pages from the Node.js REST API on Render. All communications occur over encrypted HTTPS connections using stateless JWT tokens, backed by an auto-seeding relational database."*
