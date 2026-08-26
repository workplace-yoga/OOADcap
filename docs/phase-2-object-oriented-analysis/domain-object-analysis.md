# Domain Object Analysis

## 1. Evaluation of Candidate Concepts
In Phase 1, eight candidate domain concepts were identified. In this analysis phase, we rigorously evaluate each candidate to determine if it represents a genuine domain object (with identity, state, and behavior), a supporting abstraction, or a simple attribute.

---

## 2. Object Evaluation Matrix

| Candidate Concept | Genuine Domain Object? | Justification & Analysis |
| :--- | :---: | :--- |
| **`User`** | **YES** | Represents an authenticated identity possessing credentials (username, password hash), role classification, active status, and session verification behavior. |
| **`Admin`** | **YES** | Represents administrative staff with organizational privileges, operational oversight responsibilities, and department association. |
| **`Faculty`** | **YES** | Represents teaching staff with unique employee identity, designation, assigned teaching courses, and grading behavior. |
| **`Student`** | **YES** | Represents enrolled learners with unique student ID/roll number, enrollment history, attendance records, and academic grade evaluations. |
| **`Course`** | **YES** | Represents academic course catalog offerings with course code, title, credits, syllabus metadata, and assigned instructors. |
| **`Enrollment`** | **YES (Association Class)** | Represents the vital link connecting a `Student` to a `Course` for an academic term, encapsulating term data, enrollment status, and aggregation of marks/attendance. |
| **`Attendance`** | **YES** | Represents a distinct session record capturing date, session number, status (`Present`, `Absent`, `Late`, `Excused`), and student association. |
| **`AcademicRecord` / `Mark`** | **YES** | Represents structured evaluation records (assessment type, score obtained, maximum score, grade point, weightage). |

---

## 3. Discarded / Demoted Candidates (Attribute vs Object Analysis)
- **`Role`**: Evaluated as an **Enumeration / Value Object** (`ADMIN`, `FACULTY`, `STUDENT`) rather than a heavy standalone entity, as roles in this scope do not possess dynamic behavior or independent identity.
- **`AttendanceStatus`**: Modeled as a **Value Object / Enum** (`PRESENT`, `ABSENT`, `LATE`, `EXCUSED`).
- **`Grade`**: Modeled as a computed attribute/value derived from aggregate marks in `AcademicRecord`.\n