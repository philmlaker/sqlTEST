var express = require('express'),
    mysql = require('mysql'),
    path = require('path');


var app = express();
module.exports - app;


var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'sakila'
});

app.use(express.static(__dirname + '/public'));

app.get("/test", function(req, res) {
    connection.query('SELECT * FROM actor', function(err, rows) {
        if (err) { console.log("Error :" + err) } else { res.send(rows); };
    });
});

app.post('/firstname', function(req, res) {
    console.log("This is from server" + req.body);
    res.json(req.body);
});




app.listen(3000);