# End-to-End Cross-Module Business Workflows

## 1. Verified End-to-End Scenarios

### Flow 1: Student Creation & User Provisioning
1. Admin logs into system $\longrightarrow$ receives JWT.
2. Admin opens Student Management $\longrightarrow$ enters Emma Watson details (`CS2026099`).
3. System saves User & Student $\longrightarrow$ updates active directory.
4. Emma Watson logs in using initial password $\longrightarrow$ directed to Student Portal. **[PASS]**

### Flow 2: Course Setup & Enrollment
1. Admin creates new course offering `CS304 (Compiler Construction)`.
2. Admin assigns `Dr. Alan Turing` as course instructor.
3. Admin enrolls `Alice Smith` in `CS304`.
4. Alice Smith opens portal $\longrightarrow$ `CS304` appears in enrolled course list. **[PASS]**

### Flow 3: Session Attendance Recording
1. Dr. Alan Turing opens Faculty Portal $\longrightarrow$ selects `CS304`.
2. Course roster renders enrolled students.
3. Faculty submits session attendance register for `2026-08-26`.
4. Alice Smith checks portal $\longrightarrow$ attendance percentage updates to `100%`. **[PASS]**

### Flow 4: Continuous Marks Entry & Grade Calculation
1. Dr. Alan Turing selects `CS304` $\longrightarrow$ opens Enter Marks dialog.
2. Enters score `48 / 50` for Quiz 1.
3. Domain recalculates average percentage ($96.0\%$) and grade (`A+`).
4. Alice Smith views Academic Transcript $\longrightarrow$ Quiz 1 score and `A+` grade displayed. **[PASS]**

### Flow 5: Role-Based Authorization Enforcement
1. Alice Smith captures JWT token and attempts `GET /api/v1/students`.
2. Server rejects unauthorized request with `403 Forbidden`. **[PASS]**
