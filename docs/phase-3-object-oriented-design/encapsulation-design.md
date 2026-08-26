# Detailed Encapsulation Design

## 1. Encapsulation Mechanisms
Encapsulation in this design is enforced through three core mechanisms:
1. **Private Attribute Visibility (`-`)**: Direct access to internal member fields is strictly disallowed.
2. **Behavioral Invariant Gatekeepers**: Modifying state requires invoking public methods that validate business constraints prior to updating state.
3. **Immutability of Key Domain Identifiers**: Fundamental identifiers (`userId`, `studentId`, `courseId`, `rollNumber`) are immutable once instantiated.

---

## 2. Encapsulation by Domain Class

### 2.1 `AcademicRecord` State Protection
```
+----------------------------------------------------------------+
|                        AcademicRecord                          |
+----------------------------------------------------------------+
| - scoreObtained: Float                                         |
| - maximumScore: Float                                          |
| - weightagePercentage: Float                                   |
+----------------------------------------------------------------+
| + updateScore(newScore: Float): Boolean                        |
|   -> Validates: 0.0 <= newScore <= this.maximumScore           |
|   -> Throws InvalidScoreException if out of bounds             |
|   -> Recalculates weighted contribution internally             |
+----------------------------------------------------------------+
```

### 2.2 `Enrollment` Composition Protection
- Outside classes cannot directly append arbitrary attendance objects into `Enrollment.attendanceRecords`.
- Addition must go through `Enrollment.addAttendance(attendance)`, which verifies that the session date does not conflict with existing sessions and belongs to the valid academic term.

### 2.3 `User` Credential Protection
- `passwordHash` and salt are strictly private.
- No `getPasswordHash()` getter is exposed.
- Authentication occurs via `authenticate(plainPassword)`, which encapsulates cryptographic verification internally.\n