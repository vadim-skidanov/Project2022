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
    setSelectedMovie();
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

  //*********************  Add to favorites using single Cookie *********************//

  const saveMovieToFavorites = (movie) => {
    const loggedInUser = cookies.get("loggedInData");
    const existingUserData = cookies.get("userData");
    const test = existingUserData.users.filter(
      (user) => user.id === loggedInUser.id
    );
    test[0].favoriteMovies.push(movie);
    cookies.set("userData", existingUserData, { path: "/" });
    document.location.reload();
  };

  const movieCtx = {
    onMovieSelect,
    movie: selectedMovie,
    resetMovie,
    searchTerm,
    setSearchTerm,
    saveMovieToFavorites,
  };

  return (
    <MovieContext.Provider value={movieCtx}>
      {props.children}
    </MovieContext.Provider>
  );
};

export default MovieProvider;
