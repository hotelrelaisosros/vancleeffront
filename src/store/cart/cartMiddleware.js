import { Component } from "react";
import { setLoading, setNetworkError } from "../common/commonSlice";
import ApiCaller from "../../utils/ApiCaller";
import { setCartItems } from "./cartSlice";

export class CartMiddleware extends Component {
	static GetCart(token) {
		return async (dispatch) => {
			dispatch(setLoading(true));
			try {
				let res = await ApiCaller.Get("/cart/table/show-cart", token);
				dispatch(setLoading(false));
				if (res.data.success === true) {
					dispatch(setCartItems(res?.data.cart_items_table));
				}
				dispatch(setNetworkError(false));
			} catch (error) {
				dispatch(setLoading(false));
				dispatch(setNetworkError(true));
			}
		};
	}
	static AddToCart(formData, token) {
		return async (dispatch) => {
			dispatch(setLoading(true));
			try {
				const result = await ApiCaller.Post("/cart/add-to-cart", formData, token);
				dispatch(setLoading(false));
				dispatch(setNetworkError(false));
				return result?.data;
			} catch (error) {
				dispatch(setLoading(false));
				dispatch(setNetworkError(true));
			}
		};
	}
	static RemoveItemFromCart(itemID, token) {
		return async (dispatch) => {
			dispatch(setLoading(true));
			try {
				await ApiCaller.Post("/cart/table/remove-cart", {id: itemID}, token);
				dispatch(setLoading(false));
				dispatch(setNetworkError(false));
			} catch (error) {
				dispatch(setLoading(false));
				dispatch(setNetworkError(true));
			}
		};
	}
}
