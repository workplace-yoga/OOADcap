# Defect Log & Resolutions

## 1. Defect Tracking Table

| Defect ID | Module | Description | Severity | Root Cause | Fix Applied | Retest Status |
| :--- | :--- | :--- | :---: | :--- | :--- | :---: |
| **DEF-01** | Test Runner | Port 5000 `EADDRINUSE` during test import | Medium | `server.js` was calling `app.listen()` unconditionally on require. | Wrapped server listen in `if (require.main === module)`. | **RESOLVED & VERIFIED** |
| **DEF-02** | Security | IDOR potential in student profile endpoint | High | `StudentController.getById` allowed any student to view other student IDs. | Added IDOR check: students can only access their own studentId. | **RESOLVED & VERIFIED** |
| **DEF-03** | Domain Invariant | Score boundary exception handling | Low | Out-of-bounds score was returning unhandled 500 instead of clean domain error. | Added domain error boundary in `AcademicRecord.js`. | **RESOLVED & VERIFIED** |
