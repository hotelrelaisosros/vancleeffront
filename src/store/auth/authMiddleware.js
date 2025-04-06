import { Component } from "react";
import axios from "axios";
import { setLoading, setNetworkError, setToken } from "../common/commonSlice";
import ApiCaller from "../../utils/ApiCaller";
import {
  setCurrentUser,
  setRetailers,
  setWholesalers,
  setUsers,
  setOrders,
  setApprovalProducts,
  setDeletedProducts,
  setUserReport,
} from "./authSlice";
import { setUploadedProducts } from "../products/productsSlice";

export class AuthMiddleware extends Component {
  static UserLogin(formData) {
    return async (dispatch) => {
      dispatch(setLoading(true));
      
      try {
        const res = await ApiCaller.Post(`/login`, formData);
        
        // Always set loading to false after request completes
        dispatch(setLoading(false));
        
        if (res?.data?.status) {
          // Handle successful login
          if (res.data.token) {
            localStorage.setItem("token", res.data.token);
            dispatch(setToken(res.data.token));
          }
          if (res.data.user) {
            dispatch(setCurrentUser(res.data.user));
          }
          dispatch(setNetworkError(false));
          return res.data;
        } else {
          // Handle validation errors
          if (res?.data?.Message === "Validation errors" && res?.data?.errors) {
            if (res.data.errors.emailphone) {
              alert(res.data.errors.emailphone[0]);
              return false;
            }
          }
          // Handle other error cases
          alert(res?.data?.Message || "Login failed");
          return false;
        }
      } catch (error) {
        dispatch(setLoading(false));
        dispatch(setNetworkError(error));
        alert(error.message || "An error occurred during login");
        return false;
      }
    };
  }

  static UserForgotPassword(formData) {
    return async (dispatch) => {
      dispatch(setLoading(true));
      
      try {
        const res = await ApiCaller.Post(`/forgot`, formData);
        
        // Always set loading to false after request completes
        dispatch(setLoading(false));
        
        if (res?.data?.status) {
          // Handle successful forgot password
          dispatch(setNetworkError(false));
          return res.data;
        } else {
          // Handle validation errors
          if (res?.data?.Message === "Validation errors" && res?.data?.errors) {
            if (res.data.errors.emailphone) {
              alert(res.data.errors.emailphone[0]);
              return false;
            }
          }
          // Handle other error cases
          alert(res?.data?.Message || "Login failed");
          return false;
        }
      } catch (error) {
        dispatch(setLoading(false));
        dispatch(setNetworkError(error));
        alert(error.message || "An error occurred during login");
        return false;
      }
    };
  }

  static UserResendToken(formData) {
    return async (dispatch) => {
      dispatch(setLoading(true));
      
      try {
        const res = await ApiCaller.Post(`/resend-verification-link`, formData);
        
        // Always set loading to false after request completes
        dispatch(setLoading(false));
        
        if (res?.data?.status) {
          // Handle successful forgot password
          dispatch(setNetworkError(false));
          return res.data;
        } else {
          // Handle validation errors
          if (res?.data?.Message === "Validation errors" && res?.data?.errors) {
            if (res.data.errors.emailphone) {
              alert(res.data.errors.emailphone[0]);
              return false;
            }
          }
          // Handle other error cases
          alert(res?.data?.Message || "Login failed");
          return false;
        }
      } catch (error) {
        dispatch(setLoading(false));
        dispatch(setNetworkError(error));
        alert(error.message || "An error occurred during login");
        return false;
      }
    };
  }

  static UserRegister(formData, callback) {
    return async (dispatch) => {
      return new Promise(async (resolve, reject) => {
        try {
          dispatch(setLoading(true));
          let res = await ApiCaller.Post(`/signup`, formData);
          console.log(res);

          await new Promise(resolve => setTimeout(resolve, 1000));

          if (callback) callback()
          //due to SMTP error i am not writing the code for the response
        } catch (error) {
          dispatch(setLoading(false));
          reject(false);
          dispatch(setNetworkError(error));
          console.log("error=>", error);
        } finally {
          dispatch(setLoading(false));
        }
      });
    };
  }
  static UserSubscribe(formData) {
    return async (dispatch) => {
      return new Promise(async (resolve, reject) => {
        try {
          dispatch(setLoading(true));
          let res = await ApiCaller.Post(`/subscribe-email`, formData);
          console.log("res==>", res);
          if (res.data.status) {
            dispatch(setLoading(false));
            resolve(res?.data);
            dispatch(setNetworkError(false));
          } else {
            dispatch(setLoading(false));
            reject(res?.data);
            dispatch(setNetworkError(false));
          }
        } catch (error) {
          dispatch(setLoading(false));
          dispatch(setNetworkError(true));
          reject(false);
        }
      });
    };
  }
  static UserForgetPassword(formData) {
    return async (dispatch) => {
      return new Promise(async (resolve, reject) => {
        try {
          dispatch(setLoading(true));
          // const BearerHeaders = ApiCaller.BearerHeaders()
          let res = await ApiCaller.Post(`/api/forgot`, formData);
          if (res.data.status) {
            dispatch(setLoading(false));
            resolve(res?.data);
            dispatch(setCurrentUser(res?.data.user));
            dispatch(setToken(res?.data.token));

            dispatch(setNetworkError(false));
          } else {
            dispatch(setLoading(false));
            reject(res);

            dispatch(setNetworkError(false));
          }
        } catch (error) {
          dispatch(setLoading(false));
          dispatch(setNetworkError(true));
          reject(false);
        }
      });
    };
  }
  static UserResetPassword(formData) {
    return async (dispatch) => {
      return new Promise(async (resolve, reject) => {
        try {
          dispatch(setLoading(true));
          // const BearerHeaders = ApiCaller.BearerHeaders()
          let res = await ApiCaller.Post(`/api/reset`, formData);
          console.log("res==>", res);
          if (res.data.status) {
            dispatch(setLoading(false));
            resolve(res?.data);
            dispatch(setCurrentUser(res?.data.user));
            dispatch(setToken(res?.data.token));

            dispatch(setNetworkError(false));
          } else {
            dispatch(setLoading(false));
            reject(res);

            dispatch(setNetworkError(false));
          }
        } catch (error) {
          dispatch(setLoading(false));
          dispatch(setNetworkError(true));
          reject(false);
        }
      });
    };
  }
  static GetUsers(formData, { role }, token) {
    return async (dispatch) => {
      dispatch(setLoading(true));
      return new Promise(async (resolve, reject) => {
        try {
          const BearerHeaders = ApiCaller.BearerHeaders(token);
          let res = await ApiCaller.Post(
            `/api/${role}`,
            formData,
            BearerHeaders
          );
          if (res.data.status) {
            dispatch(setLoading(false));
            resolve(res);
            dispatch(setUsers(res?.data));

            dispatch(setNetworkError(false));
          } else {
            dispatch(setLoading(false));
            reject(res);
            dispatch(setUsers(res?.data));

            dispatch(setNetworkError(false));
          }
        } catch (error) {
          dispatch(setLoading(false));
          dispatch(setNetworkError(true));
          reject(false);
        }
      });
    };
  }
  static GetWholeSalers(formData, token) {
    return async (dispatch) => {
      dispatch(setLoading(true));
      return new Promise(async (resolve, reject) => {
        try {
          const BearerHeaders = ApiCaller.BearerHeaders(token);
          let res = await ApiCaller.Post(
            "/api/wholesalers",
            formData,
            BearerHeaders
          );
          if (res.data.status) {
            dispatch(setLoading(false));
            resolve(res);
            dispatch(setWholesalers(res?.data));

            dispatch(setNetworkError(false));
          } else {
            dispatch(setLoading(false));
            reject(res);

            dispatch(setNetworkError(false));
          }
        } catch (error) {
          dispatch(setLoading(false));
          dispatch(setNetworkError(true));
          reject(false);
        }
      });
    };
  }
  static GetRetailers(formData, token) {
    return async (dispatch) => {
      dispatch(setLoading(true));
      return new Promise(async (resolve, reject) => {
        try {
          const BearerHeaders = ApiCaller.BearerHeaders(token);
          let res = await ApiCaller.Post(
            "/api/retailers",
            formData,
            BearerHeaders
          );
          if (res.data.status) {
            dispatch(setLoading(false));
            resolve(res);
            dispatch(setRetailers(res?.data));

            dispatch(setNetworkError(false));
          } else {
            dispatch(setLoading(false));
            reject(res);

            dispatch(setNetworkError(false));
          }
        } catch (error) {
          dispatch(setLoading(false));
          dispatch(setNetworkError(true));
          reject(false);
        }
      });
    };
  }
  static GetAdminProfile(token) {
    return async (dispatch) => {
      dispatch(setLoading(true));
      return new Promise(async (resolve, reject) => {
        try {
          const BearerHeaders = ApiCaller.BearerHeaders(token);
          let res = await ApiCaller.Get(`/api/profile`, BearerHeaders);
          if (res.data.status) {
            dispatch(setLoading(false));
            resolve(res);
            dispatch(setCurrentUser(res?.data));

            dispatch(setNetworkError(false));
          } else {
            dispatch(setLoading(false));
            reject(res);
            dispatch(setCurrentUser(res?.data));

            dispatch(setNetworkError(false));
          }
        } catch (error) {
          dispatch(setLoading(false));
          dispatch(setNetworkError(true));
          reject(false);
        }
      });
    };
  }
  static UpdateProfile(formData, token) {
    return async (dispatch) => {
      dispatch(setLoading(true));
      return new Promise(async (resolve, reject) => {
        try {
          const BearerHeaders = ApiCaller.BearerHeaders(token);
          let res = await ApiCaller.Post(
            `/api/profile/update`,
            formData,
            BearerHeaders
          );
          if (res.data.status) {
            dispatch(setLoading(false));
            resolve(res);

            dispatch(setNetworkError(false));
          } else {
            dispatch(setLoading(false));
            reject(res);

            dispatch(setNetworkError(false));
          }
        } catch (error) {
          dispatch(setLoading(false));
          dispatch(setNetworkError(true));
          reject(false);
        }
      });
    };
  }
  static BlockUserAccount({ id, blockMessage }, token) {
    return async (dispatch) => {
      return new Promise(async (resolve, reject) => {
        try {
          const BearerHeaders = ApiCaller.BearerHeaders(token);
          let res = await ApiCaller.Get(
            `/api/user/block/${id}/${blockMessage}`,
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
          dispatch(setLoading(false));
          dispatch(setNetworkError(true));
          reject(false);
        }
      });
    };
  }
  static GetApprovalProducts(formData, token) {
    // Print all key-value pairs from formData

    return async (dispatch) => {
      dispatch(setLoading(true));
      return new Promise(async (resolve, reject) => {
        try {
          const BearerHeaders = ApiCaller.BearerHeaders(token);
          let res = await ApiCaller.Post(
            `/api/show/admin/products`,
            formData,
            BearerHeaders
          );
          console.log("formData", formData);
          console.log("res", res);
          if (res.data.status) {
            dispatch(setLoading(false));
            resolve(res);
            dispatch(setApprovalProducts(res?.data));

            dispatch(setNetworkError(false));
          } else {
            dispatch(setLoading(false));
            reject(res);
            dispatch(setApprovalProducts(res?.data));

            dispatch(setNetworkError(false));
          }
        } catch (error) {
          dispatch(setLoading(false));
          dispatch(setNetworkError(true));
          reject(false);
        }
      });
    };
  }
  static GetApprovalProductsByRole(formData, token) {
    return async (dispatch) => {
      dispatch(setLoading(true));
      return new Promise(async (resolve, reject) => {
        try {
          const BearerHeaders = ApiCaller.BearerHeaders(token);
          let res = await ApiCaller.Post(
            `/api/show/admin/products`,
            formData,
            BearerHeaders
          );
          if (res.data.status) {
            dispatch(setLoading(false));
            resolve(res);
            dispatch(setApprovalProducts(res?.data));

            dispatch(setNetworkError(false));
          } else {
            dispatch(setLoading(false));
            reject(res);
            dispatch(setApprovalProducts(res?.data));

            dispatch(setNetworkError(false));
          }
        } catch (error) {
          dispatch(setLoading(false));
          dispatch(setNetworkError(true));
          reject(false);
        }
      });
    };
  }
  static ProductStatusChange(token, formData) {
    return async (dispatch) => {
      return new Promise(async (resolve, reject) => {
        try {
          const BearerHeaders = ApiCaller.BearerHeaders(token);
          let res = await ApiCaller.Post(
            `/api/status/change/product`,
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
          dispatch(setLoading(false));
          dispatch(setNetworkError(true));
          reject(false);
        }
      });
    };
  }
  static GetDeletedProducts(formData, token) {
    return async (dispatch) => {
      dispatch(setLoading(true));
      return new Promise(async (resolve, reject) => {
        try {
          const BearerHeaders = ApiCaller.BearerHeaders(token);
          let res = await ApiCaller.Post(
            `/api/show/delete/product`,
            formData,
            BearerHeaders
          );
          if (res.data.status) {
            dispatch(setLoading(false));
            resolve(res);
            dispatch(setDeletedProducts(res?.data));

            dispatch(setNetworkError(false));
          } else {
            dispatch(setLoading(false));
            reject(res);
            dispatch(setDeletedProducts(res?.data));

            dispatch(setNetworkError(false));
          }
        } catch (error) {
          dispatch(setLoading(false));
          dispatch(setNetworkError(true));
          reject(false);
        }
      });
    };
  }
  static GetUploadedProducts({ id }, token) {
    return async (dispatch) => {
      dispatch(setLoading(true));
      return new Promise(async (resolve, reject) => {
        try {
          const BearerHeaders = ApiCaller.BearerHeaders(token);
          let res = await ApiCaller.Post(
            `/api/shop/product`,
            { id: id },
            BearerHeaders
          );
          if (res.data.status) {
            dispatch(setLoading(false));
            resolve(res);
            dispatch(setUploadedProducts(res?.data));

            dispatch(setNetworkError(false));
          } else {
            dispatch(setLoading(false));
            reject(res);
            dispatch(setUploadedProducts(res?.data));

            dispatch(setNetworkError(false));
          }
        } catch (error) {
          dispatch(setLoading(false));
          dispatch(setNetworkError(true));
          reject(false);
        }
      });
    };
  }
  static GetReport(formData, token) {
    return async (dispatch) => {
      dispatch(setLoading(true));
      return new Promise(async (resolve, reject) => {
        try {
          const BearerHeaders = ApiCaller.BearerHeaders(token);
          let res = await ApiCaller.Post(
            `/api/report`,
            formData,
            BearerHeaders
          );
          if (res.data.status) {
            dispatch(setLoading(false));
            resolve(res);
            dispatch(setUserReport(res));

            dispatch(setNetworkError(false));
            console.log("res", res);
          } else {
            dispatch(setLoading(false));
            reject(res);
            dispatch(setUserReport(res));

            dispatch(setNetworkError(false));
            console.log("res", res);
          }
        } catch (error) {
          dispatch(setLoading(false));
          dispatch(setNetworkError(true));
          reject(false);
        }
      });
    };
  }
  static GetReportDetails(formData, token) {
    return async (dispatch) => {
      dispatch(setLoading(true));
      return new Promise(async (resolve, reject) => {
        try {
          const BearerHeaders = ApiCaller.BearerHeaders(token);
          let res = await ApiCaller.Post(
            `/api/reports`,
            formData,
            BearerHeaders
          );
          if (res.data.status) {
            dispatch(setLoading(false));
            resolve(res);
            dispatch(setUserReport(res));

            dispatch(setNetworkError(false));
            console.log("res", res);
          } else {
            dispatch(setLoading(false));
            reject(res);
            dispatch(setUserReport(res));

            dispatch(setNetworkError(false));
            console.log("res", res);
          }
        } catch (error) {
          dispatch(setLoading(false));
          dispatch(setNetworkError(true));
          reject(false);
        }
      });
    };
  }
  static GetProfileReport({ id }, token) {
    return async (dispatch) => {
      dispatch(setLoading(true));
      return new Promise(async (resolve, reject) => {
        try {
          const BearerHeaders = ApiCaller.BearerHeaders(token);
          let res = await ApiCaller.Get(`/api/show/shop/${id}`, BearerHeaders);
          if (res.data.status) {
            dispatch(setLoading(false));
            resolve(res);
            dispatch(setUserReport(res));

            dispatch(setNetworkError(false));
            console.log("res", res);
          } else {
            dispatch(setLoading(false));
            reject(res);
            dispatch(setUserReport(res));

            dispatch(setNetworkError(false));
            console.log("res", res);
          }
        } catch (error) {
          dispatch(setLoading(false));
          dispatch(setNetworkError(true));
          reject(false);
        }
      });
    };
  }
  // static ViewDetailReport({ id: id }, token) {
  //   return async (dispatch) => {
  //     dispatch(setLoading(true));
  //     return new Promise(async (resolve, reject) => {
  //       try {
  //         const BearerHeaders = ApiCaller.BearerHeaders(token);
  //         let res = await ApiCaller.Get(`/api/report/${id}`, BearerHeaders);
  //         if (res.data.status) {
  //           dispatch(setLoading(false));
  //           resolve(res);
  //           dispatch(setUserReport(res));

  //           dispatch(setNetworkError(false));
  //           console.log("res", res);
  //         } else {
  //           dispatch(setLoading(false));
  //           reject(res);
  //           dispatch(setUserReport(res));

  //           dispatch(setNetworkError(false));
  //           console.log("res", res);
  //         }
  //       } catch (error) {
  //         dispatch(setLoading(false));
  //         dispatch(setNetworkError(true));
  //         reject(false);
  //       }
  //     });
  //   };
  // }
  static DeleteReport({ id }, token) {
    return async (dispatch) => {
      dispatch(setLoading(true));
      return new Promise(async (resolve, reject) => {
        try {
          const BearerHeaders = ApiCaller.BearerHeaders(token);
          let res = await ApiCaller.Get(
            `/api/delete/report/${id}`,
            BearerHeaders
          );
          if (res.data.status) {
            dispatch(setLoading(false));
            resolve(res);
            dispatch(setUserReport(res));

            dispatch(setNetworkError(false));
            console.log("res", res);
          } else {
            dispatch(setLoading(false));
            reject(res);
            dispatch(setUserReport(res));

            dispatch(setNetworkError(false));
            console.log("res", res);
          }
        } catch (error) {
          dispatch(setLoading(false));
          dispatch(setNetworkError(true));
          reject(false);
        }
      });
    };
  }
  static DeleteReportId({ id }, token) {
    return async (dispatch) => {
      dispatch(setLoading(true));
      return new Promise(async (resolve, reject) => {
        try {
          const BearerHeaders = ApiCaller.BearerHeaders(token);
          let res = await ApiCaller.Get(
            `/api/delete/report/${id}`,
            BearerHeaders
          );
          if (res.data.status) {
            dispatch(setLoading(false));
            resolve(res);
            dispatch(setUserReport(res));

            dispatch(setNetworkError(false));
            console.log("res", res);
          } else {
            dispatch(setLoading(false));
            reject(res);
            dispatch(setUserReport(res));

            dispatch(setNetworkError(false));
            console.log("res", res);
          }
        } catch (error) {
          dispatch(setLoading(false));
          dispatch(setNetworkError(true));
          reject(false);
        }
      });
    };
  }
  static DeleteAllReport(token) {
    return async (dispatch) => {
      dispatch(setLoading(true));
      return new Promise(async (resolve, reject) => {
        try {
          const BearerHeaders = ApiCaller.BearerHeaders(token);
          let res = await ApiCaller.Get(
            `/api/delete/all/report`,
            BearerHeaders
          );
          if (res.data.status) {
            dispatch(setLoading(false));
            resolve(res);
            dispatch(setUserReport(res));

            dispatch(setNetworkError(false));
            console.log("res", res);
          } else {
            dispatch(setLoading(false));
            reject(res);
            dispatch(setUserReport(res));

            dispatch(setNetworkError(false));
            console.log("res", res);
          }
        } catch (error) {
          dispatch(setLoading(false));
          dispatch(setNetworkError(true));
          reject(false);
        }
      });
    };
  }
  static DeleteSpecificProduct(id, token) {
    return async (dispatch) => {
      return new Promise(async (resolve, reject) => {
        try {
          const base_Url = "https://real.heroksa.net";
          let res = await axios.post(`${base_Url}/delete/product`, { id: id }, {
            'Authorization': `Bearer ${token}`
          })
          console.log(res)
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

  static DeleteAllProduct(token) {
    return async (dispatch) => {
      return new Promise(async (resolve, reject) => {
        try {
          const BearerHeaders = ApiCaller.BearerHeaders(token);
          let res = await ApiCaller.Get(
            `/api/all/hard/delete/product`,
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

  static GetOrder(formData, token) {
    return async (dispatch) => {
      dispatch(setLoading(true));
      return new Promise(async (resolve, reject) => {
        try {
          const BearerHeaders = ApiCaller.BearerHeaders(token);

          // Assuming that formData will be passed as query parameters
          const queryParams = new URLSearchParams(formData).toString();

          // Modify URL to include query parameters
          let res = await ApiCaller.Get(`/api/get/order?${queryParams}`, BearerHeaders);

          // Check if the API call was successful and orders are returned
          if (res.data.status && res.data.Orders.length > 0) {
            dispatch(setLoading(false));
            resolve(res);
            dispatch(setOrders(res?.data.Orders));  // Set orders in Redux store
            dispatch(setNetworkError(false));
          } else {
            dispatch(setLoading(false));
            dispatch(setOrders([]));  // Set empty array if no orders are found
            dispatch(setNetworkError(false));
            if (res.data.Message) {
              // Optionally handle the "Order not found" message
              console.log(res.data.Message);  // Or show it in a notification
            }
            reject(res);
          }
        } catch (error) {
          dispatch(setLoading(false));
          dispatch(setNetworkError(true));
          reject(false);
        }
      });
    };
  }



  static GetOrderByRole(formData, token) {
    return async (dispatch) => {
      dispatch(setLoading(true));
      return new Promise(async (resolve, reject) => {
        try {
          const BearerHeaders = ApiCaller.BearerHeaders(token);
          let res = await ApiCaller.Post(
            `/api/get/order`,
            formData,
            BearerHeaders
          );
          if (res.data.status) {
            dispatch(setLoading(false));
            resolve(res);
            dispatch(setOrders(res?.data));

            dispatch(setNetworkError(false));
          } else {
            dispatch(setLoading(false));
            reject(res);
            dispatch(setOrders(res?.data));

            dispatch(setNetworkError(false));
          }
        } catch (error) {
          dispatch(setLoading(false));
          dispatch(setNetworkError(true));
          reject(false);
        }
      });
    };
  }

  static ChangeOrderStatus(formData, token) {
    return async (dispatch) => {
      return new Promise(async (resolve, reject) => {
        try {
          const BearerHeaders = ApiCaller.BearerHeaders(token);
          let res = await ApiCaller.Post(
            `/api/status/change/order`,
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
          dispatch(setLoading(false));
          dispatch(setNetworkError(true));
          reject(false);
        }
      });
    };
  }

  static GetTranding(id, token) {
    return async (dispatch) => {
      dispatch(setLoading(true));
      return new Promise(async (resolve, reject) => {
        try {
          const BearerHeaders = ApiCaller.BearerHeaders(token);
          let res = await ApiCaller.Get(
            `/api/status/trending/product/${id}`,
            BearerHeaders
          );
          if (res.data.status) {
            dispatch(setLoading(false));
            resolve(res);
            dispatch(setOrders(res?.data));

            dispatch(setNetworkError(false));
          } else {
            dispatch(setLoading(false));
            reject(res);
            dispatch(setOrders(res?.data));

            dispatch(setNetworkError(false));
          }
        } catch (error) {
          dispatch(setLoading(false));
          dispatch(setNetworkError(true));
          reject(false);
        }
      });
    };
  }
  static StatusInquiry(formData, token) {
    return async (dispatch) => {
      return new Promise(async (resolve, reject) => {
        try {
          const BearerHeaders = ApiCaller.BearerHeaders(token);
          let res = await ApiCaller.Post(
            "/api/jazzcash/status/inquiry",
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
          dispatch(setLoading(false));
          dispatch(setNetworkError(true));
          reject(false);
        }
      });
    };
  }
}
