import { Component } from "react";
import { setLoading, setNetworkError } from "../common/commonSlice";
import ApiCaller from "../../utils/ApiCaller";
import { setProducts, setSingleProduct } from "./productsSlice";
export class ProductsMiddleware extends Component {
    static GetAllProducts(formData) {
        return async (dispatch) => {
            try {
                dispatch(setLoading(true));
                let res = await ApiCaller.Post("/api/v1/products/front/step1", formData);
                if (res?.data) {
                    dispatch(setLoading(false));
                    dispatch(setProducts(res?.data.data));
                }
            } catch (error) {
                dispatch(setLoading(false));
                dispatch(setNetworkError(true));
            }
        };
    }
    static GetAllRing2Products(formData) {
        return async (dispatch) => {
            try {
                dispatch(setLoading(true));
                let res = await ApiCaller.Post("/api/v1/products/brac/step1", formData);
                if (res?.data) {
                    dispatch(setLoading(false));
                    dispatch(setProducts(res?.data.data));
                }
            } catch (error) {
                dispatch(setLoading(false));
                dispatch(setNetworkError(true));
            }
        };
    }

    static GetProductEnumerations(formData) {
        return async (dispatch) => {
            try {
                dispatch(setLoading(true));
                let res = await ApiCaller.Post("/api/v1/products/front/step2", formData);
                if (res?.data) {
                    dispatch(setLoading(false));
                    return res?.data.data;
                }
            } catch (error) {
                dispatch(setLoading(false));
                dispatch(setNetworkError(true));
                return false;
            }
        };
    }

    static GetAllNonRingProducts(formData) {
        return async (dispatch) => {
            try {
                dispatch(setLoading(true));
                let res = await ApiCaller.Post("/api/v1/products/simple/get_all_products", formData);
                if (res?.data) {
                    dispatch(setLoading(false));
                    dispatch(setProducts(res?.data.data));
                }
            } catch (error) {
                dispatch(setLoading(false));
                dispatch(setNetworkError(true));
            }
        };
    }

    static GetSingleProduct(formData) {
        return async (dispatch) => {
            try {
                dispatch(setLoading(true));
                let res = await ApiCaller.Post("/api/v1/products/simple/get_product", formData);
                if (res?.data) {
                    dispatch(setLoading(false));
                    dispatch(setSingleProduct(res?.data.data));
                }
            } catch (error) {
                dispatch(setLoading(false));
                dispatch(setNetworkError(true));
            }
        };
    }
    static GetRing2Product(formData) {
        return async (dispatch) => {
            try {
                dispatch(setLoading(true));
                let res = await ApiCaller.Post("/api/v1/products/brac/step2", formData);
                if (res?.data) {
                    dispatch(setLoading(false));
                    dispatch(setSingleProduct(res?.data.data));
                }
            } catch (error) {
                dispatch(setLoading(false));
                dispatch(setNetworkError(true));
            }
        };
    }
}
