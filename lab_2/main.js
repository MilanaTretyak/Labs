const personalMovieDB = {
    privat: false,
    movies: {
        Inception: 9,
        "The Dark Knight": 10,
        "Interstellar": 9
    }
};

function displayMovies() {
    const movieTable = document.getElementById('movie-table');

    const table = document.createElement('table');
    table.border = "1";


    const headerRow = document.createElement('tr');
    const titleHeader = document.createElement('th');
    titleHeader.innerText = 'Название фильма';
    const ratingHeader = document.createElement('th');
    ratingHeader.innerText = 'Оценка';
    headerRow.appendChild(titleHeader);
    headerRow.appendChild(ratingHeader);
    table.appendChild(headerRow);

    for (let movie in personalMovieDB.movies) {
        const row = document.createElement('tr');
        const movieName = document.createElement('td');
        movieName.innerText = movie;
        const movieRating = document.createElement('td');
        movieRating.innerText = personalMovieDB.movies[movie];
        row.appendChild(movieName);
        row.appendChild(movieRating);
        table.appendChild(row);
    }

    movieTable.appendChild(table);
}

if (!personalMovieDB.privat) {
    displayMovies();
}