# Authentication & Security Test Report

## 1. Test Cases & Findings
- **TC-AUTH-001 (Valid Login)**: Authenticated `admin`, `dr_alan`, and `alice_smith` with correct passwords. Returns valid JWT token with user claims. **[PASS]**
- **TC-AUTH-002 (Invalid Username)**: Submitted non-existent user `non_existent_user`. Rejected with `401 Unauthorized`. **[PASS]**
- **TC-AUTH-003 (Invalid Password)**: Submitted wrong password `WrongPassword999!`. Rejected with `401 Unauthorized`. **[PASS]**
- **TC-AUTH-004 (Empty Credentials)**: Empty payload rejected with `400 Bad Request`. **[PASS]**
- **TC-AUTH-005 (Credential Sanitization)**: Verified that `#passwordHash` is private and omitted from JSON responses. **[PASS]**
- **TC-AUTH-006 (Missing Token Guard)**: Requesting protected routes without token header returns `401 Unauthorized`. **[PASS]**
- **TC-AUTH-007 (Malformed Token)**: Tampered JWT token signature rejected with `401 Unauthorized`. **[PASS]**
