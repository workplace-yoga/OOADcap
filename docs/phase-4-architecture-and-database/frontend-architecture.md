# Frontend Client Architecture

## 1. Modular SPA Structure
The frontend is designed as a pure Object-Oriented Single Page Application (SPA) hosted on GitHub Pages:

```text
frontend/
├── index.html                   # Single entry point shell
├── css/
│   ├── design-system.css        # Glassmorphism tokens, HSL colors, typography
│   ├── layout.css               # Navbar, Sidebar, Responsive grids
│   └── components.css           # Cards, tables, modals, alerts, forms
│
└── js/
    ├── app.js                   # Application bootstrap & router
    ├── core/
    │   ├── ApiClient.js         # Base HTTP client with JWT interceptor
    │   ├── Router.js            # Client-side hash routing
    │   └── StateManager.js      # Centralized session & state store
    │
    ├── services/                # API Service wrappers
    │   ├── AuthService.js
    │   ├── AdminService.js
    │   ├── FacultyService.js
    │   └── StudentService.js
    │
    └── views/                   # Dynamic View Controllers
        ├── LoginView.js
        ├── AdminDashboardView.js
        ├── FacultyDashboardView.js
        └── StudentDashboardView.js
```\n