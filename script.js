// This is our API key
const APIKey = "166a433c57516f51dfab1f7edaed8413";

// Weather API URLs
const currentWeatherURL = "https://api.openweathermap.org/data/2.5/weather?q=";
const fiveDayForecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=";
const uVURL = "http://api.openweathermap.org/data/2.5/uvi/forecast?";
const units = "imperial";
const defaultCity = "Phoenix";
// var cityName;

$(document).ready(function () {
  forecast(defaultCity);
//   listOfCities = [];
//   viewFiveDayForecast();
//   $("city-search").on("click", function () {
//     cityName = $("#search-city").val();
// $("uv-index").removeClass();
// $("uv-index").addClass("badge");
// lookupFiveDayForecast(cityName);

//   })
});

//Add event Listner for Search Button
// document.getElementById("search-button").addEventListener("click", function() {
// });

//(Jumbotron Section)
function forecast(city) {
  $.ajax({
    method: "get",
    url: currentWeatherURL + city + "&units=" + units + "&appid=" + APIKey
  }).then(function (response) {
    console.log(response);
    lookupUvIndex(response.coord.lon, response.coord.lat);
    lookupFiveDayForecast(city);
  }).catch(function (error) {
    console.log(error.resonseJSON.message);
  });
}

function lookupUvIndex(lon, lat) {
  $.ajax({
    method: "get",
    url: uVURL + "&appid=" + APIKey + "&lon=" + lon + "&lat=" + lat
  }).then(function (response) {
    console.log(response);
  }).catch(function (error) {
    console.log(error.resonseJSON.message);
  });
}

function lookupFiveDayForecast(city) {
  $.ajax({
    method: "get",
    url: fiveDayForecastURL + city + "&units=" + units + "&appid=" + APIKey
  }).then(function (response) {
    console.log(response);
    const day1 = response.list[3];
    const day2 = response.list[11];
    const day3 = response.list[19];
    const day4 = response.list[27];
    const day5 = response.list[35];

    viewFiveDayForecast(day1, day2, day3, day4, day5);

  }).catch(function (error) {
    console.log(error.resonseJSON.message);
  });
}
// five Day Forecast Blue Tiles
function viewFiveDayForecast(day1, day2, day3, day4, day5) {
  //Day 1 Forecast
  $("#day1").text(new Date(day1.dt_txt).toLocaleDateString());
  $("#day1-icon").attr({
    src: "http://openweathermap.org/img/wn/" + day1.weather[0].icon + ".png",
    alt: day1.weather[0].description
  });
  $("#day1-temp").text("temp: " + day1.main.temp + "°F");
  $("#day1-humid").text("humidity: " + day1.main.humidity + "%");

  //Day 2 Forecast
  $("#day2").text(new Date(day2.dt_txt).toLocaleDateString());
  $("#day2-icon").attr({
    src: "http://openweathermap.org/img/wn/" + day2.weather[0].icon + ".png",
    alt: day2.weather[0].description
  });
  $("#day2-temp").text("temp: " + day2.main.temp + "°F");
  $("#day2-humid").text("humidity: " + day2.main.humidity + "%");

  //Day 3 Forecast
  $("#day3").text(new Date(day3.dt_txt).toLocaleDateString());
  $("#day3-icon").attr({
    src: "http://openweathermap.org/img/wn/" + day3.weather[0].icon + ".png",
    alt: day3.weather[0].description
  });
  $("#day3-temp").text("temp: " + day3.main.temp + "°F");
  $("#day3-humid").text("humidity: " + day3.main.humidity + "%");

  //Day 4 Forecast
  $("#day4").text(new Date(day4.dt_txt).toLocaleDateString());
  $("#day4-icon").attr({
    src: "http://openweathermap.org/img/wn/" + day4.weather[0].icon + ".png",
    alt: day4.weather[0].description
  });
  $("#day4-temp").text("temp: " + day4.main.temp + "°F");
  $("#day4-humid").text("humidity: " + day4.main.humidity + "%");

  //Day 5 Forecast
  $("#day5").text(new Date(day5.dt_txt).toLocaleDateString());
  $("#day5-icon").attr({
    src: "http://openweathermap.org/img/wn/" + day5.weather[0].icon + ".png",
    alt: day5.weather[0].description
  });
  $("#day5-temp").text("temp: " + day5.main.temp + "°F");
  $("#day5-humid").text("humidity: " + day5.main.humidity + "%");
}