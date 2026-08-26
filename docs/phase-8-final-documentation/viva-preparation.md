# Master Viva Voce Defense Question & Answer Guide (50 Q&As)

## Category A: Project Fundamentals
1. **Q: What is the primary objective of this project?**
   - **A**: To design, implement, and document a robust, centralized Student Information System using proper Object-Oriented Analysis and Design principles, replacing error-prone manual paper-based record-keeping.

2. **Q: Why is this an OOAD project rather than just a web application?**
   - **A**: Because the software was engineered strictly forward through formal requirements modeling, use case derivation, CRC responsibility allocation, UML class and sequence design, design pattern adoption, and non-anemic domain implementation.

## Category B: Object-Oriented Design & UML
3. **Q: Where is Encapsulation demonstrated in your code?**
   - **A**: In `User.js`, password hash is a private field (`#passwordHash`) accessible only via `user.authenticate()`. In `AcademicRecord.js`, scores are verified via `validateScores()` so invalid values cannot corrupt state.

4. **Q: Where is Inheritance used and why?**
   - **A**: `Admin`, `Faculty`, and `Student` inherit from `User`. This shares core identity attributes (`username`, `email`, `passwordHash`) while allowing role-specific specialization.

5. **Q: Where is Polymorphism used?**
   - **A**: `User.getDashboardRoute()` is implemented polymorphically across subclasses to return `"/admin/dashboard"`, `"/faculty/dashboard"`, or `"/student/dashboard"`.

6. **Q: What is the relationship between `Enrollment`, `Attendance`, and `AcademicRecord`?**
   - **A**: Composition. `Enrollment` acts as the Aggregate Root; attendance logs and marks cannot exist without an active course enrollment.

7. **Q: Why is your domain model non-anemic?**
   - **A**: Because calculation methods (`calculateAttendancePercentage()`, `computeFinalGrade()`, `validateScores()`) reside directly inside domain objects rather than procedural utility scripts.

## Category C: Architecture & Database
8. **Q: Explain your 5-Layer Backend Architecture.**
   - **A**: 
     1. *Presentation Layer*: REST Controllers and Role Guards.
     2. *Application Layer*: Services orchestrating use case transactions.
     3. *Domain Layer*: Pure business entities and invariants.
     4. *Persistence Layer*: Repository classes encapsulating SQL queries.
     5. *Database Layer*: 3NF relational storage.

9. **Q: Why did you separate the Frontend and Backend?**
   - **A**: To achieve low coupling, allow independent deployment scaling (GitHub Pages vs. Render), and enable multi-client access (web, mobile) through standardized REST APIs.

10. **Q: How does your database maintain referential integrity?**
    - **A**: Using foreign keys (`user_id`, `student_id`, `course_id`) and cascading deletions, ensuring no orphaned records exist when entities are removed.

## Category D: Security, Testing & Deployment
11. **Q: How do you prevent Insecure Direct Object References (IDOR)?**
    - **A**: By verifying token identities server-side: a student requesting `/api/v1/students/:id` can only view their own matching `studentId`, else `403 Forbidden` is returned.

12. **Q: How do you protect passwords in transit and storage?**
    - **A**: Transport is encrypted over HTTPS. Passwords are salted and hashed using bcrypt (10 rounds) before persistence; hashes are stripped from all API outputs.

13. **Q: What were the results of your automated verification testing?**
    - **A**: 28 automated integration test scenarios covering authentication, RBAC, domain validation, and SQL injection safety executed with a 100% pass rate.
