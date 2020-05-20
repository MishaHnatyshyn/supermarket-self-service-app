import { AsyncStorage } from 'react-native';
import { post } from '../../utils/http';
import { AUTH_LOGIN_API_URL, AUTH_REGISTER_API_URL } from '../../utils/config';
import {
  loginError,
  loginStart,
  loginSuccess, logoutAction,
  registerError,
  registerStart,
  registerSuccess,
} from './actions';
import { fetchUserData } from '../user/asyncActions';

const USER_TOKEN_STORAGE_KEY = 'USER_TOKEN';

export function setUserDataInStorage(data) {
  return AsyncStorage.setItem(USER_TOKEN_STORAGE_KEY, JSON.stringify(data));
}

export function getUserDataFromStorage() {
  return AsyncStorage.getItem(USER_TOKEN_STORAGE_KEY);
}

export function removeUserDataFromStorage() {
  return AsyncStorage.removeItem(USER_TOKEN_STORAGE_KEY);
}

export const login = (email, password) => async (dispatch) => {
  dispatch(loginStart());
  try {
    const { data: userAuthData } = await post(AUTH_LOGIN_API_URL, { email, password });
    dispatch(loginSuccess(userAuthData));
    dispatch(fetchUserData());
    setUserDataInStorage(userAuthData);
  } catch (e) {
    dispatch(loginError());
  }
};

export const register = (email, password) => async (dispatch) => {
  dispatch(registerStart());
  try {
    const { data: userAuthData } = await post(AUTH_REGISTER_API_URL, { email, password });
    dispatch(registerSuccess(userAuthData));
    dispatch(fetchUserData());
    setUserDataInStorage(userAuthData);
  } catch (e) {
    dispatch(registerError());
  }
};

export const getUserDataFromStorageAndSetInStore = () => async (dispatch) => {
  dispatch(loginStart());
  const data = await getUserDataFromStorage();
  if (!data) return dispatch(loginError());
  const parsedData = JSON.parse(data);
  dispatch(loginSuccess(parsedData));
  dispatch(fetchUserData());
};

export const logout = () => (dispatch) => {
  dispatch(logoutAction());
  removeUserDataFromStorage();
};
