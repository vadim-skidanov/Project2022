import { createPortal } from "react-dom";
import classes from "./Modal.module.css";

export const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClose} />;
};

const ModalOverlay = (props) => {
  return <div className={classes.modal}>{props.children}</div>;
};

const overlays = document.querySelector("#overlays");

const Modal = (props) => {
  return (
    <>
      {createPortal(<Backdrop />, overlays)}
      {createPortal(<ModalOverlay>{props.children}</ModalOverlay>, overlays)}
    </>
  );
};

export default Modal;
