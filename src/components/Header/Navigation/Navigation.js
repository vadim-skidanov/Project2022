import { useContext } from "react";
import { useCookies } from "react-cookie";
import AuthContext from "../../../store/auth-context";
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
    <nav className={classes.nav}>
      <ul>
        {isLoggedIn && (
          <>
            <Link to="/welcome">User</Link>
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          </>
        )}
        {!isLoggedIn && (
          <>
            <li>
              <Link to="/signIn">Sign In</Link>
            </li>
            <li>
              <Link to="/signUp">Sign Up</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
