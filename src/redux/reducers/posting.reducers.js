import { postingConstants } from "../actions/constants";

const initialState = {
  getPostingsData: [],
  getPostingsLoading: false,
  getPostingsSuccess: false,
  getPostingsError: null,
  // post new job
  postNewJobContextId: null,
  postNewJobLoading: false,
  postNewJobSuccess: false,
};

// appendPosting
const appendPosting = (oldList, newPosting) => {
  let tempList = [newPosting, ...oldList];

  return tempList;
};

// sortPostings
const sortPostings = (jobList) => {
  let tempList = [...jobList];

  tempList.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return tempList;
};

export default (state = initialState, action) => {
  switch (action.type) {
    case postingConstants.GET_POSTINGS_REQUEST:
      state = {
        ...state,
        getPostingsLoading: true,
        getPostingsError: null,
      };
      break;

    case postingConstants.GET_POSTINGS_SUCCESS:
      state = {
        ...state,
        getPostingsData: sortPostings(action.payload.data),
        getPostingsLoading: false,
        getPostingsSuccess: true,
        getPostingsError: null,
      };
      break;

    case postingConstants.GET_POSTINGS_FAILURE:
      state = {
        ...state,
        getPostingsData: [],
        getPostingsLoading: false,
        getPostingsSuccess: false,
        getPostingsError: action.payload.error,
      };
      break;

    case postingConstants.POST_NEW_JOB_REQUEST:
      state = {
        ...state,
        postNewJobLoading: true,
        postNewJobError: null,
      };
      break;

    case postingConstants.POST_NEW_JOB_SUCCESS:
      state = {
        ...state,
        getPostingsData: appendPosting(
          state.getPostingsData,
          action.payload.data
        ),
        postNewJobLoading: false,
        postNewJobSuccess: true,
        postNewJobError: null,
      };
      break;

    case postingConstants.POST_NEW_JOB_FAILURE:
      state = {
        ...state,
        postNewJobLoading: false,
        postNewJobSuccess: false,
        postNewJobError: action.payload.error,
      };
      break;

    default:
      break;
  }

  return state;
};
