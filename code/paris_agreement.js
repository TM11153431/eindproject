/*
	student: Belle Bruinsma
	student number: 10676759
	datum: 29 juni 2017
	vak: eindproject programmeren 
*/

// donut with countries that signed, unsigned and ratified
$( document ).ready(function() {
	Morris.Donut({
  		element: 'donut',
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

// load the data and give them a color
d3.json("/eindproject/data/types.json", function(error, data) {
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
	];
	
	// create margins and Axis and hook the zoom function
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
	
	// generate the svg object
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

	// creates tooltip
	var tooltip = d3.select("#linegraph")
		.append("div")
		.attr('class', 'tooltip')
		.style("position", "absolute")
	    .style("z-index", "10")
		.style("visibility", "visible")

	// creates d3 line object and draw data on the svg object	
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
        	// calls the function that returns information that corresponds to the line where you're mouse is on
        	tooltext(d[0].type, tooltip)
        })
		.on("mousemove", function(){return tooltip.style("delay", 800).style("top", (event.pageY-60)+"px").style("left",(event.pageX+50)+"px");})
		
	// zoom specific updates
	function zoomed() {
		svg.select(".x.axis").call(xAxis);
		svg.select(".y.axis").call(yAxis);   
		svg.selectAll('path.line').attr('d', line);  
	}     
     
    // call the legend function     
    legend(svg, data, colors);
  			
  	// call the table function
  	table_1(); 			
});

function legend(svg, data, colors) {
 
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
  				// return the function who select the colors for the legend
  				return legend_color(colors[i%colors.length]);
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
  			.text(function(d) { 
  				// return the function who select the text for the legend
  				return legend_text(d[0].type);
  			});
}

// function that returns the information that corresponds to every line in linegraph
function tooltext(type, tooltip){
    if (type == "Business as usual") {
        tooltip.html("If global emissions continue at the so-called business-as-usual level, they could reach 69 gigatons by 2030. In 2100, we will have to deal with fallout ranging from massive refugee crises and submerged cities to scorching heatwaves and drought, scientists say.")
        return tooltip.style("visibility", "visible");
    }
    if (type == "Below 2°C") {
        tooltip.html("When the world producing energy is 100% produced by renewables, the gas emissions will reduce to almost 0")
        return tooltip.style("visibility", "visible");
    }
    if (type == "Paris pledges") {
        tooltip.html("The goal of the Paris Agreement is to to limit global warming to less than 2ºC and countries have to submit updated carbon reduction plans every five years. Finally a yield of $100 billion per year by 2020 in climate-related financing meant to help poorer countries adapt.")
        return tooltip.style("visibility", "visible");
    }
	if (type == "Withdraw") {
        tooltip.html("In a worst case scenario, the US withdrawal could add 0.3ºC to global temperatures by the end of the century.")
        return tooltip.style("visibility", "visible");
    }
    if (type == "United States") {
        tooltip.html("<b>United States</b>:"+ "<br>"  + "- Produces 22% of "+ "<span <br><img src='/eindproject/picture/world_bol.png' width='20' height='20'></span>" + " emissions" + "<br>" + "- Has to reduce 2.96 gig CO₂ in 2030")
        table_1("United States");
        return tooltip.style("visibility", "visible");
    }
    if (type == "Europe") {
        tooltip.html("<b>Europe</b>:"+ "<br>"  + "- Produces 11% of "+ "<span <br><img src='/eindproject/picture/world_bol.png' width='20' height='20'></span>" + " emissions" + "<br>" + "- Has to reduce 1.4 gig CO₂ in 2030")
        table_1("Europe");
        return tooltip.style("visibility", "visible");
    }
    if (type == "China") {
        tooltip.html("<b>China</b>:"+ "<br>"  + "- Produces 26% of "+ "<span <br><img src='/eindproject/picture/world_bol.png' width='20' height='20'></span>" + " emissions" + "<br>" + "- Has to reduce 3.45 gig CO₂ in 2030")
        table_1("China");
        return tooltip.style("visibility", "visible");
    }
    if (type == "Developed countries") {
        tooltip.html("<b>Developed countries</b>:"+ "<br>"  + "- Producing 18% of "+ "<span <br><img src='/eindproject/picture/world_bol.png' width='20' height='20'></span>" + " emissions" + "<br>" + "- Has to reduce 2.45 gig CO₂ in 2030")
        table_1("Developed countries");
        return tooltip.style("visibility", "visible");
    }
    if (type == "Developing countries") {
        tooltip.html("<b>Developing countries</b>:"+ "<br>"  + "- Producing 23% of "+ "<span <br><img src='/eindproject/picture/world_bol.png' width='20' height='20'></span>" + " emissions" + "<br>" + "- Has to reduce 3.04 gig CO₂ in 2030")
        table_1("Developing countries");
        return tooltip.style("visibility", "visible");
    }
};

function legend_color(type) {
  	if( type == "red") {
  		return "red";
	}
  	if( type == "steelblue") {
  		return "steelblue";
  	}
  	if( type == "darkblue") {
  		return "darkblue";
  	}
  	if( type == "green") {
  		return "green";
  	}
  	if( type == "black") {
  		return "white";
  	}
};

function legend_text(type){
	if(type == "Business as usual"){
  		return "Business as usual";
  	}
  	if(type == "Paris pledges"){
  		return "Paris pledges";
  	}
  	if(type == "Below 2°C"){
  		return "No industrie";
  	}
  	if(type == "Withdraw"){
  		return "Withdrawal United States";
  	}
};

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
		['United States','$3000','$3000'],
        ['China','$46.8','$33.4'],
        ['Europe','$5852','$5500'],
        ['Developed countries','$2064','$2064'],
        ['Developing countries','$26.31','$14.41']
];

function table_1(country) {
	$('#demo1').html( '<table cellpadding="0" cellspacing="0" border="0" class="display" id="example1""></table>' );
     var table = $('#example1').DataTable( {
		paging: false,
		select: true,
        "data": "dataSet,
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
    $('#example1 tbody').on('click', 'tr', function () {
        var data = table.row( this ).data();
        if(data[0] == "Europe"){
        	table_2(europa);
        }
        if(data[0] == "Developed countries"){
        	table_2(developed_countries)
        }
        if(data[0] == "Developing countries"){
        	table_2(developing_countries)
        }
    });
    $('#example1_info').remove();
    $('#example1_filter').remove();
};
	
function table_2(country) {
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