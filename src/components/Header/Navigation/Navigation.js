import { useContext } from "react";
import { useCookies } from "react-cookie";
import { Link, useSearchParams } from "react-router-dom";
import AuthContext from "../../../store/auth-context/auth-context";
import MovieContext from "../../../store/movie-context/movie-context";
import SearchBar from "../../UI/SearchBar/SearchBar";
import classes from "./Navigation.module.css";

const Navigation = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [cookie] = useCookies(["user"]);
  const authCtx = useContext(AuthContext);
  const movieCtx = useContext(MovieContext);

  const isLoggedIn = cookie.isLoggedIn;

  const logoutHandler = () => {
    authCtx.onLogout();
  };

  const searchInputValueHandler = (e) => {
    movieCtx.setSearchTerm(e.target.value);
    setSearchParams({ search: e.target.value });
    if (e.target.value.length === 0) {
      searchParams.delete("search");
      setSearchParams(searchParams);
    }
  };

  const placeholderText = "Search movie title";

  return (
    <nav className={classes["main-nav"]}>
      <SearchBar
        onBlur={movieCtx.searchBlurHandler}
        onChange={searchInputValueHandler}
        placeholder={placeholderText}
        value={movieCtx.searchTerm}
      />
      <ul className={classes["main-nav-list"]}>
        {isLoggedIn && (
          <>
            <li className={classes["main-nav-link"]}>
              <Link to="/welcome">User</Link>
            </li>
            <li className={classes["main-nav-link"]}>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          </>
        )}
        {!isLoggedIn && (
          <>
            <li className={classes["main-nav-link"]}>
              <Link to="/signIn">Sign In</Link>
            </li>
            <li className={classes["main-nav-link"]}>
              <Link to="/signUp">Sign Up</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
