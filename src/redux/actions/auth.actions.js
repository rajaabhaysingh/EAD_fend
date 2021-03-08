import axiosIntance from "../../helpers/axios";
import { authConstants } from "./constants";

// login
export const login = (user) => {
  return async (dispatch) => {
    dispatch({
      type: authConstants.LOGIN_REQUEST,
    });

    await axiosIntance
      .post("/api/login", {
        ...user,
      })
      .then((res) => {
        if (res.status === 200) {
          const { token, data } = res.data;
          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(data));
          dispatch({
            type: authConstants.LOGIN_SUCCESS,
            payload: {
              token,
              data,
            },
          });
        } else {
          localStorage.clear();
          dispatch({
            type: authConstants.LOGIN_FAILURE,
            payload: {
              error: "Unexpected error occured. [code: arreacau]",
            },
          });
        }
      })
      .catch((err) => {
        localStorage.clear();
        dispatch({
          type: authConstants.LOGIN_FAILURE,
          payload: {
            error:
              typeof err.response?.data?.error !== "object"
                ? err.response?.data?.error
                : err.response?.data?.error?.message ||
                  err.message ||
                  "Some unexpected error ocuured. Try refreshing the page or contact developer if problem persists.",
          },
        });
      });
  };
};

// isUserLoggedIn
export const isUserLoggedIn = () => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (token && user) {
      let user = null;
      try {
        user = JSON.parse(localStorage.getItem("user"));
      } catch (error) {
        localStorage.clear();
        dispatch({
          type: authConstants.LOGIN_FAILURE,
          payload: {
            error: "Automatic login failed. Please login again...",
          },
        });
      }
      dispatch({
        type: authConstants.LOGIN_SUCCESS,
        payload: {
          token,
          data: user,
        },
      });
    } else {
      localStorage.clear();
      dispatch({
        type: authConstants.LOGIN_FAILURE,
        payload: {
          error: "You were logged out. Please login again to continue.",
        },
      });
    }
  };
};

// logout
export const logout = () => {
  return async (dispatch) => {
    dispatch({ type: authConstants.LOGOUT_REQUEST });

    await axiosIntance
      .post("/api/admin/logout")
      .then((res) => {
        if (res.status === 200) {
          localStorage.clear();
          dispatch({ type: authConstants.LOGOUT_SUCCESS });
        } else {
          dispatch({
            type: authConstants.LOGOUT_FAILURE,
            payload: { error: "Unexpected error occured. [code: arreacau]" },
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: authConstants.LOGOUT_FAILURE,
          payload: {
            error:
              typeof err.response?.data?.error !== "object"
                ? err.response?.data?.error
                : err.response?.data?.error?.message ||
                  err.message ||
                  "Some unexpected error ocuured. Try refreshing the page or contact developer if problem persists.",
          },
        });
      });
  };
};
