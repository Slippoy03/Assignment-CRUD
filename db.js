const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root", 
  password: "", 
  database: "crud_app",
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Connected to database");
});

module.exports = db;
