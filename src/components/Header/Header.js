import { useContext } from "react";
import MovieContext from "../../store/movie-context/movie-context";
import { Link, useLocation } from "react-router-dom";
import Navigation from "./Navigation/Navigation";
import classes from "./Header.module.css";

const Header = () => {
  const movieCtx = useContext(MovieContext);
  const location = useLocation();

  const resetSearchCtx = () => {
    // if(location.pathname === "/home")
    movieCtx.setSearchTerm("");
    movieCtx.resetMovie("");
    document.location.reload();
  };

  return (
    <header className={classes.header}>
      <Link onClick={resetSearchCtx} to="/home" className={classes.logo}>
        React Movies
      </Link>
      <Navigation />
    </header>
  );
};

export default Header;
