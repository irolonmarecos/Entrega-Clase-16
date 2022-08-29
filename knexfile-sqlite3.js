//const dotenv = require('dotenv').config()
//
//const DATABASE_HOST = process.env.DATABASE_HOST || "localhost";
//const DATABASE_PORT = process.env.DATABASE_PORT || "3306";
//const DATABASE_USER = process.env.DATABASE_USER || "ignacio";
//const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD || "password_1234";
//const DATABASE_NAME = process.env.DATABASE_NAME || "productos";
//
const knexConfig = {
  client: "sqlite3",
  connection: {
      filename: "chat_db.sqlite"
  },
  migrations: {
      tableName: 'knex_migrations',
      directory: './migrations'
  },
  seeds: {
      tableName: 'knex_seeds',
      directory: './seeds/'
  }
}

module.exports = knexConfig;