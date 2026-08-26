# Object Interactions Analysis

## 1. Scenario Collaboration Analysis
This section analyzes how domain objects collaborate to satisfy the primary system workflows without creating monolithic manager classes.

---

### Scenario 1: Admin Creates a Student
- **Actor**: Admin
- **Objects Involved**: `Admin`, `User`, `Student`
- **Interaction Flow**:
  1. `Admin` initiates creation with profile and credential parameters.
  2. System initializes `User` entity with role `STUDENT` and credential hashes.
  3. System initializes `Student` entity with roll number, personal data, and links it to `User`.
  4. System registers `Student` in institutional registry.

---

### Scenario 2: Admin Creates Course and Assigns Faculty
- **Actor**: Admin
- **Objects Involved**: `Admin`, `Course`, `Faculty`
- **Interaction Flow**:
  1. `Admin` provides course details (code, title, credits).
  2. System creates `Course` instance.
  3. `Admin` selects qualified `Faculty` for the course.
  4. `Course` sets its assigned faculty reference to `Faculty`.
  5. `Faculty` appends `Course` to its assigned courses collection.

---

### Scenario 3: Student Enrolls in a Course
- **Actor**: Admin / System
- **Objects Involved**: `Student`, `Course`, `Enrollment`
- **Interaction Flow**:
  1. Enrollment request dispatched for `Student` and `Course`.
  2. System verifies `Course` is active and `Student` is not already enrolled.
  3. New `Enrollment` instance is instantiated linking `Student` and `Course`.
  4. `Course` adds `Enrollment` to its roster; `Student` adds `Enrollment` to enrolled list.

---

### Scenario 4: Faculty Records Attendance
- **Actor**: Faculty
- **Objects Involved**: `Faculty`, `Course`, `Enrollment`, `Attendance`
- **Interaction Flow**:
  1. `Faculty` requests attendance sheet for assigned `Course`.
  2. `Course` returns active `Enrollment` roster.
  3. `Faculty` submits status map for session date.
  4. For each student, a new `Attendance` instance is created and linked to `Enrollment`.
  5. Aggregate attendance statistics are updated.

---

### Scenario 5: Faculty Enters Marks
- **Actor**: Faculty
- **Objects Involved**: `Faculty`, `Course`, `Enrollment`, `AcademicRecord`
- **Interaction Flow**:
  1. `Faculty` selects `Course` and assessment component.
  2. `Faculty` submits score payload for enrolled students.
  3. For each student, `AcademicRecord` validates score limits ($0 \le \text{score} \le \text{maxScore}$) and binds to `Enrollment`.
  4. System updates overall marks and tentative grade computation.

---

### Scenario 6: Student Views Attendance
- **Actor**: Student
- **Objects Involved**: `Student`, `Enrollment`, `Attendance`, `Course`
- **Interaction Flow**:
  1. `Student` requests attendance summary.
  2. `Student` queries own `Enrollment` objects.
  3. Each `Enrollment` retrieves its associated `Attendance` records.
  4. Attendance summary (total sessions, attended sessions, percentage) is calculated and presented.

---

### Scenario 7: Student Views Academic Records
- **Actor**: Student
- **Objects Involved**: `Student`, `Enrollment`, `AcademicRecord`, `Course`
- **Interaction Flow**:
  1. `Student` requests academic grade report.
  2. `Student` navigates through active `Enrollment` associations.
  3. Each `Enrollment` queries its `AcademicRecord` collection.
  4. Marks, weightages, and calculated final grades are compiled and displayed.\n