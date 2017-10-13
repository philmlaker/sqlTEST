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

  
      

              for (var i = 0; i < req.length; ++i) {
                console.log(JSON.stringify(req[i].first_name));
                $("#all-results").append(req[i].actor_id + " ");
                $("#all-results").append(req[i].first_name);
                $("#all-results").append("</br>");
           
                };


            });
        });




    });
