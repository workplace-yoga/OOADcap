# Viva "Point and Explain" Quick Reference Guide

When the examiner asks you to demonstrate specific OOAD concepts in your codebase, use this exact reference guide:

## 1. "Show me Encapsulation in your code."
- **Open**: [`backend/src/domain/model/User.js`](../../../backend/src/domain/model/User.js#L5-L25)
- **Point to**: `#passwordHash` private field and `authenticate()` method.
- **Explain**: *"The raw password hash is completely private to the User object. No outside controller or service can read or manipulate it directly."*

## 2. "Show me Inheritance in your code."
- **Open**: [`backend/src/domain/model/Student.js`](../../../backend/src/domain/model/Student.js#L3-L15)
- **Point to**: `class Student extends User { ... super(userData); }`
- **Explain**: *"Student inherits userId, username, email, and authentication logic from User, while adding student-specific properties like rollNumber and currentSemester."*

## 3. "Show me Polymorphism in your code."
- **Open**: [`backend/src/domain/model/Admin.js`](../../../backend/src/domain/model/Admin.js), [`Faculty.js`](../../../backend/src/domain/model/Faculty.js), [`Student.js`](../../../backend/src/domain/model/Student.js)
- **Point to**: `getDashboardRoute()` implementation in each subclass.
- **Explain**: *"Each subclass provides its own specialized dashboard URL (`/admin/dashboard`, `/faculty/dashboard`, `/student/dashboard`). The router calls `user.getDashboardRoute()` polymorphically without needing conditional switch statements."*

## 4. "Show me Composition and Aggregate Root."
- **Open**: [`backend/src/domain/model/Enrollment.js`](../../../backend/src/domain/model/Enrollment.js#L10-L45)
- **Point to**: `this.attendanceList` and `this.academicRecordList` collections and `calculateAttendancePercentage()`.
- **Explain**: *"Enrollment is the aggregate root. Attendance and AcademicRecord entries are composed within it and cannot exist without an enrollment context."*

## 5. "Show me Dependency Inversion (DIP)."
- **Open**: [`backend/src/application/StudentService.js`](../../../backend/src/application/StudentService.js#L3-L15)
- **Point to**: `this.studentRepo` constructor parameter and repository calls.
- **Explain**: *"The application service depends on repository interface contracts, insulating business logic from database engine details."*
