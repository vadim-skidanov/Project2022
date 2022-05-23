import { useRef, useContext } from "react";
import { useLocation } from "react-router-dom";
import Input from "../UI/Input/Input";
import AuthContext from "../../store/auth-context";
import Card from "../UI/Card/Card";
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

  return (
    <Card className={classes["form-cnt"]}>
      <form onSubmit={submitHandler}>
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
            {authCtx.inputValidation.nameHasError && (
              <p className={classes.error}>
                Please enter a password (at least 3 characters long).
              </p>
            )}
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
          {authCtx.inputValidation.emailHasError && (
            <p className={classes.error}>Please enter a valid email.</p>
          )}
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
          {authCtx.inputValidation.passwordHasError && (
            <p className={classes.error}>
              Please enter a password (at least 4 characters long).
            </p>
          )}
        </div>
        {location.pathname === "/signUp" && signUpButton && (
          <button type="submit">Sign Up</button>
        )}
        {location.pathname === "/signIn" && signInButton && (
          <button type="submit">Sign In</button>
        )}
      </form>
    </Card>
  );
};

export default AuthForm;
