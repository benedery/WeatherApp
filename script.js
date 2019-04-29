const city = document.getElementById("citySelection");
let selectedCity = {};
const description = document.getElementById("description");
const wind = document.getElementById("wind");
const temp = document.getElementById("temp");
const humidity = document.getElementById("humidity");
// declare map constant
const mymap = L.map("mapId").setView([51.50853, -0.13], 13);
L.tileLayer(
  "https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}",
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken:
      "pk.eyJ1IjoiYmVuZWRlcnkiLCJhIjoiY2p1bGloazFjMXprMTN5cGdiZ3FtanhtbyJ9.QizoVvJPkBvTWv_u-KqLYA"
  }
).addTo(mymap);
// declare redIcon marker
const redIcon = new L.Icon({
  iconUrl: "public/img/marker-icon-2x-red.png",
  shadowUrl: "public/img/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});
citiesArray = [
  ["london", 51.51, -0.13],
  ["telAviv", 32.08, 34.8],
  ["jerusalem", 31.77, 35.22],
  ["amsterdam", 52.37, 4.89],
  ["tokyo", 35.69, 139.69],
  ["budapest", 47.5, 19.04],
  ["bangkok", 13.75, 100.52]
];
// creating markers on map from citiesArray locations.
function createCityMarkers() {
  citiesArray.forEach((city, index) => {
    new L.marker([city[1], city[2]], { index })
      .addTo(mymap)
      .on("click", clickedMarker);
  });
}
createCityMarkers();
//fetching weather api & change dom info & point to location in map
function fetchWeatherApi(cityValue) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?id=${cityValue}&APPID=a8c42005dc181db7a40ed3589e9cbaed&units=metric`
  )
    .then(function(response) {
      return response.json();
    })
    .then(function(myJson) {
      selectedCity = myJson;
      changeDataInnerText();
      pointAndColor();
    });
}
//  changing inner dom text
function changeDataInnerText() {
  description.innerText = selectedCity.weather[0].description;
  wind.innerText = `Deg - ${selectedCity.wind.deg}, Speed-${
    selectedCity.wind.speed
  }`;
  temp.innerText = selectedCity.main.temp;
  humidity.innerText = `${selectedCity.main.humidity}%`;
}
// pointing to selected location & create red marker layer
function pointAndColor() {
  mymap.panTo({
    lon: `${selectedCity.coord.lon}`,
    lat: `${selectedCity.coord.lat}`
  });
  createCityMarkers();
  L.marker([selectedCity.coord.lat, selectedCity.coord.lon], {
    icon: redIcon
  }).addTo(mymap);
}
//event when user select from drop menu
city.addEventListener("change", function() {
  fetchWeatherApi(city.options[city.selectedIndex].value);
});
// function for event when user click on marker
function clickedMarker(e) {
  city.selectedIndex = e.target.options.index;
  fetchWeatherApi(city.options[city.selectedIndex].value);
}

//make mobile friendyly
//add weatherApi title - design
//caching

//adding icons - bonus
// String iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";
