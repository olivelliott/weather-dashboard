var searchButtonEl = $('#search-btn');
var currentWeatherDisplayEl = $('#current-weather');
var weatherApi = '66d2d9bcf1100f15b471153e4495b6ac';
// var currentDayEl = moment().format('dddd MMMM Do')
var cities = [];


// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
//  ! To do - add search history
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city -->


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


//  * When I click the submit button, the search is pushed to an array and stored in localStorage
// * API function is then called
$(searchButtonEl).on('click', function(event) {
    event.preventDefault();
    var searchValue = $(this).siblings('#search-item').val().trim();
    if (searchValue) {
        // fetchWeatherApi(searchValue);
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

// *  I fetch the api data for exchanging search for lat/lon
function placeIdCoordinates (searchValue) {
    var requestUrl = 'https://api.openweathermap.org/geo/1.0/direct?q=' + searchValue + '&appid=' + weatherApi;
    fetch(requestUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function(coordinateData) {
                var currentLocation = coordinateData[0].name;
                var currentLon = coordinateData[0].lon;
                var currentLat = coordinateData[0].lat;
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
    } fiveDayForecast(weatherData);
};
// //  * I take the data from the Api and dynamically create 5 day forecast data
function fiveDayForecast(weatherData) {
    console.log(weatherData.daily);
    var fiveDayData = weatherData.daily;
    var cardHolder = $('<div>').addClass('forecast-info row').appendTo('#forecast-cards');

    for (var i=0; i < 5; i++) {
        var forecastCardEl = $('<div>').addClass('card').appendTo(cardHolder);
        $('<h2>').addClass('card-header').text(moment().add([i], 'day')).appendTo(forecastCardEl);
        var forecastTemp = fiveDayData[i].temp.day;
        var forecastHumidity = 'Humidity : ' + fiveDayData[i].humidity + '%';
        var forecastWindSpeed = fiveDayData[i].wind_speed;
        var forecastUVIndex = fiveDayData[i].uvi;

        var iconCode = fiveDayData[i].weather[0].icon;
        var iconUrl = 'http://openweathermap.org/img/wn/' + iconCode + '@2x.png';
        $('<img>').attr('src', iconUrl).appendTo(forecastCardEl);

        $('<li>' + forecastTemp + ' F' + '</li>').appendTo(forecastCardEl);
        $('<li>' + forecastHumidity + '</li>').appendTo(forecastCardEl);
        $('<li>' + forecastWindSpeed + ' MPH' + '</li>').appendTo(forecastCardEl);

        if (forecastUVIndex <= 4) {
            $('<li>' + 'UV Index : ' + forecastUVIndex + '</li>').addClass('index goodIndex').appendTo(forecastCardEl);
        } else if (forecastUVIndex > 4 && forecastUVIndex < 8) {
            $('<li>' + 'UV Index : ' + forecastUVIndex + '</li>').addClass('index moderateIndex').appendTo(forecastCardEl);
        } else {
            $('<li>' + 'UV Index : ' + forecastUVIndex + '</li>').addClass('index badIndex').appendTo(forecastCardEl);
        }
    }
}

// 0:
// clouds: 100
// dew_point: 58.96
// dt: 1653498000
// feels_like: {day: 68.92, night: 63.34, eve: 65.52, morn: 59.54}
// humidity: 71
// moon_phase: 0.85
// moonrise: 1653464040
// moonset: 1653508440
// pop: 0.08
// pressure: 1024
// sunrise: 1653472975
// sunset: 1653524425
// temp:
    // day: 68.99
    // eve: 65.43
    // max: 70.68
    // min: 58.82
    // morn: 59.68
    // night: 63.14
// [[Prototype]]: Object
// uvi: 6.94
// weather: Array(1)
// 0:
// description: "overcast clouds"
// icon: "04d"
// id: 804
// main: "Clouds"
// [[Prototype]]: Object
// length: 1
// [[Prototype]]: Array(0)
// wind_deg: 51
// wind_gust: 17.07
// wind_speed: 9.37














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
