


var weatherData;

function updateWeather(location){
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        weatherData = JSON.parse(this.responseText);
        updateWeatherLoop();
      }
  };
  xhttp.open("GET", "http://api.openweathermap.org/data/2.5/weather?q="+location+"&units=imperial&APPID=a64d3d288ff07667926a0d7b29aba4f3", true);
  xhttp.send();
}

function changeWeather(location){
  updateWeather(location)

}

function updateWeatherLoop(){
  var weatherDisplayedData = "<div class='slds-text-heading_large'>"+weatherData.main.temp+"&#176;F </div> </div>";
  weatherDisplayedData +="<div class='slds-text-heading_medium'>" + weatherData.weather[0].description + "</div>";
  weatherDisplayedData +="<div class='slds-text-body_slighty_bigger'>" + weatherData.main.humidity + "% humidity</div>";
  weatherDisplayedData +="<div class='slds-text-body_slighty_bigger'>" + weatherData.wind.speed + "mph wind speed</div>";
  if(weatherData.weather[0].description.includes("rain")){
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
  document.getElementById("weather-display").innerHTML = weatherDisplayedData + this.responseText;

}
