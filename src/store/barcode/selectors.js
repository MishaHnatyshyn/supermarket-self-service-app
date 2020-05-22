import {
  compose, prop,
} from 'lodash/fp';

const root = (state) => state.barcode;

// eslint-disable-next-line import/prefer-default-export
export const getScannedProduct = compose(prop('scannedProduct'), root);
export const getIsError = compose(prop('isError'), root);
export const getIsLoading = compose(prop('isLoading'), root);
