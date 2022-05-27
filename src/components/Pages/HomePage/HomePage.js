import MovieList from "../../MovieList/MovieList";
import { useContext } from "react";
import MovieContext from "../../../store/movie-context/movie-context";
import MovieOverview from "../../MovieOverview/MovieOverview";
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
