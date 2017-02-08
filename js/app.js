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
            $.each(data, function (index, movie) {
                var moviesHTML = '<li>';
                moviesHTML += '<div class="poster-wrap">';
                moviesHTML += '<img class="movie-poster" src="' + movie.Poster + '"></div>';
                moviesHTML += '<span class="movie-title">' + movie.Title + '</span>';
                moviesHTML += '<span class="movie-year">' + movie.Year + '</span></li>';
            });
            moviesList.innerHTML(moviesHTML);
        }
    };

    searchButton.addEventListener("click", function (event) {
        event.preventDefault();
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