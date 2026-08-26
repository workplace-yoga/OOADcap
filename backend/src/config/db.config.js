const path = require('path');

module.exports = {
  DB_PATH: path.join(__dirname, '..', '..', 'sis_database.json'),
  DATABASE_TYPE: process.env.DATABASE_TYPE || 'JSON_SQL_STORE'
};
