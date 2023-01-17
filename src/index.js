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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
  <div class="col-2">
        <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
        <img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="42"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> ${Math.round(
            forecastDay.temp.max
          )}° </span>
          <span class="weather-forecast-temperature-min"> ${Math.round(
            forecastDay.temp.min
          )}° </span>
        </div>
      </div>
      `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "5201594abea9f3e38b70e65b11a80c24";
  let apiUrl = `http://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
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

  getForecast(response.data.coord);
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
  let apiKey = "97f8e93f00107773f88eafd933ce86b7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${typedCity}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function searchLocation(position) {
  let apiKey = "97f8e93f00107773f88eafd933ce86b7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lon=${position.coords.longitude}&lat=${position.coords.latitude}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);

  let currentH1 = document.querySelector("#city");
  currentH1.innerHTML = position.data.name;
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let locationButton = document.querySelector("#locationButton");
locationButton.addEventListener("click", getCurrentLocation);

let searchButton = document.querySelector("#searchCity");
searchButton.addEventListener("click", inputCity);
search("Berlin");
