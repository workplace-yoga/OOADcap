# REST API Endpoint Test Matrix

| Endpoint | Method | Role | Request Payload Sample | Expected Status | Actual Status | Result |
| :--- | :---: | :---: | :--- | :---: | :---: | :---: |
| `/api/v1/auth/login` | `POST` | Public | `{"username":"admin","password":"..."}` | `200 OK` | `200 OK` | **PASS** |
| `/api/v1/auth/profile` | `GET` | All | `None` (Bearer Token) | `200 OK` | `200 OK` | **PASS** |
| `/api/v1/students` | `GET` | Admin | `None` | `200 OK` | `200 OK` | **PASS** |
| `/api/v1/students` | `POST` | Admin | `{"rollNumber":"CS...","fullName":"..."}` | `201 Created` | `201 Created` | **PASS** |
| `/api/v1/students/:id` | `PUT` | Admin | `{"currentSemester": 5}` | `200 OK` | `200 OK` | **PASS** |
| `/api/v1/students/:id` | `DELETE`| Admin | `None` | `200 OK` | `200 OK` | **PASS** |
| `/api/v1/faculty` | `GET` | Admin | `None` | `200 OK` | `200 OK` | **PASS** |
| `/api/v1/courses` | `GET` | All | `None` | `200 OK` | `200 OK` | **PASS** |
| `/api/v1/courses` | `POST` | Admin | `{"courseCode":"CS304","title":"..."}` | `201 Created` | `201 Created` | **PASS** |
| `/api/v1/courses/:id/assign-faculty` | `PUT` | Admin | `{"facultyId":"fac_001"}` | `200 OK` | `200 OK` | **PASS** |
| `/api/v1/courses/my-assigned` | `GET` | Faculty | `None` | `200 OK` | `200 OK` | **PASS** |
| `/api/v1/courses/:id/roster` | `GET` | Faculty | `None` | `200 OK` | `200 OK` | **PASS** |
| `/api/v1/enrollments` | `POST` | Admin | `{"studentId":"...","courseId":"..."}` | `201 Created` | `201 Created` | **PASS** |
| `/api/v1/enrollments/my-courses` | `GET` | Student | `None` | `200 OK` | `200 OK` | **PASS** |
| `/api/v1/attendance` | `POST` | Faculty | `{"courseId":"...","entries":[...]}` | `200 OK` | `200 OK` | **PASS** |
| `/api/v1/attendance/my-records` | `GET` | Student | `None` | `200 OK` | `200 OK` | **PASS** |
| `/api/v1/academic-records` | `POST` | Faculty | `{"courseId":"...","entries":[...]}` | `200 OK` | `200 OK` | **PASS** |
| `/api/v1/academic-records/transcript`| `GET` | Student | `None` | `200 OK` | `200 OK` | **PASS** |
