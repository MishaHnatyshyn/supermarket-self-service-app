import { getAccessToken } from '../auth/selectors';
import { createAuthorizationHeader, get } from '../../utils/http';
import { fetchReceiptsError, fetchReceiptsStart, fetchReceiptsSuccess } from './actions';
import { ORDER_API_URL } from '../../utils/config';

export const getOrderIdsFromStorage = () => [1];

export const fetchReceipts = () => async (dispatch, getState) => {
  const accessToken = getAccessToken(getState());
  const headers = accessToken ? createAuthorizationHeader(accessToken) : {};
  const ordersIdsFromStorage = getOrderIdsFromStorage();
  const params = { orders: ordersIdsFromStorage };
  if (!accessToken && ordersIdsFromStorage.length === 0) return;
  dispatch(fetchReceiptsStart());
  try {
    const { data: { data } } = await get(ORDER_API_URL, { headers, params });
    dispatch(fetchReceiptsSuccess(data));
  } catch (e) {
    dispatch(fetchReceiptsError(e));
  }
};


//new Date('2020-05-20T06:35:26.808Z').toLocaleString().split(', ').reverse().join(', ')
