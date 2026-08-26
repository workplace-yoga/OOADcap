# Object Relationship Analysis

## 1. Structural Relationship Evaluation
In Object-Oriented Analysis, relationships must reflect real-world domain semantics. We evaluate associations, multiplicities, and lifecycle dependencies.

---

## 2. Detailed Relationship Specifications

### 2.1 `User` ↔ `Student` / `Faculty` / `Admin`
- **Semantic Meaning**: Every student, faculty, and administrator is an authenticated user of the system.
- **Multiplicity**: $1 \longleftrightarrow 1$ (Each domain persona corresponds to exactly one login identity).
- **Relationship Type**: Evaluated in inheritance analysis (Generalization vs 1:1 Association). Recommended: Specialization of `User` identity or 1:1 compositional profile association.

### 2.2 `Faculty` ↔ `Course`
- **Semantic Meaning**: A faculty member teaches zero or more courses; each course offering is instructed by one faculty member (in current scope).
- **Multiplicity**: $\text{Faculty } 1 \longleftrightarrow 0..* \text{ Course}$
- **Relationship Type**: **Association** (Independent lifecycles; deleting a course does not delete the faculty member).

### 2.3 `Student` ↔ `Course` (via `Enrollment`)
- **Semantic Meaning**: A student can enroll in multiple courses ($1..*$), and a course has multiple enrolled students ($0..*$).
- **Multiplicity**: Many-to-Many ($* \longleftrightarrow *$) resolved via `Enrollment`.
- **Relationship Type**: **Association Class / Associative Entity** (`Enrollment`).

### 2.4 `Enrollment` ↔ `Attendance`
- **Semantic Meaning**: An enrollment contains the complete log of session attendance records for that student in that course.
- **Multiplicity**: $\text{Enrollment } 1 \longleftrightarrow 0..* \text{ Attendance}$
- **Relationship Type**: **Composition** (Attendance records have no independent existential meaning without the parent course enrollment).

### 2.5 `Enrollment` ↔ `AcademicRecord`
- **Semantic Meaning**: An enrollment contains the assessment marks and evaluation scores earned by the student in that course.
- **Multiplicity**: $\text{Enrollment } 1 \longleftrightarrow 0..* \text{ AcademicRecord}$
- **Relationship Type**: **Composition** (Academic records exist strictly within the lifecycle of a student's course enrollment).

---

## 3. Relationship Summary Matrix

| Source Entity | Target Entity | Multiplicity | Conceptual Relationship | Lifecycle Dependency |
| :--- | :--- | :---: | :--- | :--- |
| `User` | `Student` / `Faculty` / `Admin` | $1 : 1$ | Generalization / Specialization | Co-dependent identity |
| `Faculty` | `Course` | $1 : 0..*$ | Direct Association | Independent |
| `Student` | `Enrollment` | $1 : 0..*$ | Aggregation | Student outlives Enrollment |
| `Course` | `Enrollment` | $1 : 0..*$ | Aggregation | Course outlives Enrollment |
| `Enrollment` | `Attendance` | $1 : 0..*$ | Composition | Attendance bound to Enrollment |
| `Enrollment` | `AcademicRecord` | $1 : 0..*$ | Composition | Marks bound to Enrollment |\n