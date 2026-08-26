# Encapsulation Analysis

## 1. Importance of Encapsulation in SIS
Encapsulation ensures that an object's internal state is protected against unauthorized direct mutation and that all state transitions occur exclusively through well-defined, validated behavioral operations.

---

## 2. Domain Encapsulation Boundaries

### 2.1 Student Data Encapsulation
- **Protected State**: `rollNumber`, `personalDetails`, `enrollmentList`, `academicStatus`.
- **Invariants Enforced**:
  - Student roll numbers are immutable once initialized.
  - Enrollments cannot contain duplicate entries for the same course in the same term.
- **Encapsulated Operations**: `enrollInCourse(course)`, `getAttendanceSummary(courseId)`, `getAcademicTranscript()`.

### 2.2 Attendance State Encapsulation
- **Protected State**: `sessionDate`, `status`, `recordedBy`, `lastModifiedTimestamp`.
- **Invariants Enforced**:
  - Status must strictly conform to allowed domain states (`PRESENT`, `ABSENT`, `LATE`, `EXCUSED`).
  - Attendance timestamps cannot be recorded for future dates.
- **Encapsulated Operations**: `markStatus(status, facultyId)`, `updateStatus(newStatus, reason)`.

### 2.3 Academic Record & Marks Encapsulation
- **Protected State**: `scoreObtained`, `maximumScore`, `assessmentType`, `weightage`.
- **Invariants Enforced**:
  - $0 \le \text{scoreObtained} \le \text{maximumScore}$.
  - Final grade computation cannot be directly overridden without modifying valid underlying component marks.
- **Encapsulated Operations**: `updateScore(newScore)`, `computePercentage()`, `calculateGradePoint()`.

### 2.4 User Security Encapsulation
- **Protected State**: `passwordHash`, `salt`, `failedLoginAttempts`, `accountLockStatus`.
- **Invariants Enforced**:
  - Plaintext passwords are never stored or exposed via public accessors.
  - Credential verification is performed internally using secure cryptographic comparison.
- **Encapsulated Operations**: `verifyPassword(plainPassword)`, `changePassword(oldPass, newPass)`, `lockAccount()`.\n