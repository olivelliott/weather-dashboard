var searchButtonEl = $('#search-btn');
var cities = [];

//  ! TODO: unnecessary?
// function loadSearchHistory() {
//     // $('#search-history').each(function() {
//         var oldSearches = JSON.parse(localStorage.getItem('cities'));
//         for ( var i = 0; i < oldSearches.length; i++) {
//         citySearchEl = $('<button>').addClass('btn search-value').text(oldSearches).attr('type', 'submit');
//        $(citySearchEl).appendTo('#search-history');
//         }
//         console.log(oldSearches);
//     };



function searchHistoryHandler() {
    var pastSearchValue = JSON.parse(localStorage.getItem('cities'));
   for (var i = 0; i < pastSearchValue.length; i++) {
    pastSearchElement = $('<button>').addClass('btn search-value').text(pastSearchValue);
    $(pastSearchElement).appendTo('#search-history');
   }; console.log(pastSearchValue)
}

$(searchButtonEl).on('click', function(event) {
    event.preventDefault();
    var searchValue = $(this).siblings('#search-item').val().trim();
    //  ! TODO clear the input form after typing
    cities.push(searchValue);
    localStorage.setItem('cities', JSON.stringify(cities));
    searchHistoryHandler();
})

searchHistoryHandler();

// var string = "Hello World";
// Now let's use the split() method and pass o in as the argument and separator, as shown here:

// string.split("o");