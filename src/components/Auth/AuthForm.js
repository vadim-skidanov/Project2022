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

    // emailRef.current.value = "";
    // passwordRef.current.value = "";
  };

  return (
    <Card className={classes["form-cnt"]}>
      {/* <div className={classes["form-cnt"]}> */}
      <form onSubmit={submitHandler}>
        {location.pathname === "/signUp" && (
          <div className={classes.testik}>
            <Input
              input={{
                type: "text",
                placeholder: "Name",
                ref: nameRef,
                onChange: nameInputHandler,
              }}
            />
          </div>
        )}
        <div className={classes.testik}>
          <Input
            input={{
              type: "email",
              placeholder: "Email",
              ref: emailRef,
              onChange: emailInputHandler,
            }}
          />
          <p className={classes.test}>Email is invalid.</p>
        </div>
        <div className={classes.testik}>
          <Input
            input={{
              type: "password",
              placeholder: "Password",
              ref: passwordRef,
              onChange: passwordInputHandler,
            }}
          />
        </div>
        {
          <button type="submit">
            {location.pathname === "/signUp" ? "Sign Up" : "Sign In"}
          </button>
        }
      </form>
      {/* </div> */}
    </Card>
  );
};

export default AuthForm;
