import { Component } from "react";
import { setLoading, setNetworkError } from "../common/commonSlice";
import ApiCaller from "../../utils/ApiCaller";
import { setWishlistItems } from "./wishlistSlice";

export class WishListMiddleware extends Component {
	static GetWishList(token) {
		return async (dispatch) => {
			dispatch(setLoading(true));
			try {
				let res = await ApiCaller.Get("/wishlist/view", token);
				dispatch(setLoading(false));
				if (res.data.success === true) {
					dispatch(setWishlistItems(res?.data.wishlist));
				}
				dispatch(setNetworkError(false));
			} catch (error) {
				dispatch(setLoading(false));
				dispatch(setNetworkError(true));
			}
		};
	}
	static AddToWishList(formData, token) {
		return async (dispatch) => {
			dispatch(setLoading(true));
			try {
				const result = await ApiCaller.Post("/wishlist/add", formData, token);
				dispatch(setLoading(false));
				dispatch(setNetworkError(false));
				return result?.data;
			} catch (error) {
				dispatch(setLoading(false));
				dispatch(setNetworkError(true));
			}
		};
	}
	static RemoveItemFromWishList(itemID, token) {
		return async (dispatch) => {
			dispatch(setLoading(true));
			try {
				await ApiCaller.Post("/wishlist/remove", {id: itemID}, token);
				dispatch(setLoading(false));
				dispatch(setNetworkError(false));
			} catch (error) {
				dispatch(setLoading(false));
				dispatch(setNetworkError(true));
			}
		};
	}
}
