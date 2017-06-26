
//[{"x":2000,"y":39.3,"type":"nooit"},{"x":2001,"y":39.8,"type":"nooit"},{"x":2002,"y":41,"type":"nooit"},{"x":2003,"y":42.3,"type":"nooit"},{"x":2004,"y":44.2,"type":"nooit"},{"x":2005,"y":45.3,"type":"nooit"},{"x":2006,"y":46.3,"type":"nooit"},{"x":2007,"y":47.1,"type":"nooit"},{"x":2008,"y":47.6,"type":"nooit"},{"x":2009,"y":47.6,"type":"nooit"},{"x":2010,"y":49.6,"type":"nooit"},{"x":2011,"y":50.9,"type":"nooit"},{"x":2012,"y":51.8,"type":"nooit"},{"x":2013,"y":52.1,"type":"nooit"},{"x":2014,"y":52.5,"type":"nooit"},{"x":2015,"y":52.5,"type":"nooit"},{"x":2016,"y":53.3,"type":"nooit"},{"x":2017,"y":54.4,"type":"nooit"},{"x":2018,"y":54.9,"type":"nooit"},{"x":2019,"y":55.3,"type":"nooit"},{"x":2020,"y":55.7,"type":"nooit"},{"x":2021,"y":56.1,"type":"nooit"},{"x":2022,"y":56.4,"type":"nooit"},{"x":2023,"y":56.7,"type":"nooit"},{"x":2024,"y":57,"type":"nooit"},{"x":2025,"y":57.3,"type":"nooit"},{"x":2026,"y":57.7,"type":"nooit"},{"x":2027,"y":58.1,"type":"nooit"},{"x":2028,"y":58.4,"type":"nooit"},{"x":2029,"y":58.7,"type":"nooit"},{"x":2030,"y":58.9,"type":"nooit"},{"x":2031,"y":59.4,"type":"nooit"},{"x":2032,"y":59.9,"type":"nooit"},{"x":2033,"y":60.4,"type":"nooit"},{"x":2034,"y":60.9,"type":"nooit"},{"x":2035,"y":61.4,"type":"nooit"},{"x":2036,"y":61.9,"type":"nooit"},{"x":2037,"y":62.4,"type":"nooit"},{"x":2038,"y":63,"type":"nooit"},{"x":2039,"y":63.5,"type":"nooit"},{"x":2040,"y":64.1,"type":"nooit"},{"x":2041,"y":64.6,"type":"nooit"},{"x":2042,"y":65.2,"type":"nooit"},{"x":2043,"y":65.7,"type":"nooit"},{"x":2044,"y":66.3,"type":"nooit"},{"x":2045,"y":66.8,"type":"nooit"},{"x":2046,"y":67.4,"type":"nooit"},{"x":2047,"y":68,"type":"nooit"},{"x":2048,"y":68.5,"type":"nooit"},{"x":2049,"y":69.1,"type":"nooit"},{"x":2050,"y":69.7,"type":"nooit"},{"x":2051,"y":70.3,"type":"nooit"},{"x":2052,"y":70.9,"type":"nooit"},{"x":2053,"y":71.5,"type":"nooit"},{"x":2054,"y":72.2,"type":"nooit"},{"x":2055,"y":72.8,"type":"nooit"},{"x":2056,"y":73.4,"type":"nooit"},{"x":2057,"y":74,"type":"nooit"},{"x":2058,"y":74.6,"type":"nooit"},{"x":2059,"y":75.3,"type":"nooit"},{"x":2060,"y":75.9,"type":"nooit"},{"x":2061,"y":76.5,"type":"nooit"},{"x":2062,"y":77.1,"type":"nooit"},{"x":2063,"y":77.7,"type":"nooit"},{"x":2064,"y":78.4,"type":"nooit"},{"x":2065,"y":79,"type":"nooit"},{"x":2066,"y":79.6,"type":"nooit"},{"x":2067,"y":80.2,"type":"nooit"},{"x":2068,"y":80.8,"type":"nooit"},{"x":2069,"y":81.4,"type":"nooit"},{"x":2070,"y":82.1,"type":"nooit"},{"x":2071,"y":82.7,"type":"nooit"},{"x":2072,"y":83.3,"type":"nooit"},{"x":2073,"y":83.9,"type":"nooit"},{"x":2074,"y":84.5,"type":"nooit"},{"x":2075,"y":85.1,"type":"nooit"},{"x":2076,"y":85.8,"type":"nooit"},{"x":2077,"y":86.4,"type":"nooit"},{"x":2078,"y":87,"type":"nooit"},{"x":2079,"y":87.6,"type":"nooit"},{"x":2080,"y":88.2,"type":"nooit"},{"x":2081,"y":88.8,"type":"nooit"},{"x":2082,"y":89.4,"type":"nooit"},{"x":2083,"y":90,"type":"nooit"},{"x":2084,"y":90.6,"type":"nooit"},{"x":2085,"y":91.2,"type":"nooit"},{"x":2086,"y":91.8,"type":"nooit"},{"x":2087,"y":92.4,"type":"nooit"},{"x":2088,"y":93,"type":"nooit"},{"x":2089,"y":93.7,"type":"nooit"},{"x":2090,"y":94.3,"type":"nooit"},{"x":2091,"y":94.9,"type":"nooit"},{"x":2092,"y":95.5,"type":"nooit"},{"x":2093,"y":96.1,"type":"nooit"},{"x":2094,"y":96.7,"type":"nooit"},{"x":2095,"y":97.3,"type":"nooit"},{"x":2096,"y":97.9,"type":"nooit"},{"x":2097,"y":98.5,"type":"nooit"},{"x":2098,"y":99.1,"type":"nooit"},{"x":2099,"y":99.7,"type":"nooit"},{"x":2100,"y":100.3,"type":"nooit"}],

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
		'black',
		'black',
		'black',
		'black',
		'black'
	]
	
//************************************************************
// Create Margins and Axis and hook our zoom function
//************************************************************
	var margin = {top: 20, right: 30, bottom: 50, left: 50},
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
		
		
		/*
		    svg.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + innerheight + ")") 
                .call(x_axis)
                .append("text")
                .attr("dy", "-.71em")
                .attr("x", innerwidth)
                .style("text-anchor", "end")
                .text(xlabel) ;
            
            svg.append("g")
                .attr("class", "y axis")
                .call(y_axis)
                .append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 6)
                .attr("dy", "0.71em")
                .style("text-anchor", "end")
                .text(ylabel) ;
		*/
//************************************************************
// Create D3 line object and draw data on our SVG object
//************************************************************

	var tooltip = d3.select("#linegraph")
		.append("div")
		.attr('class', 'tippie')
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


		.append("text")
    	.datum(function(d, i) { return { name: d[i].type, final: d[d.length-1] }; })
    	.attr("transform", function(d) { 
        	return ( "translate(" + x(d.final.x) + "," + y(d.final.y) + ")"); })
        .attr("x", 3)
        .attr("dy", ".35em")
        .text(function(d) { return d.name ; }) ;


	

/*
 //LEGEND
 
     	.append("text")
    	.datum(function(d) { return d[100].type, d[100].x, d[100].y; })
        .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
      	.attr("x", 3)
      	.attr("dy", ".35em")
      	.text(function(d) { return d.type; });
 
*/
 
/*
        .on('mouseover', function(d) { 
        	if (d[0].type == "No_change") {
        		tooltip.text("If we will continue without a Paris Agreement President Trump will withdraw the United States from the Paris climate accord, which is aimed at sharply cutting the world’s greenhouse gas emissions. If global emissions continue at the so-called business-as-usual level, they could reach 69 gigatons by 2030.")
        		return tooltip.style("visibility", "visible");
        	}
        	if (d[0].type == "No_industrie") {
        		tooltip.text("The overall goal of the agreement is to limit global warming to less than 2ºC. Most of the current pledges do not go beyond 2030. Longer term pledges, which countries will submit periodically, will need to be stronger to reach the goal.")
        		return tooltip.style("visibility", "visible");
        	}
        	if (d[0].type == "Paris_agreement") {
        		tooltip.text("In 2015, nearly 200 countries signed the Paris agreement and set individual targets to reduce emissions. Those pledges would reduce global emissions to 56 gigatons in 2030.")
        		return tooltip.style("visibility", "visible");
        	}
        	if (d[0].type == "nooit") {
        		tooltip.text("nooit")
        		return tooltip.style("visibility", "visible");
        	}
        	if (d[0].type == "America") {
        		tooltip.text("America")
        		highlight("America");
        		return tooltip.style("visibility", "visible");
        	}
        	if (d[0].type == "Europa") {
        		tooltip.text("Europa")
        		highlight("Europa");
        		return tooltip.style("visibility", "visible");
        	}
        	if (d[0].type == "China") {
        		tooltip.text("China")
        		highlight("China");
        		return tooltip.style("visibility", "visible");
        	}
        	if (d[0].type == "Developed countries") {
        		tooltip.text("Developed countries")
        		highlight("Developed countries");
        		return tooltip.style("visibility", "visible");
        	}
        	
        })
		.on("mousemove", function(){return tooltip.style("delay", 800).style("top", (event.pageY-60)+"px").style("left",(event.pageX+50)+"px");})
		//DURATION
		.on("mouseout", function(){return tooltip.style("visibility", "hidden");});
		
*/
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
	

	var svg2 = d3.select("#legend")
    	.append("svg")
    	.attr("width", 80)
    	.attr("height", 20*data.length);
            
    
 	var legend = svg2.append("g")
        .attr("class", "legend1")
        .attr('transform', 'translate(-20,70)') 


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
  		.attr("width", 30)
  		.attr("height", 10)
  		.attr("y", function(d, i){ return (i-1) *  20 + 5;})
  		.text(function(d, i) {
    		var text = colors[i%colors.length];
    		return text;
  		});
  		highlight();
});

//************************************************************
// Data for table
//************************************************************  

    var europa = [
        ['Sweden','581','581','59.31','59','6'],
        ['Luxembourg','46.8','33.4','58.63','111','21'],
        ['Norway','258','581','50.20','97','9'],
        ['Monaco','108','1.08','28.89','163','-'],
        ['United Kingdom','1211','1211','18.77','46','7'],
        ['France','1035','1035','15.64','43','5'],
        ['Denmark','71.8','71.80','12.73','48','7'],
        ['Germany','1003','1003','12.21','48','9'],
        ['Sweden','581','581','59.31','59','6'],
        ['Switzerland','100','100','12.21','59','6'],  
        ['Finland','107','46.4','8.49','50','10'], 
        ['Netherlands','134','134','7.94','52','10'],
        ['Belgium','66.9','66.9','6.18','48','9'],
        ['Italy','334','268','4.54','35','7'],
        ['Austria','34.8','34.8','4.09','51','8'],  
        ['Spain','161','161','3.46','30','6'],        
        ['Iceland','1','0.50','1.55','52','6'],
        ['Liechtenstein','<0.1','<0.1','1.48','135','1'],
        ['Estonia','1.30','1.3','0.99','20','14'],
        ['Poland','0.11','0.11','<0.01','4','2'],
        ['Romania','0.10','0.10','0.01','10','4'],
        ['Czech Republic','5.32','5.32','0.57','20','10'],
        ['Hungary','4.30','4.30','0.43','14','5'],     
        ['Latvia','0.47','0.47','0.24','16','4'],
        ['Lithuania','0.10','0.10','59.31','59','6'],
        ['Bulgaria','0.10','0.10','0.02','8','7'], 
        ['Ireland','2.70','-','0','53','8'],
        ['Portugal','2.68','-','0','22','5'],
        ['Cyprus','0.50','-','0','27','7']
    ];
        
    var developed_countries = [
        ['Japan','1500','1500','11.80','36','9'],
        ['Australia','187','187','7.92','62','17'],
        ['Canada','277','277','7.79','50','14'],
        ['Republic of Korea','100','100','1.99','28','12']
	];

    var developing_countries = [
        ['Panama','1','1','0.25','12','3'],
        ['Peru','6','-','0','2'],
        ['Vietnam','0.10','-','0','2','2'],
        ['Indonesia','0.25','0.25','<0.01','4','2'],
        ['Colombia','6','0.30','<0.01','8','2'],
        ['New Zealand','2.56','2.56','0.57','20','10'],
        ['Mexico','10','10','0.08','10','4'],
        ['Mongolia','<0.1','-','0','4','7'],
        ['Chile','0.30','0.30','0.02','15','5']
 
    ];
    
    var dataSet = [
        ['China','46.8','33.4'],
        ['Europa','5852','5500'],
        ['America','3000','3000'],
        ['Developed countries','2064','2064'],
        ['Developing countries','26.31','14.41']
    ];


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
            { "title": "Announced" },
            { "title": "Signed" } 
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
        if(data[0] == "Europa"){
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
            { "title": "Announced" },
            { "title": "Signed" },
            { "title": "Signed capita", "class": "left" },
            { "title": "GDP capita", "class": "left" }
        ]
    });
    $('#example2_info').remove();
    $('#example2_filter').remove();
    $('div.dataTables_scrollBody').height( 120 );   
};







