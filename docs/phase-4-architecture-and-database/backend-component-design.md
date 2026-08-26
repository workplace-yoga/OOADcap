# Backend Component & Directory Design

## 1. Modular Directory Organization
The backend is structured to reflect the layered object-oriented architecture:

```text
backend/
├── src/
│   ├── config/                  # Environment variables, database connection pool
│   │   ├── db.config.js
│   │   └── jwt.config.js
│   │
│   ├── domain/                  # PURE DOMAIN LAYER (Zero Framework Dependencies)
│   │   ├── model/
│   │   │   ├── User.js          # Abstract User base class
│   │   │   ├── Admin.js         # Admin subclass
│   │   │   ├── Faculty.js       # Faculty subclass
│   │   │   ├── Student.js       # Student subclass
│   │   │   ├── Course.js        # Course entity
│   │   │   ├── Enrollment.js    # Enrollment aggregate root
│   │   │   ├── Attendance.js    # Attendance entity
│   │   │   └── AcademicRecord.js# AcademicRecord entity
│   │   └── repository/          # Repository Interfaces (Abstract Contracts)
│   │       ├── IUserRepository.js
│   │       ├── IStudentRepository.js
│   │       ├── ICourseRepository.js
│   │       └── IEnrollmentRepository.js
│   │
│   ├── application/             # APPLICATION / SERVICE LAYER (Use Case Orchestration)
│   │   ├── AuthService.js
│   │   ├── StudentService.js
│   │   ├── FacultyService.js
│   │   ├── CourseService.js
│   │   ├── AttendanceService.js
│   │   └── AcademicService.js
│   │
│   ├── infrastructure/          # PERSISTENCE & SECURITY INFRASTRUCTURE
│   │   ├── persistence/         # Concrete PostgreSQL Repositories
│   │   │   ├── PgUserRepository.js
│   │   │   ├── PgStudentRepository.js
│   │   │   ├── PgCourseRepository.js
│   │   │   └── PgEnrollmentRepository.js
│   │   └── security/            # BCryptPasswordHasher, JwtTokenService
│   │       ├── PasswordHasher.js
│   │       └── TokenService.js
│   │
│   └── presentation/            # PRESENTATION LAYER (REST API & Middleware)
│       ├── controllers/
│       │   ├── AuthController.js
│       │   ├── AdminController.js
│       │   ├── FacultyController.js
│       │   ├── StudentController.js
│       │   ├── CourseController.js
│       │   └── AttendanceController.js
│       ├── middleware/
│       │   ├── authMiddleware.js
│       │   ├── roleGuard.js
│       │   └── errorHandler.js
│       └── routes/
│           ├── auth.routes.js
│           ├── student.routes.js
│           ├── faculty.routes.js
│           ├── course.routes.js
│           └── attendance.routes.js
│
├── tests/                       # Unit & Integration Test Suites
└── server.js                    # Application Entry Point & Express Server Bootstrap
```\n