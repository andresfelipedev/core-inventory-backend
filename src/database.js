const { dbConfig } = require('./config');
const mysql = require('mysql');

const { host, user, password, database } = dbConfig;
mysqlConnection = mysql.createPool({
    connectionLimit: 10,
    host,
    user,
    password,
    database,
    multipleStatements: true
});

mysqlConnection.on('connection', connection => {        
    console.log('Connected to DB');        
});

mysqlConnection.on('error', err => {
    console.log(new Date(), 'MySQL error:', err.code);
});

module.exports = mysqlConnection;