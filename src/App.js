import { useState } from "react";
import "./App.css";
import Header from "./Components/Layout/Header";
import Meals from "./Components/Meals/Meals";
import Cart from "./Components/Cart/Cart";
import CartProvider from "./Components/Store/cart-provider";
function App() {
	const [cartVisibility, setCartVisibility] = useState(false);

	const showCartHandler = () => {
		setCartVisibility(true);
	};
	const hideCartHandler = () => {
		setCartVisibility(false);
	};

	return (
		<CartProvider>
			{cartVisibility && <Cart onClose={hideCartHandler} />}
			<Header onClick={showCartHandler} />
			<Meals />
		</CartProvider>
	);
}

export default App;
