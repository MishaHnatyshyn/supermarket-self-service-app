import { createAction } from 'redux-actions';
import {
  FETCH_AVAILABLE_STORES_ERROR,
  FETCH_AVAILABLE_STORES_START,
  FETCH_AVAILABLE_STORES_SUCCESS,
  SELECTED_STORE_CHANGE,
} from './actionTypes';

export const fetchStoresSuccess = createAction(
  FETCH_AVAILABLE_STORES_SUCCESS,
  (storesData) => storesData,
);
export const fetchStoresError = createAction(FETCH_AVAILABLE_STORES_ERROR, (error) => error);
export const fetchStoresStart = createAction(FETCH_AVAILABLE_STORES_START);
export const selectStore = createAction(SELECTED_STORE_CHANGE, (store) => store);
