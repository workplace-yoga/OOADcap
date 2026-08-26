# Functional Requirements Specification

This document details the complete set of formal functional requirements (FR-01 to FR-21) defining the capabilities and behavior of the Student Information System.

---

## 1. Formal Requirements List

### 1.1 Authentication & Authorization Requirements
- **FR-01**: The system shall allow registered users (Admin, Faculty, Student) to log in using valid credentials.
- **FR-02**: The system shall verify credentials and identify the authenticated user's assigned role.
- **FR-03**: The system shall provide role-based access control (RBAC) to ensure users access only permitted operations.
- **FR-04**: The system shall prevent unauthorized users from accessing restricted operations and protected resources.

### 1.2 Student Management Requirements
- **FR-05**: The Admin shall be able to create new student records with necessary demographic and academic profile details.
- **FR-06**: The Admin shall be able to view individual student profiles and the comprehensive student directory.
- **FR-07**: The Admin shall be able to update existing student records.
- **FR-08**: The Admin shall be able to delete or deactivate student records from the active registry.

### 1.3 Faculty & Course Management Requirements
- **FR-09**: The Admin shall be able to manage faculty records (create, view, update, and deactivate faculty profiles).
- **FR-10**: The Admin shall be able to create, view, update, and manage academic courses in the course catalog.
- **FR-11**: The Admin shall be able to assign faculty members to specific courses.

### 1.4 Course Enrollment Requirements
- **FR-12**: The system shall support student enrollment into designated courses.
- **FR-13**: Students shall be able to view their list of enrolled courses along with assigned faculty details.
- **FR-14**: Faculty members shall be able to view the list of students enrolled in their assigned courses.

### 1.5 Attendance Management Requirements
- **FR-15**: Faculty members shall be able to record attendance for students enrolled in their assigned courses.
- **FR-16**: Faculty members shall be able to update and correct previously recorded attendance entries.
- **FR-17**: Students shall be able to view their individual attendance records and overall attendance percentage per course.

### 1.6 Academic Records & Marks Requirements
- **FR-18**: Faculty members shall be able to enter assessment marks and examination scores for students in their assigned courses.
- **FR-19**: Faculty members shall be able to update and modify entered marks.
- **FR-20**: Students shall be able to view their own marks, calculated totals, and academic performance records.

### 1.7 Data Relationship & Integrity Requirements
- **FR-21**: The system shall maintain consistent structural and relational associations between users, students, faculty, courses, enrollments, attendance entries, and academic marks.

---

## 2. Requirements Traceability to Modules

| Requirement ID | Requirement Summary | Core Module | Target Actor |
| :--- | :--- | :--- | :--- |
| **FR-01** | User Login | Module 1: Authentication & Role Management | All |
| **FR-02** | Role Identification | Module 1: Authentication & Role Management | All |
| **FR-03** | Role-Based Access | Module 1: Authentication & Role Management | All |
| **FR-04** | Prevent Unauthorized Access | Module 1: Authentication & Role Management | All |
| **FR-05** | Create Student Records | Module 2: Student Management | Admin |
| **FR-06** | View Student Records | Module 2: Student Management | Admin |
| **FR-07** | Update Student Records | Module 2: Student Management | Admin |
| **FR-08** | Delete Student Records | Module 2: Student Management | Admin |
| **FR-09** | Manage Faculty Records | Module 3: Faculty Management | Admin |
| **FR-10** | Manage Courses | Module 4: Course & Enrollment Management | Admin |
| **FR-11** | Assign Faculty to Courses | Module 4: Course & Enrollment Management | Admin |
| **FR-12** | Student Course Enrollment | Module 4: Course & Enrollment Management | Admin / System |
| **FR-13** | View Enrolled Courses | Module 4: Course & Enrollment Management | Student |
| **FR-14** | View Course Student Roster | Module 4: Course & Enrollment Management | Faculty |
| **FR-15** | Record Attendance | Module 5: Attendance Management | Faculty |
| **FR-16** | Update Attendance | Module 5: Attendance Management | Faculty |
| **FR-17** | View Personal Attendance | Module 5: Attendance Management | Student |
| **FR-18** | Enter Marks | Module 6: Academic Records / Marks | Faculty |
| **FR-19** | Update Marks | Module 6: Academic Records / Marks | Faculty |
| **FR-20** | View Personal Marks & Grades | Module 6: Academic Records / Marks | Student |
| **FR-21** | Relational & Domain Integrity | All Modules (System-Wide Foundation) | System |\n