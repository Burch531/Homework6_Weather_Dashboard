//search button feature
$(document).ready(function () {
   $("#searchButton").on("click", function () {
      var searchCity = $("#search").val();
      $("#search").val("");
      weatherFunction(searchCity);
      weatherForecast(searchCity);
  });

  //grab item from local storage
  var history = JSON.parse(localStorage.getItem("history")) || [];
//sets history array search to correct length.
  if (history.length > 0) {
      weatherFunction(history[history.length - 1]);
  }// makes a row for each element in history array(searchTerms)
  for (var i = 0; i < history.length; i++) {
      createRow(history[i]);
  }

  
  function createRow(text) {
    var listCity = $("<li>").addClass("list-group-item").text(text);
    $(".history").append(listCity);
}
//listener for list item on click functionality.
$(".history").on("click", "li", function () {
    weatherFunction($(this).text());
    weatherForecast($(this).text());
});
