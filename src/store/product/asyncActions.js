import { fetchProductError, fetchProductStart, fetchProductSuccess } from './actions';
import { get } from '../../utils/http';
import { PRODUCT_API_URL } from '../../utils/config';
import { createCacheWithTtl, getFromCacheWithTtl } from '../../utils/cache';

export const createProductIdRoute = (id) => `${PRODUCT_API_URL}/${id}`;

export const fetchProductData = (id) => async (dispatch) => {
  try {
    const url = createProductIdRoute(id);
    const cacheKey = url;
    let response = {};
    const cachedItem = await getFromCacheWithTtl(cacheKey);
    if (cachedItem) {
      response = cachedItem;
    } else {
      dispatch(fetchProductStart());
      const { data } = await get(url);
      response = data;
      createCacheWithTtl(cacheKey, data);
    }
    dispatch(fetchProductSuccess(response));
  } catch (e) {
    dispatch(fetchProductError());
  }
};
