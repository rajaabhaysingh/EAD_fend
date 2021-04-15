import axiosIntance from "../../helpers/axios";
import { applicationConstants } from "./constants";

// getApplications
export const getApplications = () => {
  return async (dispatch) => {
    dispatch({
      type: applicationConstants.GET_ALL_APPS_REQUEST,
    });

    await axiosIntance
      .get("/application/get")
      .then((res) => {
        if (res.status === 200) {
          const { data } = res.data;

          dispatch({
            type: applicationConstants.GET_ALL_APPS_SUCCESS,
            payload: { data: data },
          });
        } else {
          dispatch({
            type: applicationConstants.GET_ALL_APPS_FAILURE,
            payload: { error: res.data.error },
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: applicationConstants.GET_ALL_APPS_FAILURE,
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

// getApplicationById
export const getApplicationById = (appId) => {
  return async (dispatch) => {
    dispatch({
      type: applicationConstants.GET_APP_BY_ID_REQUEST,
    });

    await axiosIntance
      .get(`/application/get-by-id/${appId}`)
      .then((res) => {
        if (res.status === 200) {
          const { data } = res.data;

          dispatch({
            type: applicationConstants.GET_APP_BY_ID_SUCCESS,
            payload: { data: data },
          });
        } else {
          dispatch({
            type: applicationConstants.GET_APP_BY_ID_FAILURE,
            payload: { error: res.data.error },
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: applicationConstants.GET_APP_BY_ID_FAILURE,
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
