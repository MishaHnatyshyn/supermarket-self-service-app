import { get } from '../../utils/http';
import { fetchReceiptError, fetchReceiptStart, fetchReceiptSuccess } from './actions';
import { ORDER_API_URL } from '../../utils/config';

export const formatReceiptData = (data) => {
  const {
    id, products, timestamp, paymentDetails, store, status
  } = data;
  const { address } = store;
  const {
    country: city, street, building, postal_code: postalCode,
  } = address;
  const { country } = city;
  return {
    id,
    products,
    timestamp,
    status,
    paymentDetails,
    store: {
      name: store.name,
      country: country.name,
      city: city.name,
      street,
      building,
      postalCode,
    },
  };
};

export const fetchReceiptData = (id) => async (dispatch) => {
  dispatch(fetchReceiptStart());
  try {
    const { data } = await get(`${ORDER_API_URL}/${id}`);
    const formattedData = formatReceiptData(data);
    dispatch(fetchReceiptSuccess(formattedData));
  } catch (e) {
    dispatch(fetchReceiptError(e));
  }
};
