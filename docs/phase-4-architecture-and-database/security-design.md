# Security Architecture & Safeguards

## 1. Comprehensive Security Blueprint

1. **Cryptographic Protection**:
   - bcrypt password hashing with automatic salting.
   - JWT tokens signed with secure 256-bit environment secret.
2. **SQL Injection Prevention**:
   - 100% parameterized SQL queries via repository abstraction (no raw string concatenation).
3. **Cross-Site Scripting (XSS) Prevention**:
   - Frontend uses `textContent` and safe DOM manipulation methods; no dangerous `innerHTML` rendering of untrusted inputs.
4. **Environment Secret Hygiene**:
   - Zero hardcoded database credentials or JWT keys in source repository.
   - Managed via `.env` in local development and Render Environment Variables in production.\n