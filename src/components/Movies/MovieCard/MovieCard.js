import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import useMovie from "../../../hooks/use-movie";
import { useCookies } from "react-cookie";
import { getLoggedInUser } from "../../../utils/getLoggedInUser";
import classes from "./MovieCard.module.css";

const MovieCard = (props) => {
  // eslint-disable-next-line
  const [test, setTest] = useState(false);
  const [selectedMovieParams, setSelectedMovieParams] = useSearchParams();
  const { onMovieSelect, saveMovieToFavorites, removeMovieFromFavorites } =
    useMovie();

  const [cookie] = useCookies(["user"]);
  const isLoggedIn = cookie.isLoggedIn;

  const { favMovies: favoriteMovies } = getLoggedInUser();

  useEffect(() => {
    const testik = favoriteMovies.some((movie) => movie.id === props.id);
    if (testik) {
      setTest(true);
    } else {
      setTest(false);
    }
  }, [favoriteMovies, props.id]);

  const onMovieSelected = () => {
    onMovieSelect(props);
    setSelectedMovieParams({ movie: props.id });
  };

  const addToFavoritesHandler = () => {
    saveMovieToFavorites(props);
    setTest((prevState) => !prevState);
  };

  const removeFavoritesHandler = () => {
    removeMovieFromFavorites(props);
    setTest((prevState) => !prevState);
  };

  let manageFavorites;

  const button = !test ? (
    <button
      onClick={addToFavoritesHandler}
      className={classes["add-to-favorites"]}
    >
      +
    </button>
  ) : (
    <button
      onClick={removeFavoritesHandler}
      className={classes["remove-from-favorites"]}
    >
      -
    </button>
  );

  if (!isLoggedIn) {
    manageFavorites = (
      <>
        <Link to="/signIn">
          <button className={classes["add-to-favorites"]}>+</button>
        </Link>
        {/* <Link to="/signIn">
          <button className={classes["remove-from-favorites"]}>-</button>
        </Link> */}
      </>
    );
    // } else if (isLoggedIn && ) {}
  } else {
    manageFavorites = <>{button}</>;
  }

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
      {manageFavorites}
    </div>
  );
};

export default MovieCard;
