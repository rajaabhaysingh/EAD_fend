import axiosIntance from "../../helpers/axios";
import { orderConstants } from "./constants";

// createOrder
export const createOrder = (options) => {
  return async (dispatch) => {
    dispatch({
      type: orderConstants.CREATE_ORDER_REQUEST,
    });

    await axiosIntance
      .post("/api/order/create", options)
      .then((res) => {
        if (res.status === 201) {
          const { data } = res.data;

          let paymentOptions = { ...options };

          paymentOptions.key = data.key_id; // Enter the Key ID generated from the Dashboard
          paymentOptions.amount = data.amount;
          paymentOptions.currency = data.currency;
          paymentOptions.order_id = data.order_id;

          const paymentObj = new window.Razorpay(paymentOptions);
          paymentObj.open();

          dispatch({
            type: orderConstants.CREATE_ORDER_SUCCESS,
            payload: { data: data },
          });
        } else {
          dispatch({
            type: orderConstants.CREATE_ORDER_FAILURE,
            payload: { error: res.data.error },
          });
        }
      })
      .catch((err) => {
        const tempError = err.response?.data?.error?.error?.description;

        dispatch({
          type: orderConstants.CREATE_ORDER_FAILURE,
          payload: {
            error: tempError
              ? tempError
              : typeof err.response?.data?.error !== "object"
              ? err.response?.data?.error
              : err.response?.data?.error?.message ||
                err.message ||
                "Some unexpected error ocuured. Try refreshing the page or contact developer if problem persists.",
          },
        });
      });
  };
};

// getOrders
export const getOrders = () => {
  return async (dispatch) => {
    dispatch({
      type: orderConstants.GET_ORDERS_REQUEST,
    });

    await axiosIntance
      .get("/api/order/get")
      .then((res) => {
        if (res.status === 200) {
          const { data } = res.data;

          dispatch({
            type: orderConstants.GET_ORDERS_SUCCESS,
            payload: { data: data },
          });
        } else {
          dispatch({
            type: orderConstants.GET_ORDERS_FAILURE,
            payload: { error: res.data.error },
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: orderConstants.GET_ORDERS_FAILURE,
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
