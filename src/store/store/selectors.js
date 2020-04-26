import { compose, prop } from 'lodash/fp';

const root = (state) => state.store;

export const getSelectedStoreId = compose(prop('selectedStoreId'), root);

export const getAvailableStores = compose(prop('availableStores'), root);
