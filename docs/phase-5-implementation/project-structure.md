# Implemented Project Structure

```text
OOAD cap/
├── docs/
│   ├── phase-1-requirements/
│   ├── phase-2-object-oriented-analysis/
│   ├── phase-3-object-oriented-design/
│   ├── phase-4-architecture-and-database/
│   └── phase-5-implementation/
│       ├── implementation-overview.md
│       ├── project-structure.md
│       ├── domain-implementation.md
│       ├── backend-implementation.md
│       ├── frontend-implementation.md
│       ├── database-implementation.md
│       ├── authentication-implementation.md
│       ├── authorization-implementation.md
│       ├── api-implementation.md
│       ├── validation-implementation.md
│       ├── security-implementation.md
│       ├── seed-data.md
│       ├── testing-during-development.md
│       ├── implementation-traceability.md
│       ├── ooad-implementation-evidence.md
│       ├── design-changes.md
│       └── phase-5-summary.md
│
├── backend/                             # Layered Object-Oriented Backend
│   ├── package.json
│   ├── server.js                        # Express Server Bootstrap & Route Mounting
│   ├── sis_database.json                # Local Persistent Relational Store
│   ├── src/
│   │   ├── config/
│   │   │   ├── db.config.js
│   │   │   └── jwt.config.js
│   │   ├── domain/                      # PURE DOMAIN LAYER
│   │   │   └── model/
│   │   │       ├── User.js              # Abstract Base User
│   │   │       ├── Admin.js             # Admin Subclass
│   │   │       ├── Faculty.js           # Faculty Subclass
│   │   │       ├── Student.js           # Student Subclass
│   │   │       ├── Course.js            # Course Entity
│   │   │       ├── Enrollment.js        # Enrollment Associative Entity
│   │   │       ├── Attendance.js        # Attendance Entity
│   │   │       └── AcademicRecord.js    # Academic Record Entity
│   │   ├── application/                 # APPLICATION SERVICE LAYER
│   │   │   ├── AuthService.js
│   │   │   ├── StudentService.js
│   │   │   ├── FacultyService.js
│   │   │   ├── CourseService.js
│   │   │   ├── EnrollmentService.js
│   │   │   ├── AttendanceService.js
│   │   │   └── AcademicService.js
│   │   ├── infrastructure/              # INFRASTRUCTURE & REPOSITORIES
│   │   │   ├── persistence/
│   │   │   │   ├── Database.js          # Relational ACID Store
│   │   │   │   ├── SqlUserRepository.js
│   │   │   │   ├── SqlStudentRepository.js
│   │   │   │   ├── SqlFacultyRepository.js
│   │   │   │   ├── SqlCourseRepository.js
│   │   │   │   ├── SqlEnrollmentRepository.js
│   │   │   │   └── seed.js              # Initial Demo Data Seeder
│   │   │   └── security/
│   │   │       ├── PasswordHasher.js
│   │   │       └── TokenService.js
│   │   └── presentation/                # PRESENTATION LAYER
│   │       ├── controllers/
│   │       ├── middleware/              # JWT Auth & Role Guards
│   │       └── routes/                  # Express REST Routes
│   └── tests/
│       └── integration.test.js          # 12-Scenario Automated Verification Suite
│
├── frontend/                            # Modular Object-Oriented Client SPA
│   ├── index.html                       # Single Page Entry Shell
│   ├── css/
│   │   ├── design-system.css            # Glassmorphic Tokens, Colors & Fonts
│   │   ├── layout.css                   # Sidebar & Main Viewport Layouts
│   │   └── components.css               # Cards, Tables, Forms, Badges, Modals
│   └── js/
│       ├── app.js                       # Client Bootstrap
│       ├── core/
│       │   ├── ApiClient.js             # Base HTTP Client with JWT interceptor
│       │   ├── Router.js                # Hash Router & Role Dispatcher
│       │   └── StateManager.js          # Centralized Session & Toast Manager
│       ├── services/                    # Client Services
│       │   ├── AuthService.js
│       │   ├── AdminService.js
│       │   ├── FacultyService.js
│       │   └── StudentService.js
│       └── views/                       # Dynamic View Controllers
│           ├── LoginView.js
│           ├── AdminDashboardView.js
│           ├── FacultyDashboardView.js
│           └── StudentDashboardView.js
│
└── README.md
```
