# API ↔ Use Case Traceability

## 1. Traceability Table

| Use Case ID & Name | HTTP Endpoint | Application Service Method | Domain Entity & Method | Persistence Method |
| :--- | :--- | :--- | :--- | :--- |
| **UC-01: Authenticate User** | `POST /auth/login` | `AuthService.login()` | `User.authenticate()` | `UserRepo.findByUsername()` |
| **UC-03: Manage Students (Create)** | `POST /students` | `StudentService.registerStudent()` | `new Student()`, `new User()` | `StudentRepo.save()`, `UserRepo.save()` |
| **UC-06: Assign Faculty to Course** | `PUT /courses/:id/assign-faculty`| `CourseService.assignFaculty()` | `Course.assignFaculty(faculty)` | `CourseRepo.save()` |
| **UC-07: Manage Course Enrollment** | `POST /enrollments` | `EnrollmentService.enrollStudent()`| `new Enrollment()`, `Course.addEnrollment()` | `EnrollmentRepo.save()` |
| **UC-09: View Assigned Course Rosters**| `GET /courses/:id/roster` | `CourseService.getCourseRoster()` | `Course.getRoster()` | `CourseRepo.findRoster()` |
| **UC-10: Record Session Attendance** | `POST /attendance` | `AttendanceService.submitAttendance()`| `Enrollment.addAttendance()`, `new Attendance()` | `EnrollmentRepo.save()` |
| **UC-12: Enter Assessment Marks** | `POST /academic-records` | `AcademicService.submitMarks()` | `Enrollment.addAcademicRecord()`, `AcademicRecord.isValidScore()` | `EnrollmentRepo.save()` |
| **UC-17: View Personal Attendance** | `GET /attendance/my-records` | `AttendanceService.getStudentAttendance()`| `Enrollment.calculateAttendancePercentage()` | `EnrollmentRepo.findByStudent()` |
| **UC-18: View Academic Records & Grades**| `GET /academic-records/transcript`| `AcademicService.getTranscript()` | `Enrollment.calculateTotalMarks()`, `computeFinalGrade()` | `EnrollmentRepo.findByStudent()` |\n