# Authorization & RBAC Test Report

## 1. Role Boundary Verification

| Actor Role | Tested Operation | Expected Outcome | Actual Outcome | Status |
| :--- | :--- | :---: | :---: | :---: |
| **`STUDENT`** | `GET /api/v1/students` (Admin Directory) | `403 Forbidden` | `403 Forbidden` | **PASS** |
| **`STUDENT`** | `POST /api/v1/attendance` (Mark Attendance) | `403 Forbidden` | `403 Forbidden` | **PASS** |
| **`STUDENT`** | `POST /api/v1/academic-records` (Enter Marks) | `403 Forbidden` | `403 Forbidden` | **PASS** |
| **`STUDENT`** | `GET /api/v1/students/stu_002` (IDOR Profile) | `403 Forbidden` | `403 Forbidden` | **PASS** |
| **`FACULTY`** | `DELETE /api/v1/students/stu_001` (Delete Student) | `403 Forbidden` | `403 Forbidden` | **PASS** |
| **`FACULTY`** | `POST /api/v1/courses` (Create Course) | `403 Forbidden` | `403 Forbidden` | **PASS** |
| **`ADMIN`** | `POST /api/v1/students` (Create Student) | `201 Created` | `201 Created` | **PASS** |
| **`FACULTY`** | `POST /api/v1/attendance` (Assigned Course) | `200 OK` | `200 OK` | **PASS** |
| **`STUDENT`** | `GET /api/v1/attendance/my-records` (Self) | `200 OK` | `200 OK` | **PASS** |
