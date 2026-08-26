# Database Normalization Analysis

## 1. Normalization Evaluation

### 1.1 First Normal Form (1NF)
- **Rule**: All table columns contain atomic, non-repeating values.
- **Verification**: Every column in `users`, `students`, `courses`, `attendance`, etc., holds scalar primitive types (integers, strings, dates). No comma-separated lists or JSON arrays inside relational columns.

### 1.2 Second Normal Form (2NF)
- **Rule**: Schema is in 1NF and every non-key column is fully functionally dependent on the entire primary key.
- **Verification**: Every table possesses a single-column synthetic primary key (e.g., `enrollment_id`, `attendance_id`). Composite candidate keys (such as `student_id + course_id + term`) are enforced via unique constraints without partial functional dependencies.

### 1.3 Third Normal Form (3NF)
- **Rule**: Schema is in 2NF and contains no transitive dependencies (non-key columns dependent on other non-key columns).
- **Verification**: 
  - `enrollments` stores only foreign key references to `student_id` and `course_id`. Student names or course titles are never duplicated in the enrollment table.
  - Grade calculations and attendance percentages are computed dynamically in the application domain rather than stored redundantly in the database.\n