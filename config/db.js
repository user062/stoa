const mysql = require('mysql2');

var connection = mysql.createPool({
    host: 'localhost',
    user: 'user062',
    password: '123456',
    database: 'stoaDB',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

connection = connection.promise();

module.exports = connection;
