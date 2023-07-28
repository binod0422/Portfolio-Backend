const tmdbKey = '563aba5f03704ee17665dc20e2881b9b';
const tmdbBaseUrl = 'https://api.themoviedb.org/3';
const discoverMButton = document.getElementById('discoverMButton');

const getGenres = async () => {
  const genreRequestEndpoint = 'genre/movie/list';
  const requestParams = `api_key=${tmdbKey}`;
  const urlToFetch = `${tmdbBaseUrl}/${genreRequestEndpoint}?${requestParams}`;

  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      const jsonResponse = await response.json();
      const genres = jsonResponse.genres;
      return genres;
    }
    throw new Error('Request failed!');
  } catch (error) {
    console.log(error);
  }
};

const getMovies = async () => {
  const selectedGenre = getSelectedGenre();
  const discoverMovieEndpoint = 'discover/movie';
  const requestParams = `api_key=${tmdbKey}&with_genres=${selectedGenre}`;
  const urlToFetch = `${tmdbBaseUrl}/${discoverMovieEndpoint}?${requestParams}`;

  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      const jsonResponse = await response.json();
      const movies = jsonResponse.results;
      return movies;
    }
    throw new Error('Request failed!');
  } catch (error) {
    console.log(error);
  }
};

const getMovieInfo = async (movie) => {
  const movieEndpoint = `movie/${movie.id}`;
  const requestParams = `api_key=${tmdbKey}`;
  const urlToFetch = `${tmdbBaseUrl}/${movieEndpoint}?${requestParams}`;

  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      const movieInfo = await response.json();
      return movieInfo;
    }
    throw new Error('Request failed!');
  } catch (error) {
    console.log(error);
  }
};

const showRandomMovie = async () => {
  const movieInfo = document.getElementById('movieInfo');
  if (movieInfo.childNodes.length > 0) {
    clearCurrentMovie();
  }

  const movies = await getMovies();
  const randomMovie = getRandomMovie(movies);
  const info = await getMovieInfo(randomMovie);
  displayMovie(info);
};

getGenres().then(populateGenreDropdown);
discoverMButton.onclick = showRandomMovie;
