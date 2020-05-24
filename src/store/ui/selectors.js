import { compose, prop } from 'lodash/fp';

const root = (state) => state.ui;

// eslint-disable-next-line import/prefer-default-export
export const getIsLoaderVisible = compose(prop('showGlobalLoader'), root);
export const isToastNotificationVisible = compose(prop('showToastNotification'), root);
export const getToastNotificationText = compose(prop('toastNotificationText'), root);
