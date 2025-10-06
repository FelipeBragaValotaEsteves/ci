const { Client } = require('pg');
require('dotenv').config();

async function ensureDatabaseExists() {
  const {
    DB_HOST,
    DB_PORT,
    DB_USER,
    DB_PASS,
    DB_NAME,
  } = process.env;

  const client = new Client({
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USER,
    password: DB_PASS,
    database: 'postgres', 
  });

  try {
    await client.connect();

    const res = await client.query(
      `SELECT 1 FROM pg_database WHERE datname = $1`,
      [DB_NAME]
    );

    if (res.rowCount === 0) {
      console.log(`📦 criando banco de dados "${DB_NAME}"...`);
      await client.query(`CREATE DATABASE "${DB_NAME}"`);
      console.log(`✅ banco "${DB_NAME}" criado com sucesso!`);
    } else {
      console.log(`✅ banco "${DB_NAME}" já existe.`);
    }
  } catch (err) {
    console.error('❌ erro ao verificar/criar o banco:', err);
    process.exit(1);
  } finally {
    await client.end();
  }
}

ensureDatabaseExists();
