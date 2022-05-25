var searchButtonEl = $('#search-btn');
var currentWeatherDisplayEl = $('#current-weather');
var weatherApi = '66d2d9bcf1100f15b471153e4495b6ac';
var cities = [];


// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city


// THEN I am presented with the
// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city -->

// api = AIzaSyDwDj4Jf2xSA6hJJ9cYetg8hn4SX3OPs04

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

//  * Get latitude and longitude coordinates from the location types into the input field
// function getLocation() {
//     var requestUrl = "https://maps.googleapis.com/maps/api/geocode/json?place_id=ChIJd8BlQ2BZwokRAFUEcm_qrcA&key=AIzaSyDwDj4Jf2xSA6hJJ9cYetg8hn4SX3OPs04";
//     fetch(requestUrl).then(function(response) {
//         if (response.ok) {
//             response.json().then(function(location) {
//                 console.log(location)
//             })
//         };
//     });
// }

//  * When I click the submit button, the search is pushed to an array and stored in localStorage
// * API function is then called
$(searchButtonEl).on('click', function(event) {
    event.preventDefault();
    var searchValue = $(this).siblings('#search-item').val().trim();
    if (searchValue) {
        getApi(searchValue);
        cities.push(searchValue);
        localStorage.setItem('cities', JSON.stringify(cities));
        $('#search-item').val('');
    } else {
        alert('Please enter a city name');
    }
    // searchHistoryHandler();
    // cityButtonHandler();
});



//  * ^^ I push the input value to the next function below
// *  I fetch the api data for that specific location
function getApi(searchValue) {
    // console.log(searchValue);
    var requestUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + searchValue + "&appid=66d2d9bcf1100f15b471153e4495b6ac&units=imperial";
      fetch(requestUrl).then(function(response) {
          console.log(response);
          if (response.ok) {
              response.json().then(function(weatherData) {
                  displayForecast(weatherData);
              })
          } else {
              alert('Connection Error: Try Again');
          }
      })
    //    ! To do: create a catch
  };



//   city name, the date, an icon representation of weather conditions,
// the temperature, the humidity, the wind speed, and the UV index
  //  * I take the data from the Api and dynamically place it into the DOM
function displayForecast(weatherData) {
    console.log(weatherData);
    if (!weatherData) {
        alert('Error: Invalid Location');
    } else {
        // currentWeatherDisplayEl = $('div').addClass('card row').attr('id', 'current-weather-display').appendTo('#weather-forecast');
        var currentLocationEl = weatherData.name;
        $('<h2>' + currentLocationEl + '</h2>').appendTo('#forecast-header');

        var currentTempEl = weatherData.main.temp;
        $('<li>' + currentTempEl + ' F' + '</li>').appendTo('#current-weather-display');

        var currentFeelEl = weatherData.main.feels_like;
        $('<li>' + 'Feels Like : ' + currentFeelEl + '</li>').appendTo('#current-weather-display');

        var currentHumidityEl = "Current Humidity : " + weatherData.main.humidity + "%";
        $('<li>' + currentHumidityEl + '</li>').appendTo('#current-weather-display');

        var currentWindSpeedEl = "Current Wind Speed : " + weatherData.wind.speed + " MPH";
        $('<li>' + currentWindSpeedEl + '</li>').appendTo('#current-weather-display');
         //  ! currentDateEl = weatherData.date;
        // ! currentUVIndexEl = weatherData.main.current.uvi;
        // console.log(currentUVIndexEl);
        // currentIconEl = weatherData.weather.icon;
        // $('<a>').attr(img, 'href').text(currentIconEl).appendTo('#current-weather-display');
        // $('<a>').attr('src', currentIconEl)
    }
};

        // var currentTemp = weatherData.main;
    // for (var i=0; i < weatherData.length; i++) {
    //     var currentForecast = weatherData[i];
    //     console.log(currentForecast);
    //     console.log(weatherData[i])
    // }



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
