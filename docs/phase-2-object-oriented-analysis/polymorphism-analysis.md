# Polymorphism Analysis

## 1. Evaluating Polymorphic Behavior
Polymorphism allows different domain objects to respond to the same message/operation in specialized ways, eliminating error-prone conditional branching (`switch(role)` or `if/else` ladders).

---

## 2. Identified Polymorphic Opportunities

### 2.1 Polymorphic Operation: `getDashboardView()`
- **Common Interface**: `User` defines abstract/polymorphic `getDashboardView()`.
- **Specialized Implementations**:
  - `Admin.getDashboardView()`: Renders administrative metrics (total students, faculty roster, system summary).
  - `Faculty.getDashboardView()`: Renders assigned teaching courses, pending attendance tasks, and grade submission queues.
  - `Student.getDashboardView()`: Renders enrolled courses, attendance progress bars, and recent academic scorecards.
- **Advantage**: Adding a new user persona in the future does not require modifying core navigation dispatchers.

### 2.2 Polymorphic Operation: `getAccessPermissions()`
- **Common Interface**: `User` defines `getAccessPermissions()`.
- **Specialized Implementations**:
  - `Admin`: Returns full administrative capability set.
  - `Faculty`: Returns course-specific instructor capabilities.
  - `Student`: Returns self-scoped read-only permissions.
- **Advantage**: Centralized authorization middleware evaluates permissions generically without hardcoded role comparisons.

### 2.3 Polymorphic Assessment Evaluation (Candidate for Phase 3 Design)
- Different assessment types (e.g., `TheoryExam`, `PracticalLabAssessment`, `ContinuousAssignment`) compute final weighted scores polymorphically based on differing grading formulas.\n