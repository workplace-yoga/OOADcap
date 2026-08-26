# Final Project Overview: Student Information System (SIS-OOAD)

## 1. What
A centralized, modern, web-based **Student Information System (SIS)** developed strictly using **Object-Oriented Analysis and Design (OOAD)** principles.

## 2. Why
To eliminate manual, fragmented, and paper-based institutional record management, reducing administrative overhead and preventing data inconsistency across student records, course allocations, attendance registers, and academic transcripts.

## 3. Who
- **Admin**: Manages student onboarding, faculty appointments, course offerings, and enrollment links.
- **Faculty**: Manages assigned course rosters, records session attendance, and enters continuous marks.
- **Student**: Inspects enrolled courses, monitors attendance percentage compliance, and views academic transcripts.

## 4. What It Manages
1. **Authentication & Role Security**: Secure JWT tokens and bcrypt password hashing.
2. **Student Profile Lifecycle**: Roll numbers, personal details, semesters, and departments.
3. **Faculty Directory**: Instructor profiles, designations, and departmental affiliations.
4. **Course Catalog & Enrollment**: Credit units, syllabus codes, and student enrollment associations.
5. **Attendance Tracking**: Lecture dates, session slots, attendance statuses (`PRESENT`, `ABSENT`, `LATE`, `EXCUSED`), and compliance calculations.
6. **Academic Performance & Marks**: Continuous assessments, weighted percentages, and letter grade evaluations (`A+`, `A`, `B`, etc.).

## 5. How
Through a decoupled, layered object-oriented architecture featuring an ES6 Glassmorphic Single Page Application frontend and a Node.js/Express 5-layer backend backed by a 3NF relational database.
