# Production Database Configuration

## 1. Database Provisioning & Auto-Initialization
- **Local / Default**: Built-in auto-seeding persistent relational store (`sis_database.json`) ensures 100% immediate zero-config execution.
- **Cloud PostgreSQL (Optional Production Extension)**:
  - On Render $ightarrow$ Click **New +** $ightarrow$ **PostgreSQL**.
  - Pass `DATABASE_URL` environment variable to backend service.
  - The repository layer automatically runs `seedDatabase()` on startup if empty.
