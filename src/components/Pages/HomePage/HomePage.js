import MovieList from "../../Movies/MovieList/MovieList";
import MovieOverview from "../../Movies/MovieOverview/MovieOverview";
import useMovie from "../../../hooks/use-movie";
const HomePage = () => {
  const { movie } = useMovie();

  return (
    <>
      {movie && (
        <MovieOverview
          title={movie.title}
          poster={movie.poster}
          plot={movie.plot}
          release_date={movie.release_date}
        />
      )}
      <MovieList />
    </>
  );
};

export default HomePage;
