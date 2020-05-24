import { createAction } from 'redux-actions';
import { SHOW_TOAST_NOTIFICATION, HIDE_TOAST_NOTIFICATION } from './actionTypes';

export const showNotification = createAction(SHOW_TOAST_NOTIFICATION);
export const hideNotification = createAction(HIDE_TOAST_NOTIFICATION);
