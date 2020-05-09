import { compose, prop } from 'lodash/fp';
import { createSelector } from 'reselect';
import { getBasketItems, getCurrentProcessingProductId } from '../basket/selectors';

export const root = (state) => state.search;

export const getPaging = compose(prop('paging'), root);

export const getSearchInputValue = compose(prop('searchInput'), root);

export const getProducts = compose(prop('products'), root);

export const getProductsForDisplay = createSelector(
  getProducts,
  getCurrentProcessingProductId,
  getBasketItems,
  (products, currentProcessingProductId, baksetItems) => {
    return products.map((product) => {
      const isLoading = product.id === currentProcessingProductId;
      const basketLineItem = baksetItems.find((item) => item.product === product.id);
      const basketData = basketLineItem
        ? {
          quantity: basketLineItem.quantity,
          sum: basketLineItem.sum,
          lineItemId: basketLineItem.id,
        }
        : null;
      return { ...product, isLoading, basketData };
    });
  }
);

export const getAvailableFilters = compose(prop('availableFilters'), root);

export const getIsLoading = compose(prop('isLoading'), root);

export const getIsLoadMoreLoading = compose(prop('isLoadMoreLoading'), root);

export const getWasSearchPerformed = compose(prop('wasSearchPerformed'), root);

export const getAppliedFilters = compose(prop('appliedFilters'), root);

export const getLoadedProductsCount = compose(prop('length'), getProducts);

export const getCurrentPage = compose(prop('page'), getPaging);

export const getPageSize = compose(prop('pageSize'), getPaging);

export const getTotalPages = compose(prop('totalPages'), getPaging);

export const getNextPage = createSelector(
  getCurrentPage,
  getTotalPages,
  (currentPage, totalPages) => (currentPage === totalPages ? null : currentPage + 1)
);

export const isLoadMoreEnabled = createSelector(
  getCurrentPage,
  getTotalPages,
  (currentPage, totalPages) => currentPage < totalPages
);

export const getPrevPage = createSelector(getCurrentPage, (currentPage) =>
  currentPage === 1 ? null : currentPage - 1
);

export const getVisibleProducts = createSelector(
  getPageSize,
  getCurrentPage,
  getProducts,
  (size, currentPage, products) => {
    const start = (currentPage - 1) * size;
    const end = size - 1;
    return products.slice(start, end);
  }
);
