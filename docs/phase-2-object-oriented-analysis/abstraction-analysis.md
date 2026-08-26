# Abstraction Analysis

## 1. Principles of Abstraction in SIS
Abstraction hides internal mechanical complexity and exposes clean, conceptual interfaces to clients (both human actors and collaborating software components).

---

## 2. Key System Abstractions

### 2.1 Authentication & Identity Abstraction
- **What Client Needs to Know**:
  - Provide username and password $\rightarrow$ Receive authentication result and role token.
- **What is Hidden (Abstracted Away)**:
  - Cryptographic hashing algorithms (e.g., bcrypt/Argon2).
  - Salt generation and timing-attack resistant comparisons.
  - Database lookup mechanisms and token signing algorithms.

### 2.2 Attendance Recording Abstraction
- **What Faculty Actor Needs to Know**:
  - Select course $\rightarrow$ View roster $\rightarrow$ Set status for date $\rightarrow$ Submit.
- **What is Hidden**:
  - Underlying session entity generation.
  - Foreign key relationship binding across enrollment records.
  - Recalculation of attendance percentages across terms.

### 2.3 Academic Grade Calculation Abstraction
- **What Student & Faculty Need to Know**:
  - View individual component scores and final calculated letter grade (e.g., "A", "B+", GPA).
- **What is Hidden**:
  - Weighted percentile formulas.
  - Boundary grade threshold evaluation algorithms.
  - Aggregation of internal and external assessment components.

### 2.4 Enrollment Roster Abstraction
- **What Faculty Needs to Know**:
  - Course provides list of active students.
- **What is Hidden**:
  - Internal many-to-many link tables, associative `Enrollment` status flags, and student registration timestamps.\n