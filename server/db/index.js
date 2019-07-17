const mysql = require('mysql');
require('dotenv').config();

const db = mysql.createConnection({
  host: process.env.MYSQL_DB_HOST || 'localhost',
  user: process.env.MYSQL_DB_USERNAME || 'root',
  password: process.env.MYSQL_DB_PASSWORD || '',
  database: process.env.MYSQL_DB_DATABASE || 'alsoviewed',
});


db.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Connected to database alsoviewed: success');
  }
});

module.exports = db;
