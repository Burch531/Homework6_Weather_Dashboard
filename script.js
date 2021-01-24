$(document).ready(function () {
  //search button on click will get weather info from input text
  $("#searchButton").on("click", function () {
      var searchCity = $("#search").val();
      $("#search").val("");
      weatherFunction(searchCity);
      weatherForecast(searchCity);
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
  //listner to create list on click//
  $(".history").on("click", "li", function () {
      weatherFunction($(this).text());
      weatherForecast($(this).text());
  });

  function weatherFunction(searchCity) {
//API to get current weather//
      $.ajax({
          type: "GET",
          url: "https://api.openweathermap.org/data/2.5/weather?q=" + searchCity + "&appid=f7cd1c5ba42d617eae2916f00f40439d&units=imperial",


      }).then(function (data) {
          if (saveCity.indexOf(searchCity) === -1) {
              saveCity.push(searchCity);
              localStorage.setItem("saveCity", JSON.stringify(saveCity));
              createList(searchCity);
          }
          $("#current").empty();

          var title = $("<h3>").addClass("card-title").text(data.name + " (" + new Date().toLocaleDateString() + ")");
          var img = $("<img>").attr("src", "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png");


          var card = $("<div>").addClass("card");
          var cardBody = $("<div>").addClass("card-body");
          var wind = $("<p>").addClass("card-text").text("Wind Speed: " + data.wind.speed + " MPH");
          var humid = $("<p>").addClass("card-text").text("Humidity: " + data.main.humidity + "%");
          var temp = $("<p>").addClass("card-text").text("Temperature: " + data.main.temp + " °F");

          var lon = data.coord.lon;
          var lat = data.coord.lat;
          //API to get UV//
          $.ajax({
              type: "GET",
              url: "https://api.openweathermap.org/data/2.5/uvi?appid=f7cd1c5ba42d617eae2916f00f40439d&lat=" + lat + "&lon=" + lon,


          }).then(function (response) {
              console.log(response);

              var uvColor;
              var uvResponse = response.value;
              var uvIndex = $("<p>").addClass("card-text").text("UV Index: ");
              var btn = $("<span>").addClass("btn btn-sm").text(uvResponse);


              if (uvResponse < 3) {
                  btn.addClass("btn-success");
              } else if (uvResponse < 7) {
                  btn.addClass("btn-warning");
              } else {
                  btn.addClass("btn-danger");
              }

              cardBody.append(uvIndex);
              $("#current .card-body").append(uvIndex.append(btn));

          });

          // merge and add to page
          title.append(img);
          cardBody.append(title, temp, humid, wind);
          card.append(cardBody);
          $("#current").append(card);
          console.log(data);
      });
  }
 
//function to get 5 day forcast and display
  function weatherForecast(searchCity) {
      $.ajax({
          type: "GET",
          url: "https://api.openweathermap.org/data/2.5/forecast?q=" + searchCity + "&appid=f7cd1c5ba42d617eae2916f00f40439d&units=imperial",

      }).then(function (data) {
          console.log(data);
          $("#fiveDay").html("<h4>5-Day Forecast:</h4></br>").append("<div class=\"row\">");

          for (var i = 0; i < data.list.length; i++) {

              if (data.list[i].dt_txt.indexOf("15:00:00") !== -1) {

                  var titleFive = $("<h5>").addClass("card-title").text(new Date(data.list[i].dt_txt).toLocaleDateString());
                  var imgFive = $("<img>").attr("src", "https://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png");

                  var columnFive = $("<div>").addClass("col-md-2");
                  var cardFive = $("<div>").addClass("card bg-info text-white");
                  var cardBodyFive = $("<div>").addClass("card-body p-2");
                  var humidFive = $("<p>").addClass("card-text").text("Humidity: " + data.list[i].main.humidity + "%");
                  var tempFive = $("<p>").addClass("card-text").text("Temperature: " + data.list[i].main.temp + " °F");

                
                  columnFive.append(cardFive.append(cardBodyFive.append(titleFive, imgFive, tempFive, humidFive)));
               
                  $("#fiveDay .row").append(columnFive);

                 
              }
          }
      });
  }

});