import Header from "./components/Header/Header";
import HomePage from "./components/Pages/HomePage/HomePage";
import UserPage from "./components/Pages/UserPage/UserPage";
import LoginPage from "./components/Pages/LoginPage/LoginPage";
import { useCookies } from "react-cookie";
import { Routes, Route, Navigate } from "react-router-dom";

const App = () => {
  const [cookie] = useCookies(["user"]);
  const isLoggedIn = cookie.isLoggedIn;

  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/home" element={<HomePage />} />

          {isLoggedIn && <Route path="/welcome" element={<UserPage />} />}

          <Route
            path="/signIn"
            element={isLoggedIn ? <Navigate to="/welcome" /> : <LoginPage />}
          />

          <Route
            path="/signUp"
            element={isLoggedIn ? <Navigate to="/welcome" /> : <LoginPage />}
          />

          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      </main>
    </>
  );
};

export default App;
