# REST API Implementation

## 1. Live Endpoint Catalog

| Method | Endpoint | Authorized Roles | Controller / Service |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/v1/auth/login` | Public | `AuthController.login` |
| `GET` | `/api/v1/auth/profile` | Any Authenticated | `AuthController.getProfile` |
| `GET` | `/api/v1/students` | `ADMIN` | `StudentController.getAll` |
| `POST` | `/api/v1/students` | `ADMIN` | `StudentController.create` |
| `PUT` | `/api/v1/students/:id` | `ADMIN` | `StudentController.update` |
| `DELETE`| `/api/v1/students/:id`| `ADMIN` | `StudentController.delete` |
| `GET` | `/api/v1/faculty` | `ADMIN` | `FacultyController.getAll` |
| `POST` | `/api/v1/faculty` | `ADMIN` | `FacultyController.create` |
| `GET` | `/api/v1/courses` | Any Authenticated | `CourseController.getAll` |
| `POST` | `/api/v1/courses` | `ADMIN` | `CourseController.create` |
| `PUT` | `/api/v1/courses/:id/assign-faculty` | `ADMIN` | `CourseController.assignFaculty` |
| `GET` | `/api/v1/courses/my-assigned` | `FACULTY` | `CourseController.getFacultyAssignedCourses` |
| `GET` | `/api/v1/courses/:id/roster` | `ADMIN`, `FACULTY` | `CourseController.getRoster` |
| `POST` | `/api/v1/enrollments` | `ADMIN` | `EnrollmentController.enroll` |
| `GET` | `/api/v1/enrollments/my-courses` | `STUDENT` | `EnrollmentController.getMyCourses` |
| `POST` | `/api/v1/attendance` | `FACULTY` | `AttendanceController.record` |
| `GET` | `/api/v1/attendance/my-records` | `STUDENT` | `AttendanceController.getMyAttendance` |
| `POST` | `/api/v1/academic-records` | `FACULTY` | `AcademicController.enterMarks` |
| `GET` | `/api/v1/academic-records/transcript` | `STUDENT` | `AcademicController.getMyTranscript` |
