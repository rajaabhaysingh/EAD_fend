import { paymentConstants } from "../actions/constants";

const initialState = {
  createPaymentData: null,
  createPaymentLoading: false,
  createPaymentSuccessful: false,
  createPaymentError: null,
  createPaymentContextId: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case paymentConstants.CREATE_PAYMENT_REQUEST:
      state = {
        ...state,
        createPaymentLoading: true,
        createPaymentError: null,
      };
      break;

    case paymentConstants.CREATE_PAYMENT_SUCCESS:
      state = {
        ...state,
        createPaymentData: action.payload.data,
        createPaymentLoading: false,
        createPaymentSuccessful: true,
        createPaymentError: null,
        createPaymentContextId: action.payload.contextId,
      };
      break;

    case paymentConstants.CREATE_PAYMENT_FAILURE:
      state = {
        ...state,
        createPaymentData: null,
        createPaymentLoading: false,
        createPaymentSuccessful: false,
        createPaymentError: action.payload.error,
        createPaymentContextId: action.payload.contextId,
      };
      break;

    default:
      break;
  }

  return state;
};
