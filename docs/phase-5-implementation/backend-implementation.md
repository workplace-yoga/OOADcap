# Backend Layered Implementation

## 1. Layer Separation in Action

```
[ HTTP Request: POST /api/v1/attendance ]
                 │
                 ▼
[ Presentation Layer: AttendanceController.record() ]
  -> Extracts params (courseId, sessionDate, entries)
                 │
                 ▼
[ Application Layer: AttendanceService.recordAttendance() ]
  -> Verifies course validity, loops entries, constructs Attendance entity
                 │
                 ▼
[ Domain Layer: Enrollment.addAttendance(attendanceEntity) ]
  -> Enforces domain invariants, updates enrollment collection
                 │
                 ▼
[ Persistence Layer: SqlEnrollmentRepository.save(enrollment) ]
  -> Persists updated state into relational storage
                 │
                 ▼
[ Response: 200 OK {"success": true, "recordsCreated": 2} ]
```

---

## 2. Key Code References
- **Controllers**: [`backend/src/presentation/controllers/`](../../backend/src/presentation/controllers/)
- **Services**: [`backend/src/application/`](../../backend/src/application/)
- **Repositories**: [`backend/src/infrastructure/persistence/`](../../backend/src/infrastructure/persistence/)
