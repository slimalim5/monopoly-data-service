require('dotenv').config(); // Load environment variables from .env file
const pgp = require('pg-promise')();

const db = pgp({
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  ssl: { rejectUnauthorized: false }
});

module.exports = db;
