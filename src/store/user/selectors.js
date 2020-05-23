import { compose, prop } from 'lodash/fp';

const root = (state) => state.user;

// eslint-disable-next-line import/prefer-default-export
export const getUserData = root;

export const getIsPaymentMethodLoading = compose(prop('isPaymentMethodLoading'), root);
export const getIsPaymentMethodAdded = compose(prop('isPaymentMethodAdded'), root);
