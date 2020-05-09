import {
  compose, prop,
} from 'lodash/fp';

const root = (state) => state.basket;

export const getBasketId = compose(prop('basketId'), root);
export const getBasketItems = compose(prop('lineItems'), root);
export const getCurrentProcessingProductId = compose(prop('currentProcessingProductId'), root);
