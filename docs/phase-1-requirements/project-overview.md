# Project Overview: Student Information System Using Object-Oriented Design

## 1. Executive Summary
The **Student Information System (SIS)** is an academic capstone project focused on the complete Object-Oriented Analysis and Design (OOAD) of an institutional student data management platform. 

Rather than treating the project merely as a rapid web development exercise, the emphasis is placed on establishing a disciplined engineering workflow where business requirements are progressively transformed into domain models, object responsibilities, UML artifacts, and finally a decoupled web application.

---

## 2. Context & Motivation
Educational institutions handle critical operational records across multiple dimensions:
- Student admissions and lifecycle data
- Faculty teaching assignments
- Course offerings and student enrollments
- Daily or session-based attendance records
- Assessment marks and academic grade history

Traditional paper-based records or disparate spreadsheets result in significant data redundancy, synchronization lag, unauthorized access vulnerabilities, and high administrative overhead. A centralized Student Information System provides a single source of truth, standardizing workflows and securing role-based operations.

---

## 3. High-Level Architecture Intent
The resulting system will be realized as a modern, decoupled web application:
- **Frontend Layer**: Single Page Application (SPA) designed to be hosted on **GitHub Pages**.
- **Backend Service Layer**: RESTful API service designed to be hosted on **Render**.
- **Data Persistence Layer**: Cloud-managed relational database.
- **Communication Protocol**: Secure RESTful JSON over HTTPS.

```
+---------------------------+        REST APIs / JSON        +-----------------------------+        TCP / TLS        +------------------------+
|      Frontend (SPA)       |  <==========================>  |    Backend Service Layer    |  <====================> |  Cloud Database Layer  |
| (Planned on GitHub Pages) |          over HTTPS            |     (Planned on Render)     |                         |  (Relational Storage)  |
+---------------------------+                                +-----------------------------+                         +------------------------+
```

> [!IMPORTANT]
> In accordance with Phase 1 constraints, no frontend, backend, or database implementation is performed at this stage. All activities in this phase are strictly dedicated to requirements analysis, scope freezing, and domain discovery.\n