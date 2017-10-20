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


app.delete("/delete:id?", function(req, res) {
    var id = req.params.id;
    console.log("from Server " + id);



    connection.query('DELETE FROM mock_data WHERE last_name= ?', [id], function(err, rows) {
        console.log(rows);
        if (err) { console.log("Error :" + err) } else { res.send(rows); };
    });





});

app.post('/add', function(req, res) {


      
        var firstName = req.body.firstName;
        var lastName = req.body.lastName;
        var email = req.body.email;
        var gender = req.body.gender;

     
        var sql = "INSERT INTO mock_data (first_name, last_name, email, gender) VALUES ?";
        var values = [
            [firstName, lastName, email, gender]
        ];
        connection.query(sql, [values], function(err, result) {
            if (err) throw err;
            console.log("Number of records inserted: " + result.affectedRows);
            res.send();
        });

});




app.listen(3000);