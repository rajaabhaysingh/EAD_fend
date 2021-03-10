import { helperConstants } from "../actions/constants";

const initialState = {
  themeName: "light",
  fetchLocationData: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case helperConstants.THEME_CHANGE_REQUEST:
      state = {
        ...state,
        themeName: action.payload.themeName,
      };
      break;

    case helperConstants.FETCH_LOCATION_REQUEST:
      state = {
        ...state,
        fetchLocationData: action.payload.locationInfo,
      };
      break;

    default:
      break;
  }

  return state;
};
