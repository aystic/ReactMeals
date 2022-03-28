import { useContext } from "react";
import CartContext from "../../Store/cart-context";
import classes from "./MealsItem.module.css";
import MealsItemForm from "./MealsItemForm";
const MealsItem = (props) => {
	const price = `INR ${props.price.toFixed(2)}`;
	const data = useContext(CartContext);
	const onSubmitHandler = (amount) => {
		const item = {
			id: props.id,
			name: props.name,
			price: props.price,
			amount: amount,
		};
		data.addItem(item);
	};
	return (
		<li className={classes.meal}>
			<div>
				<h3>{props.name}</h3>
				<div className={classes.description}>{props.description}</div>
				<div className={classes.price}>{price}</div>
			</div>
			<div>
				<MealsItemForm onSubmit={onSubmitHandler} />
			</div>
		</li>
	);
};

export default MealsItem;
