import {
  fetchCategoriesError,
  fetchCategoriesStart,
  fetchCategoriesSuccess,
} from './actions';
import { get } from '../../utils/http';
import { CATEGORIES_API_URL } from '../../utils/config';

// eslint-disable-next-line import/prefer-default-export
export const fetchCategories = () => async (dispatch) => {
  dispatch(fetchCategoriesStart());
  try {
    const { data: categories } = await get(CATEGORIES_API_URL);
    dispatch(fetchCategoriesSuccess(categories));
  } catch (e) {
    dispatch(fetchCategoriesError());
  }
};
