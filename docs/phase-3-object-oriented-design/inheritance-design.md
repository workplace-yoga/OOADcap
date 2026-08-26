# Inheritance Design & Generalization Hierarchy

## 1. Inheritance Hierarchy
Based on the Phase 2 analysis, the generalization hierarchy is formalized as follows:

```
                          +-------------------------------+
                          |        <<Abstract>>           |
                          |             User              |
                          +-------------------------------+
                          | - userId: String              |
                          | - username: String            |
                          | - passwordHash: String        |
                          | - email: String               |
                          | - role: UserRole              |
                          | - isActive: Boolean           |
                          +-------------------------------+
                          | + authenticate(pass): Boolean |
                          | + {abstract} getDashboard(): String|
                          | + {abstract} getPerms(): List |
                          +-------------------------------+
                                          ▲
                                          │
            ┌─────────────────────────────┼─────────────────────────────┐
            │                             │                             │
+-----------------------+     +-----------------------+     +-----------------------+
|         Admin         |     |        Faculty        |     |        Student        |
+-----------------------+     +-----------------------+     +-----------------------+
| - adminId: String     |     | - facultyId: String   |     | - studentId: String   |
| - department: String  |     | - designation: String |     | - rollNumber: String  |
|                       |     | - assignedCourses:List|     | - semester: Integer   |
|                       |     |                       |     | - enrollments: List   |
+-----------------------+     +-----------------------+     +-----------------------+
| + getDashboard(): Str |     | + getDashboard(): Str |     | + getDashboard(): Str |
| + getPerms(): List    |     | + getPerms(): List    |     | + getPerms(): List    |
| + registerStudent()   |     | + recordAttendance()  |     | + getAttendanceRate() |
| + assignFaculty()     |     | + submitMarks()       |     | + getTranscript()     |
+-----------------------+     +-----------------------+     +-----------------------+
```

---

## 2. Justification & Liskov Substitution Principle (LSP) Compliance
- **Is-A Integrity**: Admin is a User; Faculty is a User; Student is a User.
- **Shared Invariants**: Account authentication, email validation, session token issuance, password reset, and activation/deactivation work uniformly across all derived types.
- **LSP Compliance**: Any client system module handling an instance of `User` (e.g., Auth Middleware, Security Filter, Session Registry) can invoke `user.authenticate(pwd)` or `user.getDashboardRoute()` interchangeably without unexpected behavior.\n