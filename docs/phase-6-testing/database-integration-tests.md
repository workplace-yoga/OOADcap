# Database Integration & Integrity Test Report

## 1. Relational Integrity Checks
- **Foreign Key Binding**: Every `students`, `faculty`, and `admins` record possesses a matching `user_id` in the `users` table.
- **Unique Constraints**: Duplicate roll numbers (`CS2026001`) and course codes (`CS301`) trigger `409 Conflict`.
- **Cascading Deletions**: Deleting a student via `DELETE /api/v1/students/:id` cleans up corresponding entries across `users` and `enrollments` without leaving orphaned records.
- **Persistence Across Restarts**: Verified that data persists to `sis_database.json` and survives server restarts.
