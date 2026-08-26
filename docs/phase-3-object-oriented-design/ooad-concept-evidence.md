# OOAD Concept Evidence Matrix

## 1. Academic Proof of Concept Application

| OOAD Concept | Explicit Location in Design | Concrete System Evidence & Rationale |
| :--- | :--- | :--- |
| **Class** | `class-analysis.md`, `class-diagram.puml` | 8 formal domain classes (`User`, `Admin`, `Faculty`, `Student`, `Course`, `Enrollment`, `Attendance`, `AcademicRecord`). |
| **Object** | Runtime instances in sequence diagrams | Distinct runtime entities instantiated in memory during user workflows (e.g., `studentEntity`, `enrollEntity`). |
| **Encapsulation** | `encapsulation-design.md` | Private attributes (`- scoreObtained`, `- passwordHash`); public methods enforcing bounds ($0 \le \text{score} \le \text{max}$). |
| **Abstraction** | `abstraction-design.md` | `IAuthenticationService`, `IRepository<T, ID>` decouple domain logic from database and network drivers. |
| **Inheritance** | `inheritance-design.md` | `User <|-- Admin`, `User <|-- Faculty`, `User <|-- Student` specialization hierarchy. |
| **Polymorphism** | `polymorphism-design.md` | `User.getDashboardRoute()` and `User.getAccessPermissions()` resolved dynamically at runtime. |
| **Association** | `relationship-design.md` | `Faculty "1" --> "0..*" Course` represents teaching assignment. |
| **Aggregation** | `relationship-design.md` | `Student "1" o-- "0..*" Enrollment` (Student lifecycle outlives individual course enrollments). |
| **Composition** | `relationship-design.md` | `Enrollment "1" *-- "0..*" Attendance` (Attendance entries cannot exist without the parent Enrollment). |
| **Cohesion** | `class-responsibilities.md` | High cohesion: `Attendance` manages only session logs; `AcademicRecord` manages only marks. No "God Objects". |
| **Coupling** | `package-design.md` | Loose coupling: Layers interact via abstract interfaces and DTOs. |
| **SOLID Principles**| `solid-analysis.md` | S, O, L, I, D principles analyzed and demonstrated with concrete SIS examples. |
| **Design Patterns** | `design-pattern-analysis.md` | Repository Pattern, Strategy Pattern (grading), Factory Pattern (user initialization). |\n