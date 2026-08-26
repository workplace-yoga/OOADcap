# Inheritance Analysis

## 1. Problem Formulation
Should the relationship between `User` and the role personas (`Admin`, `Faculty`, `Student`) be modeled using **Inheritance (Generalization)** or **Composition (Role / Profile Association)**?

```
Option A: Class Inheritance (Generalization)
                     +--------------------+
                     |        User        |
                     +--------------------+
                               ^
                               | (is-a)
        +----------------------+----------------------+
        |                      |                      |
+---------------+      +---------------+      +---------------+
|     Admin     |      |    Faculty    |      |    Student    |
+---------------+      +---------------+      +---------------+

Option B: Composition / Association (Role Pattern)
+--------------------+ 1          1 +--------------------+
|        User        | ------------ |      Profile /       |
|                    |              | Persona (Role)     |
+--------------------+              +--------------------+
```

---

## 2. Evaluation Criteria

### 2.1 "Is-A" Semantic Test
- An `Admin` **is a** `User` with authentication credentials and system oversight privileges.
- A `Faculty` **is a** `User` with teaching assignments and grading behavior.
- A `Student` **is a** `User` with course registrations and academic evaluations.
- *Outcome*: Passes the strict conceptual "is-a" test.

### 2.2 Shared Attributes & Invariants
- All three share: `userId`, `username`, `passwordHash`, `email`, `role`, `createdAt`, `isActive`, `authenticate()`, `getDashboardRoute()`.
- Specialized attributes:
  - `Student`: `rollNumber`, `semester`, `department`, `enrollments`.
  - `Faculty`: `facultyId`, `designation`, `department`, `assignedCourses`.
  - `Admin`: `adminId`, `permissions`.

### 2.3 Substitutability (Liskov Substitution Principle)
- Any subsystem expecting a generic `User` (e.g., authentication service, session manager, authorization middleware) can operate seamlessly on an instance of `Admin`, `Faculty`, or `Student` without breaking correctness.

---

## 3. Analysis Recommendation

- **Analysis Phase Conclusion**: **Generalization (Inheritance)** is conceptually justified and recommended for modeling the shared identity, security attributes, and polymorphic dashboard routing.
- **Design Note for Phase 3**: In detailed design, we will evaluate whether pure class inheritance or an abstract base persona with composition provides cleaner ORM/Persistence mapping.\n