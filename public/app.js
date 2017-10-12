$(document).ready(function(){

$( "#click" ).click(function() {
  alert( "Handler for .click() called." );
   $.ajax({
            url: "/test",
            type: 'GET',
            dataType: 'json',
            success: function(res, req) {

                console.log(res[1].first_name);
                $("#results").html(res[1].first_name);

            }
        });
});

  

});
