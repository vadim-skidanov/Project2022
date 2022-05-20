import { Link } from "react-router-dom";
import Navigation from "./Navigation/Navigation";
import classes from "./Header.module.css";

const Header = () => {
  return (
    <header className={classes["header"]}>
      <Link to="/home" className={classes.logo}>
        vad@vad.com bob@bob.com
      </Link>
      <Navigation />
    </header>
  );
};

export default Header;
