# Database Relationships & Foreign Keys

## 1. Relational Multiplicities & Integrity Constraints

```
+-----------------------------------------------------------------------------------------------+
|                               DATABASE RELATIONSHIPS SUMMARY                                  |
+-----------------------------------------------------------------------------------------------+
| Source Table   | Target Table      | Cardinality | FK Column               | On Delete Action |
+----------------+-------------------+-------------+-------------------------+------------------+
| users          | students          | 1 : 1       | students.user_id        | CASCADE          |
| users          | faculty           | 1 : 1       | faculty.user_id         | CASCADE          |
| users          | admins            | 1 : 1       | admins.user_id          | CASCADE          |
| faculty        | courses           | 1 : 0..*    | courses.faculty_id      | SET NULL         |
| students       | enrollments       | 1 : 0..*    | enrollments.student_id  | CASCADE          |
| courses        | enrollments       | 1 : 0..*    | enrollments.course_id   | CASCADE          |
| enrollments    | attendance        | 1 : 0..*    | attendance.enrollment_id| CASCADE          |
| enrollments    | academic_records  | 1 : 0..*    | records.enrollment_id   | CASCADE          |
+-----------------------------------------------------------------------------------------------+
```

---

## 2. Referential Integrity Guarantees
- **Cascading Deletion of Enrolled Records**: Deleting an enrollment automatically cleans up all associated attendance logs and assessment marks, avoiding orphaned records.
- **Safe Faculty Removal**: Deleting a faculty profile does not delete course catalog offerings (`ON DELETE SET NULL`).\n