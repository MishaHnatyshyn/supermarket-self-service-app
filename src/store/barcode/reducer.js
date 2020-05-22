import {
  PRODUCT_FETCH_ERROR, PRODUCT_FETCH_START, PRODUCT_FETCH_SUCCESS, REMOVE_SCANNED_PRODUCT,
} from './actionTypes';

const initialState = {
  scannedProduct: null,
  isError: false,
  isLoading: false,
};

export default function barcodeReducer(state = initialState, action) {
  switch (action.type) {
    case PRODUCT_FETCH_SUCCESS:
      return {
        ...state,
        scannedProduct: action.payload,
        isLoading: false,
        isError: false,
      };
    case PRODUCT_FETCH_START:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case REMOVE_SCANNED_PRODUCT:
      return {
        ...state,
        scannedProduct: null,
        isError: false,
      };
    case PRODUCT_FETCH_ERROR:
      return {
        ...state,
        isError: true,
        isLoading: false,
      };
    default:
      return state;
  }
}
