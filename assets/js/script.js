var searchButtonEl = $('#search-btn');
var currentWeatherDisplayEl = $('#current-weather');
var weatherApi = '66d2d9bcf1100f15b471153e4495b6ac';
var cities = [];


// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city


// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city -->

// api = AIzaSyDwDj4Jf2xSA6hJJ9cYetg8hn4SX3OPs04

//  * When I click the search button, a button is dynamically generated and displayed in a card underneath
//  ! To Do: Fix the multiple button issue
// function cityButtonHandler() {
//     var pastSearchValue = JSON.parse(localStorage.getItem('cities'));
//    for (var i = 0; i < pastSearchValue.length; i++) {
//     var searchHistoryButton = $('<button>').addClass('btn search-history-button').text(pastSearchValue[i]).attr('type', 'submit');
//     console.log(searchHistoryButton);
//     $(searchHistoryButton).appendTo('#search-history');
//    }; currentWeatherApi();
// }


//  * When I click the submit button, the search is pushed to an array and stored in localStorage
// * API function is then called
$(searchButtonEl).on('click', function(event) {
    event.preventDefault();
    var searchValue = $(this).siblings('#search-item').val().trim();
    if (searchValue) {
        // currentWeatherApi(searchValue);
        placeIdCoordinates(searchValue);
        cities.push(searchValue);
        localStorage.setItem('cities', JSON.stringify(cities));
        $('#search-item').val('');
    } else {
        alert('Please enter a city name');
    }
    // searchHistoryHandler();
    // cityButtonHandler();
});


function placeIdCoordinates (searchValue) {
    var requestUrl = 'https://api.openweathermap.org/geo/1.0/direct?q=' + searchValue + '&appid=' + weatherApi;
    fetch(requestUrl).then(function (response) {
        // console.log(response);
        if (response.ok) {
            response.json().then(function(coordinateData) {
                console.log(coordinateData[0].lon);
                var currentLon = coordinateData[0].lon;
                var currentLat = coordinateData[0].lat;
                currentWeatherApi(currentLon, currentLat);
            })
        }
    })
}



//  * ^^ I push the input value to the next function below
// *  I fetch the api data for that specific location
function currentWeatherApi(currentLon, currentLat) {
    // console.log(searchValue);
    var requestUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + currentLat + '&lon=' + currentLon + '&appid=' + weatherApi + '&units=imperial&exclude=minutely,hourly';
      fetch(requestUrl).then(function(response) {
          console.log(response);
          if (response.ok) {
              response.json().then(function(weatherData) {
                //   fiveDayForecastApi(searchValue);
                  displayForecast(weatherData);
              })
          } else {
              alert('Connection Error: Try Again');
          }
      })
    //    ! To do: create a catch
  };

// ! To Do: city name // current date
// DONE: the temperature, the humidity, the wind speed, and the UV index, an icon representation of weather conditions,
    //  * I take the data from the Api and dynamically place it into the DOM to display current forecast
function displayForecast(weatherData) {
    console.log(weatherData);
    if (!weatherData) {
        alert('Error: Invalid Location');
    } else {
        $('<h2>').addClass('current-day').text(moment().format('dddd MMMM Do, h:mm a')).appendTo('#forecast-header');
        var iconCode = weatherData.current.weather[0].icon;
        var iconUrl = 'http://openweathermap.org/img/wn/' + iconCode + '@2x.png';
        $('#web-icon').attr('src', iconUrl);

        var currentTempEl = weatherData.current.temp;
        $('<li>' + currentTempEl + ' F' + '</li>').appendTo('#forecast-list');

        var currentFeelEl = weatherData.current.feels_like;
        $('<li>' + 'Feels Like : ' + currentFeelEl + 'F' + '</li>').appendTo('#forecast-list');

        var currentHumidityEl = 'Current Humidity : ' + weatherData.current.humidity + '%';
        $('<li>' + currentHumidityEl + '</li>').appendTo('#forecast-list');

        var currentWindSpeedEl = 'Current Wind Speed : ' + weatherData.current.wind_speed + ' MPH';
        $('<li>' + currentWindSpeedEl + '</li>').appendTo('#forecast-list');
        
        var currentUVIndexEl = weatherData.current.uvi;
        if (currentUVIndexEl <= 4) {
            $('<li>' + 'Current UV Index : ' + currentUVIndexEl + '</li>').addClass('index goodIndex').appendTo('#forecast-list');
        } else if (currentUVIndexEl > 4 && currentUVIndexEl < 8) {
            $('<li>' + 'Current UV Index : ' + currentUVIndexEl + '</li>').addClass('index moderateIndex').appendTo('#forecast-list');
        } else {
            $('<li>' + 'Current UV Index : ' + currentUVIndexEl + '</li>').addClass('index moderateIndex').appendTo('#forecast-list');
        }

    }
    // } displayFiveDayForecast(weatherData);
};


//   function fiveDayForecastApi(searchValue) {
//       var requestUrl = 'https://api.openweathermap.org/data/2.5/forecast/daily?q=' + searchValue + '&units=imperial&cnt=5&appid=' + weatherApi;
//         fetch(requestUrl).then(function(response) {
//             console.log(response)
//             if (response.ok) {
//                 response.json().then(function(forecastData) {
//                     displayFiveDayForecast(forecastData);
//                 })
//             }
//         });
// }



// //  * I take the data from the Api and dynamically create 5 day forecast data
// function displayFiveDayForecast(forecastData) {
//     console.log(forecastData);
    
// }














// var string = 'Hello World';
// Now let's use the split() method and pass o in as the argument and separator, as shown here:

// string.split('o');

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
