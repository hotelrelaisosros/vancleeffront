import { Component } from "react";
import { setLoading, setNetworkError } from "../common/commonSlice";
import ApiCaller from "../../utils/ApiCaller";
import { setCategory } from "./categorySlice";
import { setSubCategory } from "./subCategorySlice";

export class CategoryMiddleware extends Component {
  static GetCategory(token) {
    return async (dispatch) => {
      dispatch(setLoading(true));
      try {
        const BearerHeaders = ApiCaller.BearerHeaders(token);
        let res = await ApiCaller.Get("/api/category", BearerHeaders);
        dispatch(setLoading(false));
        if (res.data.status) {
          dispatch(setCategory(res?.data.Category));
        }
        dispatch(setNetworkError(false));
      } catch (error) {
        dispatch(setLoading(false));
        dispatch(setNetworkError(true));
        console.log("CATEGORY ERROR =>", error);
      }
    };
  }
  static AddCategory(formData, token) {
    return async (dispatch) => {
      return new Promise(async (resolve, reject) => {
        try {
          const BearerHeaders = ApiCaller.BearerHeaders(token);
          let res = await ApiCaller.Post(
            "/api/add/category",
            formData,
            BearerHeaders
          );
          if (res.data.status) {
            resolve(res);

            dispatch(setNetworkError(false));
          } else {
            reject(res);

            dispatch(setNetworkError(false));
          }
        } catch (error) {
          reject(false);

          dispatch(setNetworkError(true));
        }
      });
    };
  }
  static UpdateCategory(formData, token) {
    return async (dispatch) => {
      return new Promise(async (resolve, reject) => {
        try {
          dispatch(setLoading(true));
          const BearerHeaders = ApiCaller.BearerHeaders(token);
          let res = await ApiCaller.Post(
            "/api/update/category",
            formData,
            BearerHeaders
          );
          if (res.data.status) {
            resolve(res);

            dispatch(setNetworkError(false));
          } else {
            reject(res);

            dispatch(setNetworkError(false));
          }
        } catch (error) {
          reject(false);
          dispatch(setNetworkError(true));
        }
      });
    };
  }
  static DeleteCategory({ id }, token) {
    return async (dispatch) => {
      return new Promise(async (resolve, reject) => {
        try {
          dispatch(setLoading(true));
          const BearerHeaders = ApiCaller.BearerHeaders(token);
          let res = await ApiCaller.Post(
            "/api/delete/category",
            { id: id },
            BearerHeaders
          );
          if (res.data.status) {
            resolve(res);

            dispatch(setNetworkError(false));
          } else {
            reject(res);

            dispatch(setNetworkError(false));
          }
        } catch (error) {
          reject(false);

          dispatch(setNetworkError(true));
        }
      });
    };
  }
}

export class SubCategoryMiddleware extends Component {
  static GetSubCategory({ id }, token) {
    return async (dispatch) => {
      dispatch(setLoading(true));
      try {
        const BearerHeaders = ApiCaller.BearerHeaders(token);
        let res = await ApiCaller.Get( `/api/v1/subcategory/show/${id}`, BearerHeaders );
        
        if (res.data.status) {
          dispatch(setLoading(false));
          const result = [];
          result[id] = res?.data?.SubCategory
          dispatch(setSubCategory(result));
          dispatch(setNetworkError(false));
        } else {
          dispatch(setLoading(false));
          dispatch(setSubCategory([]));
          dispatch(setNetworkError(false));
        }
      } catch (error) {
        dispatch(setLoading(false));
        dispatch(setNetworkError(true));
        console.log("SUB-CATEGORY ERROR =>", error);
      }
    };
  }
  static AddSubCategory(formData, token) {
    return async (dispatch) => {
      return new Promise(async (resolve, reject) => {
        try {
          const BearerHeaders = ApiCaller.BearerHeaders(token);
          let res = await ApiCaller.Post(
            "/api/add/subcategory",
            formData,
            BearerHeaders
          );
          if (res.data.status) {
            resolve(res);

            dispatch(setNetworkError(false));
          } else {
            reject(res);

            dispatch(setNetworkError(false));
          }
        } catch (error) {
          reject(false);

          dispatch(setNetworkError(true));
        }
      });
    };
  }
  static UpdateSubCategory(formData, token) {
    return async (dispatch) => {
      return new Promise(async (resolve, reject) => {
        try {
          const BearerHeaders = ApiCaller.BearerHeaders(token);
          let res = await ApiCaller.Post(
            "/api/update/subcategory",
            formData,
            BearerHeaders
          );
          if (res.data.status) {
            resolve(res);

            dispatch(setNetworkError(false));
          } else {
            reject(res);

            dispatch(setNetworkError(false));
          }
        } catch (error) {
          reject(false);

          dispatch(setNetworkError(true));
        }
      });
    };
  }
  static DeleteSubCategory(formData, token) {
    return async (dispatch) => {
      return new Promise(async (resolve, reject) => {
        try {
          const BearerHeaders = ApiCaller.BearerHeaders(token);
          let res = await ApiCaller.Post(
            "/api/delete/subcategory",
            formData,
            BearerHeaders
          );
          if (res.data.status) {
            resolve(res);

            dispatch(setNetworkError(false));
          } else {
            reject(res);

            dispatch(setNetworkError(false));
          }
        } catch (error) {
          reject(false);

          dispatch(setNetworkError(true));
        }
      });
    };
  }
}
