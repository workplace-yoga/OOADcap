# Data Validation Implementation

## 1. Enforced Validation Rules
- **Student Registration**: Unique roll numbers and usernames; non-empty mandatory profile fields.
- **Course Creation**: Unique uppercase course codes (e.g., `CS301`); credit units constrained between 1 and 6.
- **Attendance Submission**: Allowed status values (`PRESENT`, `ABSENT`, `LATE`, `EXCUSED`); enrollment verification.
- **Marks Entry**: Non-negative scores bounded by maximum score ($0 \le 	ext{score} \le 	ext{maxScore}$).
