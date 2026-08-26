# Relational Database Schema Design

## 1. Table Specifications (PostgreSQL Relational Schema)

### 1.1 Table: `users`
- **Purpose**: Stores authentication credentials, identity, and system role.
- **Columns**:
  - `user_id`: `VARCHAR(64)` **PRIMARY KEY**
  - `username`: `VARCHAR(64)` **UNIQUE NOT NULL**
  - `password_hash`: `VARCHAR(255)` **NOT NULL**
  - `email`: `VARCHAR(128)` **UNIQUE NOT NULL**
  - `role`: `VARCHAR(20)` **NOT NULL** (Check: `role IN ('ADMIN', 'FACULTY', 'STUDENT')`)
  - `is_active`: `BOOLEAN` **DEFAULT TRUE NOT NULL**
  - `created_at`: `TIMESTAMP WITH TIME ZONE` **DEFAULT CURRENT_TIMESTAMP**
  - `last_login`: `TIMESTAMP WITH TIME ZONE`

---

### 1.2 Table: `students`
- **Purpose**: Stores student profiles.
- **Columns**:
  - `student_id`: `VARCHAR(64)` **PRIMARY KEY**
  - `user_id`: `VARCHAR(64)` **UNIQUE NOT NULL REFERENCES users(user_id) ON DELETE CASCADE**
  - `roll_number`: `VARCHAR(32)` **UNIQUE NOT NULL**
  - `full_name`: `VARCHAR(128)` **NOT NULL**
  - `department`: `VARCHAR(64)` **NOT NULL**
  - `current_semester`: `INTEGER` **NOT NULL**
  - `date_of_birth`: `DATE` **NOT NULL**
  - `contact_number`: `VARCHAR(32)`

---

### 1.3 Table: `faculty`
- **Purpose**: Stores faculty profiles.
- **Columns**:
  - `faculty_id`: `VARCHAR(64)` **PRIMARY KEY**
  - `user_id`: `VARCHAR(64)` **UNIQUE NOT NULL REFERENCES users(user_id) ON DELETE CASCADE**
  - `full_name`: `VARCHAR(128)` **NOT NULL**
  - `department`: `VARCHAR(64)` **NOT NULL**
  - `designation`: `VARCHAR(64)` **NOT NULL**
  - `contact_number`: `VARCHAR(32)`

---

### 1.4 Table: `admins`
- **Purpose**: Stores administrative staff profiles.
- **Columns**:
  - `admin_id`: `VARCHAR(64)` **PRIMARY KEY**
  - `user_id`: `VARCHAR(64)` **UNIQUE NOT NULL REFERENCES users(user_id) ON DELETE CASCADE**
  - `department`: `VARCHAR(64)` **NOT NULL**
  - `office_location`: `VARCHAR(128)`

---

### 1.5 Table: `courses`
- **Purpose**: Stores course catalog offerings.
- **Columns**:
  - `course_id`: `VARCHAR(64)` **PRIMARY KEY**
  - `course_code`: `VARCHAR(32)` **UNIQUE NOT NULL**
  - `title`: `VARCHAR(128)` **NOT NULL**
  - `credit_units`: `INTEGER` **NOT NULL**
  - `department`: `VARCHAR(64)` **NOT NULL**
  - `description`: `TEXT`
  - `faculty_id`: `VARCHAR(64)` **REFERENCES faculty(faculty_id) ON DELETE SET NULL**
  - `is_active`: `BOOLEAN` **DEFAULT TRUE NOT NULL**

---

### 1.6 Table: `enrollments`
- **Purpose**: Links students to registered courses per term (Associative entity).
- **Columns**:
  - `enrollment_id`: `VARCHAR(64)` **PRIMARY KEY**
  - `student_id`: `VARCHAR(64)` **NOT NULL REFERENCES students(student_id) ON DELETE CASCADE**
  - `course_id`: `VARCHAR(64)` **NOT NULL REFERENCES courses(course_id) ON DELETE CASCADE**
  - `academic_term`: `VARCHAR(32)` **NOT NULL**
  - `enrollment_date`: `TIMESTAMP WITH TIME ZONE` **DEFAULT CURRENT_TIMESTAMP**
  - `status`: `VARCHAR(20)` **NOT NULL DEFAULT 'ACTIVE'** (Check: `status IN ('ACTIVE', 'COMPLETED', 'DROPPED')`)
  - **Constraint**: `UNIQUE(student_id, course_id, academic_term)`

---

### 1.7 Table: `attendance`
- **Purpose**: Stores session attendance logs.
- **Columns**:
  - `attendance_id`: `VARCHAR(64)` **PRIMARY KEY**
  - `enrollment_id`: `VARCHAR(64)` **NOT NULL REFERENCES enrollments(enrollment_id) ON DELETE CASCADE**
  - `session_date`: `DATE` **NOT NULL**
  - `session_slot`: `INTEGER` **NOT NULL**
  - `status`: `VARCHAR(20)` **NOT NULL** (Check: `status IN ('PRESENT', 'ABSENT', 'LATE', 'EXCUSED')`)
  - `remarks`: `VARCHAR(255)`
  - `recorded_by_faculty_id`: `VARCHAR(64)` **REFERENCES faculty(faculty_id)**
  - `last_modified`: `TIMESTAMP WITH TIME ZONE` **DEFAULT CURRENT_TIMESTAMP**
  - **Constraint**: `UNIQUE(enrollment_id, session_date, session_slot)`

---

### 1.8 Table: `academic_records`
- **Purpose**: Stores assessment marks and scores.
- **Columns**:
  - `record_id`: `VARCHAR(64)` **PRIMARY KEY**
  - `enrollment_id`: `VARCHAR(64)` **NOT NULL REFERENCES enrollments(enrollment_id) ON DELETE CASCADE**
  - `assessment_type`: `VARCHAR(64)` **NOT NULL**
  - `score_obtained`: `NUMERIC(5, 2)` **NOT NULL CHECK (score_obtained >= 0)**
  - `maximum_score`: `NUMERIC(5, 2)` **NOT NULL CHECK (maximum_score > 0)**
  - `weightage_percentage`: `NUMERIC(5, 2)` **NOT NULL DEFAULT 0**
  - `feedback_remarks`: `TEXT`
  - **Constraint**: `CHECK (score_obtained <= maximum_score)`\n