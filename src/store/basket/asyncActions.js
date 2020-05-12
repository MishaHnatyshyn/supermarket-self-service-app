import { AsyncStorage } from 'react-native';
import { getBasketId } from './selectors';
import {
  del, post, put, get,
} from '../../utils/http';
import { BASKET_API_URL, BASKET_ITEMS_API_URL } from '../../utils/config';
import {
  addToBasketError,
  addToBasketStart,
  addToBasketSuccess,
  changeBasketItemQuantityError,
  changeBasketItemQuantityStart,
  changeBasketItemQuantitySuccess,
  createBasketSuccess, fetchBasketError, fetchBasketStart, fetchBasketSuccess,
  removeBasketItemError,
  removeBasketItemStart,
  removeBasketItemSuccess,
} from './actions';
import { getSelectedStoreId } from '../store/selectors';

const BASKET_ID_STORAGE_KEY = 'BASKET_ID';

const createBasketItemIdRoute = (id) => `${BASKET_ITEMS_API_URL}/${id}`;
const createBasketIdRoute = (id) => `${BASKET_API_URL}/${id}`;

export const setBasketIdToStorage = (basketId) => (
  AsyncStorage.setItem(BASKET_ID_STORAGE_KEY, String(basketId))
);

export const removeBasketIdFromStorage = (basketId) => (
  AsyncStorage.removeItem(BASKET_ID_STORAGE_KEY, basketId)
);

export const getBasketIdFromStorage = () => (
  AsyncStorage.getItem(BASKET_ID_STORAGE_KEY)
);

export const getUserBasketDataFromStorage = () => async (dispatch) => {
  const basketIdFromStorage = await getBasketIdFromStorage();
  if (!basketIdFromStorage) return;
  dispatch(createBasketSuccess({ id: parseInt(basketIdFromStorage, 10) }));
  dispatch(fetchBasketData());
};

export const fetchBasketData = () => async (dispatch, getState) => {
  const basketId = getBasketId(getState());
  dispatch(fetchBasketStart());
  try {
    const url = createBasketIdRoute(basketId);
    const { data } = await get(url);
    dispatch(fetchBasketSuccess(data));
  } catch (e) {
    dispatch(fetchBasketError());
  }
};

export const createBasket = async (dispatch, storeId) => {
  try {
    const { data: basket } = await post(BASKET_API_URL, { storeId });
    dispatch(createBasketSuccess(basket));
    await setBasketIdToStorage(basket.id);
    return basket.id;
  } catch (e) {
    return null;
  }
};

export const addToBasket = (productId) => async (dispatch, getState) => {
  dispatch(addToBasketStart(productId));
  const state = getState();
  let basketId = getBasketId(state);
  if (!basketId) {
    const storeId = getSelectedStoreId(state) || 1;
    basketId = await createBasket(dispatch, storeId);
  }
  if (!basketId) {
    return dispatch(addToBasketError());
  }
  try {
    const { data } = await post(BASKET_ITEMS_API_URL, { basketId, productId, quantity: 1 });
    dispatch(addToBasketSuccess(data));
  } catch (e) {
    dispatch(addToBasketError(productId));
  }
};

export const removeBasketItem = (lineItemId, productId) => async (dispatch) => {
  dispatch(removeBasketItemStart(productId));
  try {
    const url = createBasketItemIdRoute(lineItemId);
    const { data } = await del(url);
    dispatch(removeBasketItemSuccess({ ...data, lineItemId }));
  } catch (e) {
    dispatch(removeBasketItemError(productId));
  }
};

export const changeBasketItemQuantity = (lineItemId, productId, quantity) => async (dispatch) => {
  if (quantity === 0) {
    return dispatch(removeBasketItem(lineItemId, productId));
  }
  dispatch(changeBasketItemQuantityStart(productId));
  try {
    const url = createBasketItemIdRoute(lineItemId);
    const { data } = await put(url, { quantity });
    dispatch(changeBasketItemQuantitySuccess(data));
  } catch (e) {
    dispatch(changeBasketItemQuantityError(productId));
  }
};
