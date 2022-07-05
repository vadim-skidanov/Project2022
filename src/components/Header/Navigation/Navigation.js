import { useState } from "react";
import { useCookies } from "react-cookie";
import { Link, useSearchParams } from "react-router-dom";
import useAuth from "../../../hooks/use-auth";
import useMovie from "../../../hooks/use-movie";
import SearchBar from "../../UI/SearchBar/SearchBar";
import classes from "./Navigation.module.css";
import { Backdrop } from "../../UI/Modal/Modal";

const Navigation = () => {
  const [displayNav, setDisplayNav] = useState(false);
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

  const handleNavigation = () => {
    setDisplayNav((prevState) => !prevState);
  };

  const navigationClasses = displayNav
    ? `${classes["main-nav"]} ${classes.active}`
    : classes["main-nav"];

  const placeholderText = "Search movie title";

  const hideNavigation = () => {
    setDisplayNav(false);
  };

  let contentList;

  if (isLoggedIn) {
    contentList = (
      <ul className={classes["main-nav-list"]}>
        <li className={classes["main-nav-link"]} onClick={hideNavigation}>
          <Link to="/user">User</Link>
        </li>
        <li className={classes["main-nav-link"]} onClick={hideNavigation}>
          <button onClick={logoutHandler}>Logout</button>
        </li>
      </ul>
    );
  } else {
    contentList = (
      <ul className={classes["main-nav-list"]}>
        <li className={classes["main-nav-link"]} onClick={hideNavigation}>
          <Link to="/signIn">Sign In</Link>
        </li>
        <li className={classes["main-nav-link"]} onClick={hideNavigation}>
          <Link to="/signUp">Sign Up</Link>
        </li>
      </ul>
    );
  }

  return (
    <nav className={navigationClasses}>
      <SearchBar
        onBlur={searchBlurHandler}
        onChange={searchInputValueHandler}
        placeholder={placeholderText}
        value={searchTerm}
      />
      <div onClick={handleNavigation} className={classes["hamburger-menu"]}>
        <div className={`${classes.line} ${classes["line-1"]}`}></div>
        <div className={`${classes.line} ${classes["line-2"]}`}></div>
        <div className={`${classes.line} ${classes["line-3"]}`}></div>
      </div>
      {displayNav && <Backdrop onClose={hideNavigation} />}
      {contentList}
    </nav>
  );
};

export default Navigation;
