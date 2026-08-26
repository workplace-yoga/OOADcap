# Authentication Implementation

## 1. Security Architecture
- **Stateless Tokens**: Signed HMAC-SHA256 JWT tokens issued on successful credential verification via `POST /api/v1/auth/login`.
- **Password Protection**: Passwords hashed using bcrypt (10 rounds) in `PasswordHasher.js`.
- **Decoupled Verification**: Domain base class `User.authenticate(plainPassword)` encapsulates credential matching.
