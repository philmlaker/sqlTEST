$(document).ready(function() {


    // GETS ALL EMPLOYEES NAMES FROM DATABASE AND PUTS THEM IN A DROP-DOWN MENU 

    var data = [];

    $.ajax({
            url: "/allresults",
            type: 'GET',
            dataType: 'json',
        })
        .done(function(req, res) {
            for (var i = 0; i < req.length; ++i) {
                data.push('<option>' + req[i].first_name + " " + req[i].last_name + '</option>');
            };
          
            $("#reports").html(data);
        });



    // ON CLICK GETS ALL CURRENT EMPLOYESS BE SEARCHING FOR ACTIVE NEXT TO EMPLOYEES' NAME

   

        function homePageDisplay(){
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

                myTableArray.push("<tr><th>Id</th><th>First Name</th><th>Last Name</th><th>E-mail</th><th>Department</th><th>Active</th><th>End Date</th><th>Position</th><th>Reports To</th><th>Start Date</th><tr>");

                for (var i = 0; i < req.length; ++i) {

                    if (req[i].active == "Active") {
                        myTableArray.push(
                            "<tr><td>" + req[i].id + "</td>" +
                            "<td>" + req[i].first_name + "</td>" +
                            "<td>" + req[i].last_name + "</td>" +
                            "<td><a href='mailto:" + req[i].email + "'>" + req[i].email + "</a></td>" +
                            "<td>" + req[i].department + "</td>" +
                            "<td>" + req[i].active + "</td>" +
                            "<td>" + req[i].endDate + "</td>" +
                            "<td>" + req[i].position + "</td>" +
                            "<td>" + req[i].reportsTo + "</td>" +
                            "<td>" + req[i].startDate + "</td>" +
                            "<td><button id=" + "inactivate" + ">Inactivate</button></td>" +
                            "<td><button id=" + "delete" + ">DELETE</button></td></tr>"
                        );
                    } else {
                        // Do nothing
                        };

                };


                var totalAdmin = "";
                var totalAC = "";
                var totalCOR = "";
                var totalMOL = "";


                for (var i = 0; i < req.length; ++i)
                    if (req[i].active == "Active") {
                        {
                            if (req[i].department == "Adminstrative") {
                                totalAdmin = +1;
                            } else if (req[i].department == "Analytical Chemistry") {
                                totalAC = +1;
                            } else if (req[i].department == "Core") {
                                totalCOR = +1;
                            } else if (req[i].department == "Molecular") {
                                totalMOL = +1;
                            }
                        };
                    } else {
                        // Do nothing
                    };

                $("#all-results").append(myTableArray);
                $("#totalUsers").html(req.length);
                $("#totalAdmin").html(totalAdmin);
                $("#totalAC").html(totalAC);
                $("#totalCOR").html(totalCOR);
                $("#totalMOL").html(totalMOL);

            });
        };


homePageDisplay();


 $("#currentEmployees").click(function(event) {
    homePageDisplay();
    });


    // SENDS E-MAIL TO NEW EMPLOYEE - NOT SETUP YET

    // function sendEmail_NewHire(email, firstname, lastname) {
    //     alert("Test email");
    //     var omni_Id = firstname.charAt(0) + lastname;
    //     omni_Id = omni_Id.toLowerCase();
    //     console.log(omni_Id);
    //     // parameters: service_id, template_id, template_parameters
    //     // emailjs.send("default_service", "template_pNljs1L2", { omni_Id: omni_Id, to_name: "Brooklyn", send_to: "philmlaker@gmail.com" });

    // };



    // CREATES PDF OF USERS - NOT SETUP YET

    // $("#createPDF").click(function(event) {
    //     console.log("create PDF b");
    //     var column = [];
    //     var firstName = [];
    //     var lastName = [];
    //     var docDefinition = {};
    //     var body = [];




    //     $.ajax({
    //             url: "/allresults",
    //             type: 'GET',
    //             dataType: 'json',
    //         })
    //         .done(function(req, res) {
    //             console.log(res);
    //             column.push({ text: "First Name" });

    //             for (var i = 0; i < req.length; ++i) {
    //                 console.log(req[i].first_name);
    //                 firstName.push(req[i].first_name);
    //                 lastName.push(req[i].last_name);
    //             };




    //             docDefinition = {
    //                 content: [

    //                     {
    //                         style: 'tableExample',
    //                         table: {
    //                             body: [
    //                                 ["First Name", "Last Name"],
    //                                 [firstName, lastName]
    //                             ]
    //                         }
    //                     }
    //                 ]
    //             };
    //             pdfMake.createPdf(docDefinition).open();
    //         });
    // });


    // FUNCTION THAT INPUTS A NEW USERS TO THE DATABASE

    function addPerson(firstName, lastName, email, department, position, reports, startDate) {

        // sendEmail_NewHire(email, firstName, lastName);

        console.log(reports);

        $.ajax({
                url: "/add",
                data: { firstName: firstName, lastName: lastName, email: email, department: department, position: position, reports: reports, startDate: startDate },
                type: 'POST',
                dataType: 'json'
            })
            .done(function(req, res) {
              
                console.log("complete, from app.js");

            });
    };


    // ON CLICKING SUBMIT - GRAP INPUT AND VALIDATE

    $("#submit").click(function(event) {
        event.preventDefault();

        var firstName = $("#firstName").val();
        var lastName = $("#lastName").val();
        var email = $("#email").val();
        var department = $("#department").val();
        var position = $("#position").val();
        var reports = $("#reports").val();
        var startDate = $("#startDate").val();

        function capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        };

        firstName = capitalizeFirstLetter(firstName);

        lastName = capitalizeFirstLetter(lastName);

        formValidation(firstName, lastName, email, department, position, reports, startDate);
    });




    // GET ALL RESULTS (ACTIVE AND INACTIVE USERS)

    // $("#click-all-results").click(function() {
    //     alert("All Results Coming Up!");
    //     pushTable();
    //     // $.ajax({
    //     //         url: "/allresults",
    //     //         type: 'GET',
    //     //         dataType: 'json',
    //     //     })
    //     //     .done(function(req, res) {
    //     //         console.log(req);
    //     //         console.log(req.length);
    //     //         $("#all-results").empty();


    //     //         var myTableArray = [];
    //     //         myTableArray.push("<tr><th>Id</th><th>First Name</th><th>Last Name</th><th>E-mail</th><th>Department</th><th>Active</th><th>End Date</th><tr>");

    //     //         for (var i = 0; i < req.length; ++i) {
    //     //             myTableArray.push(

    //     //                 "<tr><td>" + req[i].id + "</td>" +
    //     //                 "<td>" + req[i].first_name + "</td>" +
    //     //                 "<td>" + req[i].last_name + "</td>" +
    //     //                 "<td>" + req[i].email + "</td>" +
    //     //                 "<td>" + req[i].department + "</td>" +
    //     //                 "<td>" + req[i].active + "</td>" +
    //     //                 "<td>" + req[i].endDate + "</td>" +
    //     //                 "<td><button id=" + "inactivate" + ">Inactivate</button></td>" +
    //     //                 "<td><button id=" + "delete" + ">DELETE</button></td></tr>"
    //     //             );

    //     //         };


    //     //         $("#all-results").append(myTableArray);
    //     //         $("#totalUsers").html(req.length);

    //     //     });
    // });

    // PUSH TABLE TO HTML
    function pushTable() {

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

                    if (req[i].active == "Inactive") {
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
                    if (req[i].department == "Adminstrative") {
                        totalAdmin = +1;
                    } else {}

                };

                $("#all-results").append(myTableArray);
                $("#totalUsers").html(req.length);
                $("#totalAdmin").html(totalAdmin);

            });
    };

    // UPON CLICKING THE DELETE BUTTON NEXT TO A USERS' NAME, DELETE THE USER FROM THE DATABASE - COMPLETELY EREASES THEM


    $('body').on('click', '#delete', function() {


        var $row = $(this).closest('tr');
        var $columns = $row.find('td');
        var firstName = $columns[2].innerHTML;
        var url_id = "/delete" + firstName;

        console.log(url_id);

        pushTable();

    });

    $(function() {
        $("#startDate").datepicker();
        $("#startDate").datepicker("option", "dateFormat", 'mm/dd/yy');

    });



    // UPON CLICKING THE INACTIVE BUTTON NEXT TO A USERS' NAME, SET THEM TO INACTIVATE


    $('body').on('click', '#inactivate', function() {


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

            $.ajax({
                    url: "/update",
                    data: { bla: bla, id: id },
                    type: 'PATCH',
                    dataType: 'json',
                })
                .done(function(req, res) {

                  homePageDisplay();
                   window.open("https://cst.omni-assistant.net/srl/Document/DocumentDownloader.aspx?Df_Guid=30a68cb0-db2a-4ca9-9b5b-0666b184e058");
                   alert("Please complete Employee System Access Checklist SRL-ONB-F005")

                });

        });



    });



// SORT TABLE FUNCTION

function sortTable(n) {
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById("myTable2");
  switching = true;
  // Set the sorting direction to ascending:
  dir = "asc"; 
  /* Make a loop that will continue until
  no switching has been done: */
  while (switching) {
    // Start by saying: no switching is done:
    switching = false;
    rows = table.getElementsByTagName("TR");
    /* Loop through all table rows (except the
    first, which contains table headers): */
    for (i = 1; i < (rows.length - 1); i++) {
      // Start by saying there should be no switching:
      shouldSwitch = false;
      /* Get the two elements you want to compare,
      one from current row and one from the next: */
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];
      /* Check if the two rows should switch place,
      based on the direction, asc or desc: */
      if (dir == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          // If so, mark as a switch and break the loop:
          shouldSwitch= true;
          break;
        }
      } else if (dir == "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          // If so, mark as a switch and break the loop:
          shouldSwitch= true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      /* If a switch has been marked, make the switch
      and mark that a switch has been done: */
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      // Each time a switch is done, increase this count by 1:
      switchcount ++; 
    } else {
      /* If no switching has been done AND the direction is "asc",
      set the direction to "desc" and run the while loop again. */
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
};


















    // MAIN FUNCTION THAT VALIDATES THE INPUT FROM THE USER

    function formValidation(firstname, lastname, email, department, position, reports, startDate) {





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
            addPerson(firstname, lastname, email, department, position, reports, startDate);
            console.log(firstname, lastname, email, department, position, reports, startDate);
        } else { alert("bad"); return false; }
    };

});