# OOAD Concept Mapping

## 1. Overview
To ensure academic rigor and prevent unsubstantiated claims, every core Object-Oriented Analysis and Design principle is explicitly mapped to its exact role in the Student Information System along with its current analysis lifecycle status.

---

## 2. Concept Application & Status Matrix

| OOAD Concept | Application in Student Information System (SIS) | Analysis Status |
| :--- | :--- | :--- |
| **Class** | Formal definition of templates for `User`, `Admin`, `Faculty`, `Student`, `Course`, `Enrollment`, `Attendance`, `AcademicRecord`. | **Identified & Analyzed** |
| **Object** | Runtime instances representing specific individual learners, teachers, course sections, session logs, and test score records. | **Identified & Analyzed** |
| **Encapsulation** | Protecting student details, grade scores, password hashes, and attendance status within domain boundaries; modifications permitted only via verified methods. | **Analyzed & Documented** |
| **Abstraction** | Hiding cryptographic hashing, attendance percentage calculations, and many-to-many enrollment join complexities behind clean domain interfaces. | **Analyzed & Documented** |
| **Inheritance** | Generalization hierarchy where `Admin`, `Faculty`, and `Student` specialize `User` identity and authentication state. | **Analyzed & Recommended** |
| **Polymorphism** | Role-specific dynamic dashboard dispatching (`getDashboardView()`) and permission checking (`getAccessPermissions()`). | **Analyzed & Recommended** |
| **Association** | Bidirectional or directed semantic links such as `Faculty` teaches `Course` and `Student` holds `Enrollment`. | **Analyzed & Documented** |
| **Aggregation** | Whole-part relationships where parts retain independent existence (e.g., `Course` and `Student` related to `Enrollment`). | **Analyzed & Documented** |
| **Composition** | Strong lifecycle whole-part ownership: `Attendance` and `AcademicRecord` exist strictly within the lifecycle of an `Enrollment`. | **Analyzed & Documented** |
| **High Cohesion** | Distributing responsibilities so each entity (`Student`, `Course`, `Attendance`, etc.) manages strictly its own domain concerns without bloated manager classes. | **Analyzed & Documented** |
| **Low Coupling** | Decoupling user roles from direct data manipulation through associative abstractions (`Enrollment`) and structured service contracts. | **Analyzed & Documented** |
| **Use Case Modeling**| Formal decomposition into 18 discrete, actor-driven use cases with explicit `<<include>>` and `<<extend>>` justifications. | **Completed & Documented** |
| **Domain Modeling** | Conceptual class model detailing entities, attributes, associations, and multiplicities. | **Completed & Documented** |\n