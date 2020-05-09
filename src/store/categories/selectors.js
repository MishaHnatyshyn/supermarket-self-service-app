import {
  compose, prop, map,
} from 'lodash/fp';
import { createSelector } from 'reselect';

const root = (state) => state.categories;

export const getSelectedMainCategoryId = compose(prop('mainCategoryId'), root);

const getCategories = compose(prop('categories'), root);

export const getMainCategories = compose(
  map(({ id, name, icon }) => ({ id, name, icon })),
  getCategories,
);

const getSelectedMainCategory = createSelector(
  getCategories,
  getSelectedMainCategoryId,
  (categories, selectedCategoryId) => (
    categories.find((category) => category.id === selectedCategoryId)
  ),
);

export const getSelectedMainCategorySubcategories = compose(
  prop('subcategories'),
  getSelectedMainCategory,
);
