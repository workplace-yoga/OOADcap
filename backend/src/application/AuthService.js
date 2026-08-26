const userRepo = require('../infrastructure/persistence/SqlUserRepository');
const tokenService = require('../infrastructure/security/TokenService');

class AuthService {
  login(username, password) {
    if (!username || !password) {
      const err = new Error('Username and password are required.');
      err.statusCode = 400;
      throw err;
    }

    const user = userRepo.findByUsername(username) || userRepo.findByEmail(username);
    if (!user) {
      const err = new Error('Invalid credentials.');
      err.statusCode = 401;
      throw err;
    }

    if (!user.authenticate(password)) {
      const err = new Error('Invalid credentials.');
      err.statusCode = 401;
      throw err;
    }

    user.lastLogin = new Date().toISOString();
    userRepo.save(user);

    const token = tokenService.generateToken(user);
    return {
      token,
      user: user.toJSON()
    };
  }

  getUserProfile(userId) {
    const user = userRepo.findById(userId);
    if (!user) {
      const err = new Error('User not found.');
      err.statusCode = 404;
      throw err;
    }
    return user.toJSON();
  }
}

module.exports = new AuthService();
