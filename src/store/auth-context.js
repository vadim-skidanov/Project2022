import { createContext } from "react";

const AuthContext = createContext({
  onSignIn: (email, password) => {},
  onSignUp: (name, email, password) => {},
  onLogout: (e) => {},

  nameHandler: (e) => {},
  emailHandler: (e) => {},
  passwordHandler: (e) => {},
  passwordBlur: () => {},
});

export default AuthContext;
