# Data Validation Rules & Invariants

## 1. Domain Validation Matrix

| Target Entity | Field / Attribute | Validation Rules & Invariants |
| :--- | :--- | :--- |
| **`User`** | `username` | Required, 3–32 chars, alphanumeric + underscores, unique. |
| **`User`** | `email` | Required, valid RFC 5322 email format, unique. |
| **`User`** | `password` | Min 8 chars, at least 1 uppercase, 1 lowercase, 1 number, 1 special char. |
| **`Student`** | `rollNumber` | Required, unique, format `[A-Z]{2}[0-9]{7}`. |
| **`Course`** | `courseCode` | Required, unique, uppercase format (e.g. `CS301`). |
| **`Course`** | `creditUnits`| Required, integer between 1 and 6. |
| **`Attendance`** | `sessionDate`| Required, valid ISO date, cannot be a future date. |
| **`Attendance`** | `status` | Required, must be one of `['PRESENT', 'ABSENT', 'LATE', 'EXCUSED']`. |
| **`AcademicRecord`** | `scoreObtained` | Required, numeric $\ge 0.0$, must satisfy $	ext{scoreObtained} \le 	ext{maximumScore}$. |
| **`AcademicRecord`** | `maximumScore` | Required, numeric $> 0.0$. |\n