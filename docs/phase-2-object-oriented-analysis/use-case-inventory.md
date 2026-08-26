# Use Case Inventory

## 1. Overview
The use case inventory defines the complete set of discrete system interactions derived directly from the Phase 1 functional requirements (FR-01 to FR-21).

---

## 2. Inventory by Actor

```
+----------------------------------------------------------------------------------------------------+
|                                    SYSTEM USE CASE INVENTORY                                       |
+----------------------------------------------------------------------------------------------------+
|  COMMON (Shared)                                                                                   |
|  - UC-01: Authenticate User                                                                        |
|  - UC-02: View Role Dashboard                                                                      |
|                                                                                                    |
|  ADMIN ACTOR                                                                                       |
|  - UC-03: Manage Students (Create, View, Update, Deactivate)                                       |
|  - UC-04: Manage Faculty (Create, View, Update, Deactivate)                                        |
|  - UC-05: Manage Courses (Create, View, Update, Archive)                                           |
|  - UC-06: Assign Faculty to Course                                                                 |
|  - UC-07: Manage Course Enrollment                                                                 |
|  - UC-08: View Institutional Reports & Summaries                                                   |
|                                                                                                    |
|  FACULTY ACTOR                                                                                     |
|  - UC-09: View Assigned Courses & Rosters                                                          |
|  - UC-10: Record Session Attendance                                                                |
|  - UC-11: Update Session Attendance                                                                |
|  - UC-12: Enter Assessment Marks                                                                   |
|  - UC-13: Update Assessment Marks                                                                   |
|  - UC-14: View Course Academic Performance                                                         |
|                                                                                                    |
|  STUDENT ACTOR                                                                                     |
|  - UC-15: View Personal Profile                                                                    |
|  - UC-16: View Enrolled Courses & Faculty                                                          |
|  - UC-17: View Personal Attendance History & Percentage                                            |
|  - UC-18: View Academic Records & Grades                                                           |
+----------------------------------------------------------------------------------------------------+
```

---

## 3. Detailed Inventory Table

| Use Case ID | Use Case Name | Primary Actor | Target Module | Traceable FRs |
| :--- | :--- | :--- | :--- | :--- |
| **UC-01** | Authenticate User | Admin, Faculty, Student | Module 1: Auth & Roles | FR-01, FR-02, FR-03, FR-04 |
| **UC-02** | View Role Dashboard | Admin, Faculty, Student | Module 1: Auth & Roles | FR-02, FR-03 |
| **UC-03** | Manage Students | Admin | Module 2: Student Mgmt | FR-05, FR-06, FR-07, FR-08 |
| **UC-04** | Manage Faculty | Admin | Module 3: Faculty Mgmt | FR-09 |
| **UC-05** | Manage Courses | Admin | Module 4: Course Mgmt | FR-10 |
| **UC-06** | Assign Faculty to Course | Admin | Module 4: Course Mgmt | FR-11 |
| **UC-07** | Manage Course Enrollment | Admin | Module 4: Enrollment | FR-12, FR-21 |
| **UC-08** | View Institutional Reports | Admin | Module 1 & 2 | FR-03, FR-06 |
| **UC-09** | View Assigned Courses & Rosters| Faculty | Module 4: Course Mgmt | FR-14 |
| **UC-10** | Record Session Attendance | Faculty | Module 5: Attendance | FR-15, FR-21 |
| **UC-11** | Update Session Attendance | Faculty | Module 5: Attendance | FR-16, FR-21 |
| **UC-12** | Enter Assessment Marks | Faculty | Module 6: Marks | FR-18, FR-21 |
| **UC-13** | Update Assessment Marks | Faculty | Module 6: Marks | FR-19, FR-21 |
| **UC-14** | View Course Academic Performance| Faculty | Module 6: Marks | FR-18, FR-20 |
| **UC-15** | View Personal Profile | Student | Module 2: Student Mgmt | FR-06 |
| **UC-16** | View Enrolled Courses | Student | Module 4: Enrollment | FR-13 |
| **UC-17** | View Personal Attendance | Student | Module 5: Attendance | FR-17 |
| **UC-18** | View Academic Records & Grades | Student | Module 6: Marks | FR-20 |\n