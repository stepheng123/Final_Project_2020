// Function to determine marker size based on population
function markerSize(population) {
  return population / 25;
}

// An array containing all of the information needed to create city and state markers
var locations = [
  {
    coordinates: [-32, 147],
    state: {
      name: "New South Wales",
      population: 7797800
    },
    city: {
      name: "Sydney",
      population: 5312163
    }
  },
  {
    coordinates: [-37, 144],
    state: {
      name: "Victoria",
      population: 6244200
    },
    city: {
      name: "Melbourne",
      population: 5078193
    }
  },
  {
    coordinates: [-23, 143],
    state: {
      name: "Queensland",
      population: 4883700
    },
    city: {
      name: "Brisbane",
      population: 2514184
    }
  },
  {
    coordinates: [-26, 121],
    state: {
      name: "Western Australia",
      population: 2567800
    },
    city: {
      name: "Perth",
      population: 2059484
    }
  },
  {
    coordinates: [-30, 135],
    state: {
      name: "South Australia",
      population: 1717000
    },
    city: {
      name: "Adelaide",
      population: 1345777
    }
  },
  {
    coordinates: [-42, 147],
    state: {
      name: "Tasmania",
      population: 519100
    },
    city: {
      name: "Hobart",
      population: 246970
    }
  },
  {
    coordinates: [-35.45, 148.980556],
    state: {
      name: "Australian Capital Territory",
      population: 429834
    },
    city: {
      name: "Canberra",
      population: 426704
    }
  },
  {
    coordinates: [-20, 133],
    state: {
      name: "Northern Territory",
      population: 245000
    },
    city: {
      name: "Darwin",
      population: 148564
    }
  }
];

// Define arrays to hold created city and state markers
var cityMarkers = [];
var stateMarkers = [];

// Loop through locations and create city and state markers
for (var i = 0; i < locations.length; i++) {
  // Setting the marker radius for the state by passing population into the markerSize function
  stateMarkers.push(
    L.circle(locations[i].coordinates, {
      stroke: false,
      fillOpacity: 0.75,
      color: "green",
      fillColor: "green",
      radius: markerSize(locations[i].state.population)
    })
  );

  // Setting the marker radius for the city by passing population into the markerSize function
  cityMarkers.push(
    L.circle(locations[i].coordinates, {
      stroke: false,
      fillOpacity: 0.75,
      color: "purple",
      fillColor: "purple",
      radius: markerSize(locations[i].city.population)
    })
  );
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

// Create two separate layer groups: one for cities and one for states
var states = L.layerGroup(stateMarkers);
var cities = L.layerGroup(cityMarkers);

// Create a baseMaps object
var baseMaps = {
  "Street Map": streetmap,
  "Dark Map": darkmap
};

// Create an overlay object
var overlayMaps = {
  "State Population": states,
  "City Population": cities
};

// Define a map object
var myMap = L.map("map", {
  center: [-23.7, 133.87],
  zoom: 5.4,
  layers: [streetmap, states, cities]
});

// Pass our map layers into our layer control
// Add the layer control to the map
L.control.layers(baseMaps, overlayMaps, {
  collapsed: false
}).addTo(myMap);
