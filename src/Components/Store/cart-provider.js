import { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
	items: [],
	totalAmount: 0,
};
const cartReducer = (state, action) => {
	if (action.type === "ADD") {
		const newTotalAmount =
			state.totalAmount + action.item.price * action.item.amount;
		const existingItemIndex = state.items.findIndex((item) => {
			return item.id === action.item.id;
		});
		let updatedItem;
		let updatedItems;
		if (existingItemIndex !== -1) {
			updatedItem = {
				...state.items[existingItemIndex],
				amount:
					state.items[existingItemIndex].amount + action.item.amount,
			};
			updatedItems = [...state.items];
			updatedItems[existingItemIndex] = updatedItem;
		} else {
			updatedItem = { ...action.item };
			updatedItems = state.items.concat(updatedItem);
		}

		const newCartItems = updatedItems;
		return {
			items: newCartItems,
			totalAmount: newTotalAmount,
		};
	}
	if (action.type === "REMOVE") {
		const existingItemIndex = state.items.findIndex((item) => {
			return item.id === action.id;
		});
		const existingItem = state.items[existingItemIndex];
		const updatedAmount = state.totalAmount - existingItem.price;
		let updatedItem;
		let updatedItems;
		if (existingItem.amount === 1) {
			updatedItems = state.items.filter((item) => {
				return item.id !== action.id;
			});
		} else {
			updatedItem = { ...existingItem };
			updatedItem.amount = updatedItem.amount - 1;
			updatedItems = [...state.items];
			updatedItems[existingItemIndex] = updatedItem;
		}
		return {
			items: updatedItems,
			totalAmount: updatedAmount,
		};
	}
	return defaultCartState;
};

const CartProvider = (props) => {
	const [cartState, cartDispatAction] = useReducer(
		cartReducer,
		defaultCartState
	);
	const addItem = (item) => {
		cartDispatAction({ type: "ADD", item: item });
	};
	const removeItem = (id) => {
		cartDispatAction({ type: "REMOVE", id: id });
	};
	const cartContext = {
		items: cartState.items,
		totalAmount: cartState.totalAmount,
		addItem: addItem,
		removeItem: removeItem,
	};
	return (
		<CartContext.Provider value={cartContext}>
			{props.children}
		</CartContext.Provider>
	);
};

export default CartProvider;
