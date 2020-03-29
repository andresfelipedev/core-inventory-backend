const { dbConfig } = require('./config');
const mysql = require('mysql');

let mysqlConnection;

const connectDB = () => {
    const { host, user, password, database } = dbConfig;
    mysqlConnection = mysql.createConnection({    
        host,
        user,
        password,
        database,
        multipleStatements: true
    });
    
    mysqlConnection.connect(err => {
        if (!err) {
            console.log('Connected to DB');        
        } else {
            console.log('DB error:', err);   
            setTimeout(connectDB(), 2000);
        }
    });

    mysqlConnection.on('error', err => {
        console.log('DB error:', err);
        if (err) {
            connectDB();
        } else {
            throw err;
        }
      });
};

connectDB();

module.exports = mysqlConnection;