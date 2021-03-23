// get the client
const mysql = require('mysql2');

// create the connection to database
const db = mysql.createConnection({
  host: 'localhost',
  // enter your mysql username
  user: 'root',
  // enter your mysql password
  password: '1grayKITT1N!',
  database: 'employees'
});

db.connect(function(err) {
  if (err) {
    throw (err)
  }
});

module.exports = db;