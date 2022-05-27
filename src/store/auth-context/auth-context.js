import { createContext } from "react";

const AuthContext = createContext({
  onSignIn: (email, password) => {},
  onSignUp: (name, email, password) => {},
  onNameBlur: () => {},
  onEmailBlur: () => {},
  onPasswordBlur: () => {},
  onLogout: (e) => {},

  nameHandler: (e) => {},
  emailHandler: (e) => {},
  passwordHandler: (e) => {},

  inputValidation: {
    nameHasError: "",
    nameIsValid: "",
    emailHasError: "",
    emailIsValid: "",
    passwordHasError: "",
    passwordIsValid: "",
  },
});

export default AuthContext;
