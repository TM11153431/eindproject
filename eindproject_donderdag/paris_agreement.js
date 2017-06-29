/*
[{"x":2000,"y":39.3,"type":"nooit"},{"x":2001,"y":39.8,"type":"nooit"},{"x":2002,"y":41,"type":"nooit"},{"x":2003,"y":42.3,"type":"nooit"},{"x":2004,"y":44.2,"type":"nooit"},{"x":2005,"y":45.3,"type":"nooit"},{"x":2006,"y":46.3,"type":"nooit"},{"x":2007,"y":47.1,"type":"nooit"},{"x":2008,"y":47.6,"type":"nooit"},{"x":2009,"y":47.6,"type":"nooit"},{"x":2010,"y":49.6,"type":"nooit"},{"x":2011,"y":50.9,"type":"nooit"},{"x":2012,"y":51.8,"type":"nooit"},{"x":2013,"y":52.1,"type":"nooit"},{"x":2014,"y":52.5,"type":"nooit"},{"x":2015,"y":52.5,"type":"nooit"},{"x":2016,"y":53.3,"type":"nooit"},{"x":2017,"y":54.4,"type":"nooit"},{"x":2018,"y":54.9,"type":"nooit"},{"x":2019,"y":55.3,"type":"nooit"},{"x":2020,"y":55.7,"type":"nooit"},{"x":2021,"y":56.1,"type":"nooit"},{"x":2022,"y":56.4,"type":"nooit"},{"x":2023,"y":56.7,"type":"nooit"},{"x":2024,"y":57,"type":"nooit"},{"x":2025,"y":57.3,"type":"nooit"},{"x":2026,"y":57.7,"type":"nooit"},{"x":2027,"y":58.1,"type":"nooit"},{"x":2028,"y":58.4,"type":"nooit"},{"x":2029,"y":58.7,"type":"nooit"},{"x":2030,"y":58.9,"type":"nooit"},{"x":2031,"y":59.4,"type":"nooit"},{"x":2032,"y":59.9,"type":"nooit"},{"x":2033,"y":60.4,"type":"nooit"},{"x":2034,"y":60.9,"type":"nooit"},{"x":2035,"y":61.4,"type":"nooit"},{"x":2036,"y":61.9,"type":"nooit"},{"x":2037,"y":62.4,"type":"nooit"},{"x":2038,"y":63,"type":"nooit"},{"x":2039,"y":63.5,"type":"nooit"},{"x":2040,"y":64.1,"type":"nooit"},{"x":2041,"y":64.6,"type":"nooit"},{"x":2042,"y":65.2,"type":"nooit"},{"x":2043,"y":65.7,"type":"nooit"},{"x":2044,"y":66.3,"type":"nooit"},{"x":2045,"y":66.8,"type":"nooit"},{"x":2046,"y":67.4,"type":"nooit"},{"x":2047,"y":68,"type":"nooit"},{"x":2048,"y":68.5,"type":"nooit"},{"x":2049,"y":69.1,"type":"nooit"},{"x":2050,"y":69.7,"type":"nooit"},{"x":2051,"y":70.3,"type":"nooit"},{"x":2052,"y":70.9,"type":"nooit"},{"x":2053,"y":71.5,"type":"nooit"},{"x":2054,"y":72.2,"type":"nooit"},{"x":2055,"y":72.8,"type":"nooit"},{"x":2056,"y":73.4,"type":"nooit"},{"x":2057,"y":74,"type":"nooit"},{"x":2058,"y":74.6,"type":"nooit"},{"x":2059,"y":75.3,"type":"nooit"},{"x":2060,"y":75.9,"type":"nooit"},{"x":2061,"y":76.5,"type":"nooit"},{"x":2062,"y":77.1,"type":"nooit"},{"x":2063,"y":77.7,"type":"nooit"},{"x":2064,"y":78.4,"type":"nooit"},{"x":2065,"y":79,"type":"nooit"},{"x":2066,"y":79.6,"type":"nooit"},{"x":2067,"y":80.2,"type":"nooit"},{"x":2068,"y":80.8,"type":"nooit"},{"x":2069,"y":81.4,"type":"nooit"},{"x":2070,"y":82.1,"type":"nooit"},{"x":2071,"y":82.7,"type":"nooit"},{"x":2072,"y":83.3,"type":"nooit"},{"x":2073,"y":83.9,"type":"nooit"},{"x":2074,"y":84.5,"type":"nooit"},{"x":2075,"y":85.1,"type":"nooit"},{"x":2076,"y":85.8,"type":"nooit"},{"x":2077,"y":86.4,"type":"nooit"},{"x":2078,"y":87,"type":"nooit"},{"x":2079,"y":87.6,"type":"nooit"},{"x":2080,"y":88.2,"type":"nooit"},{"x":2081,"y":88.8,"type":"nooit"},{"x":2082,"y":89.4,"type":"nooit"},{"x":2083,"y":90,"type":"nooit"},{"x":2084,"y":90.6,"type":"nooit"},{"x":2085,"y":91.2,"type":"nooit"},{"x":2086,"y":91.8,"type":"nooit"},{"x":2087,"y":92.4,"type":"nooit"},{"x":2088,"y":93,"type":"nooit"},{"x":2089,"y":93.7,"type":"nooit"},{"x":2090,"y":94.3,"type":"nooit"},{"x":2091,"y":94.9,"type":"nooit"},{"x":2092,"y":95.5,"type":"nooit"},{"x":2093,"y":96.1,"type":"nooit"},{"x":2094,"y":96.7,"type":"nooit"},{"x":2095,"y":97.3,"type":"nooit"},{"x":2096,"y":97.9,"type":"nooit"},{"x":2097,"y":98.5,"type":"nooit"},{"x":2098,"y":99.1,"type":"nooit"},{"x":2099,"y":99.7,"type":"nooit"},{"x":2100,"y":100.3,"type":"nooit"}],


 //LEGEND
 
    

.legend {
	width:10px;
  fill:white;
  stroke:black;
  opacity:0.8;
  }
*/
//************************************************************
// piechart
//************************************************************

$( document ).ready(function() {
	Morris.Donut({
  		element: 'donut',
  		//color: 'green',
 		 data: [
    		{label: "Signed", value: 47},
    		{label: "Ratified", value: 147},
    		{label: "Unsigned", value: 3}
  		],
  		 colors: [
    		'blue',
    		'red',
    		'beige',
  		],
	});
});

//************************************************************
// Data notice the structure
//************************************************************

d3.json("types.json", function(error, data) {
	if (error) throw error;
	var colors = [
		'red',
		'green',
		'steelblue',
		'darkblue',
		'black',
		'black',
		'black',
		'black',
		'black'
	]
	
//************************************************************
// Create Margins and Axis and hook our zoom function
//************************************************************
	var margin = {top: 20, right: 30, bottom: 70, left: 50},
    	width = 700 - margin.left - margin.right,
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
		.tickFormat(d3.format(""))
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
    	.call(xAxis)
    	.append("text")
		.attr("dy", "-.71em")
		.attr("x", (margin.right) + 550)
		.attr("y", margin.left)
		.text('Years');
    	
	svg.append("g")
    	.attr("class", "y axis")
    	.call(yAxis)
		.append("text")
		.attr("transform", "rotate(-90)")
		.attr("y", (-margin.left) + 12)
		.attr("x", (-height)+130)
		.text('Global greenhouse gas emissions');	
 
	svg.append("clipPath")
		.attr("id", "clip")
		.append("rect")
		.attr("width", width)
		.attr("height", height);

//************************************************************
// Create D3 line object and draw data on our SVG object
//************************************************************

	var tooltip = d3.select("#linegraph")
		.append("div")
		.attr('class', 'tooltip')
		.style("position", "absolute")
	    .style("z-index", "10")
		//.style("z-index", "10")
		.style("visibility", "visible")

	var line = d3.svg.line()
    	.interpolate("linear")	
    	.x(function(d) { return x(d.x); })
    	.y(function(d) { return y(d.y); });		
		
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
        	if (d[0].type == "Business as usual") {
        		tooltip.html("If global emissions continue at the so-called business-as-usual level, they could reach 69 gigatons by 2030. In 2100, we will have to deal with fallout ranging from massive refugee crises and submerged cities to scorching heatwaves and drought, scientists say.")
        		return tooltip.style("visibility", "visible");
        	}
        	if (d[0].type == "Below 2°C") {
        		tooltip.html("When the world producing energy is 100% produced by renewables, the gas emissions will reduce to almost 0")
        		return tooltip.style("visibility", "visible");
        	}
        	if (d[0].type == "Paris pledges") {
        		tooltip.html("The goal of the Paris Agreement is to to limit global warming to less than 2ºC and countries have to submit updated carbon reduction plans every five years. Finally a yield of $100 billion per year by 2020 in climate-related financing meant to help poorer countries adapt.")
        		return tooltip.style("visibility", "visible");
        	}
        	if (d[0].type == "Withdraw") {
        		tooltip.html("In a worst case scenario, the US withdrawal could add 0.3ºC to global temperatures by the end of the century.")
        		return tooltip.style("visibility", "visible");
        	}
        	if (d[0].type == "United States") {
        		tooltip.html("<b>United States</b>:"+ "<br>"  + "- Produces 22% of "+ "<span <br><img src='world_bol.png' width='20' height='20'></span>" + " emissions" + "<br>" + "- Has to reduce 2.96 gig CO₂ in 2030")
        		highlight("United States");
        		return tooltip.style("visibility", "visible");
        	}
        	if (d[0].type == "Europe") {
        		tooltip.html("<b>Europe</b>:"+ "<br>"  + "- Produces 11% of "+ "<span <br><img src='world_bol.png' width='20' height='20'></span>" + " emissions" + "<br>" + "- Has to reduce 1.4 gig CO₂ in 2030")
        		highlight("Europe");
        		return tooltip.style("visibility", "visible");
        	}
        	if (d[0].type == "China") {
        		tooltip.html("<b>China</b>:"+ "<br>"  + "- Produces 26% of "+ "<span <br><img src='world_bol.png' width='20' height='20'></span>" + " emissions" + "<br>" + "- Has to reduce 3.45 gig CO₂ in 2030")
        		highlight("China");
        		return tooltip.style("visibility", "visible");
        	}
        	if (d[0].type == "Developed countries") {
        		tooltip.html("<b>Developed countries</b>:"+ "<br>"  + "- Producing 18% of "+ "<span <br><img src='world_bol.png' width='20' height='20'></span>" + " emissions" + "<br>" + "- Has to reduce 2.45 gig CO₂ in 2030")
        		highlight("Developed countries");
        		return tooltip.style("visibility", "visible");
        	}
        	if (d[0].type == "Developing countries") {
        		tooltip.html("<b>Developing countries</b>:"+ "<br>"  + "- Producing 23% of "+ "<span <br><img src='world_bol.png' width='20' height='20'></span>" + " emissions" + "<br>" + "- Has to reduce 3.04 gig CO₂ in 2030")
        		highlight("Developing countries");
        		return tooltip.style("visibility", "visible");
        	}
        	
        })
		.on("mousemove", function(){return tooltip.style("delay", 800).style("top", (event.pageY-60)+"px").style("left",(event.pageX+50)+"px");})
		//DURATION
		.on("mouseout", function(){return tooltip.style("visibility", "hidden");});
		




//************************************************************
// Zoom specific updates
//************************************************************
	
	function zoomed() {
		svg.select(".x.axis").call(xAxis);
		svg.select(".y.axis").call(yAxis);   
		svg.selectAll('path.line').attr('d', line);  
	}     
          
//************************************************************
// Legend
//************************************************************    
   
    
 	var legend = svg.append("g")
		legend.selectAll('rect')
  			.data(data)
  			.enter()
  			.append("rect")
  			.attr("transform", "translate(0, 40)")
  			.attr("x", 30)
  			.attr("y", function(d, i){ return (i-1) *  20;})
  			.attr("width", 7)
  			.attr("height", 7)
  			.style("fill", function(d, i) { 
  				if( colors[i%colors.length] == "red") {
  					return "red";
  				}
  				if( colors[i%colors.length] == "steelblue") {
  					return "steelblue";
  				}
  				if( colors[i%colors.length] == "darkblue") {
  					return "darkblue";
  				}
  				if( colors[i%colors.length] == "green") {
  					return "green";
  				}
  				if( colors[i%colors.length] == "black") {
  					return "white";
  				}
  			})

		legend.selectAll('text')
  			.data(data)
  			.enter()
  			.append("text")
  			.attr("transform", "translate(0, 40)")
  			.attr("x", 40)
  			.attr("width", 30)
  			.attr("height", 40)
  			.attr("y", function(d, i){ return (i-1) *  20 + 8;})
  			.text(function(d, i) { 
  				if(d[i].type == "Business as usual"){
  					var red = "Business as usual";
  					return red;
  				}
  				if(d[i].type == "Paris pledges"){
  					var blue = "Paris pledges";
  					return blue;
  				}
  				if(d[i].type == "Below 2°C"){
  					var green = "No industrie";
  					return green;
  				}
  				if(d[i].type == "Withdraw"){
  					var green = "Withdrawal United States";
  					return green;
  				}
  				
  			});
  		
  		highlight();
  		
  		
  		 //.datum(function(d, i) { console.log(d);return { name: d[i].type, final: d[d.length-1] }; })
    	//.attr("transform", function(d) { 
        //	return ( "translate(" + x(d.final.x) + "," + y(d.final.y) + ")"); })
  		
  		
  		
});


//************************************************************
// Table 1
//************************************************************ 

function highlight (country) {
	$('#demo1').html( '<table cellpadding="0" cellspacing="0" border="0" class="display" id="example1""></table>' );

     var table = $('#example1').DataTable( {
		paging: false,
		select: true,
        "data": dataSet,
        "columns": [	
            { "title": "Contributor" },
            { "title": "Announced '17" },
            { "title": "Signed '17" } 
        ],
        "createdRow": function ( row, data, index ) {
            if ( data[0] == country) {
                $('td', row).addClass('highlight');   
            }   
        }
    });
    $('#example1_info').remove();
    $('#example1_filter').remove();
    $('#example1 tbody').on('click', 'tr', function () {
        var data = table.row( this ).data();
        if(data[0] == "Europe"){
        	countries(europa);
        }
        if(data[0] == "Developed countries"){
        	countries(developed_countries)
        }
        if(data[0] == "Developing countries"){
        	countries(developing_countries)
        }
    	//if(data[0] == "China" || "America"){
        //	$('#demo2').remove();
        //}
    });
 };
 
/*
on mouseover clear .destroy data when onclick
*/
//************************************************************
// Table 2
//************************************************************ 
	
function countries(country) {

//.on('mousemove', function() {return tooltip.style("top", "-380px").style("left", "750px");})

    $('#demo2').html( '<table top:"350" cellpadding="0" cellspacing="0" border="0" class="display" id="example2" height="200px" ></table>' );
     $('#example2').dataTable( {
        scrollY: '50vh',
        scrollCollapse: true,
        paging: false,
        "data": country,
        "columns": [
            { "title": "Contributor" },
            { "title": "Announced '17" },
            { "title": "Signed '17" },
            { "title": "Signed capita", "class": "left" },
            { "title": "GDP capita", "class": "left" }
        ]
    });
    $('#example2_info').remove();
    $('#example2_filter').remove();
    $('div.dataTables_scrollBody').height( 120 );   
};