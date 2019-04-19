import { createStore, combineReducers, applyMiddleware } from 'redux';

import logger from 'redux-logger';

import tableReducer from './tables';

export default function createFinalStore() {
  const finalReducer = combineReducers({
    tables: tableReducer
  });

  return createStore(finalReducer, applyMiddleware(logger));
}
