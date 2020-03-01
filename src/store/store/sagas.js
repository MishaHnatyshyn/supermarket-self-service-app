import { put, call } from 'redux-saga/effects';
import { get } from '../../utils/http';
import { STORE_LIST_API_URL } from '../../utils/config';
import { fetchStoresError, fetchStoresStart, fetchStoresSuccess } from './actions';

export function* getAvailableStores() {
  yield put(fetchStoresStart());
  try {
    const { data: storesData } = yield call(get, STORE_LIST_API_URL);
    yield put(fetchStoresSuccess(storesData));
  } catch (e) {
    yield put(fetchStoresError(e.text));
  }
}

export function* init() {
  yield call(getAvailableStores);
}
