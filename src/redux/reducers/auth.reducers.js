import { authConstants } from "../actions/constants";

const initialState = {
  state: "initial",
  // login
  token: null,
  user: null,
  authenticated: false,
  loading: false,
  error: null,
  // send reset pwd link
  sendResetPwdLinkData: null,
  sendResetPwdLinkError: null,
  sendResetPwdLinkLoading: false,
  sendResetPwdLinkSuccess: false,
  // verify reser pwd
  verifyResetPwdData: null,
  verifyResetPwdError: null,
  verifyResetPwdLoading: false,
  verifyResetPwdSuccess: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case authConstants.LOGIN_REQUEST:
      state = {
        ...state,
        loading: true,
        error: null,
        state: "engaged",
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
        state: "engaged",
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
        state: "engaged",
      };
      break;

    case authConstants.SEND_RESET_PWD_REQUEST:
      state = {
        ...state,
        sendResetPwdLinkLoading: true,
        sendResetPwdLinkError: null,
        state: "engaged",
      };
      break;

    case authConstants.SEND_RESET_PWD_SUCCESS:
      state = {
        ...state,
        sendResetPwdLinkData: action.payload.data,
        sendResetPwdLinkLoading: false,
        sendResetPwdLinkSuccess: true,
        sendResetPwdLinkError: null,
        state: "engaged",
      };
      break;

    case authConstants.SEND_RESET_PWD_FAILURE:
      state = {
        ...state,
        sendResetPwdLinkData: null,
        sendResetPwdLinkLoading: false,
        sendResetPwdLinkSuccess: false,
        sendResetPwdLinkError: action.payload.error,
        state: "engaged",
      };
      break;

    case authConstants.VERIFY_RESET_PWD_REQUEST:
      state = {
        ...state,
        verifyResetPwdLoading: true,
        verifyResetPwdError: null,
        state: "engaged",
      };
      break;

    case authConstants.VERIFY_RESET_PWD_SUCCESS:
      state = {
        ...state,
        verifyResetPwdData: action.payload.data,
        verifyResetPwdLoading: false,
        verifyResetPwdSuccess: true,
        verifyResetPwdError: null,
        state: "engaged",
      };
      break;

    case authConstants.VERIFY_RESET_PWD_FAILURE:
      state = {
        ...state,
        verifyResetPwdData: null,
        verifyResetPwdLoading: false,
        verifyResetPwdSuccess: false,
        verifyResetPwdError: action.payload.error,
        state: "engaged",
      };
      break;

    case authConstants.LOGOUT_REQUEST:
      state = {
        ...state,
        loading: true,
        state: "engaged",
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
        state: "engaged",
      };
      break;

    case authConstants.AUTH_CLEAR:
      state = {
        ...state,
        error: null,
        authenticated: false,
        sendResetPwdLinkSuccess: false,
        verifyResetPwdSuccess: false,
        state: "initial",
      };
      break;

    default:
      break;
  }

  return state;
};
