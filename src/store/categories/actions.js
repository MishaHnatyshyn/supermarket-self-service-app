import { createAction } from 'redux-actions';

import {
  CATEGORIES_FETCH_ERROR,
  CATEGORIES_FETCH_START,
  CATEGORIES_FETCH_SUCCESS,
  SET_MAIN_CATEGORY,
} from './actionTypes';

export const fetchCategoriesError = createAction(CATEGORIES_FETCH_ERROR);
export const fetchCategoriesSuccess = createAction(
  CATEGORIES_FETCH_SUCCESS,
  (categories) => categories,
);
export const fetchCategoriesStart = createAction(CATEGORIES_FETCH_START);
export const setMainCategory = createAction(SET_MAIN_CATEGORY, (id) => id);
