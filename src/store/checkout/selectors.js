import {
  compose, prop,
} from 'lodash/fp';
import { createSelector } from 'reselect';

const root = (state) => state.checkout;

export const getCheckoutBasketId = compose(
  prop('basketId'),
  root,
);

export const getIsLoading = compose(prop('isLoading'), root);

export const getNewOrder = compose(prop('newOrder'), root);

export const getCheckoutTotalSum = compose(
  prop('totalSum'),
  root,
);

export const getSaveNewPaymentMethodValue = compose(
  prop('saveNewPaymentMethod'),
  root,
);

export const getSelectedPaymentTypeId = compose(
  prop('selectedPaymentTypeId'),
  root,
);

export const getIsAuthorizedCheckout = compose(
  prop('isAuthorizedCheckout'),
  root,
);

export const getDataForNewOrder = createSelector(
  getCheckoutBasketId,
  getCheckoutTotalSum,
  getSaveNewPaymentMethodValue,
  getSelectedPaymentTypeId,
  getIsAuthorizedCheckout,
  (basketId, totalSum, savePaymentMethod, paymentMethodId, isAuthorizedCheckout) => ({
    basketId,
    totalSum,
    savePaymentMethod,
    paymentMethodId,
    isAuthorizedCheckout,
  }),
);
