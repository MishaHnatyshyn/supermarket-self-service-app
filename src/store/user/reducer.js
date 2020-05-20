import {
  FETCH_USER_DATA_ERROR,
  FETCH_USER_DATA_START,
  FETCH_USER_DATA_SUCCESS,
  ADD_PAYMENT_METHOD_ERROR,
  ADD_PAYMENT_METHOD_START,
  ADD_PAYMENT_METHOD_SUCCESS,
} from './actionTypes';
import { LOGOUT } from '../auth/actionTypes';

const initialState = {
  id: null,
  name: '',
  email: '',
  paymentMethods: [],
  isError: false,
  isLoading: false,
  isPaymentMethodLoading: false,
  isPaymentMethodError: false,
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_PAYMENT_METHOD_SUCCESS:
      return {
        ...state,
        isPaymentMethodError: true,
        isPaymentMethodLoading: false,
        paymentMethods: [...state.paymentMethods, action.payload],
      };
    case FETCH_USER_DATA_SUCCESS:
      return {
        ...state,
        isError: false,
        isLoading: false,
        ...action.payload,
      };
    case FETCH_USER_DATA_START:
      return {
        ...state,
        isError: false,
        isLoading: true,
      };
    case FETCH_USER_DATA_ERROR:
      return {
        ...state,
        isError: true,
        isLoading: false,
      };
    case ADD_PAYMENT_METHOD_START:
      return {
        ...state,
        isPaymentMethodError: false,
        isPaymentMethodLoading: true,
      };
    case ADD_PAYMENT_METHOD_ERROR:
      return {
        ...state,
        isPaymentMethodError: true,
        isPaymentMethodLoading: false,
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
}
