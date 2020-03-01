import {
  FETCH_SEARCH_ERROR,
  FETCH_SEARCH_START,
  FETCH_SEARCH_SUCCESS,
  CHANGE_SEARCH_INPUT,
  CHANGE_SORT_PARAM,
  CLEAR_SEARCH_DATA,
  CHANGE_CURRENT_PAGE,
} from './actionTypes';

const initialState = {
  searchInput: '',
  sortBy: '',
  products: [],
  paging: {
    page: 0,
    pageSize: 0,
    pageItemsCount: 0,
    totalCount: 0,
    totalPages: 0,
  },
  availableFilters: {},
  appliedFilters: {},
  isLoading: false,
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
        isLoading: true,
        isError: false,
        errorText: '',
      };
    case FETCH_SEARCH_SUCCESS:
      return {
        ...state,
        paging: action.payload.paging,
        availableFilters: action.payload.availableFilters,
        appliedFilters: action.payload.appliedFilters,
        products: [...state.products, action.payload.products],
      };
    case CLEAR_SEARCH_DATA:
      return initialState;
    default:
      return state;
  }
}
