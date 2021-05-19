const mysql = require('mysql2');

var connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'stoa',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

connection = connection.promise();

module.exports = connection;
