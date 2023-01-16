let now = new Date();

let days = ["Sun", "Mon", "Tue", "Wen", "Thu", "Fri", "Sat"];

let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

let currentDay = days[now.getDay()];
let currentMonth = months[now.getMonth()];
let currentHour = now.getHours();
let currentMinute = now.getMinutes();
let currentDate = now.getDate();

if (currentHour < 10) {
  currentHour = `0${currentHour}`;
}
if (currentMinute < 10) {
  currentMinute = `0${currentMinute}`;
}

let inputDate = document.querySelector(".date");
inputDate.innerHTML = `${currentDay} ${currentDate} ${currentMonth} ${currentHour} : ${currentMinute}`;

function showForecast(response) {
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecastHTML =
    forecastHTML +
    `
  <div class="weather-forecast" id="forecast">
    <div class="row">
       <div class="col-2">
          <div class="weather-forecast-date">Tue</div>
              <img
                   src="http://openweathermap.org/img/wn/50d@2x.png"
                    alt=""
                   width="50"
              />
              <div class="weather-forecast-temperatures">
                <span class="weather-forecast-temperature-max"> 3° </span>
                <span class="weather-forecast-temperature-min"> 1° </span>
            </div>
          </div>
        </div>
     `;
  forecastHTML =
    forecastHTML +
    `
    <div class="weather-forecast" id="forecast">
    <div class="row">
       <div class="col-2">
          <div class="weather-forecast-date">Tue</div>
              <img
                   src="http://openweathermap.org/img/wn/50d@2x.png"
                    alt=""
                   width="50"
              />
              <div class="weather-forecast-temperatures">
                <span class="weather-forecast-temperature-max"> 3° </span>
                <span class="weather-forecast-temperature-min"> 1° </span>
            </div>
          </div>
        </div>
     `;
}

function showWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;

  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].main;

  let currentTemperature = Math.round(response.data.main.temp);
  let temp = document.querySelector("#temperature");
  temp.innerHTML = `${currentTemperature}`;
  celsiusTemperature = response.data.main.temp;

  let currentHumidity = response.data.main.humidity;
  let humidity = document.querySelector("#humi");
  humidity.innerHTML = `${currentHumidity} %`;

  let currentWind = Math.round(response.data.wind.speed);
  let wind = document.querySelector("#wind");
  wind.innerHTML = `${currentWind} km/h`;

  let currentClouds = Math.round(response.data.clouds.all);
  let clouds = document.querySelector("#clouds");
  clouds.innerHTML = `${currentClouds}%`;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function inputCity(event) {
  event.preventDefault();
  let iconElement = document.querySelector("#icon");
  let typedCity = document.querySelector("#currentCity").value;
  let titleCity = document.querySelector("#city");
  titleCity.innerHTML = `${typedCity}`;
  search(typedCity);
}

function search(typedCity) {
  let apiKey = "e450bc345a80a08ada69fd5c714d871d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${typedCity}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function searchLocation(position) {
  let apiKey = "e450bc345a80a08ada69fd5c714d871d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);

  let currentH1 = document.querySelector("#city");
  currentH1.innerHTML = position.data.name;
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let searchButton = document.querySelector("#searchCity");
searchButton.addEventListener("click", inputCity);
search("Berlin");

let locationButton = document.querySelector("#locationButton");
locationButton.addEventListener("click", getCurrentLocation);

function showFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (14 * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function showCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

showForecast();

let fahrenheitLink = document.querySelector("#fahrenheitDegree");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsiusDegree");
celsiusLink.addEventListener("click", showCelsiusTemperature);
