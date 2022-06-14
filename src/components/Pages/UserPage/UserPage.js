import Cookies from "universal-cookie";
import MovieOverview from "../../Movies/MovieOverview/MovieOverview";
import classes from "./UserPage.module.css";

const UserPage = () => {
  const cookies = new Cookies();

  const loggedInUser = cookies.get("loggedInData");
  const existingUserData = cookies.get("userData");
  const test = existingUserData.users.filter(
    (user) => user.id === loggedInUser.id
  );

  const content = test[0].favoriteMovies.map((movie) => (
    <MovieOverview
      key={movie.id}
      title={movie.title}
      poster={movie.poster}
      plot={movie.plot}
      release_date={movie.release_date}
    />
  ));
  return <div className={classes.container}>{content}</div>;
};

export default UserPage;
