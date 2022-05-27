import classes from "./MovieOverview.module.css";

const MovieOverview = (props) => {
  return (
    <div className={classes["movie-container"]}>
      <div className={classes["movie-img"]}>
        <img src={props.poster} alt="" />
      </div>

      <div className={classes["movie-overview"]}>
        <h2 className={classes["movie-title"]}>{props.title}</h2>
        <p className={classes["movie-plot"]}>{props.plot}</p>
        <div className={classes["movie-release-date"]}>
          Release date: <span>{props.release_date}</span>
        </div>
      </div>
    </div>
  );
};

export default MovieOverview;
