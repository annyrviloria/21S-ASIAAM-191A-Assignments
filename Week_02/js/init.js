// JavaScript const variable declaration
const map = L.map('map').setView([34.024540, -118.426460], 15);

// Leaflet tile layer, i.e. the base map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

//JavaScript let variable declaration to create a marker
let marker = L.marker([34.024540, -118.426460]).addTo(map)
		.bindPopup('Mi casa<br> Alex lives here too ')
		.openPopup();

fetch("js/lab1.geojson")
    .then(response => {
        return response.json();
    })
    .then(data =>{
        // the Leaflet method to add GeoJSON data
        L.geoJSON(data, {
            style: function (feature) {
                return {color: 'red'};
            }
        }).bindPopup(function (layer) {
            return layer.feature.properties.name;
        }
            ).addTo(map)
    });