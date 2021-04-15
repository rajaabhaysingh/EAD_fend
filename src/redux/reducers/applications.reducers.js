import { applicationConstants } from "../actions/constants";

const initialState = {
  // get all applications
  getApplicationsData: [],
  getApplicationsLoading: false,
  getApplicationsSuccess: false,
  getApplicationsError: null,
  // get specific application
  getAppByIdData: null,
  getAppByIdLoading: false,
  getAppByIdSuccess: false,
  getAppByIdError: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case applicationConstants.GET_ALL_APPS_REQUEST:
      state = {
        ...state,
        getApplicationsLoading: true,
        getApplicationsError: null,
      };
      break;

    case applicationConstants.GET_ALL_APPS_SUCCESS:
      state = {
        ...state,
        getApplicationsData: action.payload.data,
        getApplicationsLoading: false,
        getApplicationsSuccess: true,
        getApplicationsError: null,
      };
      break;

    case applicationConstants.GET_ALL_APPS_FAILURE:
      state = {
        ...state,
        getApplicationsData: [],
        getApplicationsLoading: false,
        getApplicationsSuccess: false,
        getApplicationsError: action.payload.error,
      };
      break;

    case applicationConstants.GET_APP_BY_ID_REQUEST:
      state = {
        ...state,
        getAppByIdLoading: true,
        getAppByIdError: null,
      };
      break;

    case applicationConstants.GET_APP_BY_ID_SUCCESS:
      state = {
        ...state,
        getAppByIdData: action.payload.data,
        getAppByIdLoading: false,
        getAppByIdSuccess: true,
        getAppByIdError: null,
      };
      break;

    case applicationConstants.GET_APP_BY_ID_FAILURE:
      state = {
        ...state,
        getAppByIdData: null,
        getAppByIdLoading: false,
        getAppByIdSuccess: false,
        getAppByIdError: action.payload.error,
      };
      break;

    default:
      break;
  }

  return state;
};
