import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";

const ProtectedRoutes = () => {
  const [cookie] = useCookies(["user"]);
  const isLoggedIn = cookie.isLoggedIn;
  const location = useLocation();

  return isLoggedIn ? (
    <Outlet />
  ) : (
    <Navigate to="/signIn" state={{ from: location }} replace />
  );
};

export default ProtectedRoutes;
