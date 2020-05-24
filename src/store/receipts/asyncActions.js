import { getAccessToken, getUserId } from '../auth/selectors';
import { createAuthorizationHeader, get } from '../../utils/http';
import { fetchReceiptsError, fetchReceiptsStart, fetchReceiptsSuccess } from './actions';
import { ORDER_API_URL } from '../../utils/config';
import {
  addOrderToStorage,
  getOrdersListFromStorage,
  getSavedReceipts,
} from '../checkout/asyncStorageHelpers';
import { fetchReceiptData } from '../receiptDetails/asyncActions';
import { isSavingReceiptsLocallyEnabled } from '../user/selectors';

export const fetchReceipts = () => async (dispatch, getState) => {
  const userId = getUserId(getState());
  const ordersFromStorage = await getOrdersListFromStorage(userId);
  const accessToken = getAccessToken(getState());
  const headers = accessToken ? createAuthorizationHeader(accessToken) : {};
  if (!accessToken) return dispatch(fetchReceiptsSuccess(ordersFromStorage));
  dispatch(fetchReceiptsStart());
  try {
    const {
      data: { data },
    } = await get(ORDER_API_URL, { headers });
    const receiptsUnion = data.filter(
      (item) => !ordersFromStorage.find((saved) => saved.id === item.id),
    );
    dispatch(fetchReceiptsSuccess([...receiptsUnion, ...ordersFromStorage]));
    const receiptsIds = data.map((receipt) => receipt.id);
    dispatch(downloadReceiptsToStorage(receiptsIds));
  } catch (e) {
    dispatch(fetchReceiptsError(e));
    dispatch(fetchReceiptsSuccess(ordersFromStorage));
  }
};

export const downloadReceiptsToStorage = (downloadedIds) => async (dispatch, getState) => {
  const state = getState();
  const userId = getUserId(getState());
  if (!userId) return;
  const isSyncEnabled = isSavingReceiptsLocallyEnabled(state);
  if (!isSyncEnabled) return;
  const savedReceipts = await getSavedReceipts(userId);
  const receiptsToDownload = downloadedIds.filter((id) => !savedReceipts.includes(id));
  receiptsToDownload.forEach((id) => {
    dispatch(fetchReceiptData(id, addOrderToStorage(userId), false));
  });
};
