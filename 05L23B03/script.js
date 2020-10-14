const movieGenresEl = document.querySelector(".moviegenres");
const topRatedMoviesEl = document.querySelector(".topratedmovies");
const favoriteMovieEl = document.querySelector(".favoritemovie");
const actionMoviesEl = document.querySelector(".actionmovies");
const yearMoviesEl = document.querySelector(".yearmovies");

const getMovieGenres = async () => {
  try {
    const result = await getData(`/3/genre/movie/list?api_key=${API_KEY}`);
    return result;
  } catch (error) {
    console.log(error);
  }
};

const getMyFavoriteMovie = async () => {
  try {
    const myFavoriteMovieID = "tt0120737";
    const queryParams = "&language=en-US&external_source=imdb_id";
    const result = await getData(`/3/find/${myFavoriteMovieID}?api_key=${API_KEY}${queryParams}`);
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
  }
};

const getTopRatedMovies = async () => {
  try {
    const queryParams = "&language=en-US";
    const result = await getData(`/3/movie/top_rated/?api_key=${API_KEY}${queryParams}`);
    return result;
  } catch (error) {
    console.log(error);
  }
};

const getTopRatedActionMovies = async () => {
  try {
    const queryParams =
      "&language=en-US&sort_by=vote_average.desc&include_adult=false&include_video=false&with_genres=28";
    const result = await getData(`/3/discover/movie/?api_key=${API_KEY}${queryParams}`);
    return result;
  } catch (error) {
    console.log(error);
  }
};

const getMoviesFromYear = async () => {
  try {
    const queryParams =
      "&language=en-US&sort_by=vote_average.desc&include_adult=false&include_video=false&year=1975";
    const result = await getData(`/3/discover/movie/?api_key=${API_KEY}${queryParams}`);
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
  }
};
getMoviesFromYear();

const renderMovieGenres = async () => {
  const movieList = await getMovieGenres();
  // de array zit in de key genres van het object..
  await movieList.genres.map((movie) => {
    const movieListItem = document.createElement("li");
    movieListItem.innerHTML = `Genre naam: ${movie.name}, id: ${movie.id}`;
    movieGenresEl.appendChild(movieListItem);
  });
};

const renderMyFavoriteMovie = async () => {
  const myFavoriteMovie = await getMyFavoriteMovie();
  const myFavoriteMovieTitle = myFavoriteMovie.movie_results[0].title;
  favoriteMovieEl.innerHTML = `My Favorite Movie: ${myFavoriteMovieTitle}`;
};

const renderTopRatedMovies = async () => {
  const movieList = await getTopRatedMovies();
  await movieList.results.map((movie) => {
    const movieListItem = document.createElement("li");
    movieListItem.innerHTML = `${movie.title}`;
    topRatedMoviesEl.appendChild(movieListItem);
  });
};

const renderTopRatedActionMovies = async () => {
  const movieList = await getTopRatedActionMovies();
  await movieList.results.map((movie) => {
    const movieListItem = document.createElement("li");
    movieListItem.innerHTML = `${movie.title}`;
    actionMoviesEl.appendChild(movieListItem);
  });
};

const renderMoviesYear = async () => {
  const movieList = await getMoviesFromYear();
  await movieList.results.map((movie) => {
    const movieListItem = document.createElement("li");
    movieListItem.innerHTML = `${movie.title}`;
    yearMoviesEl.appendChild(movieListItem);
  });
};

renderMovieGenres();
renderMyFavoriteMovie();
renderTopRatedMovies();
renderTopRatedActionMovies();
renderMoviesYear();
