$(document).ready(function() {

    $("#e-mail").click(function(event) {


    });


function sendEmail_NewHire(email,firstname,lastname){

        alert("Test email");

        var omni_Id = firstname.charAt(0) + lastname;
        omni_Id = omni_Id.toLowerCase();
        console.log(omni_Id);
        // parameters: service_id, template_id, template_parameters
        emailjs.send("default_service", "template_pNljs1L2", {omni_Id: omni_Id, to_name: "Brooklyn", send_to:"philmlaker@gmail.com" });

};


    $("#createPDF").click(function(event) {
        console.log("create PDF b");
        var column = [];
        var firstName = [];
        var lastName = [];
        var docDefinition = {};
        var body = [];




        $.ajax({
                url: "/allresults",
                type: 'GET',
                dataType: 'json',
            })
            .done(function(req, res) {
                console.log(res);
                column.push({ text: "First Name" });

                for (var i = 0; i < req.length; ++i) {
                    console.log(req[i].first_name);
                    firstName.push(req[i].first_name);
                    lastName.push(req[i].last_name);
                };




                docDefinition = {
                    content: [

                        {
                            style: 'tableExample',
                            table: {
                                body: [
                                    ["First Name", "Last Name"],
                                    [firstName, lastName]
                                ]
                            }
                        }
                    ]
                };
                pdfMake.createPdf(docDefinition).open();
            });
    });


    function addPerson(firstName, lastName, email, gender) {

        sendEmail_NewHire(email,firstName,lastName);

        $.ajax({
                url: "/add",
                data: { firstName: firstName, lastName: lastName, email: email, gender: gender },
                type: 'POST',
                dataType: 'json'
            })
            .done(function(req, res) {
                console.log("complete, from app.js");

            });

    }


    $("#submit").click(function(event) {
        event.preventDefault();
        var firstName = $("#firstName").val();
        var lastName = $("#lastName").val();
        var email = $("#email").val();
        var gender = $("#gender").val();


        function capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        };

        firstName = capitalizeFirstLetter(firstName);
        lastName = capitalizeFirstLetter(lastName);

        formValidation(firstName, lastName, email, gender);


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






    function formValidation(firstname, lastname, email, gender) {





        function allLetter(firstname, lastname) {
            var letters = /^[A-Za-z]+$/;
            if (firstname.match(letters) && lastname.match(letters)) {
                return true;
            } else if (!(lastname.match(letters)) && !(firstname.match(letters))) {
                alert('First and Last Name must have alphabet characters only');
                $("#lastName, #firstName").focus();
                return false;
            } else if (!(firstname.match(letters))) {
                alert('First Name must have alphabet characters only');
                $("#firstName").focus();
                return false;
            } else if (!(lastname.match(letters))) {
                alert('Last Name must have alphabet characters only');
                $("#lastName").focus();
                return false;
            }
        };


        function ValidateEmail(email) {
            var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if (email.match(mailformat)) {
                return true;
            } else {
                alert("You have entered an invalid email address!");
                $("#email").focus();
                return false;
            }
        };

        if ((allLetter(firstname, lastname) == true) && (ValidateEmail(email)) == true) {
            alert("Congrats");
            addPerson(firstname, lastname, email, gender);
        } else { alert("bad"); return false; }



    };






});