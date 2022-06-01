import { Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import AuthForm from "../../Auth/AuthForm";

const LoginPage = () => {
  const [cookie] = useCookies(["user"]);
  const isLoggedIn = cookie.isLoggedIn;
  return !isLoggedIn ? <AuthForm /> : <Navigate to="home" />;
};

export default LoginPage;
