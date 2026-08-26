# CORS & Environment Configuration

## 1. Environment Specifications

### 1.1 Development Environment
- **Frontend Origin**: `http://localhost:5500` (or Live Server)
- **Backend API Origin**: `http://localhost:5000/api/v1`
- **Database**: Local PostgreSQL or Cloud Dev instance.

### 1.2 Production Environment
- **Frontend Origin**: `https://<username>.github.io/OOAD-capstone/`
- **Backend API Origin**: `https://sis-backend.onrender.com/api/v1`
- **Database**: Managed Cloud PostgreSQL (Neon / Supabase TLS).

---

## 2. CORS Policy Configuration
```javascript
// Express CORS Configuration Blueprint
const allowedOrigins = [
  'https://yogan.github.io',
  'http://localhost:5500',
  'http://127.0.0.1:5500'
];
```\n