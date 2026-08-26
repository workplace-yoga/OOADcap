# Layered Backend Architecture

## 1. The 5-Layer Architectural Model
To enforce strict separation of concerns, high cohesion, and low coupling, the backend is organized into 5 distinct architectural layers:

```
+-----------------------------------------------------------------------------------------------+
| Layer 1: Presentation / API Layer (Controllers & Routes)                                      |
| -> Handles HTTP requests, extracts parameters, validates DTO format, returns HTTP status codes|
+-----------------------------------------------------------------------------------------------+
                                                │ Calls
                                                ▼
+-----------------------------------------------------------------------------------------------+
| Layer 2: Application / Service Layer (Use Case Orchestration)                                 |
| -> Coordinates business workflows, manages transaction boundaries, invokes domain methods     |
+-----------------------------------------------------------------------------------------------+
                                                │ Manipulates
                                                ▼
+-----------------------------------------------------------------------------------------------+
| Layer 3: Domain Model Layer (Core Business Entities & Invariants)                             |
| -> Encapsulated classes (User, Student, Course, Enrollment, Attendance, AcademicRecord)       |
+-----------------------------------------------------------------------------------------------+
                                                │ Persisted by
                                                ▼
+-----------------------------------------------------------------------------------------------+
| Layer 4: Persistence / Data Access Layer (Repository Abstractions & Implementations)          |
| -> Translates domain entities to/from relational database tables via repository interfaces    |
+-----------------------------------------------------------------------------------------------+
                                                │ Executes SQL
                                                ▼
+-----------------------------------------------------------------------------------------------+
| Layer 5: Database Layer (PostgreSQL Relational Storage)                                       |
| -> Enforces foreign keys, unique constraints, and physical storage                            |
+-----------------------------------------------------------------------------------------------+
```

---

## 2. Layer Responsibilities & Isolation Rules
1. **Presentation Layer**: Must *not* contain business rules or direct SQL queries.
2. **Service Layer**: Must *not* contain HTTP-specific objects (`req`, `res`); operates purely on domain objects and DTOs.
3. **Domain Layer**: Completely isolated from database frameworks and web protocols.
4. **Repository Layer**: Encapsulates all query building and schema mapping.\n