import {
  applyMiddleware, combineReducers, compose, createStore,
} from 'redux';
import thunk from 'redux-thunk';
import authReducer from './auth/reducer';
import uiReducer from './ui/reducer';
import searchReducer from './search/reducer';
import storeReducer from './store/reducer';
import basketReducer from './basket/reducer';
import { getUserDataFromStorageAndSetInStore } from './auth/asyncActions';
import { getAvailableStores } from './store/asyncActions';
import { getUserBasketDataFromStorage } from './basket/asyncActions';
import { fetchCategories } from './categories/asyncActions';
import categoriesReducer from './categories/reducer';
import barcodeReducer from './barcode/reducer';
import userReducer from './user/reducer';
import productReducer from './product/reducer';
import receiptsReducer from './receipts/reducer';
import receiptDetailsReducer from './receiptDetails/reducer';

const initialState = {};

const composeEnhancers = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
  : compose;


const middleware = [thunk];

const enhancer = composeEnhancers(applyMiddleware(...middleware));

const rootReducer = combineReducers({
  auth: authReducer,
  ui: uiReducer,
  categories: categoriesReducer,
  search: searchReducer,
  store: storeReducer,
  basket: basketReducer,
  user: userReducer,
  product: productReducer,
  receipts: receiptsReducer,
  receiptDetails: receiptDetailsReducer,
  barcode: barcodeReducer,
});

const store = createStore(rootReducer, initialState, enhancer);

store.dispatch(getUserDataFromStorageAndSetInStore());
store.dispatch(getAvailableStores());
store.dispatch(getUserBasketDataFromStorage());
store.dispatch(fetchCategories());

export default store;
