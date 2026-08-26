const tokenService = require('../../infrastructure/security/TokenService');

function authMiddleware(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      errorCode: 'UNAUTHORIZED',
      message: 'Authentication token required.'
    });
  }

  const token = authHeader.split(' ')[1];
  const decoded = tokenService.verifyToken(token);
  if (!decoded) {
    return res.status(401).json({
      success: false,
      errorCode: 'INVALID_TOKEN',
      message: 'Session expired or invalid token.'
    });
  }

  req.user = decoded;
  next();
}

module.exports = authMiddleware;
