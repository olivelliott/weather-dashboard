var searchButtonEl = $('#search-btn');
var cities = [];


// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city -->


//  * When I click the search button, a button is dynamically generated and displayed in a card underneath
//  ! To Do: Fix the multiple button issue
function cityButtonHandler() {
    var pastSearchValue = JSON.parse(localStorage.getItem('cities'));
   for (var i = 0; i < pastSearchValue.length; i++) {
    var searchHistoryButton = $('<button>').addClass('btn search-history-button').text(pastSearchValue[i]).attr('type', 'submit');
    console.log(searchHistoryButton);
    $(searchHistoryButton).appendTo('#search-history');
   }; getApi();
}

// * Once the submit button is clicked and cityButtonHandler goes, I fetch the api information needed to display it to the DOM 
function getApi() {
  var requestUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&appid=66d2d9bcf1100f15b471153e4495b6ac";
    fetch(requestUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(weatherData) {
                displayForecast(weatherData);
            })
        } else {
            alert('Error:' + response);
        }
    })
};

//  * I take the data from the Api and display it onto the html
function displayForecast(weatherData) {
    console.log(weatherData);
}

//  * When I click the submit button, the search is stored in localStorage and taken to cityButtonHandler function
$(searchButtonEl).on('click', function(event) {
    event.preventDefault();
    var searchValue = $(this).siblings('#search-item').val().trim();
    cities.push(searchValue);
    localStorage.setItem('cities', JSON.stringify(cities));
    $('#search-item').val('');
    // searchHistoryHandler();
    cityButtonHandler();
});


// var string = "Hello World";
// Now let's use the split() method and pass o in as the argument and separator, as shown here:

// string.split("o");

// function loadSearchHistory() {
//     // $('#search-history').each(function() {
//         var pastSearchValue = JSON.parse(localStorage.getItem('cities'));
//         // for (var i = 0; i < pastSearchValue.length; i++) {
//         //     var searchHistoryButton = $('<button>').addClass('btn search-history-button').text(pastSearchValue[i]).attr('type', 'submit');
//         //     console.log(searchHistoryButton);
//         //     $(searchHistoryButton).appendTo('#search-history');
//         //    };
//         cityButtonHandler(pastSearchValue);
//         }
