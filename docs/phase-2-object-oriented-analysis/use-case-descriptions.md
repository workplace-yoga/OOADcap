# Use Case Descriptions

This document provides formal, structured specifications for the core use cases across the three primary actors.

---

### UC-01: Authenticate User
- **Primary Actor**: Admin, Faculty, Student
- **Goal**: Authenticate identity and obtain a secure, role-verified session.
- **Preconditions**: User possesses registered system credentials (username/email and password).
- **Main Success Flow**:
  1. Actor navigates to the login interface and submits credentials.
  2. System validates that credentials are non-empty and well-formed.
  3. System verifies credentials against encrypted credential records.
  4. System extracts the user's role (`ADMIN`, `FACULTY`, or `STUDENT`).
  5. System generates a secure session token containing identity and role claims.
  6. System redirects the actor to their designated role dashboard (UC-02).
- **Alternative / Exception Flows**:
  - *3a. Invalid credentials*: System displays an authentication failure alert and denies access.
  - *3b. Deactivated user account*: System halts authentication and notifies the user to contact the administrator.
- **Postconditions**: User is authenticated and possesses a valid role-bound session.

---

### UC-03: Manage Students (Create Student Sub-flow)
- **Primary Actor**: Admin
- **Goal**: Register a new student profile and initialize student credentials.
- **Preconditions**: Admin is authenticated with `ADMIN` role.
- **Main Success Flow**:
  1. Admin opens the Student Management interface.
  2. Admin enters student details (Name, Roll No, Email, Department, Date of Birth, Contact).
  3. System validates data integrity (unique roll number, valid email format).
  4. System persists the new Student record and associates corresponding User authentication credentials.
  5. System presents a success confirmation and updates the active student directory.
- **Alternative / Exception Flows**:
  - *3a. Duplicate Roll Number / Email*: System flags field collision and requests unique values.
  - *3b. Validation failure*: System highlights missing or malformed mandatory fields.
- **Postconditions**: New student entity is persistently created in the system.

---

### UC-06: Assign Faculty to Course
- **Primary Actor**: Admin
- **Goal**: Link an active faculty member as the instructor for a specific course offering.
- **Preconditions**: Admin is authenticated; target Course and Faculty records exist and are active.
- **Main Success Flow**:
  1. Admin navigates to Course Allocation view.
  2. Admin selects target Course and active Faculty member.
  3. System verifies faculty eligibility and course status.
  4. System creates the teaching assignment association between Course and Faculty.
  5. System updates course metadata and displays assignment confirmation.
- **Alternative / Exception Flows**:
  - *3a. Faculty already assigned or inactive*: System displays conflict warning.
- **Postconditions**: The course is formally linked to the assigned faculty member.

---

### UC-07: Manage Course Enrollment
- **Primary Actor**: Admin
- **Goal**: Enroll an eligible student into an active course offering.
- **Preconditions**: Target Student and Course entities exist and are active.
- **Main Success Flow**:
  1. Admin initiates enrollment for a designated student and course.
  2. System checks if student is already enrolled in the course for the term.
  3. System creates an active `Enrollment` record linking the Student and Course.
  4. System updates course roster and confirms successful enrollment.
- **Alternative / Exception Flows**:
  - *2a. Duplicate Enrollment*: System alerts that the student is already enrolled.
- **Postconditions**: Student is associated with the course via an active Enrollment record.

---

### UC-10: Record Session Attendance
- **Primary Actor**: Faculty
- **Goal**: Mark student presence/absence for a specific course lecture session.
- **Preconditions**: Faculty is authenticated; course is assigned to this faculty; students are enrolled.
- **Main Success Flow**:
  1. Faculty selects assigned Course and specifies session date/slot.
  2. System retrieves the current roster of enrolled students.
  3. Faculty marks attendance status (`Present`, `Absent`, `Late`, `Excused`) for each student.
  4. Faculty submits attendance register.
  5. System creates session `Attendance` records for each enrolled student.
  6. System confirms attendance persistence and updates aggregate statistics.
- **Alternative / Exception Flows**:
  - *1a. Unauthorized Course*: System rejects request if course is not assigned to this faculty.
  - *4a. Incomplete Roster Status*: System prompts faculty to fill missing statuses.
- **Postconditions**: Attendance records are persistently recorded for the session.

---

### UC-12: Enter Assessment Marks
- **Primary Actor**: Faculty
- **Goal**: Enter evaluation marks for students in an assigned course.
- **Preconditions**: Faculty is authenticated; course is assigned to faculty; students are enrolled.
- **Main Success Flow**:
  1. Faculty selects assigned Course and assessment component (e.g., Quiz 1, Midterm, Final).
  2. System renders enrolled student list with maximum score parameters.
  3. Faculty inputs marks for each student.
  4. System validates that marks are non-negative and do not exceed maximum score.
  5. System creates or updates `AcademicRecord` entries.
  6. System computes total score / tentative grade and displays confirmation.
- **Alternative / Exception Flows**:
  - *4a. Out-of-bounds score*: System flags invalid score entry (> max score or < 0).
- **Postconditions**: Academic performance records are stored and linked to student enrollments.

---

### UC-17: View Personal Attendance
- **Primary Actor**: Student
- **Goal**: View individual session attendance history and aggregate percentage.
- **Preconditions**: Student is authenticated with `STUDENT` role.
- **Main Success Flow**:
  1. Student navigates to Attendance section on dashboard.
  2. System identifies authenticated student ID.
  3. System retrieves all attendance records grouped by enrolled courses.
  4. System calculates total sessions held, sessions attended, and attendance percentage.
  5. System presents summary cards and session-by-session audit table.
- **Postconditions**: Student has reviewed accurate personal attendance status.

---

### UC-18: View Academic Records & Grades
- **Primary Actor**: Student
- **Goal**: View marks obtained, evaluation component breakdowns, and calculated final grades.
- **Preconditions**: Student is authenticated with `STUDENT` role.
- **Main Success Flow**:
  1. Student navigates to Academic Records tab.
  2. System queries all `AcademicRecord` entries associated with the student's enrollments.
  3. System presents component-wise scores, total marks, and computed letter grades per course.
- **Postconditions**: Academic records are displayed in read-only mode to the student.\n