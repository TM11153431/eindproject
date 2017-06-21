
//************************************************************
// Data notice the structure
//************************************************************

d3.json("types.json", function(error, data) {
	if (error) throw error;

	var colors = [
		'red',
		'green',
		'steelblue'
	]
	
//************************************************************
// Create Margins and Axis and hook our zoom function
//************************************************************
	var margin = {top: 20, right: 30, bottom: 30, left: 50},
    	width = 660 - margin.left - margin.right,
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
		.append("div")
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
        		tooltip.text("Goal")
        		return tooltip.style("visibility", "visible");
        	}
        	if (d[0].type == "Later") {
        		tooltip.text("Later")
        		return tooltip.style("visibility", "visible");
        	}
        })
        .on("mouseout", function(){return tooltip.style("visibility", "hidden");});
        
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