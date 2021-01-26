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








          
          if (uvResponse < 3) {
            btn.addClass("btn-success");
        } else if (uvResponse > 6) {
            btn.addClass("btn-danger");
        } else {
            btn.addClass("btn-warning");
        }