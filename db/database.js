// get the client
const mysql = require('mysql2');

// create the connection to database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1grayKITT1N!',
  database: 'employees'
});

db.connect(function(err) {
  if (err) {
    throw (err)
  }
});

module.exports = db;