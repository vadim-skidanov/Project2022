import { useContext } from "react";
import MovieContext from "../../store/movie-context/movie-context";
import classes from "./MovieOverview.module.css";

const MovieOverview = (props) => {
  const movieCtx = useContext(MovieContext);

  const resetMovie = () => {
    movieCtx.resetMovie();
  };

  return (
    <section className={classes["movie-overview-section"]}>
      <div className={classes["movie-img"]}>
        <img src={props.poster} alt="" />
      </div>

      <div className={classes["movie-overview"]}>
        <h2 className={classes["movie-title"]}>{props.title}</h2>
        <p className={classes["movie-plot"]}>{props.plot}</p>
        <div className={classes["movie-release-date"]}>
          Release date: <span>{props.release_date}</span>
        </div>
        <button onClick={resetMovie} className={classes.close}></button>
      </div>
    </section>
  );
};

export default MovieOverview;
