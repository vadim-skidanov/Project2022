import { useState, useEffect } from "react";
import { moviesApiConfig } from "../api/moviesApiConfig";
import useApi from "./use-api";
import useMovie from "./use-movie";

const useFetchMovies = () => {
  const [movieData, setMovieData] = useState([]);
  const { searchTerm } = useMovie();
  const { isLoading, sendRequest: fetchData } = useApi();
  const { poster_path } = moviesApiConfig;

  useEffect(() => {
    const { api_url, search_api } = moviesApiConfig;
    let url = api_url;
    if (searchTerm && searchTerm.length > 0) {
      url = search_api + searchTerm;
    }
    const transformData = ({ results }) => {
      setMovieData(results);
    };
    fetchData(
      {
        url: url,
      },
      transformData
    );
  }, [fetchData, searchTerm]);

  return {
    movieData,
    isLoading,
    poster_path,
  };
};

export default useFetchMovies;
