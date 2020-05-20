import { createAction } from 'redux-actions';
import {
  FETCH_USER_DATA_ERROR,
  FETCH_USER_DATA_START,
  FETCH_USER_DATA_SUCCESS,
  ADD_PAYMENT_METHOD_ERROR,
  ADD_PAYMENT_METHOD_START,
  ADD_PAYMENT_METHOD_SUCCESS,
} from './actionTypes';

export const fetchUserDataStart = createAction(FETCH_USER_DATA_START);
export const fetchUserDataSuccess = createAction(FETCH_USER_DATA_SUCCESS, (data) => data);
export const fetchUserDataError = createAction(FETCH_USER_DATA_ERROR);

export const addPaymentMethodStart = createAction(ADD_PAYMENT_METHOD_START);
export const addPaymentMethodSuccess = createAction(ADD_PAYMENT_METHOD_SUCCESS, (data) => data);
export const addPaymentMethodError = createAction(ADD_PAYMENT_METHOD_ERROR);
