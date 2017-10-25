$(document).ready(function() {

		var orgChart = [];



        $.ajax({
                url: "/allresults",
                type: 'GET',
                dataType: 'json',
            })
            .done(function(req, res) {
        	console.log(req);

        		for (var i = 0; i < 8; i++) {
        		
        			var array =[];
        			
        			// console.log(req[i].first_name);

        			array.push({v: req[i].first_name, f: req[i].first_name + "<div>" + req[i].department + "</div>"});
        			array.push("Anthony Carter");

        			orgChart.push(array);


        		};

            


            console.log(orgChart);

google.charts.load('current', {packages:["orgchart"]});
      google.charts.setOnLoadCallback(drawChart);

      function drawChart() {
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Name');
        data.addColumn('string', 'Manager');


        // For each orgchart box, provide the name, manager, and tooltip to show.
        data.addRows(orgChart
        );

        // Create the chart.
        var chart = new google.visualization.OrgChart(document.getElementById('chart_div'));
        // Draw the chart, setting the allowHtml option to true for the tooltips.
        chart.draw(data, {allowHtml:true});
      }
});
});