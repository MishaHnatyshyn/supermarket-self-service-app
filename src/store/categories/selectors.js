import {
  compose, prop, map, find,
} from 'lodash/fp';
import { createSelector } from 'reselect';

const root = (state) => state.auth;

const getSelectedMainCategoryId = compose(prop('mainCategoryId'), root);

const getCategories = compose(prop('categories'), root);

const getMainCategories = compose(
  map(({ id, name, icon }) => ({ id, name, icon })),
  getCategories,
);

const getSelectedMainCategory = createSelector(
  getMainCategories,
  getSelectedMainCategoryId,
  (categories, selectedCategoryId) => (
    categories.find((category) => category.id === selectedCategoryId)
  ),
);

const getSelectedMainCategorySubcategories = compose(
  prop('subcategories'),
  getSelectedMainCategory,
);
