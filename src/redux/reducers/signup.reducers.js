import { signupConstants } from "../actions/constants";

const initialState = {
  data: "",
  loading: false,
  registered: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case signupConstants.SIGNUP_REQUEST:
      state = {
        ...state,
        loading: true,
        error: null,
      };
      break;

    case signupConstants.SIGNUP_SUCCESS:
      state = {
        ...state,
        data: action.payload.data,
        loading: false,
        registered: true,
        error: null,
      };
      break;

    case signupConstants.SIGNUP_FAILURE:
      state = {
        ...state,
        data: "",
        loading: false,
        registered: false,
        error: action.payload.error,
      };
      break;

    default:
      break;
  }

  return state;
};
