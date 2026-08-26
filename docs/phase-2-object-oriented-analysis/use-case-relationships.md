# Use Case Relationships Analysis

## 1. Justification of UML Use Case Relationships
In Object-Oriented Analysis, relationships such as `<<include>>`, `<<extend>>`, and `Generalization` must be applied strictly when justified by business rules and behavioral decomposition, avoiding artificial complexity.

---

## 2. Identified Relationships & Architectural Justification

### 2.1 `<<include>>` Relationships (Mandatory Common Sub-flows)

1. **`View Role Dashboard` <<include>> `Authenticate User`**:
   - **Reasoning**: Accessing any role dashboard unconditionally requires successful user authentication and role verification. A user cannot reach dashboard states without completing `Authenticate User`.

2. **`Manage Students` / `Manage Faculty` / `Manage Courses` <<include>> `Authenticate User`**:
   - **Reasoning**: All administrative operations require administrative session validation prior to dispatching actions.

3. **`Record Session Attendance` <<include>> `View Course Roster`**:
   - **Reasoning**: Before attendance can be recorded, the system must unconditionally retrieve the list of enrolled students (course roster) for the target course offering.

4. **`Enter Assessment Marks` <<include>> `View Course Roster`**:
   - **Reasoning**: Entering evaluation marks requires rendering the enrolled student roster for the target course component.

---

### 2.2 `<<extend>>` Relationships (Conditional / Optional Sub-flows)

1. **`Update Session Attendance` <<extend>> `Record Session Attendance`**:
   - **Extension Point**: *Past Session Selection*.
   - **Reasoning**: Modifying previously submitted attendance is a conditional extension triggered only when an instructor specifically needs to rectify an earlier session record.

2. **`Update Assessment Marks` <<extend>> `Enter Assessment Marks`**:
   - **Extension Point**: *Grade Moderation / Mark Correction*.
   - **Reasoning**: Adjusting marks is an exceptional flow executed when re-evaluations or corrections occur.

---

### 2.3 Generalization Relationships (Actor Generalization)

- **`User` (Abstract Actor) <|-- `Admin`, `Faculty`, `Student`**:
  - **Reasoning**: `Admin`, `Faculty`, and `Student` all share the generalized capability of logging into the system (`Authenticate User`), but each specializes behavior through distinct domain dashboards and privileges.

```
                  +--------------------------+
                  |       User (Actor)       |
                  +--------------------------+
                               ^
                               | (Generalization)
        +----------------------+----------------------+
        |                      |                      |
+---------------+      +---------------+      +---------------+
|     Admin     |      |    Faculty    |      |    Student    |
+---------------+      +---------------+      +---------------+
```\n