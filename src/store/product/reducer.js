import { FETCH_PRODUCT_START, FETCH_PRODUCT_ERROR, CLEAR_PRODUCT_DATA, FETCH_PRODUCT_SUCCESS } from './actionTypes';

const initialState = {
  product: {},
  isLoading: false,
  isError: false,
};

export default function productReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_PRODUCT_SUCCESS:
      return {
        ...state,
        product: action.payload,
        isLoading: false,
        isError: false,
      };
    case FETCH_PRODUCT_START:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case FETCH_PRODUCT_ERROR:
      return {
        ...state,
        isError: true,
        isLoading: false,
      };
    case CLEAR_PRODUCT_DATA:
      return initialState;
    default:
      return state;
  }
}
