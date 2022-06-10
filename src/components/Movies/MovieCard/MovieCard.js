import { useSearchParams, Link } from "react-router-dom";
import useMovie from "../../../hooks/use-movie";
import { useCookies } from "react-cookie";
import classes from "./MovieCard.module.css";

const MovieCard = (props) => {
  const [selectedMovieParams, setSelectedMovieParams] = useSearchParams();
  const { onMovieSelect } = useMovie();
  const onMovieSelected = () => {
    onMovieSelect(props);
    setSelectedMovieParams({ movie: props.id });
  };

  const [cookie] = useCookies(["user"]);
  const isLoggedIn = cookie.isLoggedIn;

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
      <button className={classes.favorites}>+</button>
    </div>
  );
};

export default MovieCard;
