// CONNECTION INFO

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
    // port: '8815',
    user: 'root',
    password: '1234',
    // password: 'root',
    database: 'sakila'
    // database: 'test_db'
});

app.use(express.static(__dirname + '/public'));




// GET ALL RESULTS

app.get("/allresults", function(req, res) {
    connection.query('SELECT * FROM mytabletwo', function(err, rows) {
        console.log(rows);
        if (err) { console.log("Error :" + err) } else { res.send(rows); };
    });
});

app.get("/ptallresults", function(req, res) {
    connection.query('SELECT * FROM pt_table', function(err, rows) {
        console.log(rows);
        if (err) { console.log("Error :" + err) } else { res.send(rows); };
    });
});

// DELETE FROM TABLE


app.delete("/delete:id?", function(req, res) {
    var id = req.params.id;
    console.log("from Server5656 " + id);



    connection.query('DELETE FROM mytabletwo WHERE last_name= ?', [id], function(err, rows) {
        console.log(rows);
        if (err) { console.log("Error :" + err) } else { res.send(rows); };
    });

});

// UPDATE EXISITING USER IN THE TABLE


app.patch("/update", function(req, res) {
    var id = req.body.id;
    var date = req.body.bla;
    console.log(req.body.bla);
    console.log(req.body.id);


    connection.query('UPDATE mytabletwo SET endDate= ? WHERE id= ?', [date, id], function(err, rows) {
        console.log(rows);
        if (err) { console.log("Error :" + err) } else {


            connection.query('UPDATE mytabletwo SET active="Inactive" WHERE id= ?', [id], function(err, rows) {
                console.log(rows);
                if (err) { console.log("Error :" + err) } else { res.send(rows); };
            });

        };
    });

});



// ADD NEW USER TO TABLE

app.post('/add', function(req, res) {



    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var email = req.body.email;
    var department = req.body.department;
    var position = req.body.position;
    var reports = req.body.reports;
    var startDate = req.body.startDate;

    var active = "Active";

    var license = req.body.license;

    console.log(reports + position + startDate);

    var sql = "INSERT INTO mytabletwo (first_name, last_name, email, department, active, position, reportsTo, startDate, degree, license) VALUES ?";
    var values = [
        [firstName, lastName, email, department, active, position, reports, startDate, degree]
    ];
    connection.query(sql, [values], function(err, result) {
        if (err) throw err;
        console.log("Number of records inserted: " + result.affectedRows);
        console.log(reports + position + startDate);
        res.send();
    });

});




app.listen(3000);