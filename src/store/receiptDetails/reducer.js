import { FETCH_RECEIPT_ERROR, FETCH_RECEIPT_START, FETCH_RECEIPT_SUCCESS } from './actionTypes';

const initialState = {
  receipt: {},
  isLoading: false,
  isError: false,
};

export default function receiptDetailsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_RECEIPT_SUCCESS:
      return {
        ...state,
        receipt: action.payload,
        isLoading: false,
        isError: false,
      };
    case FETCH_RECEIPT_START:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case FETCH_RECEIPT_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    default:
      return state;
  }
}
