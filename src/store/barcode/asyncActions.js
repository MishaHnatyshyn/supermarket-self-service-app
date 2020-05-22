import { get } from '../../utils/http';
import { BARCODE_SCAN_API_URL } from '../../utils/config';
import { fetchProductError, fetchProductStart, fetchProductSuccess } from './actions';
import { getScannedProductBarcode } from './selectors';

const createBarcodeRoute = (barcode) => `${BARCODE_SCAN_API_URL}/${barcode}`;

// eslint-disable-next-line import/prefer-default-export
export const fetchScannedProduct = (barcode) => async (dispatch, getState) => {
  const currentProductBarcode = getScannedProductBarcode(getState());
  if (currentProductBarcode === barcode) {
    return;
  }
  dispatch(fetchProductStart());
  try {
    const url = createBarcodeRoute(barcode);
    const { data: product } = await get(url);
    dispatch(fetchProductSuccess(product));
  } catch (e) {
    dispatch(fetchProductError());
  }
};
