import classes from "./Movie.module.css";

const Movie = (props) => {
  return (
    <div className={classes.movie}>
      <img
        className={classes["movie-img"]}
        src={props.poster}
        alt={`${props.title} movie poster`}
      />
      <div className={classes["movie-info"]}>
        <div className={classes["movie-title"]}>{props.title}</div>
        <span className={classes["movie-rating"]}>{props.rating}</span>
      </div>
    </div>
  );
};

export default Movie;
