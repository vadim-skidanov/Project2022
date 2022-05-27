import { useContext } from "react";
import MovieContext from "../../store/movie-context/movie-context";
import classes from "./MovieCard.module.css";

const MovieCard = (props) => {
  // const [selectedMovie, setSelectedMovie] = useState();
  const movieCtx = useContext(MovieContext);
  const onMovieSelect = () => {
    // console.log(ctx);
    // const movieData = {
    //   id: props.id,
    //   title: props.title,
    //   poster: props.poster,
    //   rating: props.rating,
    //   plot: props.plot,
    //   release_date: props.release_date,
    // };
    // setSelectedMovie(movieData);
    movieCtx.onMovieSelect(props);
    console.log(movieCtx.movie);
    console.log(movieCtx);
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
