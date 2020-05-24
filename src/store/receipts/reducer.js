import { FETCH_RECEIPTS_ERROR, FETCH_RECEIPTS_START, FETCH_RECEIPTS_SUCCESS } from './actionTypes';
import { LOGIN_SUCCESS, LOGOUT, REGISTER_SUCCESS } from '../auth/actionTypes';

const initialState = {
  receipts: [],
  isLoading: false,
  isError: false,
};

export default function receiptsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_RECEIPTS_SUCCESS:
      return {
        ...state,
        receipts: action.payload,
        isLoading: false,
        isError: false,
      };
    case FETCH_RECEIPTS_START:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case FETCH_RECEIPTS_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
}
