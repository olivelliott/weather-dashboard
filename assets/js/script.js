var searchButtonEl = $('#search-btn');
var weatherApi = '66d2d9bcf1100f15b471153e4495b6ac';
var searchHistoryButton = $('.search-history-button');
const weatherContainerEl = document.querySelector('.weather-container');
var cities =  [];

// JSON.parse(localStorage.getItem('usernames')) 

// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
//  ! To do - add search history
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city -->

//  * I take the current location data and dynamically generate a button 
// function searchButtonHandler(weatherData, currentLocation) {
//     // var searchLocation = currentLocation
//     // var array = cities.toString(' ');
//     // $('<a>').attr('href', .appendTo('.search-history-button');
//     localStorage.setItem('cities', JSON.stringify(cities));
//     // loadSearchHistory();
// }

// function loadSearchHistory() {
//     var searchHistory = JSON.parse(localStorage.getItem('cities'))
//     console.log(searchHistory);
// }



//  * When I click the submit button, I dynamically generate a button that will be displayed as search history
//  * I then push that value to save it into localStorage
$(searchButtonEl).on('click', function(event) {
    event.preventDefault();
    var searchValue = $(this).siblings('#search-item').val().trim();
    if (searchValue) {
        searchButton(searchValue);
        $('#search-item').val('');
    } else {
        alert('Please enter a city name');
    } 
    // searchHistoryHandler();
    // cityButtonHandler();
});

function searchButton(searchValue) {
    var searchButtonHolder = $('<ul>').addClass('search-history col').appendTo('#search-history');
    $('<li>' + searchValue + '</li>').addClass('btn search-history-button').appendTo(searchButtonHolder);
    placeIdCoordinates(searchValue);
}

// *  I fetch the api data for exchanging search for lat/lon
function placeIdCoordinates (searchValue) {
    // $('#current-forecast').innerHTML = '';
    var requestUrl = 'https://api.openweathermap.org/geo/1.0/direct?q=' + searchValue + '&appid=' + weatherApi;
    fetch(requestUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function(coordinateData) {
                var currentLocation = coordinateData[0].name;
                var currentLon = coordinateData[0].lon;
                var currentLat = coordinateData[0].lat;
                cities.push(currentLocation);
                localStorage.setItem('cities', JSON.stringify(cities));
                fetchWeatherApi(currentLon, currentLat, currentLocation);
            })
        }
    })
}

// *  I fetch the api data for that specific location
function fetchWeatherApi(currentLon, currentLat, currentLocation) {
    var requestUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + currentLat + '&lon=' + currentLon + '&appid=' + weatherApi + '&units=imperial&exclude=minutely,hourly';
      fetch(requestUrl).then(function(response) {
          if (response.ok) {
              response.json().then(function(weatherData) {
                //   fiveDayForecastApi(searchValue);
                  displayForecast(weatherData, currentLocation);
              })
          } else {
              alert('Connection Error: Try Again');
          }
      })
    //    ! To do: create a catch
  };

// DONE: the temperature, the humidity, the wind speed, and the UV index, an icon representation of weather conditions, current location
    //  * I take the data from the Api and dynamically place it into the DOM to display current forecast
function displayForecast(weatherData, currentLocation) {
    console.log(currentLocation)
    if (!weatherData) {
        alert('Error: Invalid Location');
    } else {
        $('<h2>').addClass('current-day').text(moment().format('dddd MMMM Do, h:mm a')).appendTo('#forecast-header');
        var currentTempEl = weatherData.current.temp;
        var currentFeelEl = weatherData.current.feels_like;
        var currentHumidityEl = 'Current Humidity : ' + weatherData.current.humidity + '%';
        var currentWindSpeedEl = 'Current Wind Speed : ' + weatherData.current.wind_speed + ' MPH';
        var currentUVIndexEl = weatherData.current.uvi;
        var iconCode = weatherData.current.weather[0].icon;
        var iconUrl = 'http://openweathermap.org/img/wn/' + iconCode + '@2x.png';
        $('#web-icon').attr('src', iconUrl);

        $('<h2>' + currentLocation + '</h2>').appendTo('#forecast-list');
        $('<li>' + currentTempEl + ' F' + '</li>').appendTo('#forecast-list');
        $('<li>' + 'Feels Like : ' + currentFeelEl + 'F' + '</li>').appendTo('#forecast-list');
        $('<li>' + currentHumidityEl + '</li>').appendTo('#forecast-list');
        $('<li>' + currentWindSpeedEl + '</li>').appendTo('#forecast-list');
        if (currentUVIndexEl <= 4) {
            $('<li>' + 'Current UV Index : ' + currentUVIndexEl + '</li>').addClass('index goodIndex').appendTo('#forecast-list');
        } else if (currentUVIndexEl > 4 && currentUVIndexEl < 8) {
            $('<li>' + 'Current UV Index : ' + currentUVIndexEl + '</li>').addClass('index moderateIndex').appendTo('#forecast-list');
        } else {
            $('<li>' + 'Current UV Index : ' + currentUVIndexEl + '</li>').addClass('index badIndex').appendTo('#forecast-list');
        }
    } fiveDayForecast(weatherData, currentLocation);
};


// * I take the data from the Api and dynamically create 5 day forecast data
function fiveDayForecast(weatherData) {
    var fiveDayData = weatherData.daily;
    var cardHolder = $('<div>').addClass('forecast-info row').appendTo('#forecast-cards');

    for (var i=0; i < 5; i++) {
        var forecastCardEl = $('<div>').addClass('card').appendTo(cardHolder);
        $('<h2>').addClass('card-header').text(moment().add([i], 'day')).appendTo(forecastCardEl);
        var forecastHighTemp = 'High : ' + fiveDayData[i].temp.day + ' F';
        var forecastLowTemp = 'Low : ' + fiveDayData[i].temp.night + 'F';
        var forecastHumidity = 'Humidity : ' + fiveDayData[i].humidity + '%';
        var forecastWindSpeed = 'Wind Speed : ' + fiveDayData[i].wind_speed + ' MPH';
        var forecastUVIndex = fiveDayData[i].uvi;
        var iconCode = fiveDayData[i].weather[0].icon;
        var iconUrl = 'http://openweathermap.org/img/wn/' + iconCode + '@2x.png';

        $('<img>').attr('src', iconUrl).appendTo(forecastCardEl);
        $('<li>' + forecastHighTemp + '</li>').appendTo(forecastCardEl);
        $('<li>' + forecastLowTemp + '</li>').appendTo(forecastCardEl);
        $('<li>' + forecastHumidity + '</li>').appendTo(forecastCardEl);
        $('<li>' + forecastWindSpeed + '</li>').appendTo(forecastCardEl);

        if (forecastUVIndex <= 4) {
            $('<li>' + 'UV Index : ' + forecastUVIndex + '</li>').addClass('index goodIndex').appendTo(forecastCardEl);
        } else if (forecastUVIndex > 4 && forecastUVIndex < 8) {
            $('<li>' + 'UV Index : ' + forecastUVIndex + '</li>').addClass('index moderateIndex').appendTo(forecastCardEl);
        } else {
            $('<li>' + 'UV Index : ' + forecastUVIndex + '</li>').addClass('index badIndex').appendTo(forecastCardEl);
        }
    } 
    // searchButtonHandler(weatherData, currentLocation);
}

function loadSearchHistory() {
    var searchHistoryEl = JSON.parse(localStorage.getItem('cities'));
    for (var i = 0; i < searchHistoryEl.length; i++) {
        searchValue = searchHistoryEl[i]
        searchButton(searchValue);
    }
}

loadSearchHistory();


// $('#search-btn').on('click', searchButtonHandler);
// loadSearchHistory();


//  * When I click the search button, a button is dynamically generated and displayed in a card underneath
//  ! To Do: Fix the multiple button issue
// function cityButtonHandler() {
//     var pastSearchValue = JSON.parse(localStorage.getItem('cities'));
//    for (var i = 0; i < pastSearchValue.length; i++) {
//     var searchHistoryButton = $('<button>').addClass('btn search-history-button').text(pastSearchValue[i]).attr('type', 'submit');
//     console.log(searchHistoryButton);
//     $(searchHistoryButton).appendTo('#search-history');
//    }; fetchWeatherApi();
// }


// $('.search-history-button').on('submit', displayForecast());



// function saveSearchHistory(searchValue) {
//     if (cities) {
//         cities.push(searchValue);
//         localStorage.setItem('cities', JSON.stringify(cities));
//         placeIdCoordinates(searchValue);
//     } else if (!cities) {
//         cities.push(searchValue);
//         localStorage.setItem('cities', JSON.stringify(cities));
//         placeIdCoordinates(searchValue);
//     }
// }

// //  * I find the value of the search and push it to dynamically generate a button for that location
// function searchButtonHandler(searchValue) {
//     var searchValue = $(this).siblings('#search-item').val().trim();
//     if (searchValue) {
//         placeIdCoordinates(searchValue);
//     } else {
//     } 
// }

// function searchHistoryBtn(searchValue) {
//     var searchButtonHolder = $('<ul>').addClass('search-history col').appendTo('#search-history');
//     $('<li>' + searchValue + '</li>').addClass('btn search-history-button').appendTo(searchButtonHolder);
//     placeIdCoordinates(searchValue);
// }













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
