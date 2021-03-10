import { jobsConstants } from "../actions/constants";

const initialState = {
  getHomeLocalJobsData: [],
  getHomeLocalJobsloading: false,
  getHomeLocalJobsSuccess: false,
  getHomeLocalJobsError: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case jobsConstants.GET_HOME_LOCAL_JOBS_REQUEST:
      state = {
        ...state,
        getHomeLocalJobsloading: true,
        getHomeLocalJobsError: null,
      };
      break;

    case jobsConstants.GET_HOME_LOCAL_JOBS_SUCCESS:
      state = {
        ...state,
        getHomeLocalJobsData: action.payload.data,
        getHomeLocalJobsloading: false,
        getHomeLocalJobsSuccess: true,
        getHomeLocalJobsError: null,
      };
      break;

    case jobsConstants.GET_HOME_LOCAL_JOBS_FAILURE:
      state = {
        ...state,
        getHomeLocalJobsData: [],
        getHomeLocalJobsloading: false,
        getHomeLocalJobsSuccess: false,
        getHomeLocalJobsError: action.payload.error,
      };
      break;

    default:
      break;
  }

  return state;
};
