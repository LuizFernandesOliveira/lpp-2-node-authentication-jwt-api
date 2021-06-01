require('dotenv/config');

module.exports = {
  development: {
    username: process.env.DB_USER_,
    password: process.env.DB_PASS_,
    database: process.env.DB_NAME_,
    host: process.env.DB_HOST_,
    dialect: process.env.DB_DIALECT_,
  },
  test: {
    username: process.env.DB_USER_,
    password: process.env.DB_PASS_,
    database: process.env.DB_NAME_,
    host: process.env.DB_HOST_,
    dialect: process.env.DB_DIALECT_,
  },
  production: {
    username: process.env.DB_USER_,
    password: process.env.DB_PASS_,
    database: process.env.DB_NAME_,
    host: process.env.DB_HOST_,
    dialect: process.env.DB_DIALECT_,
  }
}
