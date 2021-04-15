import axiosIntance from "../../helpers/axios";
import { postingConstants } from "./constants";

// getPostings
export const getPostings = () => {
  return async (dispatch) => {
    dispatch({
      type: postingConstants.GET_POSTINGS_REQUEST,
    });

    await axiosIntance
      .get("/job/get-my-postings")
      .then((res) => {
        if (res.status === 200) {
          const { data } = res.data;

          dispatch({
            type: postingConstants.GET_POSTINGS_SUCCESS,
            payload: { data: data },
          });
        } else {
          dispatch({
            type: postingConstants.GET_POSTINGS_FAILURE,
            payload: { error: res.data.error },
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: postingConstants.GET_POSTINGS_FAILURE,
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

// postNewJob
export const postNewJob = (formData, history) => {
  return async (dispatch) => {
    dispatch({
      type: postingConstants.POST_NEW_JOB_REQUEST,
    });

    await axiosIntance
      .post("/job/create", formData)
      .then((res) => {
        if (res.status === 201) {
          const { data } = res.data;

          dispatch({
            type: postingConstants.POST_NEW_JOB_SUCCESS,
            payload: { data: data },
          });

          history.push("/account/my-postings");
        } else {
          dispatch({
            type: postingConstants.POST_NEW_JOB_FAILURE,
            payload: { error: res.data.error },
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: postingConstants.POST_NEW_JOB_FAILURE,
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
