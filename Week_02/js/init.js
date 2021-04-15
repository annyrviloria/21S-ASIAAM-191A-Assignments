// JavaScript const variable declaration
const map = L.map('map').setView([6.123081, -37.923643], 3);

// Leaflet tile layer, i.e. the base map
L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}{r}.{ext}', {
	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	subdomains: 'abcd',
	minZoom: 0,
	maxZoom: 18,
	ext: 'png'
}).addTo(map);

//JavaScript let variable declaration to create a marker
let marker = L.marker([34.024540, -118.426460]).addTo(map)
		.bindPopup('Currently: Los Angeles, CA')
		.openPopup();
let marker2 = L.marker([4.629200, -74.144920]).addTo(map)
		.bindPopup('Bogota, Colombia')
		.openPopup();
let marker3 = L.marker([42.365250, -71.105011]).addTo(map)
		.bindPopup('Boston, MA')
		.openPopup();
let marker4 = L.marker([9.300210, -75.395600]).addTo(map)
		.bindPopup('Sincelejo, Colombia')
		.openPopup();
let marker5 = L.marker([19.551870, -71.073980]).addTo(map)
		.bindPopup('Mao, Dominican Republic')
		.openPopup();
let marker6 = L.marker([19.850119, -71.651695]).addTo(map)
		.bindPopup('Montecristi, Dominican Republic')
		.openPopup();
let marker7 = L.marker([6.293133, -10.785452]).addTo(map)
		.bindPopup('Monrovia, Liberia')
		.openPopup();

        fetch("js/lab1.geojson")
    .then(response => {
        return response.json();
    })
    .then(data =>{
        // the Leaflet method to add GeoJSON data
        L.geoJSON(data, {
            style: function (feature) {
                return {color: 'yellow'};
            }
        }).bindPopup(function (layer) {
            return layer.feature.properties.name;
        }
            ).addTo(map)
    });