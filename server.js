var express = require('express'),
    mysql = require('mysql'),
    path = require('path'),
    bodyParser = require('body-parser'),
    app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());




module.exports - app;

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'sakila'
});

app.use(express.static(__dirname + '/public'));

app.get("/allresults", function(req, res) {
    connection.query('SELECT * FROM mock_data', function(err, rows) {
        console.log(rows);
        if (err) { console.log("Error :" + err) } else { res.send(rows); };
    });
});




app.delete("/clear", function(req, res) {
    connection.query('TRUNCATE TABLE actor', function(err, rows) {
        console.log("clearing table");
        if (err) { console.log("Error :" + err) } else { res.send(); };
    });
});

app.post('/firstname', function(req, res) {
    connection.connect(function(err) {

        var inputResult = req.body.dataobj;
        console.log("REQ.BODY: " + req.body)
        console.log(inputResult);

        if (err) throw err;
        console.log("Connected!");
        var sql = "INSERT INTO actor (first_name, last_name) VALUES ?";
        var values = [
            [inputResult, "test"]
        ];
        connection.query(sql, [values], function(err, result) {
            if (err) throw err;
            console.log("Number of records inserted: " + result.affectedRows);
            console.log("REQ.BODY: " + inputResult);
            res.send();
        });
    });
});




app.listen(3000);