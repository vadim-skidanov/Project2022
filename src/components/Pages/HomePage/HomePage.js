import { Link } from "react-router-dom";
import MovieList from "../../Movies/MovieList/MovieList";
import MovieOverview from "../../Movies/MovieOverview/MovieOverview";
import Modal from "../../UI/Modal/Modal";
import useMovie from "../../../hooks/use-movie";
import classes from "./HomePage.module.css";

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
          >
            <Link to="/browse">
              <button onClick={resetMovie} className={classes.close}></button>
            </Link>
          </MovieOverview>
        </Modal>
      )}
      <MovieList />
    </>
  );
};

export default HomePage;
