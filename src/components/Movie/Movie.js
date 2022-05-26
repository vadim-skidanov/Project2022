import classes from "./Movie.module.css";

const Movie = (props) => {
  return (
    <div className={classes.movie}>
      <img className={classes["movie-img"]} src={props.poster} alt="" />
      <div className={classes["movie-info"]}>
        <div className={classes.title}>{props.title}</div>
        <span className="raiting">{props.rating}</span>
      </div>
    </div>
  );
};

export default Movie;
