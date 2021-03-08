import axiosIntance from "../../helpers/axios";
import { bannerConstants } from "./constants";

// getHomeCarouselBanners
export const getHomeCarouselBanners = (type) => {
  return async (dispatch) => {
    dispatch({
      type: bannerConstants.GET_HOME_CAROUSEL_BANNER_REQUEST,
    });

    await axiosIntance
      .get(`/banner/get/${type}`)
      .then((res) => {
        if (res.status === 200) {
          const { data } = res.data;
          dispatch({
            type: bannerConstants.GET_HOME_CAROUSEL_BANNER_SUCCESS,
            payload: {
              data,
            },
          });
        } else {
          if (res.status === 400) {
            dispatch({
              type: bannerConstants.GET_HOME_CAROUSEL_BANNER_FAILURE,
              payload: {
                error: "Unexpected error occured.",
              },
            });
          }
        }
      })
      .catch((err) => {
        dispatch({
          type: bannerConstants.GET_HOME_CAROUSEL_BANNER_FAILURE,
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
