import {
  LOGIN_ERROR,
  LOGIN_START,
  LOGIN_SUCCESS,
  REGISTER_ERROR,
  REGISTER_START,
  REGISTER_SUCCESS,
} from '../auth/actionTypes';
import {
  ADD_PAYMENT_METHOD_ERROR,
  FETCH_USER_DATA_ERROR,
  FETCH_USER_DATA_START,
  FETCH_USER_DATA_SUCCESS,
} from '../user/actionTypes';
import {
  FETCH_PRODUCT_ERROR,
  FETCH_PRODUCT_START,
  FETCH_PRODUCT_SUCCESS,
} from '../product/actionTypes';
import { HIDE_TOAST_NOTIFICATION, SHOW_TOAST_NOTIFICATION } from './actionTypes';
import {
  ADD_TO_BASKET_REQUEST_ERROR,
  CHANGE_BASKET_ITEM_QUANTITY_REQUEST_ERROR,
  FETCH_BASKET_ERROR,
  REMOVE_BASKET_ITEM_REQUEST_ERROR,
} from '../basket/actionTypes';
import { PRODUCT_FETCH_ERROR } from '../barcode/actionTypes';
import { FETCH_SEARCH_ERROR } from '../search/actionTypes';
import { FETCH_RECEIPT_ERROR } from '../receiptDetails/actionTypes';
import { CATEGORIES_FETCH_ERROR } from '../categories/actionTypes';
import { FETCH_AVAILABLE_STORES_ERROR } from '../store/actionTypes';
import { FETCH_RECEIPTS_ERROR } from '../receipts/actionTypes';
import { CREATE_ORDER_ERROR } from '../checkout/actionTypes';

const initialState = {
  showGlobalLoader: false,
  showToastNotification: false,
  toastNotificationText: null,
};

export default function uiReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_START:
    case REGISTER_START:
    case FETCH_USER_DATA_START:
    case FETCH_PRODUCT_START:
      return {
        ...state,
        showGlobalLoader: true,
      };
    case FETCH_USER_DATA_SUCCESS:
    case LOGIN_SUCCESS:
    case FETCH_PRODUCT_SUCCESS:
    case REGISTER_SUCCESS:
    case LOGIN_ERROR:
    case REGISTER_ERROR:
      return {
        ...state,
        showGlobalLoader: false,
      };
    case SHOW_TOAST_NOTIFICATION:
      return {
        ...state,
        showToastNotification: true,
        toastNotificationText: action.payload,
      };
    case HIDE_TOAST_NOTIFICATION:
      return {
        ...state,
        showToastNotification: false,
        toastNotificationText: null,
      };
    case FETCH_PRODUCT_ERROR:
    case FETCH_USER_DATA_ERROR:
    case CHANGE_BASKET_ITEM_QUANTITY_REQUEST_ERROR:
    case REMOVE_BASKET_ITEM_REQUEST_ERROR:
    case PRODUCT_FETCH_ERROR:
    case FETCH_SEARCH_ERROR:
    case FETCH_RECEIPT_ERROR:
    case FETCH_BASKET_ERROR:
    case ADD_TO_BASKET_REQUEST_ERROR:
    case ADD_PAYMENT_METHOD_ERROR:
    case FETCH_RECEIPTS_ERROR:
    case CREATE_ORDER_ERROR:
      return {
        ...state,
        showToastNotification: true,
        showGlobalLoader: false,
      };
    default:
      return {
        ...state,
      };
  }
}
