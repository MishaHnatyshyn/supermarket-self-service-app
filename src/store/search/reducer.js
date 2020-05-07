import {
  FETCH_SEARCH_ERROR,
  FETCH_SEARCH_START,
  FETCH_SEARCH_SUCCESS,
  CHANGE_SEARCH_INPUT,
  CHANGE_SORT_PARAM,
  CLEAR_SEARCH_DATA,
  CHANGE_CURRENT_PAGE,
  UPDATE_PRODUCTS,
  AMEND_PRODUCTS,
  CLEAR_SEARCH_RESULT,
  FETCH_MORE_PRODUCTS_START,
} from './actionTypes';

const emptySearchResult = {
  wasSearchPerformed: false,
  products: [],
  paging: {
    page: 0,
    pageSize: 8,
    pageItemsCount: 0,
    totalCount: 0,
    totalPages: 0,
  },
  availableFilters: {},
  appliedFilters: {},
};

const initialState = {
  ...emptySearchResult,
  searchInput: '',
  sortBy: '',
  isLoading: false,
  isLoadMoreLoading: false,
  isError: false,
  errorText: null,
};

export default function searchReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_SEARCH_INPUT:
      return {
        ...state,
        searchInput: action.payload,
      };
    case CHANGE_CURRENT_PAGE:
      return {
        ...state,
        paging: {
          ...state.paging,
          page: action.payload,
        },
      };
    case CHANGE_SORT_PARAM:
      return {
        ...state,
        sortBy: action.payload,
      };
    case FETCH_SEARCH_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorText: action.payload,
      };
    case FETCH_SEARCH_START:
      return {
        ...state,
        wasSearchPerformed: true,
        isLoading: true,
        isError: false,
        errorText: '',
      };
    case FETCH_MORE_PRODUCTS_START:
      return {
        ...state,
        isLoadMoreLoading: true,
        wasSearchPerformed: true,
        isError: false,
        errorText: '',
      };
    case FETCH_SEARCH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoadMoreLoading: false,
        paging: action.payload.paging,
        availableFilters: action.payload.availableFilters,
        appliedFilters: action.payload.appliedFilters,
      };
    case UPDATE_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };
    case AMEND_PRODUCTS:
      return {
        ...state,
        products: [...state.products, ...action.payload],
      };
    case CLEAR_SEARCH_RESULT:
      return {
        ...state,
        ...emptySearchResult,
      };
    case CLEAR_SEARCH_DATA:
      return initialState;
    default:
      return state;
  }
}
