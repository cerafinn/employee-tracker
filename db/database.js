// get the client
const mysql = require('mysql2');

// create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'employees'
});

connection.connect(function(err) {
  if (err) {
    throw (err)
  }
  console.log("Connected!");
});

module.exports = connection;