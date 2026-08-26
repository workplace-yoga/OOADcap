# Final Domain Class Analysis

## 1. Executive Summary
In Object-Oriented Design (OOD), we transform the conceptual domain entities identified during Phase 2 analysis into fully articulated, implementation-ready domain classes. Every class is defined with explicit responsibilities, typed attributes, visibility indicators, and behavioral methods while strictly preserving high cohesion and loose coupling.

---

## 2. Finalized Domain Classes

### 2.1 Class: `User` (Abstract Base Class)
- **Purpose**: Encapsulates common security credentials, identity attributes, active status, and generalized authentication behavior.
- **Stereotype**: `<<Abstract>>`
- **Visibility & Attributes**:
  - `- userId: String`
  - `- username: String`
  - `- passwordHash: String`
  - `- email: String`
  - `- role: UserRole` (Enum: `ADMIN`, `FACULTY`, `STUDENT`)
  - `- isActive: Boolean`
  - `- lastLogin: DateTime`
- **Operations**:
  - `+ authenticate(plainPassword: String): Boolean`
  - `+ changePassword(oldPass: String, newPass: String): Boolean`
  - `+ getDashboardRoute(): String` *(Abstract / Polymorphic)*
  - `+ getAccessPermissions(): List<Permission>` *(Abstract / Polymorphic)*
  - `+ deactivate(): Void`
  - `+ getProfileSummary(): Map<String, Any>`

---

### 2.2 Class: `Admin` (Specialization of `User`)
- **Purpose**: Encapsulates administrative privileges, institutional oversight, and master record configuration operations.
- **Inheritance**: Extends `User`
- **Attributes**:
  - `- adminId: String`
  - `- department: String`
  - `- officeLocation: String`
- **Operations**:
  - `+ getDashboardRoute(): String` *(Returns `"/admin/dashboard"`)*
  - `+ getAccessPermissions(): List<Permission>`
  - `+ registerStudent(studentData: StudentDTO): Student`
  - `+ registerFaculty(facultyData: FacultyDTO): Faculty`
  - `+ createCourse(courseData: CourseDTO): Course`
  - `+ assignFacultyToCourse(courseId: String, facultyId: String): Boolean`
  - `+ enrollStudentInCourse(studentId: String, courseId: String): Enrollment`
  - `+ generateSystemSummaryReport(): ReportDTO`

---

### 2.3 Class: `Faculty` (Specialization of `User`)
- **Purpose**: Encapsulates academic instructor details, teaching allocations, attendance submission, and evaluation entry behavior.
- **Inheritance**: Extends `User`
- **Attributes**:
  - `- facultyId: String`
  - `- fullName: String`
  - `- department: String`
  - `- designation: String`
  - `- contactNumber: String`
  - `- assignedCourses: List<Course>`
- **Operations**:
  - `+ getDashboardRoute(): String` *(Returns `"/faculty/dashboard"`)*
  - `+ getAccessPermissions(): List<Permission>`
  - `+ getAssignedCourses(): List<Course>`
  - `+ getEnrolledStudentsForCourse(courseId: String): List<Student>`
  - `+ recordSessionAttendance(courseId: String, date: Date, entries: List<AttendanceEntryDTO>): Boolean`
  - `+ updateSessionAttendance(attendanceId: String, newStatus: AttendanceStatus, reason: String): Boolean`
  - `+ submitAssessmentMarks(courseId: String, assessmentType: String, marksList: List<MarkEntryDTO>): Boolean`
  - `+ updateAssessmentMark(recordId: String, newScore: Float): Boolean`

---

### 2.4 Class: `Student` (Specialization of `User`)
- **Purpose**: Encapsulates learner profile details, academic registrations, attendance tracking, and grade viewing capabilities.
- **Inheritance**: Extends `User`
- **Attributes**:
  - `- studentId: String`
  - `- rollNumber: String`
  - `- fullName: String`
  - `- department: String`
  - `- currentSemester: Integer`
  - `- dateOfBirth: Date`
  - `- contactNumber: String`
  - `- enrollments: List<Enrollment>`
- **Operations**:
  - `+ getDashboardRoute(): String` *(Returns `"/student/dashboard"`)*
  - `+ getAccessPermissions(): List<Permission>`
  - `+ getEnrolledCourses(): List<Course>`
  - `+ getAttendanceSummary(courseId: String): AttendanceSummaryDTO`
  - `+ getAcademicTranscript(): TranscriptDTO`
  - `+ updateContactInfo(newContact: String): Boolean`

---

### 2.5 Class: `Course`
- **Purpose**: Encapsulates course catalog definitions, syllabus parameters, credit values, assigned faculty, and active enrollments.
- **Attributes**:
  - `- courseId: String`
  - `- courseCode: String`
  - `- title: String`
  - `- creditUnits: Integer`
  - `- department: String`
  - `- description: String`
  - `- assignedFaculty: Faculty`
  - `- enrollments: List<Enrollment>`
  - `- isActive: Boolean`
- **Operations**:
  - `+ assignFaculty(faculty: Faculty): Void`
  - `+ addEnrollment(enrollment: Enrollment): Boolean`
  - `+ removeEnrollment(enrollmentId: String): Boolean`
  - `+ getRoster(): List<Student>`
  - `+ getActiveEnrollmentCount(): Integer`
  - `+ updateCourseDetails(title: String, credits: Integer, desc: String): Void`
  - `+ archiveCourse(): Void`

---

### 2.6 Class: `Enrollment` (Associative Entity)
- **Purpose**: Represents the persistent binding between a `Student` and a `Course` for a specific academic term, containing lifecycle attendance logs and assessment records.
- **Attributes**:
  - `- enrollmentId: String`
  - `- student: Student`
  - `- course: Course`
  - `- academicTerm: String`
  - `- enrollmentDate: DateTime`
  - `- status: EnrollmentStatus` (Enum: `ACTIVE`, `COMPLETED`, `DROPPED`)
  - `- attendanceRecords: List<Attendance>`
  - `- academicRecords: List<AcademicRecord>`
- **Operations**:
  - `+ addAttendance(attendance: Attendance): Void`
  - `+ addAcademicRecord(record: AcademicRecord): Void`
  - `+ calculateAttendancePercentage(): Float`
  - `+ calculateTotalMarks(): Float`
  - `+ computeFinalGrade(): String`
  - `+ dropEnrollment(): Void`
  - `+ completeEnrollment(): Void`

---

### 2.7 Class: `Attendance`
- **Purpose**: Encapsulates an individual lecture/lab session attendance log for a student within an enrollment.
- **Attributes**:
  - `- attendanceId: String`
  - `- sessionDate: Date`
  - `- sessionSlot: Integer`
  - `- status: AttendanceStatus` (Enum: `PRESENT`, `ABSENT`, `LATE`, `EXCUSED`)
  - `- remarks: String`
  - `- recordedByFacultyId: String`
  - `- lastModified: DateTime`
- **Operations**:
  - `+ updateStatus(newStatus: AttendanceStatus, reason: String): Void`
  - `+ isValidSessionDate(): Boolean`
  - `+ getAttendanceSummary(): Map<String, Any>`

---

### 2.8 Class: `AcademicRecord`
- **Purpose**: Encapsulates continuous internal evaluation scores, examination marks, and grade computations for a student's enrollment.
- **Attributes**:
  - `- recordId: String`
  - `- assessmentType: String` (e.g., "Assignment 1", "Midterm", "Final Exam")
  - `- scoreObtained: Float`
  - `- maximumScore: Float`
  - `- weightagePercentage: Float`
  - `- feedbackRemarks: String`
- **Operations**:
  - `+ updateScore(newScore: Float): Boolean`
  - `+ calculatePercentage(): Float`
  - `+ calculateWeightedScore(): Float`
  - `+ isValidScore(): Boolean`\n