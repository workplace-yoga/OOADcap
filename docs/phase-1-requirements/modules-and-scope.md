# Modules and Project Scope

## 1. Core Functional Modules

The functional scope of the Student Information System is frozen into six major modules:

```
+---------------------------------------------------------------------------------------+
|                          STUDENT INFORMATION SYSTEM (SIS)                             |
+---------------------------------------------------------------------------------------+
|  [Module 1] Authentication & Role Management                                          |
|  [Module 2] Student Management                                                        |
|  [Module 3] Faculty Management                                                        |
|  [Module 4] Course & Enrollment Management                                            |
|  [Module 5] Attendance Management                                                     |
|  [Module 6] Academic Records & Marks Management                                       |
+---------------------------------------------------------------------------------------+
```

### Module 1: Authentication & Role Management
- **Purpose**: Authenticate user identities, identify roles (`ADMIN`, `FACULTY`, `STUDENT`), enforce access control, and route authenticated users to their corresponding dashboards.
- **Core Operations**: Login, token verification, role routing, session termination.

### Module 2: Student Management
- **Purpose**: Manage the core student registry and personal profiles.
- **Core Operations**: Create student profile, view student records, update demographic/academic details, delete/archive student records.

### Module 3: Faculty Management
- **Purpose**: Maintain faculty profiles, departmental details, and academic assignments.
- **Core Operations**: Create faculty profile, view faculty directory, update faculty details, assign faculty to course offerings.

### Module 4: Course & Enrollment Management
- **Purpose**: Manage course catalogs, course schedules, and student enrollments.
- **Core Operations**: Create course, update course details, archive course, enroll students in courses, view course-student rosters.

### Module 5: Attendance Management
- **Purpose**: Facilitate recording, tracking, and reviewing student attendance per course session.
- **Core Operations**: Load course roster, record attendance status, update past attendance entries, calculate and view student attendance percentages.

### Module 6: Academic Records & Marks Management
- **Purpose**: Record, compute, and present student academic performance and examination marks.
- **Core Operations**: Enter assessment marks, update scores, calculate total marks and grades, view individual grade reports.

---

## 2. Project Scope Boundary

### 2.1 In-Scope Features
The initial system scope includes the following components:
- User authentication and role-based authorization.
- Admin dashboard with student, faculty, and course management.
- Faculty dashboard with course roster, attendance recording, and marks entry.
- Student dashboard with personal profile, enrolled courses, attendance summary, and marks view.
- Separation of concerns into frontend client, backend REST API, and cloud relational database.
- Object-oriented domain modeling and documentation.

---

### 2.2 Out-of-Scope Features (Future Enhancements)
To maintain academic rigor and project feasibility, the following features are strictly **out of scope** for the initial implementation:
- ❌ Fee payment gateways and financial ledger management.
- ❌ Hostel and accommodation management.
- ❌ Library cataloging and book issue tracking.
- ❌ Transportation and bus route tracking.
- ❌ Parent / Guardian specialized portal.
- ❌ Online real-time examination / proctoring engine.
- ❌ Live video conferencing / virtual classroom tools.
- ❌ In-app chat, peer-to-peer messaging, or discussion forums.
- ❌ AI-based chatbots, predictive analytics, or recommendation engines.
- ❌ Native mobile applications (iOS / Android).
- ❌ Biometric / RFID hardware-integrated attendance.
- ❌ Advanced multi-campus institutional analytics.\n