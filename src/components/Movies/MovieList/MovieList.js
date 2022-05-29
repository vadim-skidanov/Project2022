import { useState, useEffect } from "react";
import { moviesApiConfig } from "../../../api/moviesApiConfig";
import useApi from "../../../hooks/use-api";
import MovieCard from "../MovieCard/MovieCard";
import Spinner from "../../../assets/Spiner/Spinner";
import classes from "./MovieList.module.css";

const MovieList = () => {
  const [movieData, setMovieData] = useState([]);
  const { poster_path } = moviesApiConfig;
  const { sendRequest: fetchData, isLoading } = useApi();

  useEffect(() => {
    const { api_url } = moviesApiConfig;

    const transformData = ({ results }) => {
      const receivedData = results.map((movie) => {
        return {
          id: movie.id,
          title: movie.title,
          poster: movie.poster_path,
          rating: movie.vote_average,
          overview: movie.overview,
          release_date: movie.release_date,
        };
      });
      setMovieData(receivedData);
    };
    fetchData(
      {
        url: api_url,
      },
      transformData
    );
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
