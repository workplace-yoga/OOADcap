# Requirements-to-Use-Case-to-Object Traceability Matrix

## 1. Traceability Overview
This matrix proves direct continuity from Phase 1 Functional Requirements through Phase 2 Use Cases down to the collaborating Domain Objects.

---

## 2. Complete Traceability Table

| Functional Requirement | Description | Use Case ID | Primary Actor | Collaborating Domain Objects |
| :--- | :--- | :--- | :--- | :--- |
| **FR-01** | User Login | UC-01 | User | `User` |
| **FR-02** | Role Identification | UC-01, UC-02 | User | `User`, `Admin`, `Faculty`, `Student` |
| **FR-03** | Role-Based Access Control | UC-01, UC-02 | All | `User` |
| **FR-04** | Prevent Unauthorized Access | UC-01 | All | `User` |
| **FR-05** | Create Student Records | UC-03 | Admin | `Admin`, `Student`, `User` |
| **FR-06** | View Student Records | UC-03, UC-15 | Admin, Student | `Admin`, `Student` |
| **FR-07** | Update Student Records | UC-03 | Admin | `Admin`, `Student` |
| **FR-08** | Delete/Deactivate Student Records | UC-03 | Admin | `Admin`, `Student`, `User` |
| **FR-09** | Manage Faculty Records | UC-04 | Admin | `Admin`, `Faculty`, `User` |
| **FR-10** | Manage Course Catalog | UC-05 | Admin | `Admin`, `Course` |
| **FR-11** | Assign Faculty to Courses | UC-06 | Admin | `Admin`, `Course`, `Faculty` |
| **FR-12** | Student Course Enrollment | UC-07 | Admin | `Student`, `Course`, `Enrollment` |
| **FR-13** | View Enrolled Courses | UC-16 | Student | `Student`, `Enrollment`, `Course` |
| **FR-14** | View Course Student Roster | UC-09 | Faculty | `Faculty`, `Course`, `Enrollment`, `Student` |
| **FR-15** | Record Attendance | UC-10 | Faculty | `Faculty`, `Course`, `Enrollment`, `Attendance` |
| **FR-16** | Update Attendance | UC-11 | Faculty | `Faculty`, `Course`, `Enrollment`, `Attendance` |
| **FR-17** | View Personal Attendance | UC-17 | Student | `Student`, `Enrollment`, `Attendance` |
| **FR-18** | Enter Assessment Marks | UC-12 | Faculty | `Faculty`, `Course`, `Enrollment`, `AcademicRecord` |
| **FR-19** | Update Assessment Marks | UC-13 | Faculty | `Faculty`, `Course`, `Enrollment`, `AcademicRecord` |
| **FR-20** | View Academic Records & Grades | UC-18 | Student | `Student`, `Enrollment`, `AcademicRecord` |
| **FR-21** | Maintain Relational Integrity | System-Wide | All | `User`, `Student`, `Faculty`, `Course`, `Enrollment`, `Attendance`, `AcademicRecord` |\n