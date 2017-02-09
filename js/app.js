(function movieSearchModule() {
    "use strict";
    // Variables
    var searchButton = document.getElementById('submit');
    var moviesList = document.getElementById('movies');
    var ombdbAPI = "http://www.omdbapi.com/?";

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

        // Success callback
        function success(data) {
            if (data.Response == "True") {
                // Loop through and displays the movies from the response
                var moviesHTML = "";
                $.each(data.Search, function (i, item) {
                    moviesHTML += '<li><div class="poster-wrap">';
                    if (item.Poster != "N/A") {
                        moviesHTML += '<img class="movie-poster" src="' + item.Poster + '"></div>';
                    } else {
                        // Display placeholder icon when API does not return poster data
                        moviesHTML += '<i class="material-icons poster-placeholder">crop_original</i>';
                    }
                    moviesHTML += '<span class="movie-title">' + item.Title + '</span>';
                    moviesHTML += '<span class="movie-year">' + item.Year + '</span></li>';
                });
                console.log(moviesHTML);
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
              console.log(noMovieData);
              moviesList.innerHTML = noMovieData;
            }
        };
        $.getJSON(ombdbAPI, omdbRequestData, success);
    }); // end submit click

} ()); // end module