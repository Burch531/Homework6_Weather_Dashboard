//search button feature
$(document).ready(function () {
   $("#searchButton").on("click", function () {
      var searchCity = $("#search").val();
      $("#search").val("");
      weatherFunction(searchCity);
      weatherForecast(searchCity);
  });

