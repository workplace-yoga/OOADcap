# System Users and Actors

In this initial release, the system boundary recognizes exactly three primary actors. No additional user roles are permitted in this phase.

```
       +-------------------------------------------------------------+
       |               Student Information System (SIS)              |
       |                                                             |
       |   +------------------+  +------------------+  +---------+   |
       |   |      Admin       |  |     Faculty      |  | Student |   |
       |   +------------------+  +------------------+  +---------+   |
       +-------------------------------------------------------------+
```

---

## 1. Primary Actors & Detailed Responsibilities

### 1.1 ADMIN
The Admin is responsible for system configuration, master data management, institutional oversight, and user lifecycle administration.

**Key Responsibilities:**
- **Authentication**: Secure login and session initiation.
- **Dashboard**: View system-wide summary metrics, overall enrollment, faculty count, and course statistics.
- **Student Management**: Create new student records, view detailed profiles, update existing student data, and delete/archive student records.
- **Faculty Management**: Create faculty profiles, view faculty directories, update faculty details, and maintain department affiliations.
- **Course Management**: Define new course offerings, update course catalogs, archive obsolete courses, and view course details.
- **Teaching Allocation**: Assign qualified faculty members to specific course offerings.
- **Enrollment Management**: Oversee and manage student course enrollments where administrative intervention is needed.
- **Reports & Summaries**: Access institutional reports and aggregate summaries.

---

### 1.2 FACULTY
The Faculty actor represents teaching staff assigned to deliver courses, monitor student participation, and evaluate academic performance.

**Key Responsibilities:**
- **Authentication**: Secure login and identity verification.
- **Dashboard**: View assigned courses for the active term and related operational notifications.
- **Course Roster Access**: View the list of enrolled students within their assigned courses.
- **Attendance Management**: Record session-wise attendance (Present, Absent, Late, Excused) and update previously submitted attendance entries.
- **Marks & Evaluation**: Enter assessment marks (internal tests, assignments, exams) for enrolled students and update evaluation scores.
- **Academic Monitoring**: View grade distributions and academic progress for students in their assigned sections.

---

### 1.3 STUDENT
The Student actor represents an enrolled learner accessing personal academic information, course enrollments, attendance status, and examination results.

**Key Responsibilities:**
- **Authentication**: Secure login with unique student credentials.
- **Dashboard**: View personalized summary of active courses, recent attendance summaries, and latest academic notifications.
- **Profile Management**: View own student profile details and demographic/academic registration data.
- **Course View**: View currently enrolled courses and instructor details.
- **Attendance View**: View personal attendance percentage and detailed session attendance records.
- **Academic Record View**: View own marks, calculated totals, grade points, and semester performance records.

---

## 2. Actor Responsibility Matrix

| Feature / Responsibility | Admin | Faculty | Student |
| :--- | :---: | :---: | :---: |
| Authenticate / Log In | ✅ | ✅ | ✅ |
| Access Role-Specific Dashboard | ✅ | ✅ | ✅ |
| Create / Update / Delete Student Records | ✅ | ❌ | ❌ |
| Create / Update Faculty Records | ✅ | ❌ | ❌ |
| Create / Update / Delete Courses | ✅ | ❌ | ❌ |
| Assign Faculty to Courses | ✅ | ❌ | ❌ |
| View Assigned Course Rosters | ✅ | ✅ | ❌ |
| Record & Update Attendance | ❌ | ✅ | ❌ |
| View Personal Attendance Records | ❌ | ❌ | ✅ |
| Enter & Update Marks | ❌ | ✅ | ❌ |
| View Personal Marks & Academic Grades | ❌ | ❌ | ✅ |
| View System Reports & Aggregates | ✅ | ❌ | ❌ |\n