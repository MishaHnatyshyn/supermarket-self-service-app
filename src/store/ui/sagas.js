import { put, takeLatest, all } from 'redux-saga/effects';
import { hideLoader, showLoader } from './actions';
import {
  LOGIN_ERROR,
  LOGIN_START,
  LOGIN_SUCCESS,
  REGISTER_ERROR,
  REGISTER_START,
  REGISTER_SUCCESS,
} from '../auth/actionTypes';

export function* showSpinner() {
  yield put(showLoader());
}

export function* hideSpinner() {
  yield put(hideLoader());
}

export function* startWatchActions() {
  yield all([
    takeLatest([LOGIN_START, REGISTER_START], showSpinner),
    takeLatest([LOGIN_SUCCESS, LOGIN_ERROR, REGISTER_SUCCESS, REGISTER_ERROR], hideSpinner),
  ]);
}
