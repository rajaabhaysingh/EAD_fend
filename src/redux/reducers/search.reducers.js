import { searchConstants } from "../actions/constants";

const initialState = {
  getSearchResultsData: [],
  getSearchResultsLoading: false,
  getSearchResultsSuccess: false,
  getSearchResultsError: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case searchConstants.GET_SEARCH_RESULTS_REQUEST:
      state = {
        ...state,
        getSearchResultsLoading: true,
        getSearchResultsError: null,
      };
      break;

    case searchConstants.GET_SEARCH_RESULTS_SUCCESS:
      state = {
        ...state,
        getSearchResultsData: action.payload.data,
        getSearchResultsLoading: false,
        getSearchResultsSuccess: true,
        getSearchResultsError: null,
      };
      break;

    case searchConstants.GET_SEARCH_RESULTS_FAILURE:
      state = {
        ...state,
        getSearchResultsData: [],
        getSearchResultsLoading: false,
        getSearchResultsSuccess: false,
        getSearchResultsError: action.payload.error,
      };
      break;

    default:
      break;
  }

  return state;
};
