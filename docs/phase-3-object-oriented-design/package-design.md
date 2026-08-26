# Package & Responsibility Architecture

## 1. High-Level Modular Package Organization
The system follows a clean, layered architectural boundary designed for maximum cohesion and loose coupling.

```
com.sis.ooad/
├── domain/                      # Pure Object-Oriented Domain Layer (No UI / Framework dependencies)
│   ├── model/
│   │   ├── user/                # User, Admin, Faculty, Student, UserRole
│   │   ├── course/              # Course
│   │   ├── enrollment/          # Enrollment, EnrollmentStatus
│   │   ├── attendance/          # Attendance, AttendanceStatus
│   │   └── academic/            # AcademicRecord, GradeCalculation
│   └── repository/              # Domain Repository Interfaces (IUserRepository, ICourseRepository, etc.)
│
├── application/                 # Use Case Orchestration & Business Services Layer
│   ├── auth/                    # AuthenticationService, TokenService
│   ├── student/                 # StudentManagementService
│   ├── faculty/                 # FacultyManagementService
│   ├── course/                  # CourseManagementService, EnrollmentService
│   ├── attendance/              # AttendanceService
│   └── academic/                # AcademicRecordService
│
├── infrastructure/              # Implementation details (Adapters, Data Access, Cryptography)
│   ├── persistence/             # Repository Implementations (SQL / ORM Adapters)
│   └── security/                # BCryptPasswordHasher, JwtTokenProvider
│
└── presentation/                # REST API Controllers & Request/Response DTOs
    ├── controllers/             # AuthController, AdminController, FacultyController, StudentController
    └── dtos/                    # RequestPayloads & ResponseViews
```

---

## 2. Layered Responsibility Rules
- **Domain Layer**: Contains pure business entities and invariant validations. Zero dependencies on presentation controllers or database drivers.
- **Application Layer**: Orchestrates use case flows, coordinates repositories, and enforces transaction boundaries.
- **Infrastructure Layer**: Implements technical interfaces (cryptography, database connections).
- **Presentation Layer**: Exposes stateless REST endpoints and translates HTTP JSON requests into application DTOs.\n