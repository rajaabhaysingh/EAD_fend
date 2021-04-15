import axios from "axios";
import { authConstants } from "../redux/actions/constants";
import store from "../redux/store";

const token = localStorage.getItem("token");

const axiosIntance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    Authorization: token ? `Bearer ${token}` : "",
  },
});

axiosIntance.interceptors.request.use((req) => {
  // assigning new token after login
  const { auth } = store.getState();
  if (auth.token) {
    req.headers.Authorization = `Bearer ${auth.token}`;
  }
  return req;
});

axiosIntance.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    console.log(error.response);

    const { status } = error.response;
    if (status === 500) {
      localStorage.removeItem("token");
      store.dispatch({
        type: authConstants.LOGOUT_SUCCESS,
      });
    }
    return Promise.reject(error);
  }
);

export default axiosIntance;
