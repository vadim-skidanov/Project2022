import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import useMovie from "../../../hooks/use-movie";
import { useCookies } from "react-cookie";
import { getLoggedInUser } from "../../../utils/getLoggedInUser";
import classes from "./MovieCard.module.css";

const MovieCard = (props) => {
  const [addButton, setAddButton] = useState(false);
  // eslint-disable-next-line
  const [selectedMovieParams, setSelectedMovieParams] = useSearchParams();
  const { onMovieSelect, saveMovieToFavorites, removeMovieFromFavorites } =
    useMovie();

  const [cookie] = useCookies(["user"]);
  const isLoggedIn = cookie.isLoggedIn;

  useEffect(() => {
    if (isLoggedIn) {
      const { favMovies: favoriteMovies } = getLoggedInUser();

      const isFavorite = favoriteMovies.some((movie) => movie.id === props.id);
      if (isFavorite) {
        setAddButton(false);
      } else {
        setAddButton(true);
      }
    }
  }, [isLoggedIn, props.id]);

  const onMovieSelected = () => {
    onMovieSelect(props);
    setSelectedMovieParams({ movie: props.id });
  };

  const addToFavoritesHandler = () => {
    saveMovieToFavorites(props);
    setAddButton((prevState) => !prevState);
  };

  const removeFavoritesHandler = () => {
    removeMovieFromFavorites(props);
    setAddButton((prevState) => !prevState);
  };

  let button;

  if (!isLoggedIn) {
    button = (
      <>
        <Link to="/signIn">
          <button className={classes["manage-favorites"]}>+</button>
        </Link>
      </>
    );
  } else if (isLoggedIn && addButton) {
    button = (
      <button
        onClick={addToFavoritesHandler}
        className={classes["manage-favorites"]}
      >
        +
      </button>
    );
  } else {
    button = (
      <button
        onClick={removeFavoritesHandler}
        className={classes["manage-favorites"]}
      >
        -
      </button>
    );
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
      {button}
    </div>
  );
};

export default MovieCard;
