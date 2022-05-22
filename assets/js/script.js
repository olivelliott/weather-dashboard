var searchButtonEl = $('#search-btn');
var cities = [];

function loadSearchHistory() {
    // $('#search-history').each(function() {
        var oldSearches = JSON.parse(localStorage.getItem('cities'));
        citySearchEl = $('<button>').addClass('btn search-value').text(oldSearches).attr('type', 'submit');
       $(citySearchEl).appendTo('#search-history');
        console.log(oldSearches);
    };



function searchHistoryHandler() {
    pastSearchValue = JSON.parse(localStorage.getItem('location'));
    pastSearchElement = $('<button>').addClass('btn search-value').text(pastSearchValue);
    $(pastSearchElement).appendTo('#search-history');
}


$(searchButtonEl).on('click', function(event) {
    event.preventDefault();
    var searchValue = $(this).siblings('#search-item').val().trim();
    cities.push(searchValue);
    localStorage.setItem('cities', JSON.stringify(cities));
    searchHistoryHandler;
})

loadSearchHistory();