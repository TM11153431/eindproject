/*
	student: Belle Bruinsma
	student number: 10676759
	datum: 29 juni 2017
	vak: eindproject programmeren 
*/

// log variabele
var superscript = "⁰¹²³⁴⁵⁶⁷⁸⁹",
    formatPower = function(d) { return (d + "").split("").map(function(c) { return superscript[c]; }) }

// set dimensions
var margin = { top: 10, right: 15, bottom: 60, left: 75 }
var width = 480 - margin.left - margin.right
var height = 350 - margin.top - margin.bottom

// x for the month signed data
var x = d3.scaleTime()
	.range([0,width]);

// x for the global emissions in log.
var x2 = d3.scaleLog()
    .base(Math.E)
    .range([0, width])

var y = d3.scaleLinear()
    .range([height, 0])

// xAxis for the month signed data
var xAxis = d3.axisBottom()
    .scale(x)
    .tickFormat(d3.timeFormat("%b '%y"))

// xAxis for the global emissions in log.
var x2Axis = d3.axisBottom()
    .scale(x2)
    .tickFormat(function(d) { return "e" + formatPower(Math.round(Math.log(d))); });

var yAxis = d3.axisLeft()
    .scale(y)
    .tickFormat(function(d) { return d; });

// load the files
d3.queue()
    .defer(d3.csv, 'alles_dinsdag1.csv')
    .defer(d3.json, 'world.json')
    .awaitAll(initialize)
    
var color = d3.scaleThreshold()
	.domain([20, 40, 60, 80])
	.range(['#ccece6', '#99d8c9', '#66c2a4', '#41ae76', '#238b45', '#005824'])
	
function initialize(error, results) {
    if (error) { throw error }
    
    // data = Land, Global_emissions, Renewables, Signed1, Month
    var data = results[0]
    
    // format the data
  	data.forEach(function(d) {
  		var time = new Date();
      	time.setMonth(d.Signed1 - 5);
      	d.Signed1 = time;
    });

    // features = data worldmap
    var features = results[1].features

    // dropdown menu
    d3.select('#dropdown')
		.on("change", function() {
			var sect = document.getElementById("dropdown");
			var section = sect.options[sect.selectedIndex].value;
			// calls the updater function to update data after dropdown is clicked
			updater(onBrush, section, results);
		});
	
	var components = [choropleth(features, data), scatterplot(onBrush, "Signed1") ]

	// update the components
    function update() {
        components.forEach(function (component) { component(data) })
    }
    
	// onBrush function to select  
    function onBrush(x0, x1, y0, y1, section) {
        var clear = x0 === x1 || y0 === y1
        data.forEach(function (d) {
            d.filtered = clear ? false
                : d.Signed1 < x0 || d.Signed1 > x1 || d.Renewables < y0 || d.Renewables > y1
        })
        update()
    }
    update()
}

// function when dropdown menu is clicked
function updater(onBrush, section, results) {
	
	// remove scatterplot when dropdown is selected
	var scatter = d3.select("#scatterplot");
    scatter.select("svg").remove();

	// data = Land, Global_emissions, Renewables, Signed1, Month	
    var data = results[0]

	// world map
    var features = results[1].features
    
    var components = [ choropleth(features, data), scatterplot(onBrush, section) ]
    
    // update the components
    function update() {
        components.forEach(function (component) { component(data) })
    }
    
	// onBrush function to select  
    function onBrush(x0, x1, y0, y1, section) {
        var clear = x0 === x1 || y0 === y1
        data.forEach(function (d) {
            d.filtered = clear ? false
                : d[selVar] < x0 || d[selVar] > x1 || d.Renewables < y0 || d.Renewables > y1
        })
        update()
    }
    update()
}

function scatterplot(onBrush, section) {

	// x, x-as, Xaxis for the data when Month Signed is selected in dropdown
	if(section == "Signed1"){
		curX = x;
		curXAxis = xAxis;
    	selVar = "Signed1";
    	asName = "Signed"
    }

	// x, x-as, Xaxis for the data when Month Signed is selected in dropdown
	else {
		curX = x2;
		curXAxis = x2Axis;
    	selVar = "Global_emissions";
    	asName = "Log. global emissions of the world"
    };
    
	// define brush function use the onBrush
    var brush = d3.brush()
        .extent([[0, 0], [width, height]])
        .on('start brush', function () {
            var selection = d3.event.selection
            var x0 = curX.invert(selection[0][0])
            var x1 = curX.invert(selection[1][0])
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
        .attr('transform', 'translate(0,' + height + ')');
    var gy = svg.append('g')
        .attr('class', 'y axis');

	// x-as
    svg.append('text')
        .attr('x', 390)
        .attr('y', 330)
        .attr('class', 'x as')
        .style('text-anchor', 'end')
        .style('fill', '#000')
        .style('font-weight', 'bold')
        .style('font-size', '12px') 
        .text(asName);
    svg.append('text')
        .attr('x', 0)
        .attr('y', -30)
        .attr('transform', 'rotate(-90)')
        .style('text-anchor', 'end')
        .style('fill', '#000')
        .style('font-weight', 'bold')
        .style('font-size', '12px') 
        .text('% renewable energy');
    svg.append('g')
        .attr('class', 'brush')
        .call(brush);
	
	// update the data
    return function update(data) {
    	if(section == "Signed1"){
        	x.domain(d3.extent(data, function (d) { return d[section]}))
        }
        else{
        	x2.domain([Math.exp(-5), Math.exp(4)])
        }
        y.domain(d3.extent(data, function (d) {  return d.Renewables }))
    
    // x-as thicks
    gx.call(curXAxis)
    	.selectAll("text")
        .attr("dx", "-1em")
        .attr("dy", "-.1em")
        .attr("transform", "rotate(-45)")
        .style('font-size', '12px') 
        .style("text-anchor", "end")
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
        .attr('cx', function (d) { return curX(d[section])  })
        .attr('cy', function (d) { return y(d.Renewables) })
        .style('fill', function (d) { return color(d.Renewables) })
        .style('opacity', function (d) { return d.filtered ? 0.5 : 1 })
        .style('stroke-width', function (d) { return d.filtered ? 1 : 2 })
    }
}

function choropleth(features, data) {

	// remove choropleth when dropdown is selected
	var choro = d3.select("#choropleth");
    choro.select("svg").remove();

	// creates tooltip 
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
  				div.html(d.Land + ":" + "<span <br><img src='renewable.png' width='20' height='20'></span>" + d.Renewables + "%" )
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
            .style('fill', function (d) { return d.filtered ? '#ddd' : color(d.Renewables) })  
    }  
}