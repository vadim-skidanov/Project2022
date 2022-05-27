import { useContext } from "react";
import { useCookies } from "react-cookie";
import AuthContext from "../../../store/auth-context/auth-context";
import { Link } from "react-router-dom";

import classes from "./Navigation.module.css";

const Navigation = () => {
  const [cookie] = useCookies(["user"]);
  const authCtx = useContext(AuthContext);

  const isLoggedIn = cookie.isLoggedIn;

  const logoutHandler = () => {
    authCtx.onLogout();
  };

  return (
    <nav className={classes["main-nav"]}>
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
