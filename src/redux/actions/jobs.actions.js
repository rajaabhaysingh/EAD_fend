import axiosIntance from "../../helpers/axios";
import { jobsConstants } from "./constants";

// getHomeLocalJobs
export const getHomeLocalJobs = () => {
  return async (dispatch) => {
    dispatch({
      type: jobsConstants.GET_HOME_LOCAL_JOBS_REQUEST,
    });

    await axiosIntance
      .get("/job/get-all-jobs")
      .then((res) => {
        if (res.status === 200) {
          const { data } = res.data;
          dispatch({
            type: jobsConstants.GET_HOME_LOCAL_JOBS_SUCCESS,
            payload: {
              data,
            },
          });
        } else {
          if (res.status === 400) {
            dispatch({
              type: jobsConstants.GET_HOME_LOCAL_JOBS_FAILURE,
              payload: {
                error: "Unexpected error occured.",
              },
            });
          }
        }
      })
      .catch((err) => {
        dispatch({
          type: jobsConstants.GET_HOME_LOCAL_JOBS_FAILURE,
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
