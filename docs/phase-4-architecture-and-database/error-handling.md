# Standardized Error Handling Architecture

## 1. Unified API Response Format

### Success Response Blueprint
```json
{
  "success": true,
  "data": { ... },
  "message": "Operation completed successfully"
}
```

### Error Response Blueprint
```json
{
  "success": false,
  "errorCode": "INVALID_CREDENTIALS",
  "message": "The username or password provided is incorrect.",
  "timestamp": "2026-08-26T09:15:00Z"
}
```

---

## 2. HTTP Status Code Mapping
- **`400 Bad Request`**: Malformed payload, failed validation rules.
- **`401 Unauthorized`**: Missing or invalid JWT token.
- **`403 Forbidden`**: Valid token, but user role lacks permission.
- **`404 Not Found`**: Target student/course/record does not exist.
- **`409 Conflict`**: Duplicate roll number, duplicate course code, or duplicate enrollment.
- **`500 Internal Server Error`**: Unhandled database/system exception.\n