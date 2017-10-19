$(document).ready(function() {

    $("#clear").click(function(event) {
        event.preventDefault();
        alert("You are about to clear the table, get ready!");

        $.ajax({
                url: "/clear",
                type: 'DELETE'
            })
            .done(function(req, res) {

            });
    });


    $("#submit").click(function(event) {
        event.preventDefault();
        alert("Submit");
        var value = $("#FirstName").val();
        console.log(value);
        $.ajax({
                url: "/firstname",
                data: { dataobj: value },
                type: 'POST'
            })
            .done(function(req, res) {
                console.log("complete, from app.js");
                console.log(req);
                console.log(res);
            });
    });

var getResults = function(){
    $("#click-all-results").click(function() {
        alert("All Results Coming Up!");
        $.ajax({
                url: "/allresults",
                type: 'GET',
                dataType: 'json',
            })
            .done(function(req, res) {
                console.log(req);
                console.log(req.length);
                $("#all-results").empty();




                var myTableArray = [];
                myTableArray.push("<tr><th>Id</th><th>First Name</th><th>Last Name</th><th>E-mail</th><th>Gender</th><tr>");

                for (var i = 0; i < req.length; ++i) {
                    myTableArray.push(

                        "<tr><td>" + req[i].id + "</td>" +
                        "<td>" + req[i].first_name + "</td>" +
                        "<td>" + req[i].last_name + "</td>" +
                        "<td>" + req[i].email + "</td>" +
                        "<td>" + req[i].gender + "</td>" +
                        "<td><button id=" + "delete" + ">DELETE</button></td></tr>"
                    );

                };


                $("#all-results").append(myTableArray);
                $("#totalUsers").html(req.length);

            });
    });

};

getResults();

    $('body').on('click', '#delete', function() {


        var $row = $(this).closest('tr');
        var $columns = $row.find('td');

        var firstName = $columns[2].innerHTML;

        // console.log($columns[2].innerHTML);
        // console.log($columns[1].innerHTML);

        var url_id = "/delete" + firstName;

        console.log(url_id);


        $.ajax({
        url: url_id,
        type: 'DELETE',
        dataType: 'json',
    })
    .done(function(req, res) {

 console.log("complete, from app.js");


                             $("#all-results").empty();
                         

                                                alert("All Results Coming Up!");
        $.ajax({
                url: "/allresults",
                type: 'GET',
                dataType: 'json',
            })
            .done(function(req, res) {
                console.log(req);
                console.log(req.length);
                $("#all-results").empty();




                var myTableArray = [];
                myTableArray.push("<tr><th>Id</th><th>First Name</th><th>Last Name</th><th>E-mail</th><th>Gender</th><tr>");

                for (var i = 0; i < req.length; ++i) {
                    myTableArray.push(

                        "<tr><td>" + req[i].id + "</td>" +
                        "<td>" + req[i].first_name + "</td>" +
                        "<td>" + req[i].last_name + "</td>" +
                        "<td>" + req[i].email + "</td>" +
                        "<td>" + req[i].gender + "</td>" +
                        "<td><button id=" + "delete" + ">DELETE</button></td></tr>"
                    );

                };


                $("#all-results").append(myTableArray);
                $("#totalUsers").html(req.length);

            });









    });
    });


});