const mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'prototype_db'
});

connection.connect();

module.exports = connection;
