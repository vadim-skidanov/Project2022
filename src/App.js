import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header/Header";
import HomePage from "./components/Pages/HomePage/HomePage";
import UserPage from "./components/Pages/UserPage/UserPage";
import LoginPage from "./components/Pages/LoginPage/LoginPage";
import ProtectedRoutes from "./components/ProtectedRoutes/ProtectedRoutes";
import Layout from "./components/Layout/Layout";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Navigate replace to="/browse" />} />
          <Route path="browse" element={<HomePage />} />
          <Route path="signIn" element={<LoginPage />} />
          <Route path="signUp" element={<LoginPage />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="user" element={<UserPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/browse" />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
