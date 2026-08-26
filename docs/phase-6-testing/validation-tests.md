# Data Validation & Domain Invariants Report

## 1. Invariant Boundaries Verified
- **Attendance Status Invariant**: Sending invalid status string `INVALID_STATUS` triggers domain invariant exception and is rejected. **[PASS]**
- **Score Bounds Invariant**: Sending score `999` for a max score of `50` triggers domain invariant exception (`scoreObtained <= maximumScore`). **[PASS]**
- **Duplicate Course Code**: Re-registering existing course code returns `409 Conflict`. **[PASS]**
- **Non-Empty Fields**: Missing mandatory username/password returns `400 Bad Request`. **[PASS]**
