import {
  applyMiddleware, combineReducers, compose, createStore,
} from 'redux';
import createSagaMiddleware from 'redux-saga';
import initialSaga from './initialSaga';
import storeReducer from './store/reducer';
import searchReducer from './search/reducer';

const initialState = {};

const composeEnhancers = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
  : compose;


const sagaMiddleware = createSagaMiddleware();

const middleware = [sagaMiddleware];

const enhancer = composeEnhancers(
  applyMiddleware(...middleware),
);


const rootReducer = combineReducers({
  store: storeReducer,
  search: searchReducer,
});

const store = createStore(rootReducer, initialState, enhancer);

sagaMiddleware.run(initialSaga);

export default store;
