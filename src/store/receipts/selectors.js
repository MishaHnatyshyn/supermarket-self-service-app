import { compose, prop } from 'lodash/fp';

export const root = (state) => state.receipts;

export const areReceiptsLoading = compose(prop('isLoading'), root);
export const getReceipts = compose(prop('receipts'), root);
