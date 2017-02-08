(function () {
    "use strict";
    // Variables
    var searchButton = document.getElementById('submit');
    var moviesList = document.getElementById('movies');
    var ombdbAPI = "http://www.omdbapi.com/?";

    // Success callback
    function success(data) {
        if (data.Response == true) {
            // Loop through and displays the movies from the response
            $.each(data.Search, function (i, item) {
                var moviesHTML = '<li>';
                moviesHTML += '<div class="poster-wrap">';
                moviesHTML += '<img class="movie-poster" src="' + item.Poster + '"></div>';
                moviesHTML += '<span class="movie-title">' + item.Title + '</span>';
                moviesHTML += '<span class="movie-year">' + item.Year + '</span></li>';
            });
            moviesList.innerHTML(moviesHTML);
        }
    };

    searchButton.addEventListener("click", function (event) {
        event.preventDefault();
        document.getElementsByClassName('desc')[0].style.display = 'none';
        if (moviesList.style.display == 'none') {
            moviesList.style.display == 'block';
        }
        var searchInput = document.getElementById('search').value;
        var yearInput = document.getElementById('year').value;
        // What we want ombdb API to return
        var omdbRequestData = {
            s: searchInput,
            y: yearInput,
            r: "json",
            plot: "full",
            page: "1"
        }
        console.log(omdbRequestData);
        $.getJSON(ombdbAPI, omdbRequestData, success);
    }); // end submit click

} ()); // end module