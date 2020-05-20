import { getBasketId, getTotalBasketSum } from '../basket/selectors';
import { isAuthorized } from '../auth/selectors';
import {
  createOrderError, createOrderStart, createOrderSuccess, setCheckoutData,
} from './actions';
import { getDataForNewOrder } from './selectors';
import { post } from '../../utils/http';
import { ORDER_API_URL } from '../../utils/config';
import { removeBasketIdFromStorage } from '../basket/asyncActions';
import { addOrderIdToStorage } from './asyncStorageHelpers';


export const initCheckout = () => (dispatch, getState) => {
  const state = getState();
  const basketId = getBasketId(state);
  const totalSum = getTotalBasketSum(state);
  const isAuthorizedCheckout = isAuthorized(state);
  dispatch(setCheckoutData({ basketId, totalSum, isAuthorizedCheckout }));
};

export const createOrder = (newPaymentData) => async (dispatch, getState) => {
  dispatch(createOrderStart());
  const {
    basketId,
    totalSum,
    savePaymentMethod,
    paymentMethodId,
    isAuthorizedCheckout,
  } = getDataForNewOrder(getState());
  const body = {
    basketId,
    totalOrderSum: totalSum,
  };
  if (isAuthorizedCheckout && paymentMethodId) {
    body.paymentMethodId = paymentMethodId;
  } else if (isAuthorizedCheckout && newPaymentData) {
    body.paymentDetails = newPaymentData;
    body.saveNewPaymentMethod = savePaymentMethod;
  } else {
    body.paymentDetails = newPaymentData;
  }
  try {
    const { data } = await post(ORDER_API_URL, body);
    dispatch(createOrderSuccess(data));
    removeBasketIdFromStorage();
    await addOrderIdToStorage(data.id);
  } catch (e) {
    dispatch(createOrderError(e));
  }
};
