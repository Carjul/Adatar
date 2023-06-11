const { Pool } = require('pg');


const { DB_USER, DB_PASSWORD, DB_HOST, DB } = process.env;


const db = new Pool({
  user:DB_USER,
  host:DB_HOST,
  password:DB_PASSWORD,
  database:DB,
 port:5432,
});

module.exports = {db}