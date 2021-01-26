$(document).ready(function () {
  //search button on click will get weather info from input text
  $("#searchButton").on("click", function () {
      var searchCity = $("#search").val();
      $("#search").val("");
      weatherForecast(searchCity);
      fiveDayForecast(searchCity);
  });
  
  var saveCity = JSON.parse(localStorage.getItem("history")) || [];

  if (saveCity.length > 0) {
      weatherFunction(saveCity[saveCity.length - 1]);
  }
  for (var i = 0; i < saveCity.length; i++) {
      createList(saveCity[i]);
  }
  
  function createList(city) {
      var listCity = $("<li>").addClass("list-group-item").text(city);
      $(".history").append(listCity);
  }
  // create list on click//
  $(".history").on("click", "li", function () {
      weatherForecast($(this).text());
      fiveDayForecast($(this).text());
  });
//function for clear button to remove serached city from list and reload fresh page// 
  function clear() {
    $(".history").empty();
    document.location.reload();
}

$("#clear").on("click", function () {
  localStorage.clear();
  clear();
  

}); 
 
var apiKey = "f7cd1c5ba42d617eae2916f00f40439d"
   
  function weatherForecast(searchCity) {
//API to get current weather//
      $.ajax({
          type: "GET",
          url: "https://api.openweathermap.org/data/2.5/weather?q=" + searchCity + "&appid=" + apiKey,

        }).then(function (data) {
          if (saveCity.indexOf(searchCity) === -1) {
              saveCity.push(searchCity);
              localStorage.setItem("saveCity", JSON.stringify(saveCity));
              createList(searchCity);
          }
          $("#current").empty();

          var cardForecast = $("<div>").addClass("card");
          var cardBodyForecast = $("<div>").addClass("card-body");
          var title = $("<h3>").addClass("card-title").text(data.name + " (" + new Date().toLocaleDateString() + ")");
          var wind = $("<p>").addClass("card-text").text("Wind Speed: " + data.wind.speed + " MPH");
          var humid = $("<p>").addClass("card-text").text("Humidity: " + data.main.humidity + "%");
          var temp = $("<p>").addClass("card-text").text("Temperature: " + data.main.temp + " °F");
          var img = $("<img>").attr("src", "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png");

          var lon = data.coord.lon;
          var lat = data.coord.lat;






          if (uvResponse < 3) {
            btn.addClass("btn-success");
        } else if (uvResponse > 6) {
            btn.addClass("btn-danger");
        } else {
            btn.addClass("btn-warning");
        }


        var columnFive = $("<div>").addClass("col-md-2");
        var card = $("<div>").addClass("card bg-info text-white");
        var cardBody = $("<div>").addClass("card-body p-2")
        var dateCard = $("<h5>").addClass("card-title").text(new Date(results[i].dt_txt).toLocaleDateString());
        var temperature = $("<p>").addClass("card-text forecastTemp").text("Temperature: " + results[i].main.temp + " °F");
        var humidity = $("<p>").addClass("card-text forecastHumidity").text("Humidity: " + results[i].main.humidity + "%");
        var image = $("<img>").attr("src", "https://openweathermap.org/img/w/" + results[i].weather[0].icon + ".png")