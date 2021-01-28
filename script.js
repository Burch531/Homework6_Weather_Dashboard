$(document).ready(function () {
  //search button for enter or on mouse click will get weather info from input text
  var input = document.getElementById("search");
  input.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      document.getElementById("searchButton").click();
    }
  });
  $("#searchButton").on("click", function () {
    var searchCity = $("#search").val();
    $("#search").val("");
    weatherForecast(searchCity);
    fiveDayForecast(searchCity);
  });
  // local storage
  var saveCity = JSON.parse(localStorage.getItem("history")) || [];

  if (saveCity.length > 0) {
    weatherFunction(saveCity[saveCity.length - 1]);
  }
  for (var i = 0; i < saveCity.length; i++) {
    createList(saveCity[i]);
  }
  //create list
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
  //Function for current weather
  function weatherForecast(searchCity) {
    //API to get current weather//
    $.ajax({
      type: "GET",
      url: "https://api.openweathermap.org/data/2.5/weather?q=" + searchCity + "&appid=" + apiKey + "&units=imperial",

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
      //API to get UV//
      $.ajax({
        type: "GET",
        url: "https://api.openweathermap.org/data/2.5/uvi?appid=" + apiKey + "&lat=" + lat + "&lon=" + lon,

      }).then(function (response) {
        console.log(response);

        var uvColor;
        var uvResponse = response.value;
        var uvIndex = $("<p>").addClass("card-text").text("UV Index: ");
        var btn = $("<span>").addClass("btn btn-sm").text(uvResponse);

        //will give the UV a color indicator low, moderate or high
        if (uvResponse < 3) {
          btn.addClass("btn-success");
        } else if (uvResponse > 6) {
          btn.addClass("btn-danger");
        } else {
          btn.addClass("btn-warning");
        }

        cardBodyForecast.append(uvIndex);
        $("#current.card-body").append(uvIndex.append(btn));

      });

      // merge and add to page
      title.append(img);
      cardBodyForecast.append(title, temp, humid, wind);
      cardForecast.append(cardBodyForecast);
      $("#current").append(cardForecast);
      console.log(data);
    });
  }

  //API for 5 day forecast
  function fiveDayForecast(searchCity) {
    $.ajax({
      type: "GET",
      url: "https://api.openweathermap.org/data/2.5/forecast?q=" + searchCity + "&appid=" + apiKey + "&units=imperial",
    }).then(function (data) {
      console.log(data);
      var results = data.list

      $("#fiveDay").html("<h4>5-Day Forecast:</h4> </br>").append("<div class=\"row\">");

      for (var i = 0; i < results.length; i++) {

        if (results[i].dt_txt.indexOf("12:00:00") !== -1) {

          var columnFive = $("<div>").addClass("col-md-2");
          var card = $("<div>").addClass("card bg-info text-white");
          var cardBody = $("<div>").addClass("card-body p-2")
          var dateCard = $("<h5>").addClass("card-title").text(new Date(results[i].dt_txt).toLocaleDateString());
          var temperature = $("<p>").addClass("card-text forecastTemp").text("Temperature: " + results[i].main.temp + " °F");
          var humidity = $("<p>").addClass("card-text forecastHumidity").text("Humidity: " + results[i].main.humidity + "%");
          var image = $("<img>").attr("src", "https://openweathermap.org/img/w/" + results[i].weather[0].icon + ".png");
          //merge and add to page
          columnFive.append(card.append(cardBody.append(dateCard, image, humidity, temperature)));

          $("#fiveDay").append(columnFive);

        }
      }
    });
  }
});

