import { signupConstants } from "../actions/constants";

const initialState = {
  state: "initial",
  // for signup
  data: null,
  loading: false,
  registered: false,
  error: null,
  // for email otp verification
  emailOtpVerifyData: null,
  emailOtpVerifyLoading: false,
  emailOtpVerifySuccess: false,
  emailOtpVerifyError: null,
  // for email otp resend
  emailOtpResendData: null,
  emailOtpResendLoading: false,
  emailOtpResendSuccess: false,
  emailOtpResendError: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case signupConstants.SIGNUP_REQUEST:
      state = {
        ...state,
        loading: true,
        error: null,
        state: "engaged",
      };
      break;

    case signupConstants.SIGNUP_SUCCESS:
      state = {
        ...state,
        data: action.payload.data,
        loading: false,
        registered: true,
        error: null,
        state: "engaged",
      };
      break;

    case signupConstants.SIGNUP_FAILURE:
      state = {
        ...state,
        data: null,
        loading: false,
        registered: false,
        error: action.payload.error,
        state: "engaged",
      };
      break;

    // do not clear "data" response
    // it may be used to render some other components
    case signupConstants.SIGNUP_CLEAR:
      state = {
        ...state,
        loading: false,
        registered: false,
        emailOtpVerifySuccess: false,
        emailOtpResendSuccess: false,
        error: null,
        state: "initial",
      };
      break;

    case signupConstants.EMAIL_OTP_VERIFY_REQUEST:
      state = {
        ...state,
        emailOtpVerifyLoading: true,
        emailOtpVerifyError: null,
        state: "engaged",
      };
      break;

    case signupConstants.EMAIL_OTP_VERIFY_SUCCESS:
      state = {
        ...state,
        emailOtpVerifyData: action.payload.data,
        emailOtpVerifyLoading: false,
        emailOtpVerifySuccess: true,
        emailOtpVerifyError: null,
        state: "engaged",
      };
      break;

    case signupConstants.EMAIL_OTP_VERIFY_FAILURE:
      state = {
        ...state,
        data: null,
        emailOtpVerifyLoading: false,
        emailOtpVerifySuccess: false,
        emailOtpVerifyError: action.payload.error,
        state: "engaged",
      };
      break;

    case signupConstants.EMAIL_OTP_RESEND_REQUEST:
      state = {
        ...state,
        emailOtpResendLoading: true,
        emailOtpResendError: null,
        state: "engaged",
      };
      break;

    case signupConstants.EMAIL_OTP_RESEND_SUCCESS:
      state = {
        ...state,
        emailOtpResendData: action.payload.data,
        emailOtpResendLoading: false,
        emailOtpResendSuccess: true,
        emailOtpResendError: null,
        state: "engaged",
      };
      break;

    case signupConstants.EMAIL_OTP_RESEND_FAILURE:
      state = {
        ...state,
        data: null,
        emailOtpResendLoading: false,
        emailOtpResendSuccess: false,
        emailOtpResendError: action.payload.error,
        state: "engaged",
      };
      break;

    default:
      break;
  }

  return state;
};
