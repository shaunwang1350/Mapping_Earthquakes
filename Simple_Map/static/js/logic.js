// Add console.log to check to see if our code is working.
// We create the tile layer that will be the background of our map.
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
});

let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
});

let baseMaps = {
	"Satellite Streets" : satelliteStreets,
	// Street: streets,
	"Dark": dark
}

let map = L.map('mapid', {
	center: [43.7, -79.3],
	zoom: 11,
	layers: [dark]
})

// let map = L.map('mapid').setView([30, 30], 2);
// let map = L.map('mapid').setView([37.5, -122.5], 10);
// let map = L.map('mapid').setView([37.6213, -122.3790], 5);
// let map = L.map('mapid').setView([40.7,-94.5], 4);
// let map = L.map("mapid", {center: [40.7,-94.5],zoom:4});

L.control.layers(baseMaps).addTo(map);

let sanFranAirport =
{"type":"FeatureCollection","features":[{
    "type":"Feature",
    "properties":{
        "id":"3469",
        "name":"San Francisco International Airport",
        "city":"San Francisco",
        "country":"United States",
        "faa":"SFO",
        "icao":"KSFO",
        "alt":"13",
        "tz-offset":"-8",
        "dst":"A",
        "tz":"America/Los_Angeles"},
        "geometry":{
            "type":"Point",
            "coordinates":[-122.375,37.61899948120117]}}
]};

L.geoJSON(sanFranAirport, {pointToLayer: function(feature, latlng){
	console.log(feature);
	console.log(latlng);
	return L.marker(latlng)
	.bindPopup("<h2" + feature.properties.city + "<h2>");
}}).addTo(map);

L.geoJSON(sanFranAirport, {onEachFeature: function(feature, layer){
	console.log(layer);
	layer.bindPopup();
}})

let cityData = cities;

cityData.forEach(function(city){
	console.log(city);
	L.circle(city.location, {radius: city.population/30, color: 'orange', fillColor: 'orange', fillOpacity: '0.50', lineWeight: 1}).addTo(map)
	.bindPopup("<h2>" + city.city + ", " + city.state + "</h2> <hr> <h3>Population " + city.population.toLocaleString() + "</h3>")
  	.addTo(map);
})

// L.polyline([[33.9416,-118.4085][37.6213,-122.3790]], {color: 'red'}).addTo(map);

let line = [
	[33.9416, -118.4085],
	[37.6213, -122.3790],
	[40.7899, -111.9791],
	[47.4502, -122.3088]
  ];

L.polyline(line, {
	color: "yellow"
  }).addTo(map);

let airportData = "https://raw.githubusercontent.com/shaunwang1350/Mapping_Earthquakes/master/majorAirports.json";

let torontoData = "https://raw.githubusercontent.com/shaunwang1350/Mapping_Earthquakes/master/torontoRoutes.json";

let torontoHoods = "https://raw.githubusercontent.com/shaunwang1350/Mapping_Earthquakes/master/torontoNeighborhoods.json";

d3.json(airportData).then(function(data){
	console.log(data);
	L.geoJSON(data).addTo(map);
});

let myStyle = {
	color: "#ffffa1",
	weight: 2
}

d3.json(torontoData).then(function(data){
	console.log(data);
	L.geoJSON(data, {
		style: myStyle,
		onEachFeature: function(feature, layer){
			layer.bindPopup("<h3> Airline: " + feature.properties.airline + "</h3> <hr><h3> Destination: " + feature.properties.dst + "</h3>")
		}
	}).addTo(map);
});

let myStyle2 = {
	color: 'blue',
	weight: 1,
	fillColor: 'yellow',
	fillOpacity: 0.50
}

d3.json(torontoHoods).then(function(data){
	console.log(data);
	L.geoJSON(data, {
		style: myStyle2,
		onEachFeature: function(feature, layer){
			layer.bindPopup("<h3> Neighborhood: " + feature.properties.AREA_NAME)
		}
	}).addTo(map);
})

// Then we add our 'graymap' tile layer to the map.
streets.addTo(map);

