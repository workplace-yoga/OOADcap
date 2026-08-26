# Functional Test Cases Specification

## 1. Test Matrix Covering Requirements FR-01 through FR-21

| Test ID | Target Requirement | Test Scenario | Preconditions | Steps | Expected Result | Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :---: |
| **TC-FUNC-01** | FR-01, FR-02 | User Login & Role Identification | User registered in DB | Submit valid credentials | 200 OK + JWT with role claim | **PASS** |
| **TC-FUNC-02** | FR-03, FR-04 | Role-Based Access Enforcement | Authenticated Student | Attempt Admin endpoints | 403 Forbidden | **PASS** |
| **TC-FUNC-03** | FR-05 | Admin Register Student | Admin authenticated | Post valid student DTO | 201 Created; student in DB | **PASS** |
| **TC-FUNC-04** | FR-06 | View Student Records | Admin authenticated | Query `/students` | 200 OK with student list | **PASS** |
| **TC-FUNC-05** | FR-07 | Update Student Record | Admin authenticated | Put updated semester/contact | 200 OK with updated entity | **PASS** |
| **TC-FUNC-06** | FR-08 | Delete Student Record | Admin authenticated | Delete student by ID | 200 OK; removed from DB | **PASS** |
| **TC-FUNC-07** | FR-09 | Manage Faculty Records | Admin authenticated | Query & Post `/faculty` | 200/201 OK | **PASS** |
| **TC-FUNC-08** | FR-10 | Create Course Catalog | Admin authenticated | Post new course DTO | 201 Created | **PASS** |
| **TC-FUNC-09** | FR-11 | Assign Faculty to Course | Course & Faculty exist | Put `/assign-faculty` | 200 OK; course linked | **PASS** |
| **TC-FUNC-10** | FR-12 | Course Enrollment | Student & Course exist | Post `/enrollments` | 201 Created | **PASS** |
| **TC-FUNC-11** | FR-13 | View Enrolled Courses | Student authenticated | Query `/my-courses` | 200 OK with course list | **PASS** |
| **TC-FUNC-12** | FR-14 | View Course Roster | Faculty authenticated | Query `/roster` | 200 OK with student list | **PASS** |
| **TC-FUNC-13** | FR-15 | Record Session Attendance | Faculty assigned to course | Post attendance entries | 200 OK; session logs saved | **PASS** |
| **TC-FUNC-14** | FR-16 | Update Attendance | Attendance record exists | Put new status | 200 OK; updated status | **PASS** |
| **TC-FUNC-15** | FR-17 | View Personal Attendance | Student authenticated | Query `/my-records` | 200 OK; percentage calculated | **PASS** |
| **TC-FUNC-16** | FR-18 | Enter Assessment Marks | Faculty assigned to course | Post mark entries | 200 OK; marks saved | **PASS** |
| **TC-FUNC-17** | FR-19 | Update Assessment Marks | Mark record exists | Put updated score | 200 OK; grade recalculated | **PASS** |
| **TC-FUNC-18** | FR-20 | View Academic Transcript | Student authenticated | Query `/transcript` | 200 OK; transcript & grades | **PASS** |
| **TC-FUNC-19** | FR-21 | Relational Integrity | System initialized | Foreign key queries | All entities linked cleanly | **PASS** |
