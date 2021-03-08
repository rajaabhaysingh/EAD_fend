import { categoryConstants } from "../actions/constants";

const initialState = {
  postLoading: false,
  postData: null,
  postSuccessful: false,
  postError: null,
  fetchLoading: false,
  fetchData: [],
  fetchSuccessful: false,
  fetchError: null,
  updateLoading: false,
  updateData: [],
  updateSuccessful: false,
  updateError: null,
  deleteLoading: false,
  deleteData: [],
  deleteSuccessful: false,
  deleteError: null,
};

// updateCategoryList
const updateCategoryList = (oldCatList, newCategory) => {
  if (!newCategory.parentId) {
    return [...oldCatList, newCategory];
  }

  let updatedCatList = [];

  for (let cat of oldCatList) {
    if (cat._id === newCategory.parentId) {
      updatedCatList.push({
        ...cat,
        children:
          cat.children?.length > 0
            ? [...cat.children, newCategory]
            : [newCategory],
      });
    } else {
      updatedCatList.push({
        ...cat,
        children:
          cat.children?.length > 0
            ? updateCategoryList(cat.children, newCategory)
            : [],
      });
    }
  }

  return updatedCatList;
};

export default (state = initialState, action) => {
  switch (action.type) {
    case categoryConstants.GET_ALL_CAT_REQUEST:
      state = {
        ...state,
        fetchLoading: true,
        fetchError: null,
      };
      break;

    case categoryConstants.GET_ALL_CAT_SUCCESS:
      state = {
        ...state,
        fetchData: action.payload.data,
        fetchLoading: false,
        fetchSuccessful: true,
        fetchError: null,
      };
      break;

    case categoryConstants.GET_ALL_CAT_FAILURE:
      state = {
        ...state,
        fetchData: [],
        fetchLoading: false,
        fetchSuccessful: false,
        fetchError: action.payload.error,
      };
      break;

    case categoryConstants.ADD_CATEGORY_REQUEST:
      state = {
        ...state,
        postLoading: true,
        postError: null,
      };
      break;

    case categoryConstants.ADD_CATEGORY_SUCCESS:
      state = {
        ...state,
        fetchData: updateCategoryList(state.fetchData, action.payload.data),
        postData: action.payload.data,
        postLoading: false,
        postSuccessful: true,
        postError: null,
      };
      break;

    case categoryConstants.ADD_CATEGORY_FAILURE:
      state = {
        ...state,
        postData: null,
        postLoading: false,
        postSuccessful: false,
        postError: action.payload.error,
      };
      break;

    case categoryConstants.UPDATE_CAT_REQUEST:
      state = {
        ...state,
        updateLoading: true,
        updateError: null,
      };
      break;

    case categoryConstants.UPDATE_CAT_SUCCESS:
      state = {
        ...state,
        updateData: action.payload.data,
        updateLoading: false,
        updateSuccessful: true,
        updateError: null,
      };
      break;

    case categoryConstants.UPDATE_CAT_FAILURE:
      state = {
        ...state,
        updateData: null,
        updateLoading: false,
        updateSuccessful: false,
        updateError: action.payload.error,
      };
      break;

    case categoryConstants.DELETE_CAT_REQUEST:
      state = {
        ...state,
        deleteLoading: true,
        deleteError: null,
      };
      break;

    case categoryConstants.DELETE_CAT_SUCCESS:
      state = {
        ...state,
        deleteData: action.payload.data,
        deleteLoading: false,
        deleteSuccessful: true,
        deleteError: null,
      };
      break;

    case categoryConstants.DELETE_CAT_FAILURE:
      state = {
        ...state,
        deleteData: null,
        deleteLoading: false,
        deleteSuccessful: false,
        deleteError: action.payload.error,
      };
      break;

    default:
      break;
  }

  return state;
};
