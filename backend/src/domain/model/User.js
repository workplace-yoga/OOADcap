const bcrypt = require('bcryptjs');

/**
 * Abstract Base Class: User
 * Encapsulates authentication credentials, role typing, and polymorphic behavior.
 */
class User {
  #passwordHash;

  constructor({ userId, username, passwordHash, email, role, isActive = true, createdAt = new Date().toISOString(), lastLogin = null }) {
    if (new.target === User) {
      throw new Error('Cannot instantiate abstract class User directly.');
    }
    this.userId = userId;
    this.username = username;
    this.#passwordHash = passwordHash;
    this.email = email;
    this.role = role;
    this.isActive = Boolean(isActive);
    this.createdAt = createdAt;
    this.lastLogin = lastLogin;
  }

  getPasswordHash() {
    return this.#passwordHash;
  }

  authenticate(plainPassword) {
    if (!this.isActive) return false;
    if (!this.#passwordHash) return false;
    return bcrypt.compareSync(plainPassword, this.#passwordHash);
  }

  changePassword(oldPassword, newPassword) {
    if (!this.authenticate(oldPassword)) {
      throw new Error('Current password does not match.');
    }
    this.#passwordHash = bcrypt.hashSync(newPassword, 10);
    return true;
  }

  setPasswordHash(newHash) {
    this.#passwordHash = newHash;
  }

  /**
   * Polymorphic method: Returns specialized dashboard route.
   */
  getDashboardRoute() {
    throw new Error('Abstract method getDashboardRoute() must be implemented by subclass.');
  }

  /**
   * Polymorphic method: Returns role capability set.
   */
  getAccessPermissions() {
    throw new Error('Abstract method getAccessPermissions() must be implemented by subclass.');
  }

  toJSON() {
    return {
      userId: this.userId,
      username: this.username,
      email: this.email,
      role: this.role,
      isActive: this.isActive,
      createdAt: this.createdAt,
      lastLogin: this.lastLogin,
      dashboardRoute: this.getDashboardRoute()
    };
  }
}

module.exports = User;
