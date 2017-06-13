/*
	student: Belle Bruinsma
	student number: 10676759
	datum: 24 maart 2017
	data processing: linked views 
	inspired by: https://bl.ocks.org/jadiehm/8f5adc05465a94e77e30
	inspired by: https://bl.ocks.org/cmgiven/abca90f6ba5f0a14c54d1eb952f8949c
*/

// load the files
d3.queue()
    .defer(d3.csv, 'Global_emissions.csv')

    .defer(d3.json, 'world.json')
    .awaitAll(initialize)
    
var color = d3.scaleThreshold()
	.domain([35, 70, 105])
	.range(['#f20606', '#ffa900'])

function initialize(error, results) {
    if (error) { throw error }

    // data wellbeing, life expectation and coutry
    var data = results[0]
    console.log(data)
    
    
    // data worldmap
    var features = results[1].features
    
	var components = [ choropleth(features, data)
        //scatterplot(onBrush)
    ]

    function update() {
        components.forEach(function (component) { component(data) })
    }
	
}

function choropleth(features, data) {

	//Creates tooltip and makes it invisiblae
	var div = d3.select("body").append("div")
  		.attr("class", "tooltip")
  		.style("opacity", 0);

	// set dimensions
    var width = 700
    var height = 700

	// tells the map what projection to use
    var projection = d3.geoMercator()
    	.scale((width - 3) / (2 * Math.PI))
    	.translate([width / 2, height / 2]);

	// tells the map how to draw the paths from the projection
    var path = d3.geoPath().projection(projection)
    
    // moves selection to front
	d3.selection.prototype.moveToFront = function() {
  		return this.each(function(){
    		this.parentNode.appendChild(this);
  		});
	}; 
	
	// moves selection to back
	d3.selection.prototype.moveToBack = function() { 
  		return this.each(function() { 
  		var firstChild = this.parentNode.firstChild; 
    		if (firstChild) { 
      			this.parentNode.insertBefore(this, firstChild); 
    		} 
  		}); 
	}; 
	
    // pair data with state id
	var dataGE = {};
  	data.forEach(function(d) { dataGE[d.Land] = +d.Global_emissions; });
  	
  	// pair state name with state id
  	var landGE = {};
  	data.forEach(function(d) { landGE[d.Land] = d.Land; });
  	
	// appened svg to page
    var svg = d3.select('#choropleth')
        .append('svg')
        .attr('width', width)
        .attr('height', height)
    svg.selectAll('path')
        .data(features)
        .enter()
        .append('path')
        .attr('d', path)
        .style('stroke', '#fff')
        .style('stroke-width', 1)
        // mousover
      	.on("mouseover", function(d) {
    		var sel = d3.select(this);
        	sel.moveToFront();
      		d3.select(this).transition().duration(300).style("opacity", 0.8);
      		div.transition().duration(300)
      		.style("opacity", 1) 
  			div.html(landGE[d.properties.name] + ":" + dataGE[d.properties.name])
      		.style("left", (d3.event.pageX) + "px")
      		.style("top", (d3.event.pageY -30) + "px");
    	})
      	// mouseout
        .on("mouseout", function() {
    		var sel = d3.select(this);
        	sel.moveToBack();
      		d3.select(this)
      		.transition().duration(300)
      		.style("opacity", 1);
      		div.transition().duration(300)
      		.style("opacity", 0);
    	});
      	
    return function update(data) {
        svg.selectAll('path')
            .data(data, function (d) { return d.name || d.properties.name })
            .style('fill', function (d) { return d.filtered ? '#ddd' : color(d.Global_emissions) })  
    }  
}

