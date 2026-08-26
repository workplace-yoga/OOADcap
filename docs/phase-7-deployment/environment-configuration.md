# Production Environment Configuration

## 1. Environment Variable Specifications

### Backend (Render Web Service):
```env
NODE_ENV=production
PORT=5000
JWT_SECRET=super_secret_production_key_randomly_generated
ALLOWED_ORIGIN=https://yogan.github.io
```

### Frontend (GitHub Pages Client):
- Auto-resolves dynamically in [`frontend/js/core/ApiClient.js`](../../frontend/js/core/ApiClient.js):
  - In development (`localhost`): targets `http://localhost:5000/api/v1`
  - In production (`*.github.io`): targets `https://sis-ooad-backend.onrender.com/api/v1`
  - Overridable via `window.API_BASE_URL` if custom domain is used.
