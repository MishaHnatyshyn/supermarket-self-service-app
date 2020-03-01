import {
  FETCH_AVAILABLE_STORES_ERROR,
  FETCH_AVAILABLE_STORES_START,
  FETCH_AVAILABLE_STORES_SUCCESS,
  SELECTED_STORE_CHANGE,
} from './actionTypes';

const initialState = {
  selectedStoreId: null,
  availableStores: [],
  selectedCityId: null,
  availableCities: [],
  isLoading: false,
  isError: false,
  errorText: null,
};

export default function storeReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_AVAILABLE_STORES_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorText: action.payload,
      };
    case FETCH_AVAILABLE_STORES_START:
      return {
        ...state,
        isLoading: true,
        isError: false,
        errorText: null,
      };
    case FETCH_AVAILABLE_STORES_SUCCESS:
      return {
        ...state,
        availableStores: action.payload,
      };
    case SELECTED_STORE_CHANGE:
      return {
        ...state,
        selectedStoreId: action.payload,
      };
    default:
      return state;
  }
}
