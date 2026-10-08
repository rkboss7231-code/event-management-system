const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "2026gu2026",
    database: "eventify"
});

db.connect((err) => {
    if (err) {
        console.log("❌ MySQL connection failed");
        console.log(err.message);
    } else {
        console.log("✅ MySQL connected successfully!");
    }
});

module.exports = db;