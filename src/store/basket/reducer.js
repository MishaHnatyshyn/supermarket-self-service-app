import {
  ADD_TO_BASKET_REQUEST_ERROR,
  ADD_TO_BASKET_REQUEST_START,
  ADD_TO_BASKET_REQUEST_SUCCESS,
  REMOVE_BASKET_ITEM_REQUEST_ERROR,
  REMOVE_BASKET_ITEM_REQUEST_START,
  REMOVE_BASKET_ITEM_REQUEST_SUCCESS,
  CHANGE_BASKET_ITEM_QUANTITY_REQUEST_ERROR,
  CHANGE_BASKET_ITEM_QUANTITY_REQUEST_START,
  CHANGE_BASKET_ITEM_QUANTITY_REQUEST_SUCCESS,
  CREATE_BASKET_SUCCESS,
  FETCH_BASKET_SUCCESS,
  FETCH_BASKET_START, FETCH_BASKET_ERROR,
} from './actionTypes';
import { CREATE_ORDER_SUCCESS } from '../checkout/actionTypes';

const initialState = {
  basketId: null,
  lineItems: [],
  totals: {
    total: 0,
    items: 0,
    products: 0,
  },
  currentProcessingProductId: null,
  isLoading: false,
  isError: false,
};

export default function basketReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_BASKET_ITEM_QUANTITY_REQUEST_SUCCESS:
      return {
        ...state,
        lineItems: state.lineItems.map((lineItem) => (
          lineItem.id === action.payload.data.id
            ? action.payload.data
            : lineItem
        )),
        totals: action.payload.updatedBasketTotals,
        currentProcessingProductId: null,
        isError: false,
      };
    case ADD_TO_BASKET_REQUEST_SUCCESS:
      return {
        ...state,
        lineItems: [...state.lineItems, action.payload.data],
        totals: action.payload.updatedBasketTotals,
        currentProcessingProductId: null,
        isError: false,
      };
    case REMOVE_BASKET_ITEM_REQUEST_SUCCESS:
      return {
        ...state,
        lineItems: state.lineItems.filter((lineItem) => lineItem.id !== action.payload.lineItemId),
        totals: action.payload.updatedBasketTotals,
        currentProcessingProductId: null,
        isError: false,
      };
    case FETCH_BASKET_START:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case FETCH_BASKET_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case FETCH_BASKET_SUCCESS:
      return {
        ...state,
        lineItems: action.payload.data,
        totals: action.payload.totals,
        isLoading: false,
      };
    case CHANGE_BASKET_ITEM_QUANTITY_REQUEST_ERROR:
    case REMOVE_BASKET_ITEM_REQUEST_ERROR:
    case ADD_TO_BASKET_REQUEST_ERROR:
      return {
        ...state,
        currentProcessingProductId: null,
        isError: true,
      };
    case CHANGE_BASKET_ITEM_QUANTITY_REQUEST_START:
    case REMOVE_BASKET_ITEM_REQUEST_START:
    case ADD_TO_BASKET_REQUEST_START:
      return {
        ...state,
        currentProcessingProductId: action.payload,
        isError: false,
      };
    case CREATE_BASKET_SUCCESS:
      return {
        ...state,
        basketId: action.payload,
      };
    case CREATE_ORDER_SUCCESS:
      return initialState;
    default:
      return state;
  }
}
