# Database Implementation & Persistence

## 1. Relational Schema Realization
The database implements the 3NF schema designed in Phase 4:
1. `users`: Master identity credentials and roles.
2. `admins`: 1:1 administrative profiles.
3. `faculty`: 1:1 faculty profiles.
4. `students`: 1:1 student profiles with unique roll numbers.
5. `courses`: Catalog offerings with assigned faculty FK.
6. `enrollments`: Associative table linking students and courses per term.
7. `attendance`: Session attendance entries owned by enrollments.
8. `academic_records`: Continuous marks entries owned by enrollments.

---

## 2. Reproducibility & Persistence
- Automatically initialized on server startup via `seed.js`.
- Persisted to local relational store (`backend/sis_database.json`), providing immediate zero-configuration local execution and 100% reproducibility.
