import { compose, prop } from 'lodash/fp';

const root = (state) => state.user;

export const getUserData = root;

export const getIsPaymentMethodLoading = compose(prop('isPaymentMethodLoading'), root);
export const getIsPaymentMethodAdded = compose(prop('isPaymentMethodAdded'), root);
export const getPaymentMethods = compose(prop('paymentMethods'), root);
export const isSavingReceiptsLocallyEnabled = compose(prop('saveReceiptsLocally'), root);
