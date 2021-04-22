let MapCenter= [4.629200, -74.144920];
let MapZoom= 10;
const map = L.map('map').setView(MapCenter, MapZoom);

L.tileLayer('https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
}).addTo(map);
//function addMarker(lat,lng, message){
   // console.log(message)
   // L.marker([lat,lng]).addTo(map).bindPopup(message)
   // return message
//}

var myIcon = L.icon({iconUrl:'houseIcon.png', iconSize: [50,50]});

//new markers function:
function addMarker(lat,lng,title,message){
    console.log(message)
    L.marker([lat,lng],{icon:myIcon}).addTo(map).bindPopup(`<h2>${title}</h2>`+`<p>${message}</p>`);
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
addMarker(6.040910, -72.636830,'Socota: My Paternal Homeland','My grandparents come from this small village tucked in the highlights of the Andes. This region is home to the Muisca, which is the indigenous group I trace my ancestry back to. My grandparents come from farming families, and they met and married here in the year 1979')
addMarker(9.300210, -75.395600, 'Sincelejo: My Maternal Homeland', 'My grandparents on this side of my family come from this coastal town in the Caribbean. My grandma comes from a family of cooks and farmers, which I think is why food plays such an important role in my life. My grandpa came from a family of fishermen. My mom was their 4th child, and this is where she grew up, and where she and my dad met!')
addMarker(4.629200, -74.144920, 'Bogota: My Homeland','After my mom and dad met and fell in love, they moved to the city together. At this point my dads parents had also moved to the city. This is where my and my 3 brothers were born and raised, and where I go back to when I get a chance to visit home over the holidays.')
