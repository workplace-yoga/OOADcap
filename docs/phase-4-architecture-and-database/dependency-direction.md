# Dependency Direction & Inversion Analysis

## 1. Architectural Dependency Flow
In accordance with the **Dependency Inversion Principle (DIP)**:

```
[ Presentation (Controllers) ] ────> [ Application (Services) ]
                                            │
                                            ▼
                                   [ Domain (Entities) ]
                                            ▲
                                            │ (Implements interface)
                               [ Persistence (PostgreSQL Repositories) ]
```

- High-level business services (`StudentService`, `AttendanceService`) depend on abstract repository interfaces (`IStudentRepository`, `IEnrollmentRepository`).
- Concrete PostgreSQL repositories implement those domain interfaces in the infrastructure layer.
- The core Domain layer has **zero** outbound dependencies on databases, Express, or network drivers.\n