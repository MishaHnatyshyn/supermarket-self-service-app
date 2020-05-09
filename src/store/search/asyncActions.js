import {
  changeCurrentPage,
  fetchSearchStart,
  fetchSearchError,
  fetchSearchSuccess,
  changeSearchInput,
  updateProducts,
  amendProducts, clearSearchResult, fetchMoreProductsStart
} from "./actions";
import {
  getAppliedFilters,
  getCurrentPage,
  getLoadedProductsCount,
  getNextPage,
  getPageSize,
  getPrevPage,
  getSearchInputValue,
} from './selectors';
import { get } from '../../utils/http';
import { SEARCH_API_URL, SEARCH_DEBOUNCE_TIME_IN_MS } from '../../utils/config';
import { getSelectedStoreId } from '../store/selectors';

let searchDebounceTimeout = null;

const formSearchRequestParams = (page, state) => {
  const search = getSearchInputValue(state);
  const pageSize = getPageSize(state);
  const storeId = getSelectedStoreId(state) || 1;
  const filters = getAppliedFilters(state);

  const formattedFilters = Object.keys(filters).reduce((acc, curr) => {
    acc[`filters[${curr}]`] = filters[curr];
    return acc;
  }, {});
  return {
    search,
    page,
    pageSize,
    storeId,
    ...formattedFilters,
  };
};

export const debounceSearch = () => async (dispatch, getState) => {
  if (searchDebounceTimeout) {
    clearTimeout(searchDebounceTimeout);
  }
  const searchInput = getSearchInputValue(getState());
  if (searchInput.length < 3) {
    return dispatch(clearSearchResult());
  }
  searchDebounceTimeout = setTimeout(() => {
    dispatch(doSearch());
    searchDebounceTimeout = null;
  }, SEARCH_DEBOUNCE_TIME_IN_MS);
};

export const performSearch = () => (dispatch) => {
  dispatch(doSearch());
};

export const doSearch = (
  page = 1,
  productUpdateAction = updateProducts,
  fetchStartAction = fetchSearchStart,
) => async (
  dispatch,
  getState,
) => {
  const state = getState();
  const params = formSearchRequestParams(page, state);
  dispatch(fetchStartAction());
  try {
    const { data: searchResponse } = await get(SEARCH_API_URL, { params });
    dispatch(fetchSearchSuccess(searchResponse));
    dispatch(productUpdateAction(searchResponse.data));
  } catch (e) {
    dispatch(fetchSearchError(e.text));
  }
};

export const fetchNextPage = () => (dispatch, getState) => {
  const state = getState();
  const totalLoadedProducts = getLoadedProductsCount(state);
  const nextPage = getNextPage(state);
  const currentPage = getCurrentPage(state);
  const pageSize = getPageSize(state);

  if (totalLoadedProducts <= pageSize * currentPage) {
    dispatch(doSearch(nextPage, amendProducts, fetchMoreProductsStart));
  } else {
    dispatch(changeCurrentPage(nextPage));
  }
};

export const fetchPrevPage = () => (dispatch, getState) => {
  const state = getState();
  const totalLoadedProducts = getLoadedProductsCount(state);
  const prevPage = getPrevPage(state);
  const pageSize = getPageSize(state);
  if (totalLoadedProducts <= pageSize) {
    dispatch(doSearch(prevPage, amendProducts));
  } else {
    dispatch(changeCurrentPage(prevPage));
  }
};

export const updateSearch = (searchInput) => (dispatch) => {
  dispatch(changeSearchInput(searchInput));
  dispatch(debounceSearch());
};
