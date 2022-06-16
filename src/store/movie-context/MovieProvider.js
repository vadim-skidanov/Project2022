import { useState } from "react";
import Cookies from "universal-cookie";
import MovieContext from "./movie-context";

const MovieProvider = (props) => {
  const [selectedMovie, setSelectedMovie] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const cookies = new Cookies();

  const movieData = (movie) => {
    return {
      id: movie.id,
      title: movie.title,
      poster: movie.poster,
      rating: movie.rating,
      plot: movie.plot,
      release_date: movie.release_date,
    };
  };

  const onMovieSelect = (movie) => {
    const movieObj = movieData(movie);
    setSelectedMovie(movieObj);
  };

  const resetMovie = () => {
    setSelectedMovie("");
  };

  //*********************  Add to favorites using Cookies *********************//

  const saveMovieToFavorites = (movie) => {
    const loggedIndata = cookies.get("loggedInData");
    const existingUserData = cookies.get("userData");
    const loggedInUser = existingUserData.users.filter(
      (user) => user.id === loggedIndata.id
    );

    const movieSaved = loggedInUser[0].favoriteMovies.some(
      (mov) => mov.id === movie.id
    );

    if (!movieSaved) {
      loggedInUser[0].favoriteMovies.push(movie);
      cookies.set("userData", existingUserData, { path: "/" });
    } else {
      return;
    }
  };

  const removeMovieFromFavorites = (movie) => {
    const loggedIndata = cookies.get("loggedInData");
    const existingUserData = cookies.get("userData");
    const loggedInUser = existingUserData.users.filter(
      (user) => user.id === loggedIndata.id
    );
    const favMovies = loggedInUser[0].favoriteMovies.filter(
      (favMovie) => favMovie.id !== movie.id
    );
    for (const arr of loggedInUser) {
      arr.favoriteMovies = favMovies;
    }
    cookies.set("userData", { users: loggedInUser }, { path: "/" });
  };

  //*********************  Add to favorites using localStorage *********************//
  // const saveMovieToFavorites = (movie) => {
  //   const savedMovies = localStorage.getItem("favorites");
  //   const movieObj = [movieData(movie)];

  //   if (!savedMovies) {
  //     localStorage.setItem("favorites", JSON.stringify(movieObj));
  //   } else {
  //     const parsedSavedMovies = JSON.parse(savedMovies);
  //     parsedSavedMovies.push(movieObj);
  //     localStorage.setItem("favorites", JSON.stringify(parsedSavedMovies));
  //   }
  // };

  const movieCtx = {
    onMovieSelect,
    movie: selectedMovie,
    resetMovie,
    searchTerm,
    setSearchTerm,
    saveMovieToFavorites,
    removeMovieFromFavorites,
  };

  return (
    <MovieContext.Provider value={movieCtx}>
      {props.children}
    </MovieContext.Provider>
  );
};

export default MovieProvider;
