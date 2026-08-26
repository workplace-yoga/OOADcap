# Class Responsibilities & Behavioral Design

## 1. Responsibility Allocation Philosophy
Responsibilities are allocated following the **GRASP (General Responsibility Assignment Software Patterns)** principles:
- **Information Expert**: The class holding the necessary state performs the computation.
- **Low Coupling & High Cohesion**: Responsibilities are focused on domain invariants rather than technical plumbing.
- **Creator Pattern**: `Enrollment` creates its owned `Attendance` and `AcademicRecord` instances.

---

## 2. Detailed Responsibility Allocation

| Class | Primary Knowledge (State Held) | Primary Behavioral Responsibilities | Collaborators |
| :--- | :--- | :--- | :--- |
| **`User`** | Credentials, email, active status, system role. | Authenticate passwords, manage account lifecycle, polymorphically dispatch routes. | Subclasses (`Admin`, `Faculty`, `Student`) |
| **`Admin`** | Admin ID, institutional department, oversight scope. | Register system entities, allocate faculty to courses, trigger enrollments. | `Student`, `Faculty`, `Course`, `Enrollment` |
| **`Faculty`** | Faculty ID, name, designation, assigned courses list. | Provide course rosters, record and modify session attendance, submit marks. | `Course`, `Enrollment`, `Attendance`, `AcademicRecord` |
| **`Student`** | Student ID, roll number, semester, enrollments list. | Query own course schedule, compute personal attendance rate, view grade transcript. | `Enrollment`, `Course`, `Attendance`, `AcademicRecord` |
| **`Course`** | Course code, title, credits, instructor reference, enrollments. | Maintain student roster, validate instructor assignment, enforce enrollment capacity. | `Faculty`, `Enrollment`, `Student` |
| **`Enrollment`** | Student ref, Course ref, term, attendance logs, marks entries. | Aggregate student attendance, compute overall percentage, calculate total marks and final letter grades. | `Student`, `Course`, `Attendance`, `AcademicRecord` |
| **`Attendance`** | Session date, session slot, status enum, audit log. | Validate session bounds, update presence status with reason, provide session summary. | `Enrollment`, `Faculty` |
| **`AcademicRecord`** | Assessment type, score obtained, maximum score, weightage. | Validate score bounds ($0 \le s \le \text{max}$), calculate percentage, compute weighted contribution. | `Enrollment` |\n