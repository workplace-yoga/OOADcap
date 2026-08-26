# Abstraction & Interface Design

## 1. Domain Service Abstractions
To decouple domain logic from external concerns (such as UI controllers, database persistence, and external notification engines), we define clean abstract service and repository interfaces.

---

## 2. Formal Interface Definitions

### 2.1 Interface: `IAuthenticationService`
```
+------------------------------------------------------------------------+
|                      <<Interface>> IAuthenticationService               |
+------------------------------------------------------------------------+
| + login(credentials: LoginDTO): AuthToken                              |
| + validateToken(tokenString: String): UserPrincipal                    |
| + logout(tokenString: String): Boolean                                 |
+------------------------------------------------------------------------+
```

### 2.2 Interface: `IRepository<T, ID>` (Generic Repository Abstraction)
```
+------------------------------------------------------------------------+
|                      <<Interface>> IRepository<T, ID>                  |
+------------------------------------------------------------------------+
| + findById(id: ID): Optional<T>                                        |
| + findAll(): List<T>                                                   |
| + save(entity: T): T                                                   |
| + deleteById(id: ID): Boolean                                          |
+------------------------------------------------------------------------+
```

### 2.3 Specialized Repository Abstractions
- `IUserRepository` extends `IRepository<User, String>`: Adds `findByUsername(username)`, `findByEmail(email)`.
- `IStudentRepository` extends `IRepository<Student, String>`: Adds `findByRollNumber(rollNo)`.
- `ICourseRepository` extends `IRepository<Course, String>`: Adds `findByCourseCode(code)`.
- `IEnrollmentRepository` extends `IRepository<Enrollment, String>`: Adds `findByStudentAndTerm(studentId, term)`.\n