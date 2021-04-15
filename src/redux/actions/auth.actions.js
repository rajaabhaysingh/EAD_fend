import axiosIntance from "../../helpers/axios";
import { authConstants } from "./constants";

// loginAction
export const loginAction = (formdata, rememberMe) => {
  return async (dispatch) => {
    dispatch({
      type: authConstants.LOGIN_REQUEST,
    });

    await axiosIntance
      .post("/auth/login", formdata)
      .then((res) => {
        if (res.status === 200) {
          const { token, data } = res.data;

          // if user chooses to remember login
          if (rememberMe) {
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(data));
          }

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

// sendResetPwdLink
export const sendResetPwdLink = (formdata) => {
  return async (dispatch) => {
    dispatch({
      type: authConstants.SEND_RESET_PWD_REQUEST,
    });

    await axiosIntance
      .post("/auth/send-reset-password-link", formdata)
      .then((res) => {
        if (res.status === 200) {
          const { data } = res.data;
          dispatch({
            type: authConstants.SEND_RESET_PWD_SUCCESS,
            payload: {
              data,
            },
          });
        } else {
          if (res.status >= 400) {
            dispatch({
              type: authConstants.SEND_RESET_PWD_FAILURE,
              payload: {
                error: `Unexpected error occured. Server responded with error code: ${res.status}`,
              },
            });
          }
        }
      })
      .catch((err) => {
        dispatch({
          type: authConstants.SEND_RESET_PWD_FAILURE,
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

// verifyResetPwd
export const verifyResetPwd = (formdata) => {
  return async (dispatch) => {
    dispatch({
      type: authConstants.VERIFY_RESET_PWD_REQUEST,
    });

    await axiosIntance
      .post("/auth/verify-reset-password", formdata)
      .then((res) => {
        if (res.status === 200) {
          const { data } = res.data;
          dispatch({
            type: authConstants.VERIFY_RESET_PWD_SUCCESS,
            payload: {
              data,
            },
          });
        } else {
          if (res.status >= 400) {
            dispatch({
              type: authConstants.VERIFY_RESET_PWD_FAILURE,
              payload: {
                error: `Unexpected error occured. Server responded with error code: ${res.status}`,
              },
            });
          }
        }
      })
      .catch((err) => {
        dispatch({
          type: authConstants.VERIFY_RESET_PWD_FAILURE,
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

// logout
export const logout = (history) => {
  return async (dispatch) => {
    dispatch({ type: authConstants.LOGOUT_REQUEST });

    await axiosIntance
      .post("/auth/logout")
      .then((res) => {
        if (res.status === 200) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          dispatch({ type: authConstants.LOGOUT_SUCCESS });
          history.push("/");
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

// clearAuth
export const clearAuth = () => {
  return async (dispatch) => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch({
      type: authConstants.AUTH_CLEAR,
    });
  };
};
