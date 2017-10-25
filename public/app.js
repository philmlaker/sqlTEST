$(document).ready(function() {





      $("#currentEmployees").click(function(event) {

        alert("Current Employees Coming Up!");


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
                myTableArray.push("<tr><th>Id</th><th>First Name</th><th>Last Name</th><th>E-mail</th><th>Department</th><th>Active</th><th>End Date</th><tr>");

                for (var i = 0; i < req.length; ++i) {


                    // myTableArray.push(

                    //     "<tr><td>" + req[i].id + "</td>" +
                    //     "<td>" + req[i].first_name + "</td>" +
                    //     "<td>" + req[i].last_name + "</td>" +
                    //     "<td>" + req[i].email + "</td>" +
                    //     "<td>" + req[i].department + "</td>" +
                    //     "<td>" + req[i].active + "</td>" +
                    //     // "<td>" + req[i].endDate + "</td>" +
                    //     // "<td><button disabled='true' id=" + "inactivate" + ">Inactivate</button></td>" +
                    //     // "<td><button id=" + "delete" + ">DELETE</button></td></tr>"
                    // );


                        if (req[i].active == "Active"){
                        myTableArray.push(
                            "<tr><td>" + req[i].id + "</td>" +
                        "<td>" + req[i].first_name + "</td>" +
                        "<td>" + req[i].last_name + "</td>" +
                        "<td><a href='mailto:" + req[i].email + "'>" + req[i].email + "</a></td>" +
                        "<td>" + req[i].department + "</td>" +
                        "<td>" + req[i].active + "</td>" +
                         "<td>" + req[i].endDate + "</td>" +
                            "<td><button id=" + "inactivate" + ">Inactivate</button></td>" +
                        "<td><button id=" + "delete" + ">DELETE</button></td></tr>"

                            );
                     } else {

                         
                        
                     }; 

                };

                 var totalAdmin = "";
                  var totalAC = "";
                   var totalCOR = "";
                    var totalMOL = "";

                    

                for (var i = 0; i < req.length; ++i) 
                    if (req[i].active == "Active") {

                            {
                                if (req[i].department == "Adminstrative"){
                                    totalAdmin = +1;
                                }else if (req[i].department == "Analytical Chemistry"){
                                     totalAC = +1;
                                }else if (req[i].department == "Core"){
                                    totalCOR = +1;
                                }else if (req[i].department == "Molecular"){
                                    totalMOL = +1;
                                }
                            };
            } else {};


                $("#all-results").append(myTableArray);
                $("#totalUsers").html(req.length);
                $("#totalAdmin").html(totalAdmin);
                $("#totalAC").html(totalAC);
                $("#totalCOR").html(totalCOR);
                $("#totalMOL").html(totalMOL);

            });



















      });

    $("#e-mail").click(function(event) {});


    function sendEmail_NewHire(email, firstname, lastname) {
        alert("Test email");
        var omni_Id = firstname.charAt(0) + lastname;
        omni_Id = omni_Id.toLowerCase();
        console.log(omni_Id);
        // parameters: service_id, template_id, template_parameters
        // emailjs.send("default_service", "template_pNljs1L2", { omni_Id: omni_Id, to_name: "Brooklyn", send_to: "philmlaker@gmail.com" });

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


    function addPerson(firstName, lastName, email, department) {

        sendEmail_NewHire(email, firstName, lastName);

        $.ajax({
                url: "/add",
                data: { firstName: firstName, lastName: lastName, email: email, department: department },
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
        var department = $("#department").val();

        function capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        };
        firstName = capitalizeFirstLetter(firstName);
        lastName = capitalizeFirstLetter(lastName);

        formValidation(firstName, lastName, email, department);
    });


    $("#click-all-results").click(function() {
        alert("All Results Coming Up!");
        pushTable();
        // $.ajax({
        //         url: "/allresults",
        //         type: 'GET',
        //         dataType: 'json',
        //     })
        //     .done(function(req, res) {
        //         console.log(req);
        //         console.log(req.length);
        //         $("#all-results").empty();


        //         var myTableArray = [];
        //         myTableArray.push("<tr><th>Id</th><th>First Name</th><th>Last Name</th><th>E-mail</th><th>Department</th><th>Active</th><th>End Date</th><tr>");

        //         for (var i = 0; i < req.length; ++i) {
        //             myTableArray.push(

        //                 "<tr><td>" + req[i].id + "</td>" +
        //                 "<td>" + req[i].first_name + "</td>" +
        //                 "<td>" + req[i].last_name + "</td>" +
        //                 "<td>" + req[i].email + "</td>" +
        //                 "<td>" + req[i].department + "</td>" +
        //                 "<td>" + req[i].active + "</td>" +
        //                 "<td>" + req[i].endDate + "</td>" +
        //                 "<td><button id=" + "inactivate" + ">Inactivate</button></td>" +
        //                 "<td><button id=" + "delete" + ">DELETE</button></td></tr>"
        //             );

        //         };


        //         $("#all-results").append(myTableArray);
        //         $("#totalUsers").html(req.length);

        //     });
    });


function pushTable(){

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
                myTableArray.push("<tr><th>Id</th><th>First Name</th><th>Last Name</th><th>E-mail</th><th>Department</th><th>Active</th><th>End Date</th><tr>");

                for (var i = 0; i < req.length; ++i) {


                    // myTableArray.push(

                    //     "<tr><td>" + req[i].id + "</td>" +
                    //     "<td>" + req[i].first_name + "</td>" +
                    //     "<td>" + req[i].last_name + "</td>" +
                    //     "<td>" + req[i].email + "</td>" +
                    //     "<td>" + req[i].department + "</td>" +
                    //     "<td>" + req[i].active + "</td>" +
                    //     // "<td>" + req[i].endDate + "</td>" +
                    //     // "<td><button disabled='true' id=" + "inactivate" + ">Inactivate</button></td>" +
                    //     // "<td><button id=" + "delete" + ">DELETE</button></td></tr>"
                    // );


                        if (req[i].active == "Inactive"){
                        myTableArray.push(
                            "<tr><td>" + req[i].id + "</td>" +
                        "<td>" + req[i].first_name + "</td>" +
                        "<td>" + req[i].last_name + "</td>" +
                        "<td>" + req[i].email + "</td>" +
                        "<td>" + req[i].department + "</td>" +
                        "<td>" + req[i].active + "</td>" +
                         "<td>" + req[i].endDate + "</td>" +
                            "<td><button disabled='true' id=" + "inactivate" + ">Inactivate</button></td>" +
                        "<td><button id=" + "delete" + ">DELETE</button></td></tr>"

                            );
                     } else {

                         myTableArray.push(
                            "<tr><td>" + req[i].id + "</td>" +
                        "<td>" + req[i].first_name + "</td>" +
                        "<td>" + req[i].last_name + "</td>" +
                        "<td>" + req[i].email + "</td>" +
                        "<td>" + req[i].department + "</td>" +
                        "<td>" + req[i].active + "</td>" +
                        "<td>" + req[i].endDate + "</td>" +
                            "<td><button id=" + "inactivate" + ">Inactivate</button></td>" +
                        "<td><button id=" + "delete" + ">DELETE</button></td></tr>"

                            );
                        
                     }; 

                };

                 var totalAdmin = "";

                for (var i = 0; i < req.length; ++i) {
                    if (req[i].department == "Adminstrative"){
                        totalAdmin = +1;
                    }else{}

                };

              
      


                $("#all-results").append(myTableArray);
                $("#totalUsers").html(req.length);
                $("#totalAdmin").html(totalAdmin);

            });
};

    $('body').on('click', '#delete', function() {


        var $row = $(this).closest('tr');
        var $columns = $row.find('td');

        var firstName = $columns[2].innerHTML;

        // console.log($columns[2].innerHTML);
        // console.log($columns[1].innerHTML);

        var url_id = "/delete" + firstName;

        console.log(url_id);


            pushTable();
    });

$( function() {
    $( "#startDate" ).datepicker();
     $("#startDate").datepicker("option", "dateFormat", 'mm/dd/yy');

  } );

    $('body').on('click', '#inactivate', function() {
        console.log("Inactivate");

        var $row = $(this).closest('tr');
        var $columns = $row.find('td');
        var id = $columns[0].innerHTML;
        var button = $(this);
        console.log(button);
        var bla = "";

        $(function() {
            $('#myDialog').dialog({
                closeOnEscape: false,
                show: {
                    effect: "blind",
                    duration: 1000
                },
                open: function() {
                    $('#myDate').datepicker({ title: 'Test Dialog' }).blur();
                    $("#myDate").datepicker("option", "dateFormat", 'mm/dd/yy');

                    $(".ui-dialog-titlebar-close").hide();
                },
                close: function() {
                    $('#myDate').datepicker('destroy');
                }
            });

        });

        $('#myDialog').on('click', '#close', function() {
            $('#myDialog').dialog("close")

        });

        $('#myDialog').on('click', '#submitEndDate', function() {
            bla = $('#myDate').val();



            console.log("from this" + bla);
            $('#myDialog').dialog("close")






            console.log(id + bla);


            $.ajax({
                    url: "/update",
                    data: { bla: bla, id: id },
                    type: 'PATCH',
                    dataType: 'json',
                })
                .done(function(req, res) {
                    pushTable();


                });



        });


    });




    function formValidation(firstname, lastname, email, department) {





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
            addPerson(firstname, lastname, email, department);
        } else { alert("bad"); return false; }
    };






});