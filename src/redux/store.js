import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import rootReducer from './reducers';
import rootSaga from './sagas';

const initialState = {};
const saga = createSagaMiddleware();

let middlewares = [
  saga,
];
if (process.env.NODE_ENV === 'development') {
  middlewares = [
    saga,
    logger,
  ];
}

/* eslint-disable no-underscore-dangle */
const composeEnhancers = process.env.NODE_ENV === 'development' && typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
  : compose;
/* eslint-enable */
const enhancers = composeEnhancers(applyMiddleware(...middlewares));

const store = createStore(rootReducer, initialState, enhancers);

saga.run(rootSaga);
// Extensions
store.asyncReducers = {};

export default store;
