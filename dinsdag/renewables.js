/*
	Student: Belle Bruinsma
	Student number: 10676759
	Datum: 26 juni 2017

*/

// China en US liggen buiten de kaart wat moet ik doen. 
// xas plaatsen
// x as roteren



// set dimensions
var margin = { top: 10, right: 15, bottom: 60, left: 75 }
var width = 480 - margin.left - margin.right
var height = 350 - margin.top - margin.bottom

var x = d3.scaleTime()
	.range([0,width]);

var x2 = d3.scaleLinear()
    .range([0, width])
var y = d3.scaleLinear()
    .range([height, 0])

var xAxis = d3.axisBottom()
    .scale(x)
    .tickFormat(d3.timeFormat("%b '%y"))
var x2Axis = d3.axisBottom()
    .scale(x2)
    .tickFormat(d3.format(""))
var yAxis = d3.axisLeft()
    .scale(y)
    .tickFormat(function(d) { return d; });

// load the files
d3.queue()
    .defer(d3.csv, 'alles_dinsdag.csv')
    .defer(d3.json, 'world.json')
    .awaitAll(initialize)
    
var color = d3.scaleThreshold()
	.domain([20, 40, 60, 80])
	.range(['#ccece6', '#99d8c9', '#66c2a4', '#41ae76', '#238b45', '#005824'])
	
function initialize(error, results) {
    if (error) { throw error }
    
    // data = Land, Global_emissions, Status, Renewables
    var data = results[0]
    
    // format the data
  	data.forEach(function(d) {
  		var time = new Date();
      	time.setMonth(d.Signed1 - 5);
      	d.Signed1 = time;
    });

    // features = data worldmap
    var features = results[1].features

    // dropdown menue 
    d3.select('#dropdown')
		.on("change", function() {
			var sect = document.getElementById("dropdown");
			var section = sect.options[sect.selectedIndex].value;
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
                : d.Signed1 < x0 || d.Signed1 > x1 || d.renewables < y0 || d.renewables > y1
        })
        update()
    }
    update()
}



// hier nog even naar kijken
function updater(onBrush, section, results) {

	//console.log(section);
	var scatter = d3.select("#scatterplot");
    scatter.select("svg").remove();

 	
    var data = results[0]

    var features = results[1].features
    
    var components = [ choropleth(features, data), scatterplot(onBrush, section) ]
    function update() {
        components.forEach(function (component) { component(data) })
    }
    
	// onBrush function to select  
    function onBrush(x0, x1, y0, y1, section) {
    
        var clear = x0 === x1 || y0 === y1
        data.forEach(function (d) {
  
            d.filtered = clear ? false
                : d[selVar] < x0 || d[selVar] > x1 || d.renewables < y0 || d.renewables > y1
        })
        update()
    }
    update()

}


function scatterplot(onBrush, section) {

	//console.log(section)
	if(section == "Signed1"){
		curX = x;
		curXAxis = xAxis;
    	selVar = "Signed1";
    	asName = "Month signed"
    }

	else if(section == "Global_emissions"){
		curX = x2;
		curXAxis = x2Axis;
    	selVar = "Global_emissions";
    	asName = "% Global emissions of the world"
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
        .attr('transform', 'translate(0,' + height + ')')

    var gy = svg.append('g')
        .attr('class', 'y axis')

    gx.append('text')
    	
        .attr('x', 10)
        .attr('y', 50)
        .style('text-anchor', 'end')
        .style('fill', '#000')
        .style('font-weight', 'bold')
        .attr('transform', 'rotate(-90)')
        .text(asName)
    gy.append('text')
        .attr('transform', 'rotate(-90)')
        .attr('x', 0)
        .attr('y', -40)
        .style('text-anchor', 'end')
        .style('fill', '#000')
        .style('font-weight', 'bold')
        .text('% renewable energy')
    svg.append('g')
        .attr('class', 'brush')
        .call(brush)
	
	// update the data
    return function update(data) {
        curX.domain(d3.extent(data, function (d) {   return d[section]}))
        y.domain(d3.extent(data, function (d) {  return d.renewables }))

        gx.call(curXAxis)
    	.selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", "-.55em")
        .attr("transform", "rotate(-90)" )
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
        .attr('cy', function (d) { return y(d.renewables) })
        .style('fill', function (d) { return color(d.renewables) })
        .style('opacity', function (d) { return d.filtered ? 0.5 : 1 })
        .style('stroke-width', function (d) { return d.filtered ? 1 : 2 })
    }
}

function choropleth(features, data) {

	// don't print choropleth again when checkbox is used
	var choro = d3.select("#choropleth");
    choro.select("svg").remove();

	// creates tooltip and makes it invisiblae
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
  				div.html(d.Land + ":" + "<span <br><img src='renewable.png' width='20' height='20'></span>" +d.renewables)
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