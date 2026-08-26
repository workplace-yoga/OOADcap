# Security Implementation

## 1. Security Safeguards
1. **Password Hashing**: bcrypt with automatic salt generation; plaintext passwords never persisted.
2. **Stateless JWT**: Standard Authorization Bearer headers with expiration.
3. **No Plaintext Passwords in Payloads**: Sanitized user DTOs returned in responses.
4. **Parameterized Data Access**: Queries executed through repository abstractions.
5. **CORS Security**: Cross-Origin Resource Sharing headers enabled for authorized frontends.
