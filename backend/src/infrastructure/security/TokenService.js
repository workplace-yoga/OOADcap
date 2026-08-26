const jwt = require('jsonwebtoken');
const { JWT_SECRET, JWT_EXPIRES_IN } = require('../../config/jwt.config');

class TokenService {
  generateToken(userEntity) {
    const payload = {
      userId: userEntity.userId,
      username: userEntity.username,
      role: userEntity.role,
      email: userEntity.email,
      studentId: userEntity.studentId || null,
      facultyId: userEntity.facultyId || null,
      adminId: userEntity.adminId || null
    };

    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
  }

  verifyToken(token) {
    try {
      return jwt.verify(token, JWT_SECRET);
    } catch (err) {
      return null;
    }
  }
}

module.exports = new TokenService();
