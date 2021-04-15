import axiosIntance from "../../helpers/axios";
import { searchConstants } from "./constants";

// getJobsByFilters
export const getJobsByFilters = (queryString, page) => {
  return async (dispatch) => {
    dispatch({
      type: searchConstants.GET_SEARCH_RESULTS_REQUEST,
    });

    await axiosIntance
      .get(`/job/get-jobs-by-filter?${queryString}&page=${page}`)
      .then((res) => {
        if (res.status === 200) {
          const { data } = res.data;

          dispatch({
            type: searchConstants.GET_SEARCH_RESULTS_SUCCESS,
            payload: { data: data },
          });
        } else {
          dispatch({
            type: searchConstants.GET_SEARCH_RESULTS_FAILURE,
            payload: { error: res.data.error },
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: searchConstants.GET_SEARCH_RESULTS_FAILURE,
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
