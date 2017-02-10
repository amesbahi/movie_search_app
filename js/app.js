(function movieSearchModule() {
    "use strict";
    // Variables
    var searchButton = document.getElementById('submit');
    var moviesList = document.getElementById('movies');
    var ombdbAPI = "http://www.omdbapi.com/?";
    var mainContent = document.getElementsByClassName('main-content')[0];

    // Clicking on the search button sends a GET request to the omdb API
    searchButton.addEventListener("click", function (event) {
        event.preventDefault();
        var searchInput = document.getElementById('search').value;
        var yearInput = document.getElementById('year').value;
        // What we want ombdb API to return
        var omdbRequestData = {
            s: searchInput,
            y: yearInput,
            r: "json",
        }

        // Success callback
        function success(data) {
            if (data.Response == "True") {
                // Loop through and display the movies from the response
                var moviesHTML = "";
                $.each(data.Search, function (i, item) {
                    moviesHTML += '<li><div class="poster-wrap">';
                    if (item.Poster != "N/A") {
                        moviesHTML += '<a href=http://www.imdb.com/title/' + item.imdbID + '><img class="movie-poster" src="' + item.Poster + '"></a></div>';
                    } else {
                        // Display placeholder icon when API does not return poster data
                        moviesHTML += '<i class="material-icons poster-placeholder">crop_original</i></div>';
                    }
                    moviesHTML += '<span class="movie-title">' + item.Title + '</span>';
                    moviesHTML += '<span class="movie-year">' + item.Year + '</span></li>';
                });
                moviesList.innerHTML = moviesHTML;
            }

            // Let user know when search returns no movie data
            if (data.Response == "False") {
                var noMovieData = "";
                noMovieData += '<li class="no-movies">';
                noMovieData += '<i class="material-icons icon-help">help_outline</i>';
                noMovieData += 'No movies found that match: ';
                noMovieData += searchInput;
                noMovieData += '</li>';
              mainContent.innerHTML = noMovieData;
            }
        };
        $.getJSON(ombdbAPI, omdbRequestData, success);
    }); // end submit click

} ()); // end module