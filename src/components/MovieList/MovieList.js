import moviesApiClient from "../../api/moviesApiClient";
import { moviesApiConfig } from "../../api/moviesApiConfig";
import { useState, useEffect } from "react";
import Movie from "../Movie/Movie";
import classes from "./MovieList.module.css";

const MovieList = () => {
  const [movieData, setMovieData] = useState([]);
  const { api_url, poster_path } = moviesApiConfig;
  useEffect(() => {
    const fetchData = async () => {
      const test = await moviesApiClient(api_url);
      setMovieData(test);
    };
    fetchData();
  }, [api_url]);
  return (
    <div className={classes["movie-container"]}>
      {movieData.map((movie) => (
        <Movie
          key={movie.id}
          title={movie.title}
          poster={poster_path + movie.poster}
          rating={movie.rating}
        />
      ))}
    </div>
  );
};

export default MovieList;
