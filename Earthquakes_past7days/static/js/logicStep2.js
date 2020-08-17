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
	"Dark": dark
}

let map = L.map('mapid', {
	center: [39.5, -98.5],
	zoom: 2,
	layers: [dark]
})

L.control.layers(baseMaps).addTo(map);

d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function(data){
	console.log(data);
	
	function styleInfo(feature) {
		return {
		  opacity: 1,
		  fillOpacity: 1,
		  fillColor: "#ffae42",
		  color: "#000000",
		  radius: getRadius(feature.properties.mag),
		  stroke: true,
		  weight: 0.5
		};
	}

	function getRadius(magnitude) {
		if (magnitude === 0) {
		  return 1;
		}
		return magnitude * 2;
	  }

    L.geoJSON(data, {pointToLayer: function(feature, latlng) {
		console.log(data);
		return L.circleMarker(latlng);
	},
	style: styleInfo
	}).addTo(map);
});