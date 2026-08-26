# Candidate Domain Concepts

## 1. Domain Concept Discovery
During the initial requirements analysis phase, real-world concepts are identified from institutional problem descriptions and functional requirements. 

> [!IMPORTANT]
> In Phase 1, these concepts represent **candidate real-world entities** only. 
> Final UML class diagrams, inheritance hierarchies, aggregation/composition associations, and implementation classes are intentionally deferred to **Phase 2 (Analysis)** and **Phase 3 (Design)**.

---

## 2. Candidate Domain Entities

```
+---------------+       +---------------+       +---------------+
|     User      | <---  |     Admin     |       |    Course     |
+---------------+       +---------------+       +---------------+
        ^                                               ^
        |                                               |
+---------------+       +---------------+       +---------------+
|    Faculty    |       |    Student    | <---> |  Enrollment   |
+---------------+       +---------------+       +---------------+
        |                       |                       |
        v                       v                       v
+---------------+       +---------------+       +---------------+
|  Attendance   |       |AcademicRecord |       | (Candidate)   |
+---------------+       +---------------+       +---------------+
```

### 2.1 Core Entities Identified
1. **User**: Represents any authenticated individual within the institutional ecosystem possessing login credentials and an assigned role.
2. **Admin**: Represents administrative staff with privileges to configure master records, manage users, and assign courses.
3. **Faculty**: Represents an academic instructor responsible for teaching assigned courses, marking attendance, and entering grades.
4. **Student**: Represents an enrolled learner registered in courses with associated attendance and academic performance history.
5. **Course**: Represents an academic subject offering with a code, title, credits, and syllabus parameters.
6. **Enrollment**: Represents the association linking a student to a specific course for a given academic term.
7. **Attendance**: Represents a session-specific record documenting whether a student was present, absent, or excused for a course lecture.
8. **AcademicRecord / Mark**: Represents evaluation results (e.g., test scores, assignment marks, calculated totals, final grades) associated with a student in a course.

---

## 3. Potential Supporting Concepts (For Later Analysis)
- **Role**: Enumeration or entity encapsulating access permissions.
- **Department**: Academic division grouping faculty and courses.
- **AcademicTerm / Semester**: Temporal grouping for courses and enrollments.
- **Assessment**: Specification of evaluation components (e.g., Midterm, Final Exam, Quiz).
- **AuthSession / Token**: Security concept for session integrity.

---

## 4. Deferred Architectural Decisions
The following structural decisions will be formulated during Phase 2 and Phase 3:
- Decision on inheritance (e.g., whether `Admin`, `Faculty`, `Student` inherit from `User` or use composition/role patterns).
- Multiplicity and association constraints (e.g., 1-to-many vs. many-to-many relationships).
- Aggregation vs. composition lifecycle dependencies (e.g., whether `Attendance` and `AcademicRecord` depend strictly on `Enrollment` or `Course`).\n