import { authConstants } from "../actions/constants";

const initialState = {
  token: null,
  user: null,
  authenticated: false,
  loading: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case authConstants.LOGIN_REQUEST:
      state = {
        ...state,
        loading: true,
        error: null,
      };
      break;

    case authConstants.LOGIN_SUCCESS:
      state = {
        ...state,
        user: action.payload.data,
        token: action.payload.token,
        loading: false,
        authenticated: true,
        error: null,
      };
      break;

    case authConstants.LOGIN_FAILURE:
      state = {
        ...state,
        token: null,
        user: {},
        loading: false,
        authenticated: false,
        error: action.payload.error,
      };
      break;

    case authConstants.LOGOUT_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;

    case authConstants.LOGOUT_SUCCESS:
      state = {
        ...initialState,
      };
      break;

    case authConstants.LOGOUT_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
        loading: false,
      };
      break;

    default:
      break;
  }

  return state;
};
