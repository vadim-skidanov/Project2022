import { createContext } from "react";

const MovieContext = createContext({
  onMovieSelect: (movie) => {},
  movie: null,
  reset: () => {},
});

export default MovieContext;
