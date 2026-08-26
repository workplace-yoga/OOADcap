# Class Relationship & Multiplicity Design

## 1. Formal Relationship Classification

```
+---------------------------------------------------------------------------------------------------+
|                                 CLASS RELATIONSHIP MATRIX                                         |
+---------------------------------------------------------------------------------------------------+
| Relationship                   | Type           | Multiplicity | Semantics & Lifecycle            |
+--------------------------------+----------------+--------------+----------------------------------+
| User <|-- Admin                | Generalization | N/A          | Admin is a specialized User      |
| User <|-- Faculty              | Generalization | N/A          | Faculty is a specialized User    |
| User <|-- Student              | Generalization | N/A          | Student is a specialized User    |
| Faculty --> Course             | Association    | 1 : 0..*     | Faculty instructs Courses        |
| Student --> Enrollment         | Aggregation    | 1 : 0..*     | Student owns Enrollments         |
| Course --> Enrollment          | Aggregation    | 1 : 0..*     | Course contains Enrollments      |
| Enrollment *--> Attendance     | Composition    | 1 : 0..*     | Attendance bound to Enrollment   |
| Enrollment *--> AcademicRecord | Composition    | 1 : 0..*     | Marks bound to Enrollment        |
+---------------------------------------------------------------------------------------------------+
```

---

## 2. Lifecycle Justification
- **Aggregation (`Student`/`Course` $\longleftrightarrow$ `Enrollment`)**: If an `Enrollment` is cancelled or archived, the underlying `Student` and `Course` entities continue to exist independently.
- **Composition (`Enrollment` $\longleftrightarrow$ `Attendance` & `AcademicRecord`)**: An `Attendance` log or `AcademicRecord` score has no existential validity outside of that specific student's course enrollment. Deleting an enrollment cascades to its owned attendance and marks records.\n