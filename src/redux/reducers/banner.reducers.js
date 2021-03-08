import { bannerConstants } from "../actions/constants";

const initialState = {
  getHomeCarouselBannerData: [],
  getHomeCarouselBannerloading: false,
  getHomeCarouselBannerSuccess: false,
  getHomeCarouselBannerError: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case bannerConstants.GET_HOME_CAROUSEL_BANNER_REQUEST:
      state = {
        ...state,
        getHomeCarouselBannerloading: true,
        getHomeCarouselBannerError: null,
      };
      break;

    case bannerConstants.GET_HOME_CAROUSEL_BANNER_SUCCESS:
      state = {
        ...state,
        getHomeCarouselBannerData: action.payload.data,
        getHomeCarouselBannerloading: false,
        getHomeCarouselBannerSuccess: true,
        getHomeCarouselBannerError: null,
      };
      break;

    case bannerConstants.GET_HOME_CAROUSEL_BANNER_FAILURE:
      state = {
        ...state,
        getHomeCarouselBannerData: "",
        getHomeCarouselBannerloading: false,
        getHomeCarouselBannerSuccess: false,
        getHomeCarouselBannerError: action.payload.error,
      };
      break;

    default:
      break;
  }

  return state;
};
