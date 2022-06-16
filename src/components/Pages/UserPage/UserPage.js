import Cookies from "universal-cookie";
import MovieOverview from "../../Movies/MovieOverview/MovieOverview";
import classes from "./UserPage.module.css";

const UserPage = () => {
  const cookies = new Cookies();

  const loggedInData = cookies.get("loggedInData");

  const existingUserData = cookies.get("userData");

  const loggedInUser = existingUserData.users.filter(
    (user) => user.id === loggedInData.id
  );

  const favoriteMovies = loggedInUser[0].favoriteMovies;

  let content;

  if (favoriteMovies.length > 0) {
    content = favoriteMovies.map((movie) => (
      <MovieOverview
        key={movie.id}
        title={movie.title}
        poster={movie.poster}
        plot={movie.plot}
        release_date={movie.release_date}
      />
    ));
  } else {
    content = <h4>No Saved Movies</h4>;
  }

  return <div className={classes.container}>{content}</div>;
};

export default UserPage;
