import {
  CATEGORIES_FETCH_ERROR,
  CATEGORIES_FETCH_START,
  CATEGORIES_FETCH_SUCCESS,
  SET_MAIN_CATEGORY,
} from './actionTypes';

const initialState = {
  categories: null,
  mainCategoryId: null,
  mainCategorySubcategoryId: null,
  isLoading: false,
  isError: false,
};

export default function categoriesReducer(state = initialState, action) {
  switch (action.type) {
    case CATEGORIES_FETCH_ERROR:
      return {
        ...state,
        isError: true,
        isLoading: false,
      };
    case CATEGORIES_FETCH_START:
      return {
        ...state,
        isError: false,
        isLoading: true,
      };
    case CATEGORIES_FETCH_SUCCESS:
      return {
        ...state,
        categories: action.payload,
        mainCategoryId: action.payload[0]?.id,
        isLoading: false,
      };
    case SET_MAIN_CATEGORY:
      return {
        ...state,
        mainCategoryId: action.payload,
      };
    default:
      return state;
  }
}
