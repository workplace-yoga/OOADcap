const bcrypt = require('bcryptjs');

class PasswordHasher {
  static hash(plainPassword) {
    return bcrypt.hashSync(plainPassword, 10);
  }

  static compare(plainPassword, hash) {
    return bcrypt.compareSync(plainPassword, hash);
  }
}

module.exports = PasswordHasher;
