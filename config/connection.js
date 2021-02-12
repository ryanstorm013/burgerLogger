const mysql = require("mysql");

let connection;

if (process.env.JAWSBD_URL) {
    connection = mysql.createConnection(process.env.JAWSBD_URL);
}
else {
    connection = mysql.createConnection({
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: 'MyServer456%',
        database: 'burgers_db'
    });
}

connection.connect(function (err) {
    if(err) 
        throw err;
    
    console.log('connected as id ' + connection.threadId + '\n');
    return;
});

module.exports = connection;