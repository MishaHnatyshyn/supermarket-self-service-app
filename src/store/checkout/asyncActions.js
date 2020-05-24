import { getBasketId, getTotalBasketSum } from '../basket/selectors';
import { getAccessToken, getUserId, isAuthorized } from '../auth/selectors';
import {
  createOrderError, createOrderStart, createOrderSuccess, setCheckoutData,
} from './actions';
import { createAuthorizationHeader, post } from '../../utils/http';
import { ORDER_API_URL } from '../../utils/config';
import { removeBasketIdFromStorage } from '../basket/asyncActions';
import { addOrderToStorage } from './asyncStorageHelpers';
import { addPaymentMethodSuccess } from '../user/actions';
import { fetchReceiptData } from '../receiptDetails/asyncActions';


export const initCheckout = () => (dispatch, getState) => {
  const state = getState();
  const basketId = getBasketId(state);
  const totalSum = getTotalBasketSum(state);
  const isAuthorizedCheckout = isAuthorized(state);
  dispatch(setCheckoutData({ basketId, totalSum, isAuthorizedCheckout }));
};

export const createOrder = ({
  paymentMethodId,
  newPaymentData,
  savePaymentMethod,
}) => async (dispatch, getState) => {
  const state = getState();
  dispatch(createOrderStart());
  const basketId = getBasketId(state);
  const totalOrderSum = getTotalBasketSum(state);
  const isAuthorizedCheckout = isAuthorized(state);
  const userId = getUserId(state);

  const body = {
    basketId,
    totalOrderSum,
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
    const token = getAccessToken(state);
    const headers = token ? createAuthorizationHeader(token) : {};
    const { data } = await post(ORDER_API_URL, body, { headers });
    dispatch(createOrderSuccess(data));
    removeBasketIdFromStorage();
    dispatch(fetchReceiptData(data.id, addOrderToStorage(userId), false));
    if (isAuthorizedCheckout && savePaymentMethod) {
      dispatch(addPaymentMethodSuccess(data.paymentMethodData));
    }
  } catch (e) {
    dispatch(createOrderError(e));
  }
};
