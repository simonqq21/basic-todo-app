require('dotenv').config();
// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './dev.sqlite3',
    }
  },
  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },
  production:
  {
    client: 'pg',
    connection: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      database: process.env.DB_NAME,
      password: process.env.DB_PASS,
      ssl: false,
    },
    migrations: {

    },
  }
  // production:
  // {
  //   client: 'pg',
  //   connection: {
  //     host: '192.168.5.145',
  //     port: 5432,
  //     user: 'pguser',
  //     database: 'todo_app_db',
  //     password: 'Y8y8y8y8!',
  //     ssl: false,
  //   },
  //   migrations: {

  //   },
};
