const mysql = require('mysql');

const db = mysql.createConnection({
  user: 'root',
  password: '',
  database: 'alsoviewed'
});

db.connect(function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log('Connected to database alsoviewed: success');
  }
});

module.exports = db;