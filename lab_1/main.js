let numberOfFilms;

do {
    numberOfFilms = prompt('Сколько фильмов вы уже посмотрели?', '').trim();
} while (numberOfFilms === '' || numberOfFilms == null || isNaN(numberOfFilms));

const personalMovieDB = {
    count: numberOfFilms,
    movies: {},
};

for (let i = 0; i < 2; i++) {
    let lastMovie, movieRating;

    do {
        lastMovie = prompt('Один из последних просмотренных фильмов?', '').trim();
    } while (lastMovie === '' || lastMovie == null || lastMovie.length > 50);

    do {
        movieRating = prompt('На сколько оцените его?', '').trim();
    } while (movieRating === '' || movieRating == null || isNaN(movieRating));

    personalMovieDB.movies[lastMovie] = movieRating;
}

document.body.innerHTML = `<pre>${JSON.stringify(personalMovieDB, null, 2)}</pre>`;
console.log(personalMovieDB)