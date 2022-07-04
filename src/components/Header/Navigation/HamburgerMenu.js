import classes from "./HamburgerMenu.module.css";

const HamburgerMenu = (props) => {
  return (
    <div onClick={props.onClick} className={classes["hamburger-menu"]}>
      <div className={`${classes.line} ${classes["line-1"]}`}></div>
      <div className={`${classes.line} ${classes["line-2"]}`}></div>
      <div className={`${classes.line} ${classes["line-3"]}`}></div>
    </div>
  );
};

export default HamburgerMenu;
