


var weatherData;
var currentLocation;
var updateWeatherLoopTimeout;

function updateWeather(location){
  console.log("updating Weather for "+ location);
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        weatherData = JSON.parse(this.responseText);
        updateWeatherDisplay();
        clearTimeout(updateWeatherLoopTimeout);
        updateWeatherLoopTimeout = setTimeout(function(){updateWeather(location)}, 600000);
      }
  };
  xhttp.open("GET", "http://api.openweathermap.org/data/2.5/weather?q="+location+"&units=imperial&APPID=a64d3d288ff07667926a0d7b29aba4f3", true);
  xhttp.send();
}

function changeWeatherLocation(location){
  var buttonToActive = document.getElementById(currentLocation+"_button");
  buttonToActive.classList.remove("slds-is-active");

  var buttonToActive = document.getElementById(location+"_button");
  buttonToActive.classList.add("slds-is-active");

  currentLocation = location;
  updateWeather(location);
}

function updateWeatherDisplay(){
  var weatherDisplayedData = "<div class='slds-text-heading_large'>"+weatherData.main.temp+"&#176;F </div> </div>";
  weatherDisplayedData +="<div class='slds-text-heading_medium'>" + weatherData.weather[0].description + "</div>";
  weatherDisplayedData +="<div class='slds-text-body_slighty_bigger'>" + weatherData.main.humidity + "% humidity</div>";
  weatherDisplayedData +="<div class='slds-text-body_slighty_bigger'>" + weatherData.wind.speed + "mph wind speed</div>";
  document.getElementById("weather-display").innerHTML = weatherDisplayedData;

  if(weatherData.weather[0].description.includes("rain") || weatherData.weather[0].description.includes("storm") || weatherData.weather[0].description.includes("drizzle")){
    document.body.style.backgroundImage = "url('assets/weather_backgrounds/rain.jpg')";
  }
  else if(weatherData.weather[0].description.includes("cloud")){
    document.body.style.backgroundImage = "url('assets/weather_backgrounds/cloudy.jpg')";
  }
  else if(weatherData.weather[0].description.includes("snow")){
    document.body.style.backgroundImage = "url('assets/weather_backgrounds/snow.jpg')";
  }
  else{
    document.body.style.backgroundImage = "url('assets/weather_backgrounds/clear.jpg')";
  }
}

function initialize(location){
  currentLocation = location;
  changeWeatherLocation(location)
}
