const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_ooad_capstone_jwt_key_2026_change_in_production';
const JWT_EXPIRES_IN = '24h';

module.exports = {
  JWT_SECRET,
  JWT_EXPIRES_IN
};
