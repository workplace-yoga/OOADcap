# Cohesion and Coupling Analysis

## 1. High Cohesion Analysis
High cohesion dictates that every domain class must have a single, tightly-focused set of responsibilities.

### 1.1 Cohesive Domain Object Allocation
- **`Student`**: Strictly handles student demographic data, identity, and personal queries. Does *not* handle authentication algorithms or course catalog modifications.
- **`Faculty`**: Strictly encapsulates teaching instructor information and assigned course references. Does *not* manage student account lifecycles.
- **`Course`**: Encapsulates course syllabus details, credit values, and roster links. Does *not* perform database SQL operations or UI rendering.
- **`Attendance`**: Purely represents session participation data and timestamps.
- **`AcademicRecord`**: Purely represents evaluation marks and score validations.

### 1.2 Anti-Pattern Avoidance
- ❌ **Avoid "God Object" (`SystemManager` / `StudentManager`)**: We explicitly reject creating a monolithic manager class that holds all student, course, attendance, and mark operations. Responsibilities are distributed to their respective domain entities.

---

## 2. Low Coupling Analysis
Low coupling minimizes direct dependencies between objects so changes in one entity do not cascade across the system.

### 2.1 Decoupled Collaborations
- `Student` does not directly manipulate `Course` catalog internals; interaction occurs through the `Enrollment` associative class.
- `Faculty` does not directly modify `Student` private fields; faculty interacts with `Attendance` and `AcademicRecord` instances associated with the course offering.
- `Attendance` records do not hold direct pointers to faculty credentials, only referencing the authorized recorded session context.\n