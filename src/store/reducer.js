import {
  applyMiddleware, combineReducers, compose, createStore,
} from 'redux';
import thunk from 'redux-thunk';
import authReducer from './auth/reducer';
import uiReducer from './ui/reducer';
import { getUserDataFromStorageAndSetInStore } from './auth/asyncActions';

const initialState = {};

const composeEnhancers = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
  : compose;


const middleware = [thunk];

const enhancer = composeEnhancers(applyMiddleware(...middleware));

const rootReducer = combineReducers({
  auth: authReducer,
  ui: uiReducer,
});

const store = createStore(rootReducer, initialState, enhancer);

store.dispatch(getUserDataFromStorageAndSetInStore());

export default store;
