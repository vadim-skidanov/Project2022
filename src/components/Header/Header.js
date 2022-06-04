import useMovie from "../../hooks/use-movie";
import { Link } from "react-router-dom";
import Navigation from "./Navigation/Navigation";
import classes from "./Header.module.css";

const Header = () => {
  const { setSearchTerm, resetMovie } = useMovie();

  const resetSearchCtx = () => {
    setSearchTerm("");
    resetMovie("");
    // document.location.reload();
  };

  return (
    <header className={classes.header}>
      <Link onClick={resetSearchCtx} to="/browse" className={classes.logo}>
        React Movies
      </Link>
      <Navigation />
    </header>
  );
};

export default Header;
