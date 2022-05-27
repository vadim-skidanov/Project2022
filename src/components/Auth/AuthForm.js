import { useRef, useContext } from "react";
import { useLocation } from "react-router-dom";
import Input from "../UI/Input/Input";
import AuthContext from "../../store/auth-context/auth-context";
import classes from "./AuthForm.module.css";

const AuthForm = () => {
  const location = useLocation();

  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const authCtx = useContext(AuthContext);

  const nameInputHandler = (e) => {
    authCtx.nameHandler(e);
  };

  const emailInputHandler = (e) => {
    authCtx.emailHandler(e);
  };

  const passwordInputHandler = (e) => {
    authCtx.passwordHandler(e);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (location.pathname === "/signIn") {
      authCtx.onSignIn(emailRef, passwordRef);
    }

    if (location.pathname === "/signUp") {
      authCtx.onSignUp(nameRef, emailRef, passwordRef);
    }
  };

  const nameClasses = authCtx.inputValidation.nameHasError
    ? `${classes["form-control"]} ${classes.invalid}`
    : classes["form-control"];

  const emailClasses = authCtx.inputValidation.emailHasError
    ? `${classes["form-control"]} ${classes.invalid}`
    : classes["form-control"];

  const passwordClasses = authCtx.inputValidation.passwordHasError
    ? `${classes["form-control"]} ${classes.invalid}`
    : classes["form-control"];

  const signUpButton =
    authCtx.inputValidation.nameIsValid &&
    authCtx.inputValidation.emailIsValid &&
    authCtx.inputValidation.passwordIsValid;

  const signInButton =
    authCtx.inputValidation.emailIsValid &&
    authCtx.inputValidation.passwordIsValid;

  const nameBlurHandler = () => {
    authCtx.onNameBlur();
  };

  const emailBlurHandler = () => {
    authCtx.onEmailBlur();
  };

  const passwordBlurHandler = () => {
    authCtx.onPasswordBlur();
  };

  const heading =
    location.pathname === "/signUp" ? (
      <h2 className={classes.heading}>Sign Up</h2>
    ) : (
      <h2 className={classes.heading}>Sign In</h2>
    );

  const nameError = authCtx.inputValidation.nameHasError && (
    <p className={classes["error-msg"]}>
      Please enter a name (at least 3 characters long).
    </p>
  );

  const emailError = authCtx.inputValidation.emailHasError && (
    <p className={classes["error-msg"]}>Please enter a valid email.</p>
  );

  const passwordError = authCtx.inputValidation.passwordHasError && (
    <p className={classes["error-msg"]}>
      Please enter a password (at least 5 characters long).
    </p>
  );

  let submitButton;

  if (location.pathname === "/signUp" && signUpButton) {
    submitButton = (
      <button className={classes.submit} type="submit">
        Sign Up
      </button>
    );
  }

  if (location.pathname === "/signIn" && signInButton) {
    submitButton = (
      <button className={classes.submit} type="submit">
        Sign In
      </button>
    );
  }

  return (
    <>
      {heading}
      <form onSubmit={submitHandler} className={classes.form}>
        {location.pathname === "/signUp" && (
          <div className={nameClasses}>
            <Input
              input={{
                type: "text",
                placeholder: "Name",
                ref: nameRef,
                onChange: nameInputHandler,
                onBlur: nameBlurHandler,
              }}
            />
            {nameError}
          </div>
        )}
        <div className={emailClasses}>
          <Input
            input={{
              type: "email",
              placeholder: "Email",
              ref: emailRef,
              onChange: emailInputHandler,
              onBlur: emailBlurHandler,
            }}
          />
          {emailError}
        </div>
        <div className={passwordClasses}>
          <Input
            input={{
              type: "password",
              placeholder: "Password",
              ref: passwordRef,
              onChange: passwordInputHandler,
              onBlur: passwordBlurHandler,
            }}
          />
          {passwordError}
        </div>
        {submitButton}
      </form>
    </>
  );
};

export default AuthForm;
