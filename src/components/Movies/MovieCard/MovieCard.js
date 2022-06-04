import { useSearchParams } from "react-router-dom";
import useMovie from "../../../hooks/use-movie";
import classes from "./MovieCard.module.css";

const MovieCard = (props) => {
  const [selectedMovieParams, setSelectedMovieParams] = useSearchParams();
  const { onMovieSelect } = useMovie();
  const onMovieSelected = () => {
    onMovieSelect(props);
    setSelectedMovieParams({ movie: props.id });
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
    </div>
  );
};

export default MovieCard;
