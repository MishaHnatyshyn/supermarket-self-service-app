import { createAction } from 'redux-actions';
import {
  LOGIN_SUCCESS,
  LOGIN_START,
  LOGIN_ERROR,
  REGISTER_SUCCESS,
  REGISTER_START,
  REGISTER_ERROR,
  CLEAR_ERROR,
  LOGIN,
  REGISTER,
  LOGOUT,
} from './actionTypes';

export const login = createAction(LOGIN, (email, password) => ({ email, password }));
export const loginStart = createAction(LOGIN_START);
export const loginError = createAction(LOGIN_ERROR);
export const loginSuccess = createAction(LOGIN_SUCCESS, (data) => data);

export const register = createAction(REGISTER, (email, password) => ({ email, password }));
export const registerStart = createAction(REGISTER_START);
export const registerError = createAction(REGISTER_ERROR);
export const registerSuccess = createAction(REGISTER_SUCCESS, (data) => data);

export const clearAuthErrors = createAction(CLEAR_ERROR);
export const logout = createAction(LOGOUT);
