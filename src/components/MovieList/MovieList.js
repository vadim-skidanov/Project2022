import { useCallback } from "react";
import moviesApiClient from "../../api/moviesApiClient";
import { moviesApiConfig } from "../../api/moviesApiConfig";
import { useState, useEffect } from "react";
import MovieCard from "../MovieCard/MovieCard";
import Spinner from "../../assets/Spiner/Spinner";
import classes from "./MovieList.module.css";

const MovieList = () => {
  const [movieData, setMovieData] = useState([]);
  const [isLoading, setIsLoading] = useState("false");
  const { api_url, poster_path } = moviesApiConfig;

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    const data = await moviesApiClient(api_url);
    setMovieData(data);
    setIsLoading(false);
  }, [api_url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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
            poster={poster_path + movie.poster}
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
