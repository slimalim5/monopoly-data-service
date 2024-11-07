const pgp = require('pg-promise')();

const db = pgp({
  host: 'monopoly-db.postgres.database.azure.com',  // PGHOST
  port: 5432,  // PGPORT
  database: 'monopoly',  // PGDATABASE
  user: 'alimdarmenov',  // PGUSER
  password: 'Kazakhstan12!@',  // Replace with your actual password
  ssl: { rejectUnauthorized: false }  // Ensure SSL is set correctly
});

module.exports = db;
