import classes from "./MovieOverview.module.css";

const MovieOverview = (props) => {
  return (
    <section className={classes["movie-overview-section"]}>
      <div className={classes["movie-img"]}>
        <img src={props.poster} alt={`${props.title} movie poster`} />
      </div>

      <div className={classes["movie-overview"]}>
        <h2 className={classes["movie-title"]}>{props.title}</h2>
        <p className={classes["movie-plot"]}>{props.plot}</p>
        <div className={classes["movie-release-date"]}>
          Release date: <span>{props.release_date}</span>
        </div>
        <button onClick={props.reset} className={classes.close}></button>
      </div>
    </section>
  );
};

export default MovieOverview;
