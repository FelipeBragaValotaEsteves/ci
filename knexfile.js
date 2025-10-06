require('dotenv').config();

const base = {
  client: 'pg',
  pool: { min: 0, max: 5 },
  migrations: { tableName: 'knex_migrations', directory: './migrations' }
};

module.exports = {
  development: {
    ...base,
    connection: {
      host: process.env.DB_HOST || 'localhost',
      port: +(process.env.DB_PORT || 5432),
      user: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASS || 'postgres',
      database: process.env.DB_NAME || 'app_db'
    }
  },
  test: {
    ...base,
    connection: {
      host: process.env.DB_HOST || 'localhost',
      port: +(process.env.DB_PORT || 5432),
      user: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASS || 'postgres',
      database: process.env.DB_NAME || 'app_test_db'
    }
  },
  production: {
    ...base,
    connection: process.env.DATABASE_URL
  }
};
