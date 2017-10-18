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


    $("#click-all-results").click(function() {
        alert("All Results Coming Up!");
            $.ajax({
            url: "/allresults",
            type: 'GET',
            dataType: 'json',
           })
            .done(function(req, res) {
              console.log(req);
               $("#all-results").empty();




                 var myTableArray = [];
                 myTableArray.push("<tr><th>Id</th><th>First Name</th><th>Last Name</th><th>E-mail</th><th>Gender</th><tr>");

              for (var i = 0; i < req.length; ++i) {
                     myTableArray.push(
         
                    "<tr><td>" + req[i].id + "</td>" +
                    "<td>" + req[i].first_name + "</td>" +
                    "<td>" + req[i].last_name + "</td>" +
                    "<td>" + req[i].email + "</td>" +
                    "<td>" + req[i].gender + "</td></tr>");
                
                };

               
                $("#all-results").append(myTableArray);

            });
        });




    });
