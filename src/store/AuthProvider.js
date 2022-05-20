import { useReducer, useEffect } from "react";
import { useCookies } from "react-cookie";
import AuthContext from "./auth-context";

const initialState = {
  value: "",
  isValid: null,
};

const inputReducer = (state, action) => {
  if (action.type === "EMAIL") {
    return {
      value: action.val,
      isValid: action.val.trim().includes("@"),
    };
  }

  if (action.type === "PASSWORD") {
    return {
      value: action.val,
      isValid: action.val.trim().length > 3,
    };
  }

  if (action.type === "NAME") {
    return {
      value: action.val,
      isValid: action.val.trim().length > 2,
    };
  }

  if (action.type === "BLUR") {
    return {
      value: state.value,
      isTouched: true,
    };
  }

  return initialState;
};

const AuthProvider = (props) => {
  const [cookie, setCookie, removeCookie] = useCookies(["auth"]);

  const [emailState, dispatchEmail] = useReducer(inputReducer, initialState);
  const [nameState, dispatchName] = useReducer(inputReducer, initialState);
  const [passwordState, dispatchPassword] = useReducer(
    inputReducer,
    initialState
  );

  const { isValid: nameIsValid, value: nameValue } = nameState;
  const { isValid: emailIsValid, value: emailValue } = emailState;
  const { isValid: passwordIsValid, value: passwordValue } = passwordState;

  const cookieData = cookie.userData;

  useEffect(() => {
    if (!cookie.userData) {
      setCookie(
        "userData",
        {
          users: [],
        },
        { path: "/" }
      );
    }
  });

  const nameInputHandler = (e) => {
    dispatchName({
      type: "NAME",
      val: e.target.value,
    });
  };

  const emailInputHandler = (e) => {
    dispatchEmail({
      type: "EMAIL",
      val: e.target.value,
    });
  };

  const passwordInputHandler = (e) => {
    dispatchPassword({
      type: "PASSWORD",
      val: e.target.value,
    });
  };

  const checkUserExists = (email, password) => {
    if (cookieData.users.length > 0) {
      return cookieData.users.find((user) => {
        const emailIsValid = user.email === email;
        const passwordIsValid = user.password === password;

        if (emailIsValid && passwordIsValid) {
          return true;
        }
        return false;
      });
    } else {
      return false;
    }
  };

  const checkUserEmail = (email) => {
    if (cookieData.users.length > 0) {
      return !!cookieData.users.find((user) => user.email === email); // returns boolean
    }
    return false;
  };

  const signInHandler = () => {
    const loggedInUser = checkUserExists(emailValue, passwordValue);
    if (emailIsValid && passwordIsValid && loggedInUser) {
      setCookie("isLoggedIn", true, { path: "/" });
      setCookie("loggedInData", loggedInUser, { path: "/" });
      document.location.reload();
      return loggedInUser;
    } else {
      return;
    }
  };

  const signUpHandler = () => {
    const emailExists = checkUserEmail(emailValue);
    const existingUsers = cookieData.users;
    if (!emailExists && nameIsValid && emailIsValid && passwordIsValid) {
      const user = {
        id: Date.now(),
        name: nameValue,
        email: emailValue,
        password: passwordValue,
      };
      setCookie(
        "userData",
        {
          users: [...(existingUsers || ""), user],
        },
        { path: "/" }
      );
      setCookie("isLoggedIn", true, { path: "/" });
      setCookie("loggedInData", user, { path: "/" });
      document.location.reload();
    } else {
      return;
    }
  };

  const logoutHandler = () => {
    removeCookie("isLoggedIn");
    removeCookie("loggedInData");

    document.location.reload();
  };

  const loginContext = {
    nameHandler: nameInputHandler,
    emailHandler: emailInputHandler,
    passwordHandler: passwordInputHandler,

    onSignIn: signInHandler,
    onSignUp: signUpHandler,
    onLogout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={loginContext}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
