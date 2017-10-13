$(document).ready(function() {

    $("#click").click(function() {
        alert("Handler for .click() called.");
        $.ajax({
            url: "/test",
            type: 'GET',
            dataType: 'json',
            success: function(res, req) {
              var last = (res.length)-1;



                console.log(res[last].first_name);

                  var firstname = res[last].first_name;
                  firstname = firstname.replace(/['"]+/g, '');


                $("#results").html(firstname);

            }
        });
    });

    $("#submit").click(function(event) {
        event.preventDefault();
        alert("Submit");
        var value = $("#FirstName").val();
        console.log(value);
        $.ajax({
                url: "/firstname",
                data: {dataobj:value},
                type: 'POST'
            })
            .done(function(req, res) {
                console.log("complete, from app.js");
                console.log(req);
                console.log(res);
            });





    });


    $("#results").on("click", function() {
        console.log($(this).text());

    });

});