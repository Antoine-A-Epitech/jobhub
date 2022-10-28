const mysql = require('mysql2/promise');
require('dotenv').config();


const getTableRows = async (tableName) => {

  // Create the connection
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PWD
  });

  const [rows, res] = await connection.execute(`SHOW COLUMNS FROM ${tableName}`);

  return rows.map(row => row.Field);
}

module.exports = getTableRows;
