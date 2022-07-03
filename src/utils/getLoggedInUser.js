import Cookies from "universal-cookie";
const cookies = new Cookies();

export const getLoggedInUser = () => {
  const loggedIndata = cookies.get("loggedInData");
  const existingUserData = cookies.get("userData");
  const loggedInUser =
    existingUserData.length > 0
      ? existingUserData.users.filter((user) => user.id === loggedIndata.id)
      : [];
  const favoriteMovies = loggedInUser ? loggedInUser[0].favoriteMovies : [];

  return {
    user: loggedInUser || [],
    existingUsers: existingUserData,
    favMovies: favoriteMovies,
  };
};
