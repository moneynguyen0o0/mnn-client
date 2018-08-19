import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';

import * as userReducer from './user';

const reducers = {
  ...userReducer,
  router
};

const rootReducer = combineReducers(reducers);

export default rootReducer;
