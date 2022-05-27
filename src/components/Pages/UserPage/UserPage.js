import { useCookies } from "react-cookie";
import classes from "./UserPage.module.css";

const UserPage = () => {
  const [cookie] = useCookies("[auth]");

  const user = cookie.loggedInData ? cookie.loggedInData.name : "user";

  return <h2 className={classes.user}>{`Hello ${user} !`}</h2>;
};

export default UserPage;
