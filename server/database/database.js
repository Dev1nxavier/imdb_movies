const { Client } = require('pg');

//database URL or local
const connectionString = process.env.DATABASE_URL || "postgres://localhost:5432/imdbdb";
const db = new Client(connectionString);

db.connect();

module.exports = db;