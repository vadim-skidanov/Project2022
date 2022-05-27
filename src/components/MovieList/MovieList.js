import moviesApiClient from "../../api/moviesApiClient";
import { moviesApiConfig } from "../../api/moviesApiConfig";
import { useState, useEffect } from "react";
import MovieCard from "../MovieCard/MovieCard";
import classes from "./MovieList.module.css";

const MovieList = () => {
  const [movieData, setMovieData] = useState([]);
  const { api_url, poster_path } = moviesApiConfig;

  useEffect(() => {
    const fetchData = async () => {
      const data = await moviesApiClient(api_url);
      setMovieData(data);
    };
    fetchData();
  }, [api_url]);

  return (
    <div className={classes["movie-container"]}>
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
    </div>
  );
};

export default MovieList;
