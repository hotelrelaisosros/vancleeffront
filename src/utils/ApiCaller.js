import Axios from "axios";
let base_Url = "https://rivolihotels.org";
// const base_Url = "http://localhost:8000";

export default class ApiCaller {
  static BearerHeaders = (token) => {
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  static async Get(url = "", token, customUrl = "") {
    try {
      const response = await Axios.get(`${base_Url}${url}`, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          ...ApiCaller.BearerHeaders(token),
        },
      });
      return response;
    } catch (err) {
      return err.response;
    }
  }

  static async Post(endPoint = "", body = {}, token, customUrl = "") {
    try {
      const response = await Axios.post(`${base_Url}${endPoint}`, body, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
          ...ApiCaller.BearerHeaders(token),
        },
      });

      return response;
    } catch (err) {
      return err.response;
    }
  }

  static async Put(url = "", body = {}, token) {
    try {
      const response = await Axios.put(`${base_Url}${url}`, body, {
        headers: {
          "Content-Type": "application/json",
          ...ApiCaller.BearerHeaders(token),
        },
      });
      return response;
    } catch (err) {
      return err.response;
    }
  }

  static async Delete(url = "", body = {}, token) {
    try {
      const response = await Axios.delete(`${base_Url}${url}`, {
        headers: {
          "Content-Type": "application/json",
          ...ApiCaller.BearerHeaders(token),
        },
        data: body,
      });
      return response;
    } catch (err) {
      return err.response;
    }
  }
}
