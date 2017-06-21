/*
	student: Belle Bruinsma
	student number: 10676759
	datum: 13 juni 2017

*/
// set dimensions
    var margin = { top: 10, right: 15, bottom: 40, left: 75 }
    var width = 480 - margin.left - margin.right
    var height = 350 - margin.top - margin.bottom
    
	// define x and y as
    var x = d3.scaleLinear()
        .range([0, width])
    var y = d3.scaleLinear()
        .range([height, 0])
        
    console.log(y)
        
    // define axis
    var xAxis = d3.axisBottom()
        .scale(x)
        .tickFormat(d3.format('.2s'))
    var yAxis = d3.axisLeft()
        .scale(y)
        .tickFormat(function(d) { return d; });

// load the files
d3.queue()

    .defer(d3.csv, 'alles_dinsdag.csv')
    .defer(d3.csv, 'hp_index.csv')
    .defer(d3.csv, 'hpi_dollars.csv')

    .defer(d3.json, 'world.json')
    .awaitAll(initialize)
    
var color = d3.scaleThreshold()
	.domain([20, 40, 60])
	.range(['#f20606', '#ffa900', '#f0ff00', '#47df23'])
	
	
function initialize(error, results) {
    if (error) { throw error }
    
    // Land, Global_emissions, Status, Renewables
    var data = results[0]
	
	// Country, EcologicalFoot, HPI, InequalityOut, LifeEx, Wellbeing
    var data1 = results[1]
    
    // Country, Dollars, HPI
    var data2 = results[2]
    
    // data worldmap
    var features = results[3].features

     
    d3.select('#dropdown')
		.on("change", function() {
				var sect = document.getElementById("dropdown");
				var section = sect.options[sect.selectedIndex].value;
				updater(onBrush, section, results);

		});

	var components = [ choropleth(features, data), scatterplot(onBrush, "LifeEx") ]

    function update() {
        components.forEach(function (component) { component(data) })
    }
    
	// onBrush function to select  
    function onBrush(x0, x1, y0, y1, section) {
        var clear = x0 === x1 || y0 === y1
        data.forEach(function (d) {
            d.filtered = clear ? false
                : d.LifeEx < x0 || d.LifeEx > x1 || d.renewables < y0 || d.renewables > y1
        })
        update()
    }
    update()
}
function updater(onBrush, section, results) {
	console.log(section);
	var scatter = d3.select("#scatterplot");
    scatter.select("svg").remove();
    
    
    var data = results[0]
	
	// Country, EcologicalFoot, HPI, InequalityOut, LifeEx, Wellbeing
    var data1 = results[1]
    
    // Country, Dollars, HPI
    var data2 = results[2]
    var features = results[3].features
    var components = [ choropleth(features, data), scatterplot(onBrush, section) ]
    function update() {
        components.forEach(function (component) { component(data) })
    }
    
	// onBrush function to select  
    function onBrush(x0, x1, y0, y1, section) {
        var clear = x0 === x1 || y0 === y1
        data.forEach(function (d) {
            d.filtered = clear ? false
                : d.LifeEx < x0 || d.LifeEx > x1 || d.renewables < y0 || d.renewables > y1
        })
        update()
    }
    update()
}

function scatterplot(onBrush, section) {
    
	// define brush function use the onBrush
    var brush = d3.brush()
        .extent([[0, 0], [width, height]])
        .on('start brush', function () {
            var selection = d3.event.selection

            var x0 = x.invert(selection[0][0])
            var x1 = x.invert(selection[1][0])
            var y0 = y.invert(selection[1][1])
            var y1 = y.invert(selection[0][1])

            onBrush(x0, x1, y0, y1)
        })
        
	// append svg to page
    var svg = d3.select('#scatterplot')
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

    var bg = svg.append('g')
    var gx = svg.append('g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(0,' + height + ')')
    var gy = svg.append('g')
        .attr('class', 'y axis')

    gx.append('text')
        .attr('x', width)
        .attr('y', 35)
        .style('text-anchor', 'end')
        .style('fill', '#000')
        .style('font-weight', 'bold')
        .text('Gross Domestic Product')
    gy.append('text')
        .attr('transform', 'rotate(-90)')
        .attr('x', 0)
        .attr('y', -40)
        .style('text-anchor', 'end')
        .style('fill', '#000')
        .style('font-weight', 'bold')
        .text('Happy Planet Index')
    svg.append('g')
        .attr('class', 'brush')
        .call(brush)
	
	// update the data
    return function update(data) {
        x.domain(d3.extent(data, function (d) {   return d[section]}))
        y.domain(d3.extent(data, function (d) {  return d.renewables }))

        gx.call(xAxis)
        gy.call(yAxis)

	// fill the backround with color 
    var bgRect = bg.selectAll('rect')
        .data(d3.pairs(d3.merge([[y.domain()[0]], color.domain(), [y.domain()[1]]])))
    bgRect.exit().remove()
    bgRect.enter().append('rect')
        .attr('x', 0)
        .attr('width', width)
        .merge(bgRect)
        .attr('y', function (d) { return y(d[1]) })
        .attr('height', function (d) { return y(d[0]) - y(d[1]) })
        .style('fill', function (d) { return color(d[0]) })
        
    // fill scatterplot with colored dots
    var circle = svg.selectAll('circle')
        .data(data, function (d) { return d.id })
    circle.exit().remove()
    circle.enter().append('circle')
        .attr('r', 4)
        .style('stroke', '#fff')
        .merge(circle)
        .attr('cx', function (d) { return x(d[section])  })
        .attr('cy', function (d) { return y(d.renewables) })
        .style('fill', function (d) { return color(d.renewables) })
        .style('opacity', function (d) { return d.filtered ? 0.5 : 1 })
        .style('stroke-width', function (d) { return d.filtered ? 1 : 2 })
    }

}

function choropleth(features, data) {

	var choro = d3.select("#choropleth");
    choro.select("svg").remove();

	//Creates tooltip and makes it invisiblae
	var div = d3.select("body").append("div")
  		.attr("class", "tooltip")
  		.style("opacity", 0);

	// set dimensions
    var width = 550
    var height = 550

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
	//var dataRE = {};
  	//data.forEach(function(d) { dataRE[d.Land] = +d.renewables; });
  	
  	// pair state name with state id
  	// var landGE = {};
  	// data.forEach(function(d) { landGE[d.Land] = d.Land; });
  	
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
  			div.html(d.Land + ":" + d.renewables)
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
            .data(data, function (d) { return d.Land || d.properties.name })
            .style('fill', function (d) { return d.filtered ? '#ddd' : color(d.renewables) })  
    }  
}