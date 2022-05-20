import { forwardRef } from "react";
import classes from "./Input.module.css";

const Input = forwardRef((props, ref) => {
  return (
    <div>
      <input className={classes.input} ref={ref} {...props.input} />
      {props.error && <p>{props.message}</p>}
    </div>
  );
});

export default Input;
