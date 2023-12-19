const mysql = require('mysql');

const dbConn = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '12345',
  database : 'RAP'
});

dbConn.connect((err) => {
  if (err) {
    console.error("Error connecting DB..." + err);
  }
  console.log("Database Connected!");
});

module.exports = dbConn;