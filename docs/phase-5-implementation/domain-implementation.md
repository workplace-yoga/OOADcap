# Domain Model Implementation

## 1. Domain Entities & Invariants
The domain model implemented under `backend/src/domain/model/` is non-anemic, encapsulating business rules and domain invariants directly within objects.

### 1.1 `User` (Abstract Base Class)
- Private password field (`#passwordHash`).
- Built-in bcrypt authentication: `user.authenticate(plainPassword)`.
- Enforces abstract polymorphic contracts: `getDashboardRoute()`, `getAccessPermissions()`.

### 1.2 `Admin`, `Faculty`, `Student` (Subclasses)
- Specializes `User` via ES6 `extends`.
- Implements specialized `getDashboardRoute()` (`"/admin/dashboard"`, `"/faculty/dashboard"`, `"/student/dashboard"`).
- Encapsulates role capability lists (`getAccessPermissions()`).

### 1.3 `Enrollment` (Aggregate Root for Course Participation)
- Contains compositions of `Attendance` and `AcademicRecord`.
- Domain calculation methods:
  - `calculateAttendancePercentage()`: Computes session compliance ($0.0 - 100.0\%$).
  - `calculateTotalMarks()`: Aggregates continuous evaluation and exam scores.
  - `computeFinalGrade()`: Translates total percentages into letter grades (`A+`, `A`, `B`, `C`, `D`, `F`).

### 1.4 `Attendance`
- Validates allowed domain states (`PRESENT`, `ABSENT`, `LATE`, `EXCUSED`).
- Enforces session audit modifications via `updateStatus(newStatus, reason)`.

### 1.5 `AcademicRecord`
- Enforces score boundary invariant ($0 \le 	ext{scoreObtained} \le 	ext{maximumScore}$).
- Calculates individual assessment percentages.
