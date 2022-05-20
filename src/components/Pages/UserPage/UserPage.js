import { useCookies } from "react-cookie";
import classes from "./UserPage.module.css";

const UserPage = () => {
  const [cookie] = useCookies("[auth]");

  const user = cookie.loggedInData ? cookie.loggedInData.name : "user";

  return <h1 className={classes.test}>{`Hello ${user} !`}</h1>;
};

export default UserPage;
