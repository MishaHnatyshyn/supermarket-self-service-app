import {
  compose, prop,
} from 'lodash/fp';
import { createSelector } from 'reselect';
import { getBasketItems, getCurrentProcessingProductId } from '../basket/selectors';

const root = (state) => state.product;

export const getProductData = compose(prop('product'), root);

export const getProductLoadingStatus = compose(prop('isLoading'), root);

export const getProductPrice = compose(
  prop('price'),
  getProductData,
);

export const getProductId = compose(
  prop('id'),
  getProductData,
);

export const getAddToBasketData = createSelector(
  getProductId,
  getBasketItems,
  (productId, baksetItems) => {
    const basketLineItem = baksetItems.find((item) => item.product === productId);
    return basketLineItem
      ? {
        quantity: basketLineItem.quantity,
        sum: basketLineItem.sum,
        lineItemId: basketLineItem.id,
      }
      : null;
  },
);

export const isBasketUpdatePending = createSelector(
  getProductId,
  getCurrentProcessingProductId,
  (productId, processingProductId) => productId === processingProductId,
);
