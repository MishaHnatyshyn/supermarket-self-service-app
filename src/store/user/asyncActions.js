import { getUserId } from '../auth/selectors';
import { fetchUserDataError, fetchUserDataStart, fetchUserDataSuccess } from './actions';
import { get } from '../../utils/http';
import { USER_DATA_API_URL } from '../../utils/config';

export const fetchUserData = () => async (dispatch, getState) => {
  const userId = getUserId(getState());
  dispatch(fetchUserDataStart());
  try {
    const { data } = await get(`${USER_DATA_API_URL}/${userId}`);
    dispatch(fetchUserDataSuccess(data));
  } catch (e) {
    dispatch(fetchUserDataError(e));
  }
};

export const addNewPaymentMethod = () => () => {};

export const deletePaymentMethod = () => () => {};
