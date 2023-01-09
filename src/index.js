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
inputDate.innerHTML = `${currentDay} ${currentDate} ${currentMonth}, ${currentHour} : ${currentMinute}`;



function showWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;

  let currentTemperature = Math.round(response.data.main.temp);
  let temp = document.querySelector("#temperature");
  temp.innerHTML = `${currentTemperature}`;

  let currentHumidity = (response.data.main.humidity);
  let humidity = document.querySelector("#humi");
  humidity.innerHTML = `Humidity: ${currentHumidity} %`;

  let currentWind = Math.round(response.data.wind.speed);
  let wind = document.querySelector("#wind");
  wind.innerHTML = `Wind: ${currentWind} km/h`;

  let currentClouds = Math.round(response.data.clouds.all);
  let clouds = document.querySelector("#clouds");
  clouds.innerHTML = `Clouds: ${currentClouds}%`;
}


function inputCity (event) {
  event.preventDefault();
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


function searchLocation (position) {
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