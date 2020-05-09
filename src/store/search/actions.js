import { createAction } from 'redux-actions';
import {
  CHANGE_CURRENT_PAGE,
  CHANGE_SEARCH_INPUT,
  CHANGE_SORT_PARAM,
  CLEAR_SEARCH_DATA,
  FETCH_NEXT_PAGE,
  FETCH_PREV_PAGE,
  FETCH_SEARCH_ERROR,
  FETCH_SEARCH_START,
  FETCH_SEARCH_SUCCESS,
  PERFORM_SEARCH,
  AMEND_PRODUCTS,
  UPDATE_PRODUCTS,
  CLEAR_SEARCH_RESULT,
  FETCH_MORE_PRODUCTS_START,
} from './actionTypes';

export const fetchMoreProductsStart = createAction(FETCH_MORE_PRODUCTS_START);
export const clearSearchResult = createAction(CLEAR_SEARCH_RESULT);
export const fetchNextPage = createAction(FETCH_NEXT_PAGE);
export const fetchPrevPage = createAction(FETCH_PREV_PAGE);
export const fetchSearchSuccess = createAction(
  FETCH_SEARCH_SUCCESS,
  ({ meta: { paging, currentFilters, filtering } }) => ({
    paging,
    appliedFilters: currentFilters,
    availableFilters: filtering,
  })
);
export const updateProducts = createAction(UPDATE_PRODUCTS, (products) => products);
export const amendProducts = createAction(AMEND_PRODUCTS, (products) => products);
export const fetchSearchError = createAction(FETCH_SEARCH_ERROR, (error) => error);
export const fetchSearchStart = createAction(FETCH_SEARCH_START);
export const changeSortParam = createAction(CHANGE_SORT_PARAM, (sortParam) => sortParam);
export const changeSearchInput = createAction(CHANGE_SEARCH_INPUT, (inputValue) => inputValue);
export const clearSearchData = createAction(CLEAR_SEARCH_DATA);
export const performSearch = createAction(PERFORM_SEARCH);
export const changeCurrentPage = createAction(CHANGE_CURRENT_PAGE, (page) => page);
