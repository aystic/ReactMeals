import classes from "./Cart.module.css";
import { useContext, useState } from "react";
import Modal from "../UI/Modal";
import CartContext from "../Store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
const Cart = (props) => {
	const [isCheckout, setIsCheckout] = useState(false);
	const [uploadSuccess, setUploadSuccess] = useState(false);
	const data = useContext(CartContext);
	const cartOnAddHandler = (item) => {
		data.addItem({ ...item, amount: 1 });
	};
	const cartOnRemoveHandler = (id) => {
		data.removeItem(id);
	};
	const cartItems = (
		<ul className={classes["cart-items"]}>
			{data.items.map((item) => {
				return (
					<CartItem
						key={item.id}
						name={item.name}
						price={item.price}
						amount={item.amount}
						onAdd={cartOnAddHandler.bind(null, item)}
						onRemove={cartOnRemoveHandler.bind(null, item.id)}
					/>
				);
			})}
		</ul>
	);
	const onOrderHandler = () => {
		setIsCheckout(true);
		/* props.onClose();
		data.items.forEach((item) => {
			const amount = item.amount;
			for (let i = 0; i < amount; i++) {
				data.removeItem(item.id);
			}
		}); */
	};
	// let orderSuccessful = false;
	const onOrderSuccessHandler = () => {
		data.items.forEach((item) => {
			const amount = item.amount;
			for (let i = 0; i < amount; i++) {
				data.removeItem(item.id);
			}
		});
		setIsCheckout(false);
		// orderSuccessful = true;
		setUploadSuccess(true);
	};
	const totalAmount = `INR ${data.totalAmount.toFixed(2)}`;
	const hasItems = data.items.length > 0;
	return (
		<Modal onClick={props.onClose}>
			{cartItems}
			{uploadSuccess ? (
				<p>Successfully placed your order:)</p>
			) : (
				<div className={classes.total}>
					<span>Total amount : </span>
					<span>{totalAmount}</span>
				</div>
			)}
			{!isCheckout && (
				<div className={classes.actions}>
					<button
						className={classes["button--alt"]}
						onClick={props.onClose}
					>
						Close
					</button>
					{hasItems && (
						<button
							onClick={onOrderHandler}
							className={classes.button}
						>
							Order
						</button>
					)}
				</div>
			)}
			{isCheckout && (
				<Checkout
					hasItems={hasItems}
					onCancel={props.onClose}
					onOrderSuccess={onOrderSuccessHandler}
				/>
			)}
			{/* {uploadSuccess && <p>Successfully placed your order:)</p>} */}
		</Modal>
	);
};
export default Cart;
