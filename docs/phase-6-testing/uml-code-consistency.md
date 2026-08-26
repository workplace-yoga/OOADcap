# UML Diagram to Code Consistency Audit

## 1. Structural Comparison

| UML Artifact (Phase 3) | Implemented Class / File | Status | Notes |
| :--- | :--- | :---: | :--- |
| `User` (Abstract Class) | `backend/src/domain/model/User.js` | **MATCH** | Implements all attributes, private hash, and polymorphic methods. |
| `Admin` (Class) | `backend/src/domain/model/Admin.js` | **MATCH** | Inherits from `User`, provides `/admin/dashboard` route. |
| `Faculty` (Class) | `backend/src/domain/model/Faculty.js` | **MATCH** | Inherits from `User`, provides `/faculty/dashboard` route. |
| `Student` (Class) | `backend/src/domain/model/Student.js` | **MATCH** | Inherits from `User`, provides `/student/dashboard` route. |
| `Course` (Class) | `backend/src/domain/model/Course.js` | **MATCH** | Manages catalog details and instructor assignment. |
| `Enrollment` (Class) | `backend/src/domain/model/Enrollment.js` | **MATCH** | Aggregate root computing attendance % and letter grades. |
| `Attendance` (Class) | `backend/src/domain/model/Attendance.js` | **MATCH** | Enforces status validation and session slot indices. |
| `AcademicRecord` (Class) | `backend/src/domain/model/AcademicRecord.js`| **MATCH** | Enforces score bounds ($0 \le s \le 	ext{max}$). |
| Sequence Diagram Flows | Express Controller $ightarrow$ Service $ightarrow$ Domain | **MATCH** | Execution sequence follows documented PlantUML designs. |
