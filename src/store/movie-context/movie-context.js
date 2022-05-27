import { createContext } from "react";

const MovieContext = createContext({
  onMovieSelect: (movie) => {},
  movie: null,
});

export default MovieContext;
