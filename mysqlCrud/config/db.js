const mysql = require('mysql2/promise');


const mysqlPool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Sanjay@16',
    database: 'demoDb'
});

module.exports = mysqlPool;