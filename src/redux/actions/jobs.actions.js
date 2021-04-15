import axiosIntance from "../../helpers/axios";
import { jobsConstants } from "./constants";

// getHomeLocalJobs
export const getHomeLocalJobs = () => {
  return async (dispatch) => {
    dispatch({
      type: jobsConstants.GET_HOME_LOCAL_JOBS_REQUEST,
    });

    await axiosIntance
      .get(`/job/get-jobs-by-filter?sort_order=desc&page=${"1"}`)
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

// getJobById
export const getJobById = (jobId) => {
  return async (dispatch) => {
    dispatch({
      type: jobsConstants.GET_JOB_BY_ID_REQUEST,
    });

    await axiosIntance
      .get(`/job/get-job-by-id/${jobId}`)
      .then((res) => {
        if (res.status === 200) {
          const { data } = res.data;
          dispatch({
            type: jobsConstants.GET_JOB_BY_ID_SUCCESS,
            payload: {
              data,
            },
          });
        } else {
          if (res.status === 400) {
            dispatch({
              type: jobsConstants.GET_JOB_BY_ID_FAILURE,
              payload: {
                error: "Unexpected error occured.",
              },
            });
          }
        }
      })
      .catch((err) => {
        dispatch({
          type: jobsConstants.GET_JOB_BY_ID_FAILURE,
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

// changeAppStatus
export const changeAppStatus = (formData, contextId) => {
  return async (dispatch) => {
    dispatch({
      type: jobsConstants.CHANGE_APP_STATUS_REQUEST,
    });

    await axiosIntance
      .put("/application/change-status", formData)
      .then((res) => {
        if (res.status === 200) {
          const { data } = res.data;

          dispatch({
            type: jobsConstants.CHANGE_APP_STATUS_SUCCESS,
            payload: { data: data },
          });
        } else {
          dispatch({
            type: jobsConstants.CHANGE_APP_STATUS_FAILURE,
            payload: {
              error: res.data.error,
              contextId: contextId,
            },
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: jobsConstants.CHANGE_APP_STATUS_FAILURE,
          payload: {
            error:
              typeof err.response?.data?.error !== "object"
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

// applyOnJob
export const applyOnJob = (formData, contextId) => {
  return async (dispatch) => {
    dispatch({
      type: jobsConstants.APPLY_ON_JOB_REQUEST,
      payload: {
        contextId: contextId,
      },
    });

    await axiosIntance
      .post("/application/create", formData)
      .then((res) => {
        if (res.status === 201) {
          const { data } = res.data;

          dispatch({
            type: jobsConstants.APPLY_ON_JOB_SUCCESS,
            payload: {
              data: data,
              contextId: contextId,
            },
          });
        } else {
          dispatch({
            type: jobsConstants.APPLY_ON_JOB_FAILURE,
            payload: {
              error: res.data.error,
              contextId: contextId,
            },
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: jobsConstants.APPLY_ON_JOB_FAILURE,
          payload: {
            error:
              typeof err.response?.data?.error !== "object"
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

// addReview
export const addReview = (
  formData,
  contextId,
  setReviewForm,
  setIsReviewFormVisible
) => {
  return async (dispatch) => {
    dispatch({
      type: jobsConstants.ADD_REVIEW_REQUEST,
      payload: {
        contextId: contextId,
      },
    });

    await axiosIntance
      .post("/review/add-review", formData)
      .then((res) => {
        if (res.status === 201) {
          const { data } = res.data;

          setIsReviewFormVisible(false);
          setReviewForm({
            jobId: contextId,
            star: "",
            rating: "",
          });

          dispatch({
            type: jobsConstants.ADD_REVIEW_SUCCESS,
            payload: {
              data: data,
              contextId: contextId,
            },
          });
        } else {
          dispatch({
            type: jobsConstants.ADD_REVIEW_FAILURE,
            payload: {
              error: res.data.error,
              contextId: contextId,
            },
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: jobsConstants.ADD_REVIEW_FAILURE,
          payload: {
            error:
              typeof err.response?.data?.error !== "object"
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
