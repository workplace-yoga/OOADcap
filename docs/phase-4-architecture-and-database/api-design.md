# REST API Contract Specification

## 1. Global API Standards
- **Base URL**: `/api/v1`
- **Transport**: HTTPS
- **Data Exchange**: JSON (`Content-Type: application/json`)
- **Authentication**: `Authorization: Bearer <jwt_token>`

---

## 2. API Endpoint Specifications

### 2.1 Module 1: Authentication & Identity
- **`POST /api/v1/auth/login`**
  - **Purpose**: Authenticate user credentials and return session token.
  - **Auth**: Public
  - **Request Body**: `{"username": "admin_user", "password": "secure_password"}`
  - **Success Response (200 OK)**:
    ```json
    {
      "success": true,
      "token": "eyJhbGciOi...",
      "user": {
        "userId": "usr_001",
        "username": "admin_user",
        "role": "ADMIN",
        "dashboardRoute": "/admin/dashboard"
      }
    }
    ```
  - **Errors**: `400 Bad Request`, `401 Unauthorized`

- **`GET /api/v1/auth/profile`**
  - **Purpose**: Get currently authenticated user profile.
  - **Auth**: Bearer Token (Any authenticated role)
  - **Success Response (200 OK)**: User profile DTO.

---

### 2.2 Module 2: Student Management
- **`GET /api/v1/students`**
  - **Purpose**: List all student profiles (Directory view).
  - **Auth**: `ADMIN`
  - **Success Response (200 OK)**: `{"success": true, "students": [...]}`

- **`GET /api/v1/students/:id`**
  - **Purpose**: Get specific student profile details.
  - **Auth**: `ADMIN`, `STUDENT` (Self only)
  - **Success Response (200 OK)**: Student profile object.

- **`POST /api/v1/students`**
  - **Purpose**: Register a new student and initialize user account.
  - **Auth**: `ADMIN`
  - **Request Body**:
    ```json
    {
      "username": "john_doe",
      "password": "TempPassword123!",
      "email": "john@institution.edu",
      "rollNumber": "CS2026001",
      "fullName": "John Doe",
      "department": "Computer Science",
      "currentSemester": 4,
      "dateOfBirth": "2004-05-15",
      "contactNumber": "+1-555-0199"
    }
    ```
  - **Success Response (201 Created)**: Created student details.

- **`PUT /api/v1/students/:id`**
  - **Purpose**: Update student profile information.
  - **Auth**: `ADMIN`
  - **Success Response (200 OK)**: Updated student object.

- **`DELETE /api/v1/students/:id`**
  - **Purpose**: Deactivate student record.
  - **Auth**: `ADMIN`
  - **Success Response (200 OK)**: `{"success": true, "message": "Student deactivated"}`

---

### 2.3 Module 3: Faculty Management
- **`GET /api/v1/faculty`**
  - **Purpose**: List faculty directory.
  - **Auth**: `ADMIN`
  - **Success Response (200 OK)**: List of faculty.

- **`POST /api/v1/faculty`**
  - **Purpose**: Register new faculty profile.
  - **Auth**: `ADMIN`
  - **Success Response (201 Created)**: Created faculty details.

---

### 2.4 Module 4: Course & Enrollment Management
- **`GET /api/v1/courses`**
  - **Purpose**: List all course offerings in catalog.
  - **Auth**: All authenticated roles (`ADMIN`, `FACULTY`, `STUDENT`)
  - **Success Response (200 OK)**: List of courses.

- **`POST /api/v1/courses`**
  - **Purpose**: Create a new course offering.
  - **Auth**: `ADMIN`
  - **Success Response (201 Created)**: Created course details.

- **`PUT /api/v1/courses/:id/assign-faculty`**
  - **Purpose**: Assign an instructor to a course offering.
  - **Auth**: `ADMIN`
  - **Request Body**: `{"facultyId": "fac_101"}`
  - **Success Response (200 OK)**: Updated course with assigned faculty.

- **`POST /api/v1/enrollments`**
  - **Purpose**: Enroll a student in a course for a term.
  - **Auth**: `ADMIN`
  - **Request Body**: `{"studentId": "stu_001", "courseId": "crs_201", "academicTerm": "Fall 2026"}`
  - **Success Response (201 Created)**: Created enrollment object.

- **`GET /api/v1/courses/:id/roster`**
  - **Purpose**: Get enrolled student roster for an assigned course.
  - **Auth**: `ADMIN`, `FACULTY` (Assigned instructor only)
  - **Success Response (200 OK)**: List of enrolled students with attendance rate.

---

### 2.5 Module 5: Attendance Management
- **`POST /api/v1/attendance`**
  - **Purpose**: Submit session attendance for a course.
  - **Auth**: `FACULTY` (Assigned instructor only)
  - **Request Body**:
    ```json
    {
      "courseId": "crs_201",
      "sessionDate": "2026-08-26",
      "sessionSlot": 1,
      "entries": [
        {"studentId": "stu_001", "status": "PRESENT"},
        {"studentId": "stu_002", "status": "ABSENT", "remarks": "Unexcused"}
      ]
    }
    ```
  - **Success Response (200 OK)**: `{"success": true, "recordsCreated": 2}`

- **`GET /api/v1/attendance/my-records`**
  - **Purpose**: Get authenticated student's course-wise attendance summaries.
  - **Auth**: `STUDENT`
  - **Success Response (200 OK)**: Course attendance breakdown with calculated percentage.

---

### 2.6 Module 6: Academic Records & Marks
- **`POST /api/v1/academic-records`**
  - **Purpose**: Enter assessment marks for students in a course.
  - **Auth**: `FACULTY` (Assigned instructor only)
  - **Request Body**:
    ```json
    {
      "courseId": "crs_201",
      "assessmentType": "Midterm Examination",
      "maximumScore": 100.0,
      "weightagePercentage": 30.0,
      "entries": [
        {"studentId": "stu_001", "scoreObtained": 88.5},
        {"studentId": "stu_002", "scoreObtained": 92.0}
      ]
    }
    ```
  - **Success Response (200 OK)**: `{"success": true, "message": "Marks entered and grades updated"}`

- **`GET /api/v1/academic-records/transcript`**
  - **Purpose**: Get authenticated student's complete academic transcript.
  - **Auth**: `STUDENT`
  - **Success Response (200 OK)**: Academic transcript with marks, percentages, and letter grades.\n