import { useContext } from "react";
import MovieContext from "../../store/movie-context/movie-context";
import classes from "./MovieCard.module.css";

const MovieCard = (props) => {
  const movieCtx = useContext(MovieContext);
  const onMovieSelect = () => {
    movieCtx.onMovieSelect(props);
  };

  return (
    <div className={classes.movie}>
      <img
        onClick={onMovieSelect}
        className={classes["movie-img"]}
        src={props.poster}
        alt={props.title}
      />
      <div className={classes["movie-info"]}>
        <div className={classes["movie-title"]}>{props.title}</div>
        <span className={classes["movie-rating"]}>{props.rating}</span>
      </div>
    </div>
  );
};

export default MovieCard;
