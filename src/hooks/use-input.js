import { useState } from "react";

const useInput = (validateData) => {
	const [value, setValue] = useState("");
	const [isTouched, setIsTouched] = useState(false);
	const isEnteredValueValid = validateData(value);
	const hasError = !isEnteredValueValid && isTouched;
	const valueChangeHandler = (event) => {
		setValue(event.target.value);
	};
	const setTouchedState = () => {
		setIsTouched(true);
	};
	const reset = () => {
		setValue("");
		setIsTouched(false);
	};
	return {
		value,
		isValueValid: isEnteredValueValid,
		hasError,
		valueChangeHandler,
		setTouchedState,
		reset,
	};
};

export default useInput;
