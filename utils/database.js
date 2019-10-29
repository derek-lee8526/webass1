const mysql = require('mysql2');

const pool = mysql.createPool({
    host:'localhost',
    user: 'root',
    database: 'memoryGame',
    password: ''

});

module.exports = pool.promise();