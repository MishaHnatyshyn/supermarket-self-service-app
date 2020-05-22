import { fetchProductError, fetchProductStart, fetchProductSuccess } from './actions';
import { get } from '../../utils/http';
import { PRODUCT_API_URL } from '../../utils/config';

export const createProductIdRoute = (id) => `${PRODUCT_API_URL}/${id}`;

export const fetchProductData = (id) => async (dispatch) => {
  dispatch(fetchProductStart());
  try {
    const url = createProductIdRoute(id);
    const { data } = await get(url);
    dispatch(fetchProductSuccess(data));
  } catch (e) {
    dispatch(fetchProductError());
  }
};
