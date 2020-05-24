import { createAction } from 'redux-actions';
import {
  FETCH_RECEIPT_ERROR,
  FETCH_RECEIPT_START,
  FETCH_RECEIPT_SUCCESS,
} from './actionTypes';

export const fetchReceiptStart = createAction(FETCH_RECEIPT_START);
export const fetchReceiptError = createAction(FETCH_RECEIPT_ERROR);
export const fetchReceiptSuccess = createAction(FETCH_RECEIPT_SUCCESS, (data) => data);
