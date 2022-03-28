import { useRef, useState } from "react";
import classes from "./MealsItemForm.module.css";
import Input from "../../UI/Input";
const MealsItemForm = (props) => {
	const [isFormValid, setFormValidity] = useState(true);
	const inputRef = useRef();
	const formSubmitHandler = (event) => {
		event.preventDefault();
		const amount = +inputRef.current.value;
		if (amount.toString().trim().length > 0 && amount >= 1 && amount <= 5) {
			props.onSubmit(amount);
			setFormValidity(true);
		} else {
			setFormValidity(false);
		}
	};
	return (
		<>
			<form className={classes.form} onSubmit={formSubmitHandler}>
				<Input
					ref={inputRef}
					label="Amount"
					input={{
						id: "amount",
						type: "number",
						min: "1",
						max: "5",
						step: "1",
						defaultValue: "1",
					}}
				/>
				<button>+ Add</button>
			</form>
			{!isFormValid && <p>Please enter the amount between 1 and 5</p>}
		</>
	);
};

export default MealsItemForm;
