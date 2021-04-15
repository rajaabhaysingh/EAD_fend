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

// isLocationAvailable
export const isLocationAvailable = () => {
  return async (dispatch) => {
    let location = localStorage.getItem("location");
    if (location) {
      try {
        location = JSON.parse(location);
      } catch (error) {
        localStorage.removeItem("location");
        dispatch({
          type: helperConstants.FETCH_LOCATION_REQUEST,
          payload: {
            locationInfo: {},
          },
        });
      }
      dispatch({
        type: helperConstants.FETCH_LOCATION_REQUEST,
        payload: {
          locationInfo: location,
        },
      });
    } else {
      localStorage.removeItem("location");
      dispatch({
        type: helperConstants.FETCH_LOCATION_REQUEST,
        payload: {
          locationInfo: {},
        },
      });
    }
  };
};

// changeMargin
export const changeMargin = (marginTop) => {
  return async (dispatch) => {
    dispatch({
      type: helperConstants.MARGIN_CHANGE_REQUEST,
      payload: {
        marginTop,
      },
    });
  };
};
