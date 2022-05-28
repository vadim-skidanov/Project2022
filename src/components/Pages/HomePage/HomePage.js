import { useContext } from "react";
import MovieList from "../../Movies/MovieList/MovieList";
import MovieOverview from "../../Movies/MovieOverview/MovieOverview";
import MovieContext from "../../../store/movie-context/movie-context";

const HomePage = () => {
  const movieCtx = useContext(MovieContext);

  return (
    <>
      {movieCtx.movie && (
        <MovieOverview
          title={movieCtx.movie.title}
          poster={movieCtx.movie.poster}
          plot={movieCtx.movie.plot}
          release_date={movieCtx.movie.release_date}
        />
      )}

      <MovieList />
    </>
  );
};

export default HomePage;
