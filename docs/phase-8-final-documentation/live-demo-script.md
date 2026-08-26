# 5 to 10 Minute Live Demonstration Script

## Step-by-Step Demonstration Flow

| Step | Actor / Screen | Action Performed | What to Highlight to Examiners |
| :---: | :--- | :--- | :--- |
| **1** | **Login Portal** | Open `frontend/index.html` $ightarrow$ Click Quick Demo "Admin" | Highlight Glassmorphic UI design, client-side input validation, and JWT token exchange. |
| **2** | **Admin Dashboard** | Inspect Dashboard metrics $ightarrow$ Click "Register Student" | Show modal form $ightarrow$ Register new student `CS2026099`. Highlight instant table reactivity. |
| **3** | **Course Allocation**| Navigate to Courses $ightarrow$ Assign `Dr. Alan Turing` to `CS304` | Point out the Association relationship between Course and Faculty. |
| **4** | **Enrollment** | Click "Enroll Student" $ightarrow$ Enroll `Alice Smith` in `CS304` | Point out the creation of the `Enrollment` aggregate root linking Student and Course. |
| **5** | **Switch to Faculty**| Logout $ightarrow$ Login as `dr_alan` (`Faculty@123`) | Demonstrate polymorphic redirection to `/faculty/dashboard`. |
| **6** | **Record Attendance**| Select `CS304` $ightarrow$ Click "Record Attendance" $ightarrow$ Save | Highlight status invariant enforcement (`PRESENT`, `ABSENT`). |
| **7** | **Enter Marks** | Click "Enter Marks" $ightarrow$ Enter score `48 / 50` for Quiz 1 | Highlight score boundary validation and continuous mark tracking. |
| **8** | **Switch to Student**| Logout $ightarrow$ Login as `alice_smith` (`Student@123`) | Demonstrate Student role isolation. |
| **9** | **Transcript View** | Inspect Enrolled Course Card $ightarrow$ Open Academic Transcript | Point out automatic grade calculation (`A+`, $96\%$) and attendance compliance percentage ($100\%$). |
| **10**| **Security Check** | Show backend console log $ightarrow$ Verify RBAC 403 blocks | Demonstrate that security is enforced on the server, not just in UI buttons. |
