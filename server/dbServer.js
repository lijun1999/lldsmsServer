var mysql = require('mysql');

//mysql
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'ms',
  multipleStatements: true
});

connection.connect();

exports.connection = connection