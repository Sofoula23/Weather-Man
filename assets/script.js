function initPage() {
  //Selecting HTML elements to be used in js 
  const inputEl = document.getElementById("city-input");
  const searchEl = document.getElementById("search-button");
  const clearEl = document.getElementById("clear-history");
  const nameEl = document.getElementById("city-name");
  //Use let to be able to alter or modify the variable later
  let currentPicEl = document.getElementById("current-pic");
  const currentTempEl = document.getElementById("temperature");
  const currentHumidityEl = document.getElementById("humidity");4
  const currentWindEl = document.getElementById("wind-speed");
  const currentUVEl = document.getElementById("UV-index");
  const historyEl = document.getElementById("history");
  let searchHistory = JSON.parse(localStorage.getItem("search")) || [];

  //Get API Key from the Open Weather
  const APIKey = "0672c5c44771cae78024eb3855e55f10";
//Read city name when search button is clicked, by getting the request from weather map API
function getWeather(cityName) {
//Display current weather using city name from Open Weather API
let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIKey;
//API request to get data back based on the city's weather
$.ajax({
  url: queryURL,
  method: "GET"
}).then(function(response){
  //Parse response to display current weather
  const currentDate = new Date(response.dt*1000);
            const day = currentDate.getDate();
            const month = currentDate.getMonth() + 1;
            const year = currentDate.getFullYear();
            //Get HTML element to display current date and image weather icon 
            nameEl.innerHTML = response.name + " (" + month + "/" + day + "/" + year + ") ";
            let weatherPic = response.weather[0].icon;
            currentPicEl.setAttribute("src","https://openweathermap.org/img/wn/" + weatherPic + "@2x.png");
            currentPicEl.setAttribute("alt",response.weather[0].description);
            //Getting temperature, humidity and wind speed from API
            currentTempEl.innerHTML = "Temperature: " + k2f(response.main.temp) + " &#176F";
            currentHumidityEl.innerHTML = "Humidity: " + response.main.humidity + "%";
            currentWindEl.innerHTML = "Wind Speed: " + response.wind.speed + " MPH";
        //Adding geolocation coordinates
        let lat  = response.coord.lat;
        let lon = response.coord.lon;  
        let UVQueryURL ="https://api.openweathermap.org/data/2.5/uvi/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey + "&cnt=1";
        //API call to get the UVI data
        $.ajax({
          url: UVQueryURL,
          method:"GET"
        }).then(function(response) {
          let UVIndex = document.createElement("span");
          UVIndex.setAttribute("class", "badge badge-danger");
          UVIndex.innerHTML = response[0].value;
          currentUVEl.innerHTML = "UV Index: ";
          currentUVEl.append(UVIndex);

        });
// Execute a 5-day forecast getting the request from open weather API
         let cityID = response.id;
         let forecastQueryURL = "https://api.openweathermap.org/data/2.5/forecast?id=" + cityID + "&appid=" + APIKey;
         //API call for five days weather data
         $.ajax({
          url: forecastQueryURL,
          method:"GET"
         }).then(function(response){ 
          const forecastEls = document.querySelectorAll(".forecast");
          for (i=0; i<forecastEls.length; i++) {
              forecastEls[i].innerHTML = "";
              const forecastIndex = i*8 + 4;
              const forecastWeatherEl = document.createElement("img");
              forecastWeatherEl.setAttribute("src","https://openweathermap.org/img/wn/" + response.list[forecastIndex].weather[0].icon + "@2x.png");
              forecastWeatherEl.setAttribute("alt",response.list[forecastIndex].weather[0].description);
              forecastEls[i].append(forecastWeatherEl);
              const forecastTempEl = document.createElement("p");
              forecastTempEl.innerHTML = "Temp: " + k2f(response.list[forecastIndex].main.temp) + " &#176F";
              forecastEls[i].append(forecastTempEl);
              const forecastHumidityEl = document.createElement("p");
              forecastHumidityEl.innerHTML = "Humidity: " + response.list[forecastIndex].main.humidity + "%";
              forecastEls[i].append(forecastHumidityEl);
              }
          })
      });  
  }
  //Event listener for when click button is pressed for API search and store city in local storage 
  searchEl.addEventListener("click",function() {
      const searchTerm = inputEl.value;
      getWeather(searchTerm);
      searchHistory.push(searchTerm);
      localStorage.setItem("search",JSON.stringify(searchHistory));
      renderSearchHistory();
  })
  //Event to clear the users' search history
  clearEl.addEventListener("click",function() {
      searchHistory = [];
      renderSearchHistory();
  })
  // Change temperature from Kelvin to Farenheit 
  function k2f(K) {
      return Math.floor((K - 273.15) *1.8 +32);
  }
//Get the city from the local storage and append it to the history search unorder list
  function renderSearchHistory() {
      historyEl.innerHTML = "";
      for (let i=0; i<searchHistory.length; i++) {
          const historyItem = document.createElement("input");
          
          historyItem.setAttribute("type","text");
          historyItem.setAttribute("readonly",true);
          historyItem.setAttribute("class", "form-control d-block bg-white");
          historyItem.setAttribute("value", searchHistory[i]);
          historyItem.addEventListener("click",function() {
              getWeather(historyItem.value);
          })
          historyEl.append(historyItem);
      }
  }
//If history is cleared display last searched city
  renderSearchHistory();
  if (searchHistory.length > 0) {
      getWeather(searchHistory[searchHistory.length - 1]);
  }

}
initPage(); 
          


