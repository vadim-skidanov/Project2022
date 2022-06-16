import { createContext } from "react";

const MovieContext = createContext({
  onMovieSelect: (movie) => {},
  movie: null,
  reset: () => {},
  searchTerm: "",
  setSearchTerm: "",
  saveMovieToFavorites: () => {},
  removeMovieFromFavorites: () => {},
});

export default MovieContext;
