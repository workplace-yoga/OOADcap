# Frontend Implementation

## 1. Single Page Application Architecture
The client under `/frontend` is built as an object-oriented, zero-build Single Page Application designed for instantaneous GitHub Pages deployment.

### Key Client Modules:
- **`ApiClient.js`**: Reusable base HTTP client encapsulating JSON serialization, bearer token attachment, and 401 redirect handling.
- **`Router.js`**: Client-side hash routing (`#/login`, `#/admin/dashboard`, `#/faculty/dashboard`, `#/student/dashboard`) with strict frontend role guard protection.
- **`StateManager.js`**: Central state store managing user profile caching, login sessions, toast alerts, and modal dialogs.
- **`Views`**: Dedicated view controller renderers for Admin, Faculty, and Student workflows.

---

## 2. Design Aesthetics
- **Glassmorphism Design System**: Modern semi-transparent frosted glass cards with `backdrop-filter: blur(16px)`.
- **Harmonious Dark Theme**: Slate background (`#0b0f19`, `#111827`) with vibrant accents (Sky `#38bdf8`, Indigo `#6366f1`, Purple `#a855f7`, Emerald `#10b981`, Rose `#f43f5e`).
- **Modern Typography**: Inter for high-legibility UI text and Outfit for bold modern headings.
