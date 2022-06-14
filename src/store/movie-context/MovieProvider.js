import { useState } from "react";
import MovieContext from "./movie-context";

const MovieProvider = (props) => {
  const [selectedMovie, setSelectedMovie] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

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

  //*********************  favorite movies could be added to a localstorage instead of cookies *********************//
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
  };

  return (
    <MovieContext.Provider value={movieCtx}>
      {props.children}
    </MovieContext.Provider>
  );
};

export default MovieProvider;
