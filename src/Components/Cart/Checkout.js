import classes from "./Checkout.module.css";
import useInput from "../../hooks/use-input";
import { useState, useContext, useEffect } from "react";
import CartContext from "../Store/cart-context";
const Checkout = (props) => {
	//NAME INPUT FIELD
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const [uploadSuccess, setUploadSuccess] = useState(false);
	const cartData = useContext(CartContext);
	const order = async (orderDetails) => {
		try {
			setError(null);
			setIsLoading(true);
			const response = await fetch(
				process.env.REACT_APP_BASE_URL + "orders.json",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(orderDetails),
				}
			);
			if (!response.ok) {
				throw new Error("Something went wrong!");
			}
			setIsLoading(false);
			setUploadSuccess(true);
		} catch (err) {
			setError(err.message);
			setIsLoading(false);
		}
	};

	const {
		value: nameInputValue,
		isValueValid: isNameValid,
		hasError: nameInputHasError,
		valueChangeHandler: nameChangeHandler,
		setTouchedState: nameTouchedStateEnable,
		reset: nameInputReset,
	} = useInput((value) => value.trim() !== "");

	//STREET INPUT FIELD
	const {
		value: streetInputValue,
		isValueValid: isStreetValid,
		hasError: streetInputHasError,
		valueChangeHandler: streetChangeHandler,
		setTouchedState: streetTouchedStateEnable,
		reset: streetInputReset,
	} = useInput((value) => value.trim() !== "");

	//PINCODE INPUT FIELD
	const {
		value: pincodeInputValue,
		isValueValid: isPincodeValid,
		hasError: pincodeInputHasError,
		valueChangeHandler: pincodeChangeHandler,
		setTouchedState: pincodeTouchedStateEnable,
		reset: pincodeInputReset,
	} = useInput((value) => value.trim().length === 6);

	//CITY INPUT FIELD
	const {
		value: cityInputValue,
		isValueValid: isCityValid,
		hasError: cityInputHasError,
		valueChangeHandler: cityChangeHandler,
		setTouchedState: cityTouchedStateEnable,
		reset: cityInputReset,
	} = useInput((value) => value.trim() !== "");

	let formIsValid = false;
	if (isNameValid && isCityValid && isPincodeValid && isStreetValid)
		formIsValid = true;
	const confirmHandler = (event) => {
		event.preventDefault();
		const orderDetails = {
			orderDate: Date.now(),
			customerName: nameInputValue,
			customerAddress: `${streetInputValue}, ${cityInputValue}, ${pincodeInputValue}`,
			order: cartData.items,
			orderAmount: cartData.totalAmount,
		};
		order(orderDetails);
	};
	useEffect(() => {
		if (uploadSuccess) {
			nameInputReset();
			cityInputReset();
			pincodeInputReset();
			streetInputReset();
			props.onOrderSuccess();
		}
	}, [uploadSuccess]);
	return (
		<form className={classes.form} onSubmit={confirmHandler}>
			<div
				className={`${classes.control} ${
					nameInputHasError ? classes.invalid : ""
				}`}
			>
				<label htmlFor="name">Your Name</label>
				<input
					type="text"
					id="name"
					value={nameInputValue}
					onBlur={nameTouchedStateEnable}
					onChange={nameChangeHandler}
				/>
				{nameInputHasError && (
					<span className={classes.error}>Name can't be empty!</span>
				)}
			</div>
			<div
				className={`${classes.control} ${
					streetInputHasError ? classes.invalid : ""
				}`}
			>
				<label htmlFor="street">Street</label>
				<input
					type="text"
					id="street"
					value={streetInputValue}
					onBlur={streetTouchedStateEnable}
					onChange={streetChangeHandler}
				/>
				{streetInputHasError && (
					<span className={classes.error}>
						Street can't be empty!
					</span>
				)}
			</div>
			<div
				className={`${classes.control} ${
					pincodeInputHasError ? classes.invalid : ""
				}`}
			>
				<label htmlFor="pincode">Pincode</label>
				<input
					type="number"
					id="pincode"
					value={pincodeInputValue}
					onBlur={pincodeTouchedStateEnable}
					onChange={pincodeChangeHandler}
				/>
				{pincodeInputHasError && (
					<span className={classes.error}>
						Pincode shold be 6 chars long!
					</span>
				)}
			</div>
			<div
				className={`${classes.control} ${
					cityInputHasError ? classes.invalid : ""
				}`}
			>
				<label htmlFor="city">City</label>
				<input
					type="text"
					id="city"
					value={cityInputValue}
					onBlur={cityTouchedStateEnable}
					onChange={cityChangeHandler}
				/>
				{cityInputHasError && (
					<span className={classes.error}>City can't be empty!</span>
				)}
			</div>
			{error && (
				<p className={classes.uploadError}>
					Some error occurred, Could not place your order!
				</p>
			)}
			<div className={classes.actions}>
				<button type="button" onClick={props.onCancel}>
					Cancel
				</button>
				{props.hasItems && (
					<button className={classes.submit} disabled={!formIsValid}>
						{isLoading ? "Ordering..." : "Confirm"}
					</button>
				)}
			</div>
		</form>
	);
};

export default Checkout;
