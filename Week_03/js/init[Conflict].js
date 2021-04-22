let MapCenter= [4.629200, -74.144920];
let MapZoom= 10;
const map = L.map('map').setView(MapCenter, MapZoom);

L.tileLayer('https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png', {
	maxZoom: 20,
    attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
}).addTo(map);
//function addMarker(lat,lng, message){
   // console.log(message)
   // L.marker([lat,lng]).addTo(map).bindPopup(message)
   // return message
//}

var myIcon = L.icon({iconUrl: 'https://pngtree.com/freepng/vector-house-icon_4013710.png', iconSize: [40,40]});

//new markers function:
function addMarker(lat,lng,title,message){
    console.log(message)
    L.marker([lat,lng],{icon:myIcon}).addTo(map).bindPopup(`<h2>${title}</h2>`);
    createButtons(lat,lng,title);
    return message
}
//buttons function:
function createButtons(lat,lng,title){
    const newButton = document.createElement("button"); // adds a new button
    newButton.id = "button"+title; // gives the button a unique id
    newButton.innerHTML = title; // gives the button a title
    newButton.setAttribute("lat",lat); // sets the latitude 
    newButton.setAttribute("lng",lng); // sets the longitude 
    newButton.addEventListener('click', function(){
        map.flyTo([lat,lng]); //this is the flyTo from Leaflet
    })
    document.body.appendChild(newButton); //this adds the button to our page.
}
//add markers to map
addMarker(6.040910, -72.636830,'Socota: My Paternal Homeland')
addMarker(9.300210, -75.395600, 'Sincelejo: My Maternal Homeland')
addMarker(4.629200, -74.144920, 'Bogota: My Homeland')
