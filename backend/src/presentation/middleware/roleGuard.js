function roleGuard(allowedRoles = []) {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      return res.status(401).json({
        success: false,
        errorCode: 'UNAUTHORIZED',
        message: 'Authentication required.'
      });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        errorCode: 'FORBIDDEN',
        message: `Access denied. Role '${req.user.role}' is not authorized for this operation.`
      });
    }

    next();
  };
}

module.exports = roleGuard;
