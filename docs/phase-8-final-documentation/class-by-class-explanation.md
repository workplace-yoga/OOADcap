# Class-by-Class Object-Oriented Analysis & Design

## 1. Domain Entities Deep Dive

### 1.1 `User` (Abstract Base Class)
- **Purpose**: Represents core authenticated identity.
- **Attributes**: `userId`, `username`, `email`, `role`, `#passwordHash`, `createdAt`.
- **Key Operations**: `authenticate(plainPassword)`, `getDashboardRoute()` *(Abstract)*, `getAccessPermissions()` *(Abstract)*.
- **OOAD Concepts**: Encapsulation, Abstraction, Polymorphism.
- **Code Reference**: [`backend/src/domain/model/User.js`](../../../backend/src/domain/model/User.js).

### 1.2 `Student` (Subclass of User)
- **Purpose**: Represents enrolled learner and academic record holder.
- **Attributes**: `studentId`, `rollNumber`, `fullName`, `department`, `currentSemester`, `contactNumber`.
- **Key Operations**: `updateSemester(newSemester)`, `getDashboardRoute()` $ightarrow$ `"/student/dashboard"`.
- **OOAD Concepts**: Inheritance, Specialization, Encapsulation.
- **Code Reference**: [`backend/src/domain/model/Student.js`](../../../backend/src/domain/model/Student.js).

### 1.3 `Faculty` (Subclass of User)
- **Purpose**: Represents instructional staff.
- **Attributes**: `facultyId`, `fullName`, `department`, `designation`, `officeLocation`.
- **Key Operations**: `getDashboardRoute()` $ightarrow$ `"/faculty/dashboard"`.
- **OOAD Concepts**: Inheritance, Polymorphism.
- **Code Reference**: [`backend/src/domain/model/Faculty.js`](../../../backend/src/domain/model/Faculty.js).

### 1.4 `Admin` (Subclass of User)
- **Purpose**: Represents institutional system administrator.
- **Attributes**: `adminId`, `fullName`, `officeLocation`.
- **Key Operations**: `getDashboardRoute()` $ightarrow$ `"/admin/dashboard"`.
- **OOAD Concepts**: Inheritance, Polymorphism.
- **Code Reference**: [`backend/src/domain/model/Admin.js`](../../../backend/src/domain/model/Admin.js).

### 1.5 `Course` (Entity)
- **Purpose**: Represents academic course offerings.
- **Attributes**: `courseId`, `courseCode`, `title`, `creditUnits`, `department`, `facultyId`, `facultyName`.
- **Key Operations**: `assignFaculty(facultyId, facultyName)`.
- **OOAD Concepts**: Association, Domain Invariant Validation ($1 \le 	ext{credits} \le 6$).
- **Code Reference**: [`backend/src/domain/model/Course.js`](../../../backend/src/domain/model/Course.js).

### 1.6 `Enrollment` (Aggregate Root)
- **Purpose**: Associative entity binding a Student and Course for an academic term.
- **Attributes**: `enrollmentId`, `studentId`, `courseId`, `academicTerm`, `attendanceList[]`, `academicRecordList[]`.
- **Key Operations**: `addAttendance()`, `addAcademicRecord()`, `calculateAttendancePercentage()`, `calculateTotalMarks()`, `computeFinalGrade()`.
- **OOAD Concepts**: Composition, Aggregate Root Pattern, High Cohesion.
- **Code Reference**: [`backend/src/domain/model/Enrollment.js`](../../../backend/src/domain/model/Enrollment.js).

### 1.7 `Attendance` (Entity)
- **Purpose**: Represents a specific lecture session attendance log.
- **Attributes**: `attendanceId`, `enrollmentId`, `sessionDate`, `sessionSlot`, `status`, `remarks`.
- **Key Operations**: `updateStatus(newStatus, reason)`, `validateStatus()`.
- **OOAD Concepts**: Encapsulation, State Validation (`PRESENT`, `ABSENT`, `LATE`, `EXCUSED`).
- **Code Reference**: [`backend/src/domain/model/Attendance.js`](../../../backend/src/domain/model/Attendance.js).

### 1.8 `AcademicRecord` (Entity)
- **Purpose**: Represents a continuous evaluation score (quiz, assignment, midterm, final).
- **Attributes**: `recordId`, `enrollmentId`, `assessmentType`, `scoreObtained`, `maximumScore`, `weightagePercentage`.
- **Key Operations**: `calculatePercentage()`, `validateScores()`.
- **OOAD Concepts**: Encapsulation, Invariant Boundary Enforcement ($0 \le 	ext{score} \le 	ext{max}$).
- **Code Reference**: [`backend/src/domain/model/AcademicRecord.js`](../../../backend/src/domain/model/AcademicRecord.js).
