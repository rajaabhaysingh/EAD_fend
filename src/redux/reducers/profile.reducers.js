import { profileConstants } from "../actions/constants";

const initialState = {
  getAddressesData: [],
  getAddressesLoading: false,
  getAddressesSuccess: false,
  getAddressesError: null,
  // add new address
  addAddressLoading: false,
  addAddressSuccess: false,
  addAddressError: null,
};

// updateAddressList
const updateAddressList = (oldList, newAddress) => {
  let tempAddressList = [...oldList];

  tempAddressList.push(newAddress);

  return tempAddressList;
};

export default (state = initialState, action) => {
  switch (action.type) {
    case profileConstants.GET_ADDRESSES_REQUEST:
      state = {
        ...state,
        getAddressesLoading: true,
        getAddressesError: null,
      };
      break;

    case profileConstants.GET_ADDRESSES_SUCCESS:
      state = {
        ...state,
        getAddressesData: action.payload.data,
        getAddressesLoading: false,
        getAddressesSuccess: true,
        getAddressesError: null,
      };
      break;

    case profileConstants.GET_ADDRESSES_FAILURE:
      state = {
        ...state,
        getAddressesData: [],
        getAddressesLoading: false,
        getAddressesSuccess: false,
        getAddressesError: action.payload.error,
      };
      break;

    case profileConstants.ADD_ADDRESS_REQUEST:
      state = {
        ...state,
        addAddressLoading: true,
        addAddressError: null,
      };
      break;

    case profileConstants.ADD_ADDRESS_SUCCESS:
      state = {
        ...state,
        getAddressesData: updateAddressList(
          state.getAddressesData,
          action.payload.data
        ),
        addAddressLoading: false,
        addAddressSuccess: true,
        addAddressError: null,
      };
      break;

    case profileConstants.ADD_ADDRESS_FAILURE:
      state = {
        ...state,
        addAddressLoading: false,
        addAddressSuccess: false,
        addAddressError: action.payload.error,
      };
      break;

    case profileConstants.CLEAR_ADD_ADDRESS_SUCCESS:
      state = {
        ...state,
        addAddressLoading: false,
        addAddressSuccess: false,
        addAddressError: null,
      };
      break;

    default:
      break;
  }

  return state;
};
