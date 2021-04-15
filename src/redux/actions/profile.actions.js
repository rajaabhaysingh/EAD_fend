import axiosIntance from "../../helpers/axios";
import { profileConstants } from "./constants";

// getAddresses
export const getAddresses = () => {
  return async (dispatch) => {
    dispatch({
      type: profileConstants.GET_ADDRESSES_REQUEST,
    });

    await axiosIntance
      .get("/address/get")
      .then((res) => {
        if (res.status === 200) {
          const { data } = res.data;

          dispatch({
            type: profileConstants.GET_ADDRESSES_SUCCESS,
            payload: { data: data },
          });
        } else {
          dispatch({
            type: profileConstants.GET_ADDRESSES_FAILURE,
            payload: { error: res.data.error },
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: profileConstants.GET_ADDRESSES_FAILURE,
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

// addAddress
export const addAddress = (address, setIsModalOpen) => {
  return async (dispatch) => {
    dispatch({
      type: profileConstants.ADD_ADDRESS_REQUEST,
    });

    await axiosIntance
      .post("/address/create", address)
      .then((res) => {
        if (res.status === 201) {
          const { data } = res.data;

          if (setIsModalOpen) {
            setIsModalOpen(false);
          }

          dispatch({
            type: profileConstants.ADD_ADDRESS_SUCCESS,
            payload: { data: data },
          });
        } else {
          dispatch({
            type: profileConstants.ADD_ADDRESS_FAILURE,
            payload: { error: res.data.error },
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: profileConstants.ADD_ADDRESS_FAILURE,
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

// clearAddAddress
export const clearAddAddress = () => {
  return async (dispatch) => {
    dispatch({
      type: profileConstants.CLEAR_ADD_ADDRESS_SUCCESS,
    });
  };
};
