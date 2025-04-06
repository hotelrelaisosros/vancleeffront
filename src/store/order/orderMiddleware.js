import { Component } from "react";
import { setLoading, setNetworkError } from "../common/commonSlice";
import ApiCaller from "../../utils/ApiCaller";
import { setOrderHistory, setCurrentOrderHistory } from "./orderSlice";

export class OrderMiddleware extends Component {
	static CreateOrder(formData, token) {
		return async (dispatch) => {
			try {
				let res = await ApiCaller.Post("/order", formData, token);
				if (res.data.status) {
					dispatch(setNetworkError(false));
					return res.data;
				} else {
					dispatch(setNetworkError(false));
				}
			} catch (error) {
				dispatch(setLoading(false));
				dispatch(setNetworkError(true));
			}
		};
	}

	static GetOrderHistory(formData, token) {
		return async (dispatch) => {
			try {
				const queryParams = new URLSearchParams(formData).toString();
				let res = await ApiCaller.Get(`/get_user/order?${queryParams}`, token);
				if (res.data.status) {
					dispatch(setNetworkError(false));
					dispatch(setOrderHistory(res.data?.orders));
				} else {
					dispatch(setNetworkError(false));
				}
			} catch (error) {
				dispatch(setLoading(false));
				dispatch(setNetworkError(true));
			}
		};
	}

	static GetOrderDetails(orderID, token) {
		return async (dispatch) => {
			try {
				let res = await ApiCaller.Get(`/get_user/order/${orderID}`, token);
				if (res.data.status) {
					dispatch(setNetworkError(false));
					dispatch(setCurrentOrderHistory(res.data?.orders[0]));
				} else {
					dispatch(setNetworkError(false));
				}
			} catch (error) {
				dispatch(setLoading(false));
				dispatch(setNetworkError(true));
			}
		};
	}
}
