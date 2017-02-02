(function () {
    "use strict";
    // Variables
    var searchInput = document.getElementById('search').value;
    var yearInput = document.getElementById('year').value;
    var searchButton = document.getElementById('submit');
    var moviesList = document.getElementById('movies');

    // What we ombdb API to return
    var omdbRequestData = {
        s: searchInput,
        y: yearInput,
        r: "json"
    }

    var ombdbAPI = "http://www.omdbapi.com/?";

    // Success callback
    function success(data) {
        if (data.Response == true) {
            // Loop through and displays the movies from the response
            var moviesHTML = '<li>';
            $.each(data, function (index, movie) {
                moviesHTML += '<div class="poster-wrap">';
                moviesHTML += '<img class="movie-poster" src="' + movie.Poster + '"></div>';
                moviesHTML += '<span class="movie-title">' + movie.Title + '</span>';
                moviesHTML += '<span class="movie-year">' + movie.Year + '</span></li>';
            });
            moviesList.innerHTML(moviesHTML);
        }
    };

    searchButton.addEventListener("click", function (evt) {
        evt.preventDefault();
        $.getJSON(ombdbAPI, omdbRequestData, success);
    }); // end submit click
    
} ()); // end module