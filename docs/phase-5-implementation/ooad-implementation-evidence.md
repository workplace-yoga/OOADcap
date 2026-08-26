# OOAD Implementation Evidence

## 1. Concrete Code References Demonstrating OOAD

| OOAD Principle | Concrete Implementation File | Specific Code Location & Rationale |
| :--- | :--- | :--- |
| **Encapsulation** | [`User.js`](../../backend/src/domain/model/User.js) | Private field `#passwordHash`; password verification occurs internally via `user.authenticate(plainPassword)`. |
| **Encapsulation** | [`AcademicRecord.js`](../../backend/src/domain/model/AcademicRecord.js) | `validateScores()` enforces $0 \le 	ext{scoreObtained} \le 	ext{maximumScore}$ whenever scores are updated. |
| **Abstraction** | [`SqlUserRepository.js`](../../backend/src/infrastructure/persistence/SqlUserRepository.js) | Hides database persistence queries behind `findById`, `save`, `deleteById` repository methods. |
| **Inheritance** | [`Admin.js`](../../backend/src/domain/model/Admin.js), [`Faculty.js`](../../backend/src/domain/model/Faculty.js), [`Student.js`](../../backend/src/domain/model/Student.js) | Classes extend `User`, inheriting identity, credentials, and authentication logic. |
| **Polymorphism** | [`User.js`](../../backend/src/domain/model/User.js) & Subclasses | `getDashboardRoute()` is implemented polymorphically across `Admin` (`"/admin/dashboard"`), `Faculty` (`"/faculty/dashboard"`), and `Student` (`"/student/dashboard"`). |
| **Association** | [`Course.js`](../../backend/src/domain/model/Course.js) | `course.assignFaculty(facultyId, facultyName)` maintains teaching assignment link. |
| **Composition** | [`Enrollment.js`](../../backend/src/domain/model/Enrollment.js) | `Enrollment` acts as Aggregate Root, owning `Attendance` and `AcademicRecord` instances. |
| **High Cohesion** | Domain Entities | `Attendance` manages session dates; `AcademicRecord` computes grades; controllers handle only HTTP parsing. |
| **Low Coupling** | [`ApiClient.js`](../../frontend/js/core/ApiClient.js) | Frontend views communicate with backend services solely through API client interfaces without direct SQL access. |
| **Dependency Inversion** | Application Services | Services depend on repository abstractions (`SqlUserRepository`), keeping business logic insulated from database engines. |
