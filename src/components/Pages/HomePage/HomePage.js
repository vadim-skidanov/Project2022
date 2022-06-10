import MovieList from "../../Movies/MovieList/MovieList";
import MovieOverview from "../../Movies/MovieOverview/MovieOverview";
import Modal from "../../UI/Modal/Modal";
import useMovie from "../../../hooks/use-movie";
const HomePage = () => {
  const { movie, resetMovie } = useMovie();
  return (
    <>
      {movie && (
        <Modal>
          <MovieOverview
            title={movie.title}
            poster={movie.poster}
            plot={movie.plot}
            release_date={movie.release_date}
            reset={resetMovie}
          />
        </Modal>
      )}
      <MovieList />
    </>
  );
};

export default HomePage;
