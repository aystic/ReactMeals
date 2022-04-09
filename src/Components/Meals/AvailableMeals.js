import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealsItem from "./MealsItem/MealsItem";
import { useEffect, useState } from "react";

const AvailableMeals = () => {
	const [availableMealsList, setMeals] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);
	useEffect(() => {
		if (!error) {
			(async () => {
				try {
					const response = await fetch(
						process.env.REACT_APP_BASE_URL + "AvailableMeals.json"
					);
					if (!response.ok) {
						throw new Error("Something went wrong!");
					}
					const data = await response.json();
					if (!data) {
						throw new Error("Something went wrong!");
					}
					let processedData = [];
					for (const key of Object.keys(data)) {
						processedData.push({
							id: key,
							name: data[key].name,
							price: data[key].price,
							description: data[key].description,
						});
					}
					setMeals(processedData);
					setIsLoading(false);
				} catch (err) {
					console.error(err);
					setError(err.message);
					setIsLoading(false);
				}
			})();
		}
	}, []);

	let content;
	if (!isLoading && !error) {
		content = availableMealsList.map((meal) => {
			return (
				<MealsItem
					id={meal.id}
					key={meal.id}
					name={meal.name}
					description={meal.description}
					price={meal.price}
				/>
			);
		});
		content = (
			<Card>
				<ul>{content}</ul>
			</Card>
		);
	} else {
		if (isLoading) {
			content = <p className={classes.mealsLoading}>Loading...</p>;
		} else if (error) {
			content = <p className={classes.mealsLoadingError}>{error}</p>;
		}
	}
	return <section className={classes.meals}>{content}</section>;
};
export default AvailableMeals;
