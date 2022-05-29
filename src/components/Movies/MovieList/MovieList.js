import { useState, useEffect, useContext } from "react";
import { moviesApiConfig } from "../../../api/moviesApiConfig";
import useApi from "../../../hooks/use-api";
import MovieCard from "../MovieCard/MovieCard";
import Spinner from "../../../assets/Spiner/Spinner";
import MovieContext from "../../../store/movie-context/movie-context";
import classes from "./MovieList.module.css";

const MovieList = () => {
  const [movieData, setMovieData] = useState([]);
  const movieCtx = useContext(MovieContext);
  const { poster_path } = moviesApiConfig;
  const { sendRequest: fetchData, isLoading } = useApi();

  useEffect(() => {
    const { api_url, search_api } = moviesApiConfig;
    let url = api_url;
    if (movieCtx.searchTerm && movieCtx.searchTerm.length > 0) {
      url = search_api + movieCtx.searchTerm;
    }
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
        url: url,
      },
      transformData
    );
  }, [fetchData, movieCtx.searchTerm]);

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
