import { useState } from "react";
import MovieContext from "./movie-context";

const MovieProvider = (props) => {
  const [selectedMovie, setSelectedMovie] = useState();
  const [searchTerm, setSearchTerm] = useState("");

  const onMovieSelect = (movie) => {
    const movieData = {
      id: movie.id,
      title: movie.title,
      poster: movie.poster,
      rating: movie.rating,
      plot: movie.plot,
      release_date: movie.release_date,
    };
    setSelectedMovie(movieData);
  };

  const resetMovie = () => {
    setSelectedMovie();
  };

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
