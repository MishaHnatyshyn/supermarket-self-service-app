import {
  compose, prop,
} from 'lodash/fp';
import { createSelector } from 'reselect'

const root = (state) => state.basket;

export const getBasketId = compose(prop('basketId'), root);
export const getBasketItems = compose(prop('lineItems'), root);
export const getCurrentProcessingProductId = compose(prop('currentProcessingProductId'), root);
export const getTotalBasketProducts = compose(prop('totals.products'), root);

export const getTotalBasketSum = createSelector(
  getBasketItems,
  (items) => items.reduce((sum, item) => sum + item.quantity * item.price, 0)
);

export const getBasketItemsForDisplay = createSelector(
  getBasketItems,
  getCurrentProcessingProductId,
  (items, currentProcessingProductId) => (
    items.map((item) => ({ ...item, isLoading: currentProcessingProductId === item.product }))
  ),
);
