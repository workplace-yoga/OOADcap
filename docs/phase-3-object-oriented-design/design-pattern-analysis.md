# Design Pattern Analysis

## 1. Selected Design Patterns

### 1.1 Repository Pattern (Architectural Pattern)
- **Problem**: Business services should not be tightly coupled to SQL dialect or persistence mechanics.
- **Application**: Domain defines `IRepository<T, ID>` interfaces (`IStudentRepository`, `ICourseRepository`); infrastructure implements them.
- **Benefits**: Simplifies unit testing with mock repositories; isolates query logic.

### 1.2 Strategy Pattern (Behavioral Pattern)
- **Problem**: Different courses or academic departments may calculate final letter grades using different grading curves (e.g., Absolute 10-point scale vs Relative Bell Curve).
- **Application**: `Enrollment` delegates grade computation to an `IGradingStrategy` interface (`AbsoluteGradingStrategy`, `RelativeGradingStrategy`).
- **Benefits**: Enables dynamic configuration of grading algorithms without altering the core `Enrollment` class.

### 1.3 Factory Method Pattern (Creational Pattern)
- **Problem**: Constructing complex `User` sub-types (`Admin`, `Faculty`, `Student`) along with default security profiles and permissions.
- **Application**: `UserFactory.createUser(type, data)` encapsulates instantiation logic.
- **Benefits**: Centralizes entity initialization invariants.\n