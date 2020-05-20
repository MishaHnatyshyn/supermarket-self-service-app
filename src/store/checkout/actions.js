import { createAction } from 'redux-actions';
import {
  CREATE_ORDER_ERROR,
  CREATE_ORDER_START,
  CREATE_ORDER_SUCCESS,
  SET_CHECKOUT_DATA,
  TOGGLE_SAVE_PAYMENT_METHOD_CONTROL,
  RESET_CHECKOUT_STATE,
  USE_NEW_PAYMENT_METHOD,
  USE_SAVED_PAYMENT_METHOD,
} from './actionTypes';

export const useNewPaymentMethod = createAction(USE_NEW_PAYMENT_METHOD);
export const useSavedPaymentMethod = createAction(USE_SAVED_PAYMENT_METHOD);
export const createOrderSuccess = createAction(CREATE_ORDER_SUCCESS, (response) => response);
export const createOrderError = createAction(CREATE_ORDER_ERROR);
export const createOrderStart = createAction(CREATE_ORDER_START);
export const setCheckoutData = createAction(
  SET_CHECKOUT_DATA,
  ({
    id, transactionId, status, timestamp,
  }) => ({
    id,
    transactionId,
    status,
    timestamp,
  }),
);
export const toggleSavePaymentMethod = createAction(TOGGLE_SAVE_PAYMENT_METHOD_CONTROL);
export const resetCheckout = createAction(RESET_CHECKOUT_STATE);
