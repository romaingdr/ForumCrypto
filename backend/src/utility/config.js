const mysql = require('mysql');
require('dotenv').config();


const db = mysql.createConnection({
    host : process.env.DATABASE_HOST,
    user:  process.env.DATABASE_USER,
    password : process.env.DATABASE_PASS,
    database : process.env.DATABSE_NAME
});

db.connect(err => {
    if (err) {
        console.error('Erreur de connexion à la base de données: ' + err.message);
        process.exit(1);
    }
});

module.exports = db;