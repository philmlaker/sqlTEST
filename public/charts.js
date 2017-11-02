$(document).ready(function() {


    $("#overall").click(function() {

       generateAllOrgChart();


});

    $("#ADMIN").click(function() {

       generateOrgChart("Administrative");


});


    $("#AC").click(function() {

        generateOrgChart("Analytical Chemistry");


});

   $("#COR").click(function() {

        generateOrgChart("Core");


});

      $("#MOL").click(function() {

        generateOrgChart("Molecular");


});

function generateAllOrgChart(){


    var orgChart = [];


    $.ajax({
            url: "/allresults",
            type: 'GET',
            dataType: 'json',
        })
        .done(function(req, res) {
            console.log(req);
         
          
            for (var i = 0; i < req.length; i++) {

             
                    var array = [];
                


                   var fullName = req[i].first_name + " " + req[i].last_name;
                    // console.log(req[i].first_name);

                    array.push({ v: fullName, f: fullName + "<div style='color:red;font-style:italic'>" + req[i].position + "<br>" + req[i].department + "</div>" });
                    array.push(req[i].reportsTo);

                    orgChart.push(array);


              









            };




            console.log(orgChart);

            google.charts.load('current', { packages: ["orgchart"] });
            google.charts.setOnLoadCallback(drawChart);

            function drawChart() {
                var data = new google.visualization.DataTable();

                data.addColumn('string', 'Name');
                data.addColumn('string', 'Manager');


                // For each orgchart box, provide the name, manager, and tooltip to show.
                data.addRows(orgChart);

                // Create the chart.
                var chart = new google.visualization.OrgChart(document.getElementById('chart_div'));
                // Draw the chart, setting the allowHtml option to true for the tooltips.
                chart.draw(data, {allowHtml: true});

            }
        });

    };




function generateOrgChart(departmentName){


    var orgChart = [];


    $.ajax({
            url: "/allresults",
            type: 'GET',
            dataType: 'json',
        })
        .done(function(req, res) {
            console.log(req);
         
          
            for (var i = 0; i < req.length; i++) {

                if (req[i].department == departmentName) {
                    var array = [];
                


                   var fullName = req[i].first_name + " " + req[i].last_name;
                    // console.log(req[i].first_name);

                    array.push({ v: fullName, f: fullName + "<div style='color:red;font-style:italic'>" + req[i].position + "<br>" + req[i].department + "</div>" });
                    array.push(req[i].reportsTo);

                    orgChart.push(array);


                } else {};









            };




            console.log(orgChart);

            google.charts.load('current', { packages: ["orgchart"] });
            google.charts.setOnLoadCallback(drawChart);

            function drawChart() {
                var data = new google.visualization.DataTable();

                data.addColumn('string', 'Name');
                data.addColumn('string', 'Manager');


                // For each orgchart box, provide the name, manager, and tooltip to show.
                data.addRows(orgChart);

                // Create the chart.
                var chart = new google.visualization.OrgChart(document.getElementById('chart_div'));
                // Draw the chart, setting the allowHtml option to true for the tooltips.
                chart.draw(data, {allowHtml: true});

            }
        });

    };
});