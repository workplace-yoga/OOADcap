# Authentication & Authorization Architecture

## 1. Authentication Architecture (JWT-Based Stateless Auth)
- **Token Format**: Signed JSON Web Tokens (JWT) using HMAC-SHA256 (`HS256`).
- **Token Payload Claims**:
  ```json
  {
    "userId": "usr_789456",
    "username": "prof_smith",
    "role": "FACULTY",
    "facultyId": "fac_101",
    "iat": 1787640000,
    "exp": 1787668800
  }
  ```
- **Password Security**: Passwords hashed using **bcrypt** with work factor cost = 10 + cryptographic salt.

---

## 2. Authorization Architecture (Role-Based Access Control)
- **Middleware Pipeline**:
  ```
  Incoming Request -> authenticateToken Middleware -> roleGuard(['ADMIN', 'FACULTY']) -> Controller
  ```
- **Permission Matrix**:
  - `ADMIN`: User CRUD, Course CRUD, Faculty Allocation, Enrollment.
  - `FACULTY`: Course Rosters, Attendance Recording/Updating, Marks Entry.
  - `STUDENT`: Self Profile, Enrolled Courses, Own Attendance, Own Grades.\n