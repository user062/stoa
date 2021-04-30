const mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'user062',
    password: '123456',
    database: 'prototype_db'
});

connection.connect();

module.exports = connection;
