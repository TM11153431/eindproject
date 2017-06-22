
//************************************************************
// Data notice the structure
//************************************************************

d3.json("types.json", function(error, data) {
	if (error) throw error;

	var colors = [
		'red',
		'green',
		'steelblue',
		'black',
		'yellow',
		'orange',
		'purple',
		'pink'
	]
	
//************************************************************
// Create Margins and Axis and hook our zoom function
//************************************************************
	var margin = {top: 20, right: 30, bottom: 30, left: 50},
    	width = 600 - margin.left - margin.right,
    	height = 400 - margin.top - margin.bottom;
	
	var x = d3.scale.linear()
    	.domain([2000, 2100])
    	.range([0, width]);
 
	var y = d3.scale.linear()
    	.domain([-1, 140])
    	.range([height, 0]);
	
	var xAxis = d3.svg.axis()
    	.scale(x)
		.tickSize(-height)
		.tickPadding(10)	
		.tickSubdivide(true)	
    	.orient("bottom");	
	
	var yAxis = d3.svg.axis()
    	.scale(y)
		.tickPadding(10)
		.tickSize(-width)
		.tickSubdivide(true)	
    	.orient("left");
	
	var zoom = d3.behavior.zoom()
    	.x(x)
    	.y(y)
    	.scaleExtent([1, 10])
    	.on("zoom", zoomed);	
	
//************************************************************
// Generate our SVG object
//************************************************************	
	var svg = d3.select("#linegraph").append("svg")
		.call(zoom)
    	.attr("width", width + margin.left + margin.right)
    	.attr("height", height + margin.top + margin.bottom)
		.append("g")
    	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
 
	svg.append("g")
    	.attr("class", "x axis")
    	.attr("transform", "translate(0," + height + ")")
    	.text('ffff')
    	.call(xAxis);
    	
	svg.append("g")
    	.attr("class", "y axis")
    	.call(yAxis);
 
	svg.append("g")
		.attr("class", "y axis")
		.append("text")
		.attr("class", "axis-label")
		.attr("transform", "rotate(-90)")
		.attr("y", (-margin.left) + 12)
		.attr("x", -height/2)
		.text('Global greenhouse gas emissions');	
 
	svg.append("clipPath")
		.attr("id", "clip")
		.append("rect")
		.attr("width", width)
		.attr("height", height);
		
//************************************************************
// Create D3 line object and draw data on our SVG object
//************************************************************

	var line = d3.svg.line()
    	.interpolate("linear")	
    	.x(function(d) { return x(d.x); })
    	.y(function(d) { return y(d.y); });	
	
	var tooltip = d3.select("#linegraph")
		.append("div1")
		.attr('class', 'tippie')
		.style("z-index", "10")
		.style("visibility", "hidden")
		
	svg.selectAll('.line')
		.data(data)
		.enter()
		.append("path")
    	.attr("class", "line")
		.attr("clip-path", "url(#clip)")
		.attr('stroke', function(d,i){ 			
			return colors[i%colors.length];
		})
    	.attr("d", line)
        .on('mouseover', function(d) { 
        	if (d[0].type == "Middle") {
        	
        		tooltip.text("Middle")
        		return tooltip.style("visibility", "visible");
        	}
        	if (d[0].type == "Goal") {
        		tooltip.text("The overall goal of the agreement is to limit global warming to less than 2ºC. Most of the current pledges do not go beyond 2030. Longer term pledges, which countries will submit periodically, will need to be stronger to reach the goal.")
        		return tooltip.style("visibility", "visible");
        	}
        	if (d[0].type == "Later") {
        		tooltip.text("Later")
        		return tooltip.style("visibility", "visible");
        	}
        	if (d[0].type == "nooit") {
        		tooltip.text("nooit")
        		return tooltip.style("visibility", "visible");
        	}
        	if (d[0].type == "USA") {
        		tooltip.text("USA")
        		return tooltip.style("visibility", "visible");
        	}
        	if (d[0].type == "EU") {
        		tooltip.text("EU")
        		return tooltip.style("visibility", "visible");
        	}
        	if (d[0].type == "CHINA") {
        		tooltip.text("CHINA")
        		return tooltip.style("visibility", "visible");
        	}
        	if (d[0].type == "DEVELOPED") {
        		tooltip.text("DEVELOPED")
        		return tooltip.style("visibility", "visible");
        	}
        })
        .on('mousemove', function() {return tooltip.style("top", "-350px").style("left", "5px");})

        
    // Define the div for the tooltip
	var div = d3.select("body").append("div")	
    	.attr("class", "tooltip")				
    	.style("opacity", 0);	

//************************************************************
// Zoom specific updates
//************************************************************
	function zoomed() {
		svg.select(".x.axis").call(xAxis);
		svg.select(".y.axis").call(yAxis);   
		svg.selectAll('path.line').attr('d', line);  
	}
	
	var svg2 = d3.select("#legend")
    .append("svg")
    .attr("width", 30)
    .attr("height", 20*data.length);
        
 var legend = svg2.append("g")
                  .attr("class", "legend1")
                  .attr('transform', 'translate(-20,50)') 
                  
//************************************************************
// Legend
//************************************************************    

legend.selectAll('rect')
  .data(data)
  .enter()
  .append("rect")
  .attr("x", 30)
  .attr("y", function(d, i){ return (i-1) *  20;})
  .attr("width", 5)
  .attr("height", 5)
  .style("fill", function(d, i) { 
    var color = colors[i%colors.length];
    return color;
  })

legend.selectAll('text')
  .data(data)
  .enter()
  .append("text")
  .attr("x", 40)
  .attr("width", 5)
  .attr("height", 5)
  .attr("y", function(d, i){ return (i-1) *  20 + 5;})
  .text(function(d, i) {
    var text = colors[i%colors.length];
    return text;
  });
});

    var dataSet = [
        ['Sweden','581','581','59.31','59','6'],
        ['Luxembourg','46.8','33.4','58.63','111','21'],
        ['Norway','258','581','50.20','97','9'],
        ['Monaco','108','1.08','28.89','163','-'],
        ['United Kingdom','1.211','1.211','18.77','46','7'],
        ['France','1.035','1.035','15.64','43','5'],
        ['Denmark','71.8','71.80','12.73','48','7'],
        ['Germany','1.003','100','12.21','48','9'],
        ['Switzerland','100','100','12.21','59','6'],  
        ['Japan','1.500','1.500','11.80','36','9'],
        ['United States of America','3000','3000','9.41','55','17'],
        ['Finland','107','46.4','8.49','50','10'], 
        ['Netherlands','134','134','7.94','52','10'],
        ['Australia','187','187','7.92','62','17'],
        ['Canada','277','277','7.79','50','14'],
        ['Belgium','66.9','66.9','6.18','48','9'],
        ['Italy','334','268','4.54','35','7'],
        ['Austria','34.8','34.8','4.09','51','8'],  
        ['Spain','161','161','3.46','30','6'],
        ['Republic of Korea','100','100','1.99','28','12'],
        ['Iceland','1','0.50','1.55','52','6'],
        ['Liechtenstein','<0.1','<0.1','1.48','135','1'],
        ['Estonia','1.30','1.3','0.99','20','14'],
        ['New Zealand','2.56','2.56','0.57','20','10'],
        ['Czech Republic','5.32','5.32','0.57','20','10'],
        ['Malta','0.20','0.20','0.47','23','6'],
        ['Hungary','4.30','4.30','0.43','14','5'],    
        ['Panama','1','1','0.25','12','3'],
        ['Latvia','0.47','0.47','0.24','16','4'],
        ['Mexico','10','10','0.08','10','4'],
        ['Lithuania','0.10','0.10','59.31','59','6'],
        ['Bulgaria','0.10','0.10','0.02','8','7'], 
        ['Chile','0.30','0.30','0.02','15','5'],
        ['Colombia','6','0.30','<0.01','8','2'],
        ['Romania','0.10','0.10','0.01','10','4'],
        ['Poland','0.11','0.11','<0.01','4','2'],
        ['Indonesia','0.25','0.25','<0.01','4','2'],
        ['Cyprus','0.50','-','0','27','7'],
        ['Ireland','2.70','-','0','53','8'],
        ['Vietnam','0.10','-','0','2','2'],
        ['Portugal','2.68','-','0','22','5'],
        ['Peru','6','581','-','0','2'],
        ['Mongolia','<0.1','-','0','4','7'],
    ];



$(document).ready(function() {
    $('#demo').html( '<table cellpadding="0" cellspacing="0" border="0" class="display" id="example"  width="10px" height="20px"></table>' );
     $('#example').dataTable( {
     
        scrollY: '50vh',
        scrollCollapse: true,
  
        paging: false,
        "data": dataSet,
        "columns": [
        	
            { "title": "Contributor" },
            { "title": "Announced" },
            { "title": "Signed" },
            { "title": "Signed capita", "class": "left" },
            { "title": "GDP capita", "class": "left" }
        ]
    });
    $('div.dataTables_scrollBody').height( 120 );   
});








