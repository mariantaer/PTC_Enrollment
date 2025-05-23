const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,  // notice DB_PASS here
  database: process.env.DB_NAME,
});

const db = pool.promise();

module.exports = db;
