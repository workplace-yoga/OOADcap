# Actor Analysis

## 1. Overview
Object-Oriented Analysis begins with identifying and formalizing the primary external entities (actors) that interact with the Student Information System (SIS) to achieve specific business goals. In strict alignment with Phase 1 scope freezing, exactly three primary actors are modeled.

---

## 2. Detailed Actor Profiles

### 2.1 Actor: ADMIN
- **Role Definition**: Institutional system administrator responsible for core entity lifecycles, course setups, teaching allocations, and administrative oversight.
- **Primary Goals**:
  - Maintain accurate and centralized records of students and faculty.
  - Manage course catalogs and assign academic instructors to offerings.
  - Oversee student enrollments and resolve registration anomalies.
  - Monitor aggregate institutional data and generate administrative summaries.
- **Key Responsibilities**:
  - Authenticate into administrative domain.
  - Create, read, update, and deactivate/delete student and faculty records.
  - Create and configure course offerings and assign teaching faculty.
  - View system dashboards and aggregate academic health metrics.
- **Information Interacted With**:
  - Full student profile and enrollment directory.
  - Faculty directory and departmental assignments.
  - Course catalog, prerequisites, credit units, and faculty allocations.
  - System-wide metrics (total headcounts, active courses, enrollment counts).
- **Authorized Operations**:
  - `login()`, `viewAdminDashboard()`
  - `createStudent()`, `updateStudent()`, `deleteStudent()`, `viewStudentDirectory()`
  - `createFaculty()`, `updateFaculty()`, `viewFacultyDirectory()`
  - `createCourse()`, `updateCourse()`, `deleteCourse()`, `assignFacultyToCourse()`
  - `manageEnrollment()`, `viewSystemReports()`
- **Unauthorized Operations (Restricted)**:
  - Cannot directly record or tamper with classroom session attendance (strictly delegated to Faculty).
  - Cannot evaluate assessments or enter course marks/grades (strictly delegated to Faculty).

---

### 2.2 Actor: FACULTY
- **Role Definition**: Academic instructor responsible for delivering assigned courses, tracking student attendance, and assessing academic performance.
- **Primary Goals**:
  - View roster of students enrolled in assigned courses.
  - Record and maintain accurate session-wise student attendance.
  - Enter and adjust continuous evaluation marks and final assessment scores.
- **Key Responsibilities**:
  - Authenticate into faculty domain.
  - Access assigned course schedules and student rosters.
  - Record attendance per lecture/lab session and update historical records when justified.
  - Submit assessment marks (quizzes, assignments, exams) and calculate aggregate grades.
- **Information Interacted With**:
  - Assigned course details and schedules.
  - Enrolled student roster for assigned courses (name, roll number, attendance status).
  - Session-based attendance registers.
  - Student marks entries and grading criteria for assigned courses.
- **Authorized Operations**:
  - `login()`, `viewFacultyDashboard()`
  - `viewAssignedCourses()`, `viewEnrolledStudents(courseId)`
  - `recordAttendance(courseId, sessionDate, attendanceList)`, `updateAttendance()`
  - `enterMarks(courseId, studentId, assessmentType, score)`, `updateMarks()`
- **Unauthorized Operations (Restricted)**:
  - Cannot create, modify, or delete student user accounts or master profiles.
  - Cannot create new courses or modify institutional course catalogs.
  - Cannot assign other faculty members to courses.
  - Cannot view or alter attendance/marks for courses assigned to other faculty.

---

### 2.3 Actor: STUDENT
- **Role Definition**: Enrolled learner who accesses personalized academic records, course enrollments, attendance summaries, and grade reports.
- **Primary Goals**:
  - Monitor own profile and institutional enrollment status.
  - Verify enrolled courses and corresponding instructors.
  - Track personal attendance percentages and session records.
  - View marks, grade calculations, and academic transcripts.
- **Key Responsibilities**:
  - Authenticate using individual student credentials.
  - Review personal demographic and contact information.
  - Monitor compliance with attendance thresholds across all enrolled courses.
  - Review academic evaluation scores and term performance.
- **Information Interacted With**:
  - Personal student profile.
  - Personal course enrollment schedule and instructor details.
  - Personal session-wise attendance history and calculated attendance percentages.
  - Personal marks, assessment breakdowns, and calculated final grades.
- **Authorized Operations**:
  - `login()`, `viewStudentDashboard()`
  - `viewOwnProfile()`
  - `viewEnrolledCourses()`
  - `viewOwnAttendance(courseId)`
  - `viewOwnAcademicRecords(courseId)`
- **Unauthorized Operations (Restricted)**:
  - Cannot modify own profile master records (must request administrative update).
  - Cannot view records, attendance, or grades of other students (data privacy).
  - Cannot create courses or enroll without administrative approval.
  - Cannot record or alter attendance or marks.

---

## 3. Actor-Responsibility-Access Matrix

| System Capability | Admin | Faculty | Student |
| :--- | :---: | :---: | :---: |
| Authenticate & Access Protected Space | ✅ (Admin Domain) | ✅ (Faculty Domain) | ✅ (Student Domain) |
| Manage Student Profiles (CRUD) | ✅ Full Access | ❌ Restricted | ❌ Read Own Only |
| Manage Faculty Profiles (CRUD) | ✅ Full Access | ❌ Restricted | ❌ Restricted |
| Manage Course Offerings (CRUD) | ✅ Full Access | ❌ Restricted | ❌ Restricted |
| Assign Faculty to Courses | ✅ Full Access | ❌ Restricted | ❌ Restricted |
| View Course Roster / Enrolled Students | ✅ Full Access | ✅ (Assigned Courses Only) | ❌ Restricted |
| Record & Edit Session Attendance | ❌ Restricted | ✅ (Assigned Courses Only) | ❌ Restricted |
| View Personal Attendance Records | ❌ Summary Only | ✅ (Assigned Courses Only) | ✅ (Own Records Only) |
| Enter & Modify Student Marks | ❌ Restricted | ✅ (Assigned Courses Only) | ❌ Restricted |
| View Student Marks & Grades | ✅ Summary Only | ✅ (Assigned Courses Only) | ✅ (Own Records Only) |\n