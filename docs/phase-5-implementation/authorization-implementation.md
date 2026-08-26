# Role-Based Authorization Implementation

## 1. Multi-Tier Authorization Enforcement
- **Backend Authority**: `roleGuard(['ADMIN', 'FACULTY', 'STUDENT'])` middleware guards all sensitive routes, returning `403 Forbidden` if unauthorized.
- **Verified Scopes**:
  - `ADMIN`: User, Course, Faculty, Enrollment management.
  - `FACULTY`: Assigned course rosters, attendance logs, marks entry.
  - `STUDENT`: Self profile, personal courses, personal attendance, personal transcript.
