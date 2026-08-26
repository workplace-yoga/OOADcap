# Polymorphism Design

## 1. Concrete Polymorphic Operations

### 1.1 Operation: `getDashboardRoute()`
- **Base Declaration**: `abstract getDashboardRoute(): String` in `User`.
- **Implementations**:
  - `Admin.getDashboardRoute()` $\longrightarrow$ returns `"/admin/dashboard"`
  - `Faculty.getDashboardRoute()` $\longrightarrow$ returns `"/faculty/dashboard"`
  - `Student.getDashboardRoute()` $\longrightarrow$ returns `"/student/dashboard"`
- **Client Execution**:
  ```text
  User user = authService.authenticate(credentials);
  String redirectUrl = user.getDashboardRoute(); // Dynamic polymorphic dispatch
  ```

### 1.2 Operation: `getAccessPermissions()`
- **Base Declaration**: `abstract getAccessPermissions(): List<Permission>` in `User`.
- **Implementations**:
  - `Admin.getAccessPermissions()` $\longrightarrow$ returns `[MANAGE_USERS, MANAGE_COURSES, ASSIGN_FACULTY, VIEW_REPORTS]`
  - `Faculty.getAccessPermissions()` $\longrightarrow$ returns `[VIEW_ROSTER, RECORD_ATTENDANCE, ENTER_MARKS]`
  - `Student.getAccessPermissions()` $\longrightarrow$ returns `[VIEW_OWN_PROFILE, VIEW_OWN_ATTENDANCE, VIEW_OWN_GRADES]`
- **Design Benefit**: Eliminates rigid conditional blocks (`if role == 'ADMIN' ... else if ...`).\n