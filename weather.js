//Global
var weatherData;
var apiKey = '8ba17c932f3f9e6b255aa048a991887e';
var zip = '85208';

var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

var highText = document.getElementById("highText");
var lowText = document.getElementById("lowText");
var currTemp = document.getElementById("currTemp");
var sunriseText = document.getElementById("sunriseText");
var sunsetText = document.getElementById("sunsetText");
var weatherDesc = document.getElementById("weatherDesc");
var dateText = document.getElementById("date");
var dayText = document.getElementById("day");

window.onload = function(){
    loadJSON();
    setInterval(loadJSON, 10 * 1000); //call every 10 seconds
};


function renderData(){
    console.log(weatherData);
    
    currTemp.innerHTML = Math.round(weatherData.main.temp) + "&#176 F";
    
    weatherDesc.innerHTML = weatherData.weather[0].description;
    
    var sunriseTime = new Date(weatherData.sys.sunrise*1000);
    sunriseText.innerHTML = (sunriseTime.toLocaleTimeString());
    var sunsetTime = new Date(weatherData.sys.sunset*1000);
    sunsetText.innerHTML = (sunsetTime.toLocaleTimeString());
    
    dateText.innerHTML = sunriseTime.toLocaleDateString();
    dayText.innerHTML = days[sunriseTime.getDay()];
    
    highText.innerHTML = weatherData.main.temp_max + "&#176 F";
    lowText.innerHTML = weatherData.main.temp_min + "&#176 F";
}


function loadJSON(){
    //Get data from JSON file
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if(this.readyState == 4 && this.status == 200){
            weatherData = JSON.parse(this.responseText);
            console.log("AJAX Call");
            renderData();
        }
    };
    xmlhttp.open("GET", "https://api.openweathermap.org/data/2.5/weather?zip="+zip+",us&units=Imperial&appid="+apiKey, true);
    xmlhttp.send();
}