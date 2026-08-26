# OOAD to Implementation Mapping & Traceability

## 1. Traceability Chain Proof

```
Requirement (FR-15: Record Attendance)
       ↓
Use Case (UC-10: Record Session Attendance)
       ↓
Domain Object (Attendance + Enrollment)
       ↓
OO Class (Attendance, Enrollment)
       ↓
Service Method (AttendanceService.submitAttendance)
       ↓
REST API (POST /api/v1/attendance)
       ↓
Database Table (attendance table)
       ↓
Deployment (Render Backend API + Cloud PostgreSQL)
```

---

## 2. Complete Cross-Module Architectural Traceability

| Module | Requirement | Use Case | Domain Class | Service Operation | REST Endpoint | Database Table |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Auth** | FR-01, FR-02 | UC-01 | `User` | `AuthService.login()` | `POST /auth/login` | `users` |
| **Student** | FR-05, FR-06 | UC-03 | `Student` | `StudentService.registerStudent()`| `POST /students` | `students`, `users` |
| **Faculty** | FR-09 | UC-04 | `Faculty` | `FacultyService.registerFaculty()`| `POST /faculty` | `faculty`, `users` |
| **Course** | FR-10, FR-11 | UC-05, UC-06 | `Course` | `CourseService.assignFaculty()` | `PUT /courses/:id/assign-faculty`| `courses` |
| **Enroll** | FR-12 | UC-07 | `Enrollment`| `EnrollmentService.enrollStudent()`| `POST /enrollments` | `enrollments` |
| **Attend** | FR-15, FR-17 | UC-10, UC-17 | `Attendance` | `AttendanceService.submitAttendance()`| `POST /attendance` | `attendance` |
| **Marks** | FR-18, FR-20 | UC-12, UC-18 | `AcademicRecord`| `AcademicService.submitMarks()` | `POST /academic-records` | `academic_records` |\n