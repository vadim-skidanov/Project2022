import { useState, useEffect } from "react";
import { moviesApiConfig } from "../../../api/moviesApiConfig";
import useApi from "../../../hooks/use-api";
import MovieCard from "../MovieCard/MovieCard";
import Spinner from "../../../assets/Spiner/Spinner";
import useMovie from "../../../hooks/use-movie";
import classes from "./MovieList.module.css";

const MovieList = () => {
  const [movieData, setMovieData] = useState([]);
  const { searchTerm } = useMovie();
  const { poster_path } = moviesApiConfig;
  const { sendRequest: fetchData, isLoading } = useApi();

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
  let content = "";

  if (isLoading) {
    content = <Spinner />;
  } else {
    content = (
      <section className={classes["movie-list-section"]}>
        {movieData.map((movie) => (
          <MovieCard
            key={movie.id}
            id={movie.id}
            title={movie.title}
            poster={poster_path + movie.poster_path}
            rating={movie.rating}
            plot={movie.overview}
            release_date={movie.release_date}
          />
        ))}
      </section>
    );
  }

  return <>{content}</>;
};

export default MovieList;
