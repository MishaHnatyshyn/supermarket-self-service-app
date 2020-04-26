import { all, takeLatest, select, call, put, delay } from 'redux-saga/effects';
import {
  changeCurrentPage,
  fetchSearchStart,
  fetchSearchError,
  fetchSearchSuccess,
} from './actions';
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
import {
  CHANGE_SEARCH_INPUT,
  FETCH_NEXT_PAGE,
  FETCH_PREV_PAGE,
  PERFORM_SEARCH,
} from './actionTypes';
import { getSelectedStoreId } from '../store/selectors';

export function* formSearchRequestParams(page = 1) {
  const [search, pageSize, storeId, filters] = yield all([
    select(getSearchInputValue),
    select(getPageSize),
    select(getSelectedStoreId),
    select(getAppliedFilters),
  ]);

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
}

export function* debounceSearch() {
  const searchInput = yield select(getSearchInputValue);
  if (searchInput.length < 3) return;
  yield delay(SEARCH_DEBOUNCE_TIME_IN_MS);
  yield call(performSearch);
}

export function* performSearch() {
  yield call(doSearch);
}

export function* doSearch(page = 1) {
  const params = yield call(formSearchRequestParams, page);
  yield put(fetchSearchStart());
  try {
    const { data: searchResponse } = yield call(get, SEARCH_API_URL, { params });
    yield put(fetchSearchSuccess(searchResponse));
  } catch (e) {
    yield put(fetchSearchError(e.text));
  }
}

export function* fetchNextPage() {
  const totalLoadedProducts = yield select(getLoadedProductsCount);
  const nextPage = yield select(getNextPage);
  const currentPage = yield select(getCurrentPage);
  const pageSize = yield select(getPageSize);
  if (totalLoadedProducts <= pageSize * currentPage) {
    yield call(doSearch, nextPage);
  } else {
    yield put(changeCurrentPage(nextPage));
  }
}

export function* fetchPrevPage() {
  const totalLoadedProducts = yield select(getLoadedProductsCount);
  const prevPage = yield select(getPrevPage);
  const pageSize = yield select(getPageSize);
  if (totalLoadedProducts <= pageSize) {
    yield call(doSearch, prevPage);
  } else {
    yield put(changeCurrentPage(prevPage));
  }
}

export function* startWatchSearchActions() {
  yield all([
    takeLatest(FETCH_NEXT_PAGE, fetchNextPage),
    takeLatest(FETCH_PREV_PAGE, fetchPrevPage),
    takeLatest(PERFORM_SEARCH, performSearch),
    takeLatest(CHANGE_SEARCH_INPUT, debounceSearch),
  ]);
}
