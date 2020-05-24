import { Alert } from 'react-native';
import { getAccessToken, getUserId } from '../auth/selectors';
import {
  addPaymentMethodError,
  addPaymentMethodStart,
  addPaymentMethodSuccess,
  fetchUserDataError,
  fetchUserDataStart,
  fetchUserDataSuccess,
  removePaymentMethod,
} from './actions';
import {
  createAuthorizationHeader, get, post, del,
} from '../../utils/http';
import { PAYMENT_METHODS_API_URL, USER_DATA_API_URL } from '../../utils/config';
import { getReceiptSavingValue, setReceiptSavingValue } from './asyncStorageHelpers';
import { removeAllOrdersFromStorage } from '../checkout/asyncStorageHelpers';

export const fetchUserData = () => async (dispatch, getState) => {
  const userId = getUserId(getState());
  dispatch(fetchUserDataStart());
  try {
    const { data } = await get(`${USER_DATA_API_URL}/${userId}`);
    const saveReceiptsLocally = await getReceiptSavingValue(userId);
    dispatch(fetchUserDataSuccess({ ...data, saveReceiptsLocally }));
  } catch (e) {
    dispatch(fetchUserDataError(e));
  }
};

export const addNewPaymentMethod = (
  cardNumber,
  expirationDateMonth,
  expirationDateYear,
  cvv,
) => async (dispatch, getState) => {
  const token = getAccessToken(getState());
  const headers = createAuthorizationHeader(token);
  const body = {
    cardNumber,
    dueDate: `${expirationDateMonth}/${expirationDateYear}`,
    cvvCode: cvv,
  };
  dispatch(addPaymentMethodStart());
  try {
    const { data } = await post(PAYMENT_METHODS_API_URL, body, { headers });
    const onSuccess = () => dispatch(addPaymentMethodSuccess(data));
    Alert.alert(
      'Card was successfully added',
      'Now you can use this payment method in your future checkouts',
      [{ text: 'OK', onPress: onSuccess }],
    );
  } catch (e) {
    dispatch(addPaymentMethodError());
  }
};

export const deletePaymentMethod = (id) => async (dispatch, getState) => {
  const token = getAccessToken(getState());
  const headers = createAuthorizationHeader(token);

  try {
    await del(`${PAYMENT_METHODS_API_URL}/${id}`, { headers });
    dispatch(removePaymentMethod(id));
  } catch (e) {
    dispatch(addPaymentMethodError());
  }
};

export const updateReceiptSavingToggle = (value) => async (dispatch, getState) => {
  const userId = getUserId(getState());
  dispatch(fetchUserDataSuccess({ saveReceiptsLocally: value }));
  await setReceiptSavingValue(userId, value);
  if (!value) {
    await removeAllOrdersFromStorage(userId);
  }
};
