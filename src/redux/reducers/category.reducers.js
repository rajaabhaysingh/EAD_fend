import { categoryConstants } from "../actions/constants";

const initialState = {
  fetchLoading: false,
  fetchData: [],
  fetchData_mainOnly: [],
  fetchData_allList: [],
  fetchSuccessful: false,
  fetchError: null,
};

// filterMainCatOnly
const filterMainCatOnly = (catList) => {
  let mainCatList = [];

  for (let cat of catList) {
    mainCatList.push({
      _id: cat._id,
      categoryName: cat.categoryName,
      categoryImage: cat.categoryImage,
      slug: cat.slug,
    });
  }

  return mainCatList;
};

// filterAllCat
const filterAllCat = (catList) => {
  let allCatList = [];

  for (let cat of catList) {
    allCatList.push({
      _id: cat._id,
      categoryName: cat.categoryName,
      categoryImage: cat.categoryImage,
      slug: cat.slug,
    });
    if (cat.children?.length > 0) {
      filterAllCat(cat.children);
    }
  }

  return allCatList;
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
        fetchData_mainOnly: filterMainCatOnly(action.payload.data),
        fetchData_allList: filterAllCat(action.payload.data),
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

    default:
      break;
  }

  return state;
};
