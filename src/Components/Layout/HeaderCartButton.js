import classes from "./HeaderCartButton.module.css";
import CartIcon from "../Cart/CartIcon";
import { useContext, useEffect, useState } from "react";
import CartContext from "../Store/cart-context";
const CartButton = (props) => {
	const [btnAnimation, setBtnAnimation] = useState(false);
	const data = useContext(CartContext);
	const noOfCartItems = data.items.reduce((curValue, item) => {
		return curValue + item.amount;
	}, 0);
	const btnClasses = `${classes.button} ${
		btnAnimation === true ? classes.bump : ""
	}`;
	useEffect(() => {
		if (noOfCartItems === 0) return;
		if (!btnAnimation) {
			setBtnAnimation(true);
		}
		const token = setTimeout(() => {
			setBtnAnimation(false);
		}, 300);
		return () => {
			clearTimeout(token);
		};
	}, [noOfCartItems]);
	return (
		<button className={btnClasses} onClick={props.onClick}>
			<span className={classes.icon}>
				<CartIcon />
			</span>
			<span>Your Cart</span>
			<span className={classes.badge}>{noOfCartItems}</span>
		</button>
	);
};

export default CartButton;
