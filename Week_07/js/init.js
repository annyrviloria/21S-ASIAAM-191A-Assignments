const map = L.map('map').setView([34.008460, -118.112412], 15);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

let url = "https://spreadsheets.google.com/feeds/list/1xt-lCSYFOzw85POmGwsBTwxcOa7oua5wIMziNFvvzcQ/oxk2v35/public/values?alt=json"
fetch(url)
	.then(response => {
		return response.json();
		})
    .then(data =>{
        //console.log(data)
        formatData(data)
    }
)

let Daytime = L.featureGroup();
let Nightime = L.featureGroup();
let allLayers = L.featureGroup([Daytime,Nightime]);

let thelayers = {
    "Open during daytime": Daytime,
    "Open during nightime": Nightime
} 
// add layer control box
L.control.layers(null,thelayers,{collapsed:false}).addTo(map)

function addMarker(data){
    let circleOptions ={
        color: 'green',
        fillColor: 'green',
        fillOpacity: 0.5,
        radius: 10
    }
    if(data.whenaretheyopen == "Daytime"){
        Daytime.addLayer(L.circleMarker([data.lat,data.lng],circleOptions).bindPopup(`<h2>${data.whatstheirbestdish}</h2>`+`<h3>Open during daytime</h3>`+`<p><b>Location:</b>${data.whereisitat}</p>`+`<p><b>Name or Description:</b>${data.doesthisspothaveanameifnothowcouldifindit}</p>`+`<p><b>How did you find it:</b>${data.howdidyoufindthisspot}</p>`))
    }
    else{
        circleOptions['fillColor']='purple'
        circleOptions['color']='purple'
        Nightime.addLayer(L.circleMarker([data.lat,data.lng],circleOptions).bindPopup(`<h2>${data.whatstheirbestdish}</h2>`+`<h3>Open during nightime</h3>`+`<p><b>Location:</b>${data.whereisitat}</p>`+`<p><b>Name or Description:</b>${data.doesthisspothaveanameifnothowcouldifindit}</p>`+`<p><b>How did you find it:</b>${data.howdidyoufindthisspot}</p>`))
    }
    createButtons(data.lat,data.lng,data.whatstheirbestdish)
    return data.timestamp
}

// function addMarker(data){
//     L.circle([data.lat,data.lng],{
//       color: 'orange',
//       fillColor: '#f03',
//       fillOpacity: 0.5,
//       radius: 400
//     }).addTo(map).bindPopup(`<h2>${data.bestdish}</h2>`+`<p><b>Location:</b>${data.whereisitat}</p>`+`<p><b>Name or Description:</b>${data.name}</p>`+`<p><b>How did you find it:</b>${data.yourstory}</p>`)
//     createButtons(data.lat,data.lng,data.bestdish)
//     return data.timestamp
// }

function createButtons(lat,lng,title){
  const newButton = document.createElement("button"); // adds a new button
  newButton.id = "button"+title; // gives the button a unique id
  newButton.innerHTML = title; // gives the button a title
  newButton.setAttribute("lat",lat); // sets the latitude 
  newButton.setAttribute("lng",lng); // sets the longitude 
  newButton.addEventListener('click', function(){
      map.flyTo([lat,lng]); //this is the flyTo from Leaflet
  })
  const SpaceForButtons = document.getElementById('contents')
  SpaceForButtons.appendChild(newButton); //this adds the button to our page.
}

function formatData(theData){
    const formattedData = [] /* this array will eventually be populated with the contents of the spreadsheet's rows */
    const rows = theData.feed.entry // this is the weird Google Sheet API format we will be removing
    // we start a for..of.. loop here 
    for(const row of rows) { 
      const formattedRow = {}
      for(const key in row) {
        // time to get rid of the weird gsx$ format...
        if(key.startsWith("gsx$")) {
              formattedRow[key.replace("gsx$", "")] = row[key].$t
        }
      }
      // add the clean data
      formattedData.push(formattedRow)
    }
    // lets see what the data looks like when its clean!
    console.log(formattedData)
    // we can actually add functions here too
    formattedData.forEach(addMarker)
    Daytime.addTo(map)
    Nightime.addTo(map)
    map.fitBounds(allLayers.getBounds())
}
