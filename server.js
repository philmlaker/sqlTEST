var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  port: '8889',
  user: 'root',
  password: 'root',
  database: 'test_db'
});

connection.connect(function(err) {
  if (err) throw err
  console.log('You are now connected...')
});
