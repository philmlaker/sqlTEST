$(document).ready(function(){

$( "#click" ).click(function() {
  alert( "Handler for .click() called." );
   $.ajax({
            url: "/test",
            type: 'GET',
            dataType: 'json',
            success: function(res, req) {

                console.log(res[1].first_name);
                $("#results").html(res[1].last_name);

            }
        });
});

$("#submit").click(function(event) {
  event.preventDefault();
  alert( "Submit" );
   var value = $("#FirstName").val(); 
   console.log(value);
   $.ajax({
            url: "/firstname",
            data: "value",
            type: 'POST'
          })
            .done(function(response){
              console.log("this is from app.js" + response);

            });


  
  

});


$( "#results" ).on( "click", function() {
  console.log($( this ).text());

});

});
