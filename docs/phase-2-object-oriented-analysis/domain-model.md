# Conceptual Domain Model

## 1. Domain Model Overview
The conceptual domain model represents real-world entities, their meaningful attributes, and the structural associations governing the Student Information System.

---

## 2. Visual Domain Model (Mermaid Notation)

```mermaid
classDiagram
    direction TB

    class User {
        <<Abstract>>
        +String userId
        +String username
        +String passwordHash
        +String email
        +UserRole role
        +Boolean isActive
        +DateTime createdAt
    }

    class Admin {
        +String adminId
        +String department
    }

    class Faculty {
        +String facultyId
        +String fullName
        +String department
        +String designation
        +String contactNumber
    }

    class Student {
        +String studentId
        +String rollNumber
        +String fullName
        +String department
        +Int currentSemester
        +Date dateOfBirth
        +String contactNumber
    }

    class Course {
        +String courseId
        +String courseCode
        +String title
        +Int creditUnits
        +String department
        +String description
        +Boolean isActive
    }

    class Enrollment {
        +String enrollmentId
        +DateTime enrollmentDate
        +String academicTerm
        +EnrollmentStatus status
    }

    class Attendance {
        +String attendanceId
        +Date sessionDate
        +Int sessionSlot
        +AttendanceStatus status
        +String remarks
    }

    class AcademicRecord {
        +String recordId
        +String assessmentType
        +Float scoreObtained
        +Float maximumScore
        +Float weightage
        +String letterGrade
    }

    User <|-- Admin : Generalization
    User <|-- Faculty : Generalization
    User <|-- Student : Generalization

    Faculty "1" --> "0..*" Course : Teaches / Instructs
    Student "1" --> "0..*" Enrollment : Holds
    Course "1" --> "0..*" Enrollment : Contains
    Enrollment "1" *-- "0..*" Attendance : Composed Of
    Enrollment "1" *-- "0..*" AcademicRecord : Composed Of
```

---

## 3. Domain Multiplicities and Invariants
- Every `Student` can have $0..*$ `Enrollment` records.
- Every `Course` can have $0..*$ `Enrollment` records.
- Each `Enrollment` links exactly $1$ `Student` and $1$ `Course`.
- Each `Enrollment` contains $0..*$ `Attendance` entries and $0..*$ `AcademicRecord` entries.
- Each `Faculty` member instructs $0..*$ `Course` offerings; each `Course` offering has $1$ assigned `Faculty` member.\n