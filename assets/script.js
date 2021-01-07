function initPage() {
  const inputEl = document.getElementById("city-input");
  const searchEl = document.getElementById("search-button");
  const clearEl = document.getElementById("clear-history");
  const nameEl = document.getElementById("city-name");
  const currentPicEl = document.getElementById("current-pic");
  const currentTempEl = document.getElementById("temperature");
  const currentHumidityEl = document.getElementById("humidity");4
  const currentWindEl = document.getElementById("wind-speed");
  const currentUVEl = document.getElementById("UV-index");
  const historyEl = document.getElementById("history");

  let searchHistory = JSON.parse(localStorage.getItem("search")) || [];

  //Get API Key from the OpenWeather
  const APIKey = "c9aab0b741f1bfedcfb31a0cbe6e4184ac";
//Read city name when search button is clicked, by getting the request from weather map API
function getWeather(cityName) {
//Display current weather using city name from Open Weather API
let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid" + APIKey;
axios.get(queryURL)
.then(function(response){
  
}) 
}

}
