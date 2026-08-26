# SOLID Principles Analysis

## 1. Concrete Application in SIS Design

| Principle | Meaning & Application in SIS | Concrete System Example |
| :--- | :--- | :--- |
| **S — Single Responsibility Principle** | Each class has exactly one reason to change. | `AcademicRecord` is responsible *only* for validating and holding assessment scores; it does *not* format JSON or execute SQL queries. |
| **O — Open/Closed Principle** | Software entities should be open for extension, but closed for modification. | New user roles (e.g., `Staff`, `Auditor`) can be added by extending `User` and implementing `getDashboardRoute()` without modifying existing `AuthController` dispatch logic. |
| **L — Liskov Substitution Principle** | Subtypes must be substitutable for their base types. | `Admin`, `Faculty`, and `Student` can be passed to authentication and session management services expecting `User` without breaking correctness. |
| **I — Interface Segregation Principle** | Clients should not be forced to depend on interfaces they do not use. | Rather than one giant `ISystemService`, we define specialized interfaces: `IStudentService`, `IAttendanceService`, `IAcademicService`. |
| **D — Dependency Inversion Principle** | High-level modules should not depend on low-level modules; both depend on abstractions. | `AttendanceService` depends on the abstract interface `IEnrollmentRepository`, not a concrete PostgreSQL database driver. |\n