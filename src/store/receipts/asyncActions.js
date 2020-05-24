import { getAccessToken, getUserId } from '../auth/selectors';
import { createAuthorizationHeader, get } from '../../utils/http';
import { fetchReceiptsError, fetchReceiptsStart, fetchReceiptsSuccess } from './actions';
import { ORDER_API_URL } from '../../utils/config';
import { addOrderToStorage, getOrdersListFromStorage, getSavedReceipts } from '../checkout/asyncStorageHelpers';
import { fetchReceiptData } from '../receiptDetails/asyncActions';
import { isSavingReceiptsLocallyEnabled } from '../user/selectors';
import { getReceipts } from './selectors';

export const getOrderIdsFromStorage = () => [1];

export const fetchReceipts = () => async (dispatch, getState) => {
  const userId = getUserId(getState());
  const ordersFromStorage = await getOrdersListFromStorage(userId);
  const accessToken = getAccessToken(getState());
  const headers = accessToken ? createAuthorizationHeader(accessToken) : {};
  const ordersIdsFromStorage = getOrderIdsFromStorage();
  const params = { orders: ordersIdsFromStorage };
  if (!accessToken && ordersIdsFromStorage.length === 0) return;
  dispatch(fetchReceiptsStart());
  try {
    const { data: { data } } = await get(ORDER_API_URL, { headers, params });
    dispatch(fetchReceiptsSuccess([...data, ...ordersFromStorage]));
    const receiptsIds = data.map((receipt) => receipt.id);
    dispatch(downloadReceiptsToStorage(receiptsIds));
  } catch (e) {
    dispatch(fetchReceiptsError(e));
  }
};

export const downloadReceiptsToStorage = (downloadedIds) => async (dispatch, getState) => {
  const state = getState();
  const userId = getUserId(getState());
  if (!userId) return;
  const isSyncEnabled = isSavingReceiptsLocallyEnabled(state);
  if (!isSyncEnabled) return;
  const savedReceipts = await getSavedReceipts(userId);

  const receiptsToDownload = savedReceipts.filter((id) => !downloadedIds.includes(id));
  receiptsToDownload.forEach((id) => {
    dispatch(fetchReceiptData(id, addOrderToStorage(userId), false));
  });
};


// new Date('2020-05-20T06:35:26.808Z').toLocaleString().split(', ').reverse().join(', ')
