import {
  put, call, takeLatest, all,
} from 'redux-saga/effects';
import AsyncStorage from '@react-native-community/async-storage';
import { post } from '../../utils/http';
import { AUTH_LOGIN_API_URL, AUTH_REGISTER_API_URL } from '../../utils/config';
import {
  loginError, loginStart, loginSuccess, registerError, registerStart, registerSuccess,
} from './actions';
import { LOGIN, REGISTER } from './actionTypes';

const USER_TOKEN_STORAGE_KEY = 'USER_TOKEN';

export function setUserDataInStorage(data) {
  return AsyncStorage.setItem(USER_TOKEN_STORAGE_KEY, JSON.stringify(data));
}

export function getUserDataFromStorage() {
  return AsyncStorage.getItem(USER_TOKEN_STORAGE_KEY);
}

export function* login() {
  yield put(loginStart());
  try {
    const { data: userAuthData } = yield call(post, AUTH_LOGIN_API_URL);
    yield put(loginSuccess(userAuthData));
    yield call(setUserDataInStorage(userAuthData));
  } catch (e) {
    console.log(e);
    yield put(loginError());
  }
}
export function* register() {
  yield put(registerStart());
  try {
    const { data: userAuthData } = yield call(post, AUTH_REGISTER_API_URL);
    yield put(registerSuccess(userAuthData));
    yield call(setUserDataInStorage(userAuthData));
  } catch (e) {
    yield put(registerError());
  }
}

export function* getUserDataFromStorageAndSetInStore() {
  yield put(loginStart());
  const data = call(getUserDataFromStorage);
  if (!data) return;
  const parsedData = JSON.stringify(data);
  yield put(loginSuccess(parsedData));
}

export function* init() {
  yield all([
    call(getUserDataFromStorageAndSetInStore),
    takeLatest(LOGIN, login),
    takeLatest(REGISTER, login),
  ]);
}
