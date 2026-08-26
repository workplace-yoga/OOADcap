# OOAD to Architecture Mapping

## 1. Mapping Matrix

| Phase 3 OOAD Design Element | Architectural Placement | Implementation Mechanism |
| :--- | :--- | :--- |
| **`User` Hierarchy (`Admin`, `Faculty`, `Student`)** | Domain Layer (`domain/model/user/`) | ES6 Class inheritance with polymorphic `getDashboardRoute()`. |
| **`Enrollment` Associative Entity** | Domain Layer (`domain/model/enrollment/`) | Domain class managing lifecycle of `Attendance` and `AcademicRecord`. |
| **`Attendance` & `AcademicRecord` Invariants** | Domain Entity Methods | Invariant validation methods (`updateScore()`, `updateStatus()`). |
| **`IAuthenticationService`, `IStudentService`** | Application Service Layer (`application/`) | Service classes orchestrating domain entities and repositories. |
| **`IRepository<T, ID>` Abstraction** | Persistence Boundary (`domain/repository/`) | Abstract interfaces implemented by PostgreSQL adapters (`infrastructure/persistence/`). |
| **Sequence Diagram Interactions** | Controller $ightarrow$ Service $ightarrow$ Domain Flow | Express Route $ightarrow$ Service method $ightarrow$ Domain method $ightarrow$ Repository save. |
| **Role-Based Authorization Rules** | Security Middleware (`presentation/middleware/`) | JWT Role Guard verifying claims before controller dispatch. |\n