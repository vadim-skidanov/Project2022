import { useCookies } from "react-cookie";
import { Link, useSearchParams } from "react-router-dom";
import useAuth from "../../../hooks/use-auth";
import useMovie from "../../../hooks/use-movie";
import SearchBar from "../../UI/SearchBar/SearchBar";
import classes from "./Navigation.module.css";

const Navigation = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [cookie] = useCookies(["user"]);

  const { onLogout } = useAuth();
  const { setSearchTerm, searchBlurHandler, searchTerm } = useMovie();

  const isLoggedIn = cookie.isLoggedIn;

  const logoutHandler = () => {
    onLogout();
  };

  const searchInputValueHandler = (e) => {
    setSearchTerm(e.target.value);
    setSearchParams({ search: e.target.value.trim() });
    if (e.target.value.length === 0) {
      searchParams.delete("search");
      setSearchParams(searchParams);
    }
  };

  const placeholderText = "Search movie title";

  return (
    <nav className={classes["main-nav"]}>
      <SearchBar
        onBlur={searchBlurHandler}
        onChange={searchInputValueHandler}
        placeholder={placeholderText}
        value={searchTerm}
      />
      <ul className={classes["main-nav-list"]}>
        {isLoggedIn && (
          <>
            <li className={classes["main-nav-link"]}>
              <Link to="/user">User</Link>
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
