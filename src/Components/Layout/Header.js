import { Fragment } from "react";
import mealsImage from "../assets/meals.jpg";
import classes from "./Header.module.css";
import CartButton from "./HeaderCartButton";
const Header = (props) => {
	return (
		<Fragment>
			<header className={classes.header}>
				<h1>React-Meals</h1>
				<CartButton onClick={props.onClick} />
			</header>
			<div className={classes["main-image"]}>
				<img src={mealsImage} alt="A table full of delicious food!" />
			</div>
		</Fragment>
	);
};

export default Header;
