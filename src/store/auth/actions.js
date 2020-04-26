import { createAction } from 'redux-actions';
import {
  LOGIN_SUCCESS,
  LOGIN_START,
  LOGIN_ERROR,
  REGISTER_SUCCESS,
  REGISTER_START,
  REGISTER_ERROR,
  CLEAR_ERROR,
  LOGOUT,
} from './actionTypes';

export const loginStart = createAction(LOGIN_START);
export const loginError = createAction(LOGIN_ERROR);
export const loginSuccess = createAction(LOGIN_SUCCESS, (data) => data);

export const registerStart = createAction(REGISTER_START);
export const registerError = createAction(REGISTER_ERROR);
export const registerSuccess = createAction(REGISTER_SUCCESS, (data) => data);

export const clearAuthErrors = createAction(CLEAR_ERROR);
export const logoutAction = createAction(LOGOUT);

