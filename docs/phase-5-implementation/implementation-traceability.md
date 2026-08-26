# Implementation Traceability Matrix

## 1. End-to-End Traceability (Requirements $ightarrow$ Code $ightarrow$ UI)

| Requirement | Use Case | Domain Class | Service Operation | REST API | UI View Component |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **FR-01, FR-02** | UC-01 | `User` | `AuthService.login` | `POST /auth/login` | `LoginView.js` |
| **FR-05, FR-06** | UC-03 | `Student` | `StudentService.registerStudent` | `POST /students` | `AdminDashboardView.js` |
| **FR-10, FR-11** | UC-05, UC-06 | `Course` | `CourseService.assignFaculty` | `PUT /courses/:id/assign-faculty`| `AdminDashboardView.js` |
| **FR-12** | UC-07 | `Enrollment` | `EnrollmentService.enrollStudent` | `POST /enrollments` | `AdminDashboardView.js` |
| **FR-15, FR-16** | UC-10, UC-11 | `Attendance` | `AttendanceService.recordAttendance`| `POST /attendance` | `FacultyDashboardView.js` |
| **FR-18, FR-19** | UC-12, UC-13 | `AcademicRecord`| `AcademicService.enterMarks` | `POST /academic-records` | `FacultyDashboardView.js` |
| **FR-13, FR-17, FR-20** | UC-16, 17, 18| `Enrollment` | `StudentService.getMyTranscript` | `GET /academic-records/transcript`| `StudentDashboardView.js` |
