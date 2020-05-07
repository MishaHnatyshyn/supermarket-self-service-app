import {
  applyMiddleware, combineReducers, compose, createStore,
} from 'redux';
import thunk from 'redux-thunk';
import authReducer from './auth/reducer';
import uiReducer from './ui/reducer';
import searchReducer from './search/reducer';
import storeReducer from './store/reducer';
import { getUserDataFromStorageAndSetInStore } from './auth/asyncActions';
import { getAvailableStores } from './store/asyncActions';

const initialState = {};

const composeEnhancers = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
  : compose;


const middleware = [thunk];

const enhancer = composeEnhancers(applyMiddleware(...middleware));

const rootReducer = combineReducers({
  auth: authReducer,
  ui: uiReducer,
  search: searchReducer,
  store: storeReducer,
});

const store = createStore(rootReducer, initialState, enhancer);

store.dispatch(getUserDataFromStorageAndSetInStore());
store.dispatch(getAvailableStores());

export default store;
