import { get } from '../../utils/http';
import { STORE_LIST_API_URL } from '../../utils/config';
import { fetchStoresError, fetchStoresStart, fetchStoresSuccess } from './actions';

// eslint-disable-next-line import/prefer-default-export
export const getAvailableStores = () => async (dispatch) => {
  dispatch(fetchStoresStart());
  try {
    const { data: storesData } = await get(STORE_LIST_API_URL);
    dispatch(fetchStoresSuccess(storesData));
  } catch (e) {
    dispatch(fetchStoresError(e.text));
  }
};
