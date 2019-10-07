import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';

import * as sessionReducer from './session';
import * as userReducer from './user';

const reducers = {
  ...sessionReducer,
  ...userReducer,
  router
};

const rootReducer = combineReducers(reducers);

export default rootReducer;
