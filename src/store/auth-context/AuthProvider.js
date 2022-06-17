import { useReducer } from "react";
import Cookies from "universal-cookie";
import AuthContext from "./auth-context";

const initialState = {
  value: "",
  isValid: null,
};

const initialBlurState = {
  isTouched: false,
};

const validateEmail = (email) => {
  const validationRegex = /\S+@\S+\.\S+/;
  return validationRegex.test(email.trim());
};

const validateName = (name) => {
  const validationRegex = /^[a-zA-Z]+$/;
  const userName = name.trim().length > 2 || "";
  return validationRegex.test(userName);
};

const validatePassword = (password) => {
  const validationRegex = /^[a-zA-Z]+$/;
  const userPassword = password.trim().length > 4 || "";
  return validationRegex.test(userPassword);
};

const inputReducer = (state, action) => {
  if (action.type === "EMAIL") {
    return {
      value: action.val,
      isValid: validateEmail(action.val),
    };
  }

  if (action.type === "PASSWORD") {
    return {
      value: action.val,
      isValid: validatePassword(action.val),
    };
  }

  if (action.type === "NAME") {
    return {
      value: action.val,
      isValid: validateName(action.val),
    };
  }

  if (action.type === "NAME_BLUR") {
    return {
      isTouched: true,
    };
  }

  if (action.type === "EMAIL_BLUR") {
    return {
      isTouched: true,
    };
  }

  if (action.type === "PASSWORD_BLUR") {
    return {
      isTouched: true,
    };
  }

  return initialState;
};

const AuthProvider = (props) => {
  const [nameBlurState, dispatchNameBlur] = useReducer(
    inputReducer,
    initialBlurState
  );

  const [emailBlurState, dispatchEmailBlur] = useReducer(
    inputReducer,
    initialBlurState
  );

  const [passwordBlurState, dispatchPasswordBlur] = useReducer(
    inputReducer,
    initialBlurState
  );

  const [emailState, dispatchEmail] = useReducer(inputReducer, initialState);
  const [nameState, dispatchName] = useReducer(inputReducer, initialState);
  const [passwordState, dispatchPassword] = useReducer(
    inputReducer,
    initialState
  );

  const { isValid: nameIsValid, value: nameValue } = nameState;
  const { isValid: emailIsValid, value: emailValue } = emailState;
  const { isValid: passwordIsValid, value: passwordValue } = passwordState;

  const cookies = new Cookies();

  if (!cookies.get("userData")) {
    cookies.set("userData", { users: [] }, { path: "/" });
  }

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
    if (cookies.get("userData").users.length > 0) {
      return cookies.get("userData").users.find((user) => {
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
    if (cookies.get("userData").users.length > 0) {
      return !!cookies
        .get("userData")
        .users.find((user) => user.email === email);
    }
    return false;
  };

  const signInHandler = () => {
    const loggedInUser = checkUserExists(emailValue, passwordValue);
    if (emailIsValid && passwordIsValid && loggedInUser) {
      cookies.set("isLoggedIn", true, { path: "/" });
      cookies.set("loggedInData", loggedInUser, { path: "/" });
      document.location.reload();
    } else {
      return;
    }
  };

  const signUpHandler = () => {
    const emailExists = checkUserEmail(emailValue);
    const existingUsers = cookies.get("userData").users;
    if (!emailExists && nameIsValid && emailIsValid && passwordIsValid) {
      const user = {
        id: Date.now(),
        name: nameValue,
        email: emailValue,
        password: passwordValue,
        favoriteMovies: [],
      };
      cookies.set(
        "userData",
        {
          users: [...(existingUsers || ""), user],
        },
        { path: "/" }
      );
      cookies.set("isLoggedIn", true, { path: "/" });
      cookies.set("loggedInData", user, { path: "/" });
      document.location.reload();
    } else {
      return;
    }
  };

  const logoutHandler = () => {
    cookies.remove("isLoggedIn");
    cookies.remove("loggedInData");

    document.location.reload();
  };

  const nameBlurHandler = () => {
    dispatchNameBlur({
      type: "NAME_BLUR",
    });
  };

  const emailBlurHandler = () => {
    dispatchEmailBlur({
      type: "EMAIL_BLUR",
    });
  };

  const passwordBlurHandler = () => {
    dispatchPasswordBlur({
      type: "PASSWORD_BLUR",
    });
  };

  const inputValidation = {
    nameHasError: !nameIsValid && nameBlurState.isTouched,
    nameIsValid,
    emailHasError: !emailIsValid && emailBlurState.isTouched,
    emailIsValid,
    passwordHasError: !passwordIsValid && passwordBlurState.isTouched,
    passwordIsValid,
  };

  const loginContext = {
    nameHandler: nameInputHandler,
    emailHandler: emailInputHandler,
    passwordHandler: passwordInputHandler,

    onNameBlur: nameBlurHandler,
    onEmailBlur: emailBlurHandler,
    onPasswordBlur: passwordBlurHandler,

    onSignIn: signInHandler,
    onSignUp: signUpHandler,
    onLogout: logoutHandler,

    inputValidation,
  };

  return (
    <AuthContext.Provider value={loginContext}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
