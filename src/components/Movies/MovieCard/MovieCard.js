import { useSearchParams, Link } from "react-router-dom";
import useMovie from "../../../hooks/use-movie";
import { useCookies } from "react-cookie";
import classes from "./MovieCard.module.css";

const MovieCard = (props) => {
  // eslint-disable-next-line
  const [selectedMovieParams, setSelectedMovieParams] = useSearchParams();
  const { onMovieSelect, saveMovieToFavorites } = useMovie();

  const [cookie] = useCookies(["user"]);
  const isLoggedIn = cookie.isLoggedIn;

  const onMovieSelected = () => {
    onMovieSelect(props);
    setSelectedMovieParams({ movie: props.id });
  };

  const addToFavoritesHandler = () => {
    saveMovieToFavorites(props);
  };

  return (
    <div className={classes.movie}>
      <img
        onClick={onMovieSelected}
        className={classes["movie-img"]}
        src={props.poster}
        alt={props.title}
      />
      <div className={classes["movie-info"]}>
        <div className={classes["movie-title"]}>{props.title}</div>
        <span className={classes["movie-rating"]}>{props.rating}</span>
      </div>
      {!isLoggedIn && (
        <Link to="/signIn">
          <button className={classes.favorites}>+</button>
        </Link>
      )}

      {isLoggedIn && (
        <button onClick={addToFavoritesHandler} className={classes.favorites}>
          +
        </button>
      )}
    </div>
  );
};

export default MovieCard;
