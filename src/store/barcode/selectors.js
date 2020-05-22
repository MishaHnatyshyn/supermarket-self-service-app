import {
  compose, prop,
} from 'lodash/fp';
import { createSelector } from 'reselect';
import { getBasketItems, getCurrentProcessingProductId } from '../basket/selectors';

const root = (state) => state.barcode;

// eslint-disable-next-line import/prefer-default-export
export const getScannedProduct = compose(prop('scannedProduct'), root);
const getScannedProductId = compose(prop('id'), getScannedProduct);
export const getScannedProductBarcode = compose(prop('barcode'), getScannedProduct);

export const getIsError = compose(prop('isError'), root);
export const getIsLoading = compose(prop('isLoading'), root);

export const getAddToBasketData = createSelector(
  getScannedProductId,
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
  getScannedProductId,
  getCurrentProcessingProductId,
  (productId, processingProductId) => productId === processingProductId,
);
