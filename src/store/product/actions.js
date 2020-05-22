import { createAction } from 'redux-actions';
import {
  FETCH_PRODUCT_ERROR,
  FETCH_PRODUCT_START,
  FETCH_PRODUCT_SUCCESS,
  CLEAR_PRODUCT_DATA,
} from './actionTypes';

export const fetchProductStart = createAction(FETCH_PRODUCT_START);
export const fetchProductSuccess = createAction(FETCH_PRODUCT_SUCCESS, (data) => data);
export const fetchProductError = createAction(FETCH_PRODUCT_ERROR);
export const clearProductData = createAction(CLEAR_PRODUCT_DATA);
