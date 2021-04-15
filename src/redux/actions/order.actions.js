import axiosIntance from "../../helpers/axios";
import { paymentConstants } from "./constants";

// initiatePayment
export const initiatePayment = (options, contextId) => {
  return async (dispatch) => {
    dispatch({
      type: paymentConstants.CREATE_PAYMENT_REQUEST,
    });

    await axiosIntance
      .post("/payment/initiate", options)
      .then((res) => {
        if (res.status === 201) {
          const { data } = res.data;

          let paymentOptions = { ...options };

          paymentOptions.key = data.key_id; // Key ID generated from the Dashboard (from backend)
          paymentOptions.amount = data.amount;
          paymentOptions.currency = data.currency;
          paymentOptions.order_id = data.order_id;

          const paymentObj = new window.Razorpay(paymentOptions);
          paymentObj.open();

          dispatch({
            type: paymentConstants.CREATE_PAYMENT_SUCCESS,
            payload: { data: data, contextId: contextId },
          });
        } else {
          dispatch({
            type: paymentConstants.CREATE_PAYMENT_FAILURE,
            payload: { error: res.data.error, contextId: contextId },
          });
        }
      })
      .catch((err) => {
        const tempError = err.response?.data?.error?.error?.description;

        dispatch({
          type: paymentConstants.CREATE_PAYMENT_FAILURE,
          payload: {
            error: tempError
              ? tempError
              : typeof err.response?.data?.error !== "object"
              ? err.response?.data?.error
              : err.response?.data?.error?.message ||
                err.message ||
                "Some unexpected error ocuured. Try refreshing the page or contact developer if problem persists.",
            contextId: contextId,
          },
        });
      });
  };
};
