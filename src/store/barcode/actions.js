import { createAction } from 'redux-actions';
import {
  PRODUCT_FETCH_ERROR, PRODUCT_FETCH_START, PRODUCT_FETCH_SUCCESS, REMOVE_SCANNED_PRODUCT,
} from './actionTypes';

export const fetchProductError = createAction(PRODUCT_FETCH_ERROR);
export const fetchProductSuccess = createAction(
  PRODUCT_FETCH_SUCCESS,
  (product) => product,
);
export const fetchProductStart = createAction(PRODUCT_FETCH_START);

export const removeScannedProduct = createAction(REMOVE_SCANNED_PRODUCT, (id) => id);
