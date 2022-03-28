import ReactDOM from "react-dom";
import { Fragment } from "react";
import classes from "./Modal.module.css";
const Modal = (props) => {
	const Backdrop = (
		<div onClick={props.onClick} className={classes.backdrop}></div>
	);
	const ModalOverlay = (
		<div className={classes.modal}>
			<div>{props.children}</div>
		</div>
	);
	return (
		<Fragment>
			{ReactDOM.createPortal(
				Backdrop,
				document.getElementById("overlays")
			)}
			{ReactDOM.createPortal(
				ModalOverlay,
				document.getElementById("overlays")
			)}
		</Fragment>
	);
};
export default Modal;
