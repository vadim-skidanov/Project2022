import MovieCard from "../MovieCard/MovieCard";
import Spinner from "../../../assets/Spiner/Spinner";

import useFetchMovies from "../../../hooks/use-fetchMovies";
import classes from "./MovieList.module.css";

const MovieList = () => {
  const { isLoading, movieData, poster_path } = useFetchMovies();

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
            rating={movie.vote_average}
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
