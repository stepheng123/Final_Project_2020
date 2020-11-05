// Create a map object
var myMap = L.map("map", {
  center: [15.5994, -28.6731],
  zoom: 3
});

L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(myMap);

// Country data
var countries = [
  {
    name: "China",
    location: [30.657, 104.066],
    points: 677240
  },
  {
    name: "India",
    location: [17.366, 78.475],
    points: 660350
  },
  {
    name: "New Zealand",
    location: [-41.3, 174.783333],
    points: 570000
  },
  {
    name: "Philippines",
    location: [14.633333, 121.033333],
    points: 293770
  },
  {
    name: "Vietnam",
    location: [10.8, 106.65],
    points: 262910
  },
  {
    name: "England",
    location: [53.799722, -1.549167],
    points: 986460
  },
  {
    name: "South Africa",
    location: [-26.204444, 28.045556],
    points: 193860
  },
  {
    name: "Italy",
    location: [41.883333, 12.5],
    points: 182520
  },
  {
    name: "Malaysia",
    location: [3.133333, 101.683333],
    points: 175920
  },
  {
    name: "Sri Lanka",
    location: [6.933333, 79.866667],
    points: 140260
  },
  {
    name: "Scotland",
    location: [55.953, -3.189],
    points: 133920
  }
];


// Loop through the cities array and create one marker for each city object
for (var i = 0; i < countries.length; i++) {

  // Conditionals for countries points
  var color = "";
  if (countries[i].points > 1000000) {
    color = "yellow";
  }
  else if (countries[i].points > 300000) {
    color = "blue";
  }
  else if (countries[i].points > 150000) {
    color = "green";
  }
  else {
    color = "red";
  }

  // Add circles to map
  L.circle(countries[i].location, {
    fillOpacity: 0.75,
    color: "white",
    fillColor: color,
    // Adjust radius
    radius: countries[i].points * 0.6
  }).bindPopup("<h1>" + countries[i].name + "</h1> <hr> <h3>Population residing in Australia: " + countries[i].points + "</h3>").addTo(myMap);
}

// Create base layers

// Streetmap Layer
var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
});

var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "dark-v10",
  accessToken: API_KEY
});

