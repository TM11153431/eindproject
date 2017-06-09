https://bellebruinsma.github.io/eindproject/week1/avond.html



# eindproject


•	a diagram of modules, classes and functions that you’ve decided to implement, in appropriate detail

Op de eerste pagina wil ik een LineGraph maken met voorspellingen tot 2100 wat er staat te gebeuren met de “Global greenhouse gas emissions” als iedereen zo doorgaat, als het streven van het Paris Agreement wordt gehaald en wanneer er helemaal niks gebeurt op de aarde. Ook is te zien wat het aandeel van US, EU, China, developed en developing countries is. Er is dus duidelijk te zien hoe groot het aandeel van Amerika is en ik kan daarnaast uitleggen wat er zou kunnen gebeuren nu Amerika het Agreement heeft opgezegd.

Op de tweede pagina ga ik een wereld kaart laten zien met drie verschillende kleuren die duidelijk maken of zij hebben “signed”, “signed & ratified” en “unsigned”. Ook is per land te zien wat het aandeel in percentage emissions is ten opzichte van de wereld. Wanneer je op een land drukt is daaronder vanaf 1990 tot 2015 te zien elk land doet aan “Share of wind and solar in electricity production (%)” en “Share of renewables in electricity production (incl hydro) (%)”. Deze twee kan je omwisselen via een checkbox.

•	advanced sketches of your UI that clearly explain which features are connected to which underlying part of the code

(1.JPG)
(2.JPG)

•	a list of APIs and frameworks or plugins that you will be using to provide functionality in your app
•	a list of data sources if you will get data from an external source
-	  	<script src="//rawgit.com/Caged/d3tip/master/index.js"></script>
-	 	<script src="jquery.js"></script>
-		<script src="bootstrap.js"></script>
-		<script src="d3.v4.min.js"></script>
-		<script src="later.js"></script>
•	a list of database tables and fields (and their types) if you will use a database

Database 1:
Land = country
Global_emissions = percentage viezigheid ten opzichte van rest van de wereld
Status = Signed, Signed & Ratified, Unsigned

Database 2:
Share of renewables in electricity production (incl hydro) (%)
Voor 62 verschillende landen vanaf 1990 tot 2015

Database 3:
Share of wind and solar in electricity production (%)
Voor 62 verschillende landen vanaf 1990 tot 2015

Database 4:
Mitigation of CO2eq from Ref
Voor China, US, EU, developed countries, developing countries
Vanaf 2000 tot 2100
