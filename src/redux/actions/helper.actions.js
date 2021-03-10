import { helperConstants } from "./constants";

// themeAction
export const themeAction = (themeName) => {
  return async (dispatch) => {
    dispatch({
      type: helperConstants.THEME_CHANGE_REQUEST,
      payload: {
        themeName,
      },
    });
  };
};

// fetchLocation
export const fetchLocation = (locationInfo) => {
  return async (dispatch) => {
    dispatch({
      type: helperConstants.FETCH_LOCATION_REQUEST,
      payload: {
        locationInfo,
      },
    });
  };
};
