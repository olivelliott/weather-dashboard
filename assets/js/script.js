var searchButtonEl = $('#searchbtn');

function searchHistoryHandler() {
    pastSearchValue = JSON.parse(localStorage.getItem("location"));
    pastSearchElement = $('<button>').addClass('btn').text(pastSearchValue);
    $(pastSearchElement).appendTo('#search-history');
}

$(searchButtonEl).on('click', function(event) {
    event.preventDefault();
    var searchValue = $(this).siblings('#search-item').val().trim();
    localStorage.setItem('location', JSON.stringify(searchValue));
    searchHistoryHandler();
})