import axiosIntance from "../../helpers/axios";
import { signupConstants } from "./constants";

// signupAction
export const signupAction = (formdata) => {
  return async (dispatch) => {
    dispatch({
      type: signupConstants.SIGNUP_REQUEST,
    });

    await axiosIntance
      .post("/auth/signup", formdata)
      .then((res) => {
        if (res.status === 201) {
          const { data } = res.data;
          dispatch({
            type: signupConstants.SIGNUP_SUCCESS,
            payload: {
              data,
            },
          });
        } else {
          if (res.status >= 400) {
            dispatch({
              type: signupConstants.SIGNUP_FAILURE,
              payload: {
                error: `Unexpected error occured. Server responded with error code: ${res.status}`,
              },
            });
          }
        }
      })
      .catch((err) => {
        dispatch({
          type: signupConstants.SIGNUP_FAILURE,
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

// clearSignup
export const clearSignup = () => {
  return async (dispatch) => {
    dispatch({
      type: signupConstants.SIGNUP_CLEAR,
    });
  };
};

// verifyEmailOTP
export const verifyEmailOTP = (formdata) => {
  return async (dispatch) => {
    dispatch({
      type: signupConstants.EMAIL_OTP_VERIFY_REQUEST,
    });

    await axiosIntance
      .post("/auth/verify-email", formdata)
      .then((res) => {
        if (res.status === 200) {
          const { data } = res.data;
          dispatch({
            type: signupConstants.EMAIL_OTP_VERIFY_SUCCESS,
            payload: {
              data,
            },
          });
        } else {
          if (res.status >= 400) {
            dispatch({
              type: signupConstants.EMAIL_OTP_VERIFY_FAILURE,
              payload: {
                error: `Unexpected error occured. Server responded with error code: ${res.status}`,
              },
            });
          }
        }
      })
      .catch((err) => {
        dispatch({
          type: signupConstants.EMAIL_OTP_VERIFY_FAILURE,
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

// resendEmailOTP
export const resendEmailOTP = (formdata) => {
  return async (dispatch) => {
    dispatch({
      type: signupConstants.EMAIL_OTP_RESEND_REQUEST,
    });

    await axiosIntance
      .post("/auth/regenrate-email-otp", formdata)
      .then((res) => {
        if (res.status === 200) {
          const { data } = res.data;
          dispatch({
            type: signupConstants.EMAIL_OTP_RESEND_SUCCESS,
            payload: {
              data,
            },
          });
        } else {
          if (res.status >= 400) {
            dispatch({
              type: signupConstants.EMAIL_OTP_RESEND_FAILURE,
              payload: {
                error: `Unexpected error occured. Server responded with error code: ${res.status}`,
              },
            });
          }
        }
      })
      .catch((err) => {
        dispatch({
          type: signupConstants.EMAIL_OTP_RESEND_FAILURE,
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
