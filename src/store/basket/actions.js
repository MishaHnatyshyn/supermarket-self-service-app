import { createAction } from 'redux-actions';
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
  FETCH_BASKET_ERROR,
  FETCH_BASKET_START,
  FETCH_BASKET_SUCCESS,
  DELETE_BASKET,
} from './actionTypes';

export const addToBasketStart = createAction(ADD_TO_BASKET_REQUEST_START, (productId) => productId);
export const addToBasketSuccess = createAction(ADD_TO_BASKET_REQUEST_SUCCESS, (data) => data);
export const addToBasketError = createAction(ADD_TO_BASKET_REQUEST_ERROR, (productId) => productId);

export const deleteBasket = createAction(DELETE_BASKET);

export const fetchBasketStart = createAction(FETCH_BASKET_START);
export const fetchBasketSuccess = createAction(FETCH_BASKET_SUCCESS, (data) => data);
export const fetchBasketError = createAction(FETCH_BASKET_ERROR);

export const changeBasketItemQuantityStart = createAction(
  CHANGE_BASKET_ITEM_QUANTITY_REQUEST_START,
  (productId) => productId,
);
export const changeBasketItemQuantitySuccess = createAction(
  CHANGE_BASKET_ITEM_QUANTITY_REQUEST_SUCCESS,
  (data) => data,
);
export const changeBasketItemQuantityError = createAction(
  CHANGE_BASKET_ITEM_QUANTITY_REQUEST_ERROR,
  (productId) => productId,
);

export const removeBasketItemStart = createAction(
  REMOVE_BASKET_ITEM_REQUEST_START,
  (productId) => productId,
);
export const removeBasketItemSuccess = createAction(
  REMOVE_BASKET_ITEM_REQUEST_SUCCESS,
  (data) => data,
);
export const removeBasketItemError = createAction(
  REMOVE_BASKET_ITEM_REQUEST_ERROR,
  (productId) => productId,
);
export const createBasketSuccess = createAction(
  CREATE_BASKET_SUCCESS,
  (basketData) => basketData.id,
);
