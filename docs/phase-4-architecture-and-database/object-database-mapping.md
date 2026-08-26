# Object-to-Database Mapping Strategy

## 1. Class-to-Table Mapping Strategy
In Object-Oriented Design, inheritance hierarchies can be mapped to relational schemas using:
1. *Single Table Inheritance* (all subclasses in one table with discriminator)
2. *Class Table Inheritance* (base table + subclass extension tables linked via 1:1 foreign keys)
3. *Concrete Table Inheritance* (independent tables per concrete subclass)

---

## 2. Selected Approach: Class Table Inheritance
We adopt **Class Table Inheritance** for the `User` hierarchy:
- Base class `User` maps to `users` table (credentials, roles, common attributes).
- Subclasses `Admin`, `Faculty`, and `Student` map to `admins`, `faculty`, and `students` tables respectively, linked via `user_id` foreign keys with `ON DELETE CASCADE`.

### Mapping Table:
| Domain Class | Relational Table | Primary Key | Key Foreign Keys |
| :--- | :--- | :--- | :--- |
| `User` (Abstract) | `users` | `user_id` | - |
| `Admin` | `admins` | `admin_id` | `user_id` $ightarrow$ `users(user_id)` |
| `Faculty` | `faculty` | `faculty_id` | `user_id` $ightarrow$ `users(user_id)` |
| `Student` | `students` | `student_id` | `user_id` $ightarrow$ `users(user_id)` |
| `Course` | `courses` | `course_id` | `faculty_id` $ightarrow$ `faculty(faculty_id)` |
| `Enrollment` | `enrollments` | `enrollment_id` | `student_id`, `course_id` |
| `Attendance` | `attendance` | `attendance_id` | `enrollment_id` $ightarrow$ `enrollments(enrollment_id)` |
| `AcademicRecord` | `academic_records`| `record_id` | `enrollment_id` $ightarrow$ `enrollments(enrollment_id)` |\n