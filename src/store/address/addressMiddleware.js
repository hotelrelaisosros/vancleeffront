import { Component } from "react";
import { setLoading, setNetworkError } from "../common/commonSlice";
import ApiCaller from "../../utils/ApiCaller";
import { setAddressList, addAddress } from "./addressSlice";

export class AddressMiddleware extends Component {
	static GetAddressList(token) {
		return async (dispatch) => {
			dispatch(setLoading(true));
			try {
				let res = await ApiCaller.Get("/api/address", token);
				if (res.status === 200) {
					dispatch(setAddressList(res.data?.addresses));	
				}
				dispatch(setLoading(false));
				dispatch(setNetworkError(false));
			} catch (error) {
				dispatch(setLoading(false));
				dispatch(setNetworkError(true));
			}
		};
	}
	static CreateAddress(address, token) {
		return async (dispatch) => {
			dispatch(setLoading(true));
			try {
				let res = await ApiCaller.Post("/api/address", address, token);
				dispatch(addAddress(res.data?.address))
				dispatch(setLoading(false));
				dispatch(setNetworkError(false));
			} catch (error) {
				dispatch(setLoading(false));
				dispatch(setNetworkError(true));
			}
		};
	}
	static UpdateAddress(id, data, token) {
		return async (dispatch) => {
			dispatch(setLoading(true));
			try {
				await ApiCaller.Post(`/api/address/update/${id}`, data, token);
				dispatch(setLoading(false));
				dispatch(setNetworkError(false));
			} catch (error) {
				dispatch(setLoading(false));
				dispatch(setNetworkError(true));
			}
		};
	}
	static DeleteAddress(id, token) {
		return async (dispatch) => {
			dispatch(setLoading(true));
			try {
				await ApiCaller.Delete(`/api/address/${id}`, {}, token);
				dispatch(setLoading(false));
				dispatch(setNetworkError(false));
			} catch (error) {
				dispatch(setLoading(false));
				dispatch(setNetworkError(true));
			}
		};
	}
}
