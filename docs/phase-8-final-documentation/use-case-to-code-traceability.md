# Use Case to Code Traceability Matrix

| Use Case ID | Actor | Domain Class | Service Operation | REST API Route | Frontend View Component |
| :--- | :---: | :--- | :--- | :--- | :--- |
| **UC-01 (Login)** | All | `User` | `AuthService.login()` | `POST /api/v1/auth/login` | `LoginView.js` |
| **UC-02 (Logout)** | All | `User` | `StateManager.clearUser()` | Local Session Termination | `StateManager.js` |
| **UC-03 (Register Student)**| Admin | `Student` | `StudentService.createStudent()` | `POST /api/v1/students` | `AdminDashboardView.js` |
| **UC-04 (Update Student)** | Admin | `Student` | `StudentService.updateStudent()` | `PUT /api/v1/students/:id` | `AdminDashboardView.js` |
| **UC-05 (Create Course)** | Admin | `Course` | `CourseService.createCourse()` | `POST /api/v1/courses` | `AdminDashboardView.js` |
| **UC-06 (Assign Faculty)** | Admin | `Course` | `CourseService.assignFaculty()` | `PUT /api/v1/courses/:id/assign-faculty`| `AdminDashboardView.js` |
| **UC-07 (Enroll Student)** | Admin | `Enrollment` | `EnrollmentService.enrollStudent()` | `POST /api/v1/enrollments` | `AdminDashboardView.js` |
| **UC-08 (View Assigned Courses)**| Faculty | `Course` | `CourseService.getAssignedCourses()`| `GET /api/v1/courses/my-assigned`| `FacultyDashboardView.js` |
| **UC-09 (View Course Roster)**| Faculty | `Course` | `CourseService.getRoster()` | `GET /api/v1/courses/:id/roster` | `FacultyDashboardView.js` |
| **UC-10 (Record Attendance)**| Faculty | `Attendance` | `AttendanceService.recordAttendance()`| `POST /api/v1/attendance` | `FacultyDashboardView.js` |
| **UC-12 (Enter Marks)** | Faculty | `AcademicRecord`| `AcademicService.enterMarks()` | `POST /api/v1/academic-records` | `FacultyDashboardView.js` |
| **UC-16 (View My Courses)**| Student | `Enrollment` | `EnrollmentService.getStudentCourses()`| `GET /api/v1/enrollments/my-courses`| `StudentDashboardView.js` |
| **UC-17 (View Attendance)**| Student | `Attendance` | `AttendanceService.getStudentAttendance()`| `GET /api/v1/attendance/my-records`| `StudentDashboardView.js` |
| **UC-18 (View Transcript)**| Student | `AcademicRecord`| `AcademicService.getStudentTranscript()`| `GET /api/v1/academic-records/transcript`| `StudentDashboardView.js` |
