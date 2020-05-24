import { createAction } from 'redux-actions';
import {
  FETCH_RECEIPTS_ERROR,
  FETCH_RECEIPTS_START,
  FETCH_RECEIPTS_SUCCESS,
} from './actionTypes';

export const fetchReceiptsStart = createAction(FETCH_RECEIPTS_START);
export const fetchReceiptsError = createAction(FETCH_RECEIPTS_ERROR);
export const fetchReceiptsSuccess = createAction(FETCH_RECEIPTS_SUCCESS, (data) => data);
