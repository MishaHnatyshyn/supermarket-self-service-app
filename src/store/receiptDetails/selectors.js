import { compose, prop } from 'lodash/fp';

export const root = (state) => state.receiptDetails;

export const isReceiptLoading = compose(prop('isLoading'), root);
export const getReceiptData = compose(prop('receipt'), root);
export const getOrderId = compose(prop('id'), getReceiptData);
export const getOrderBasketData = compose(prop('products'), getReceiptData);
export const getOrderPaymentDetails = compose(prop('paymentDetails'), getReceiptData);
export const getOrderStoreData = compose(prop('store'), getReceiptData);
export const getOrderSum = compose(prop('totals.total'), getOrderBasketData);
export const getOrderCreationTime = compose(prop('timestamp'), getReceiptData);
export const getOrderStatus = compose(prop('status'), getReceiptData);
