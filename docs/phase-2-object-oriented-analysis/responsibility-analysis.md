# Object Responsibility Analysis (CRC Analysis)

## 1. Responsibility Assignment Principles
Responsibilities are allocated using the **Information Expert** and **Single Responsibility** principles to ensure domain objects manage their own state and encapsulate domain invariants.

---

## 2. CRC (Class-Responsibility-Collaborator) Models

### 2.1 Domain Object: `User`
- **Responsibilities**:
  - Maintain authentication credentials securely.
  - Verify submitted credentials.
  - Expose assigned system role (`ADMIN`, `FACULTY`, `STUDENT`).
  - Maintain account active status.
- **Collaborators**: `Admin`, `Faculty`, `Student`.

### 2.2 Domain Object: `Student`
- **Responsibilities**:
  - Maintain student profile attributes (Roll Number, Full Name, Department, Contact, Semester).
  - Provide access to enrolled course associations.
  - Provide personal attendance summaries across courses.
  - Provide personal academic performance records.
- **Collaborators**: `User`, `Enrollment`, `Course`, `Attendance`, `AcademicRecord`.

### 2.3 Domain Object: `Faculty`
- **Responsibilities**:
  - Maintain faculty profile attributes (Faculty ID, Name, Department, Designation, Email).
  - Maintain list of currently assigned courses.
  - Verify authority to record attendance and grades for assigned courses.
- **Collaborators**: `User`, `Course`, `Attendance`, `AcademicRecord`.

### 2.4 Domain Object: `Course`
- **Responsibilities**:
  - Maintain course catalog details (Course Code, Title, Credits, Department, Description).
  - Maintain assigned teaching faculty reference.
  - Maintain active enrollment roster.
- **Collaborators**: `Faculty`, `Enrollment`, `Student`.

### 2.5 Domain Object: `Enrollment`
- **Responsibilities**:
  - Link a specific `Student` to a specific `Course`.
  - Maintain enrollment timestamp and status (`Active`, `Completed`, `Dropped`).
  - Act as the conceptual container for a student's course attendance entries and marks.
- **Collaborators**: `Student`, `Course`, `Attendance`, `AcademicRecord`.

### 2.6 Domain Object: `Attendance`
- **Responsibilities**:
  - Record session date, session slot/index, and status (`Present`, `Absent`, `Late`, `Excused`).
  - Associate attendance state with specific student enrollment in a course.
  - Maintain audit trail of attendance updates.
- **Collaborators**: `Enrollment`, `Student`, `Course`, `Faculty`.

### 2.7 Domain Object: `AcademicRecord`
- **Responsibilities**:
  - Record assessment type (e.g., Assignment, Quiz, Midterm, Final).
  - Store score obtained and maximum obtainable score.
  - Validate score boundaries ($0 \le \text{score} \le \text{maxScore}$).
  - Compute percentage and contribute to course final grade calculation.
- **Collaborators**: `Enrollment`, `Student`, `Course`, `Faculty`.\n