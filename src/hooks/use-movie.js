import { useContext } from "react";
import MovieContext from "../store/movie-context/movie-context";

const useMovie = () => {
  return useContext(MovieContext);
};

export default useMovie;
