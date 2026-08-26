# Design Traceability Matrix

## 1. Complete End-to-End Traceability Chain

```
Requirement (FR) -> Use Case (UC) -> Domain Object -> Class -> Operation -> Sequence Diagram
```

| FR ID | Use Case ID | Domain Object | Design Class | Key Operation | Sequence Diagram |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **FR-01, FR-02** | UC-01 | `User` | `User` | `authenticate()` | `login.puml` |
| **FR-05, FR-06** | UC-03 | `Student`, `User` | `Student`, `Admin` | `registerStudent()` | `admin-create-student.puml` |
| **FR-10, FR-11** | UC-05, UC-06 | `Course`, `Faculty` | `Course`, `Faculty` | `assignFaculty()` | `course-faculty-assignment.puml` |
| **FR-12, FR-13** | UC-07, UC-16 | `Enrollment` | `Enrollment` | `addEnrollment()` | `student-enrollment.puml` |
| **FR-15, FR-16** | UC-10, UC-11 | `Attendance` | `Attendance` | `recordSessionAttendance()` | `attendance.puml` |
| **FR-18, FR-19** | UC-12, UC-13 | `AcademicRecord` | `AcademicRecord` | `submitAssessmentMarks()` | `marks-entry.puml` |
| **FR-17** | UC-17 | `Attendance` | `Enrollment` | `calculateAttendancePercentage()` | `view-attendance.puml` |
| **FR-20** | UC-18 | `AcademicRecord` | `Enrollment` | `computeFinalGrade()` | `view-academic-record.puml` |\n