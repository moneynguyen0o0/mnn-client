import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import createSagaMiddleware, { END } from 'redux-saga';

import reducer from './reducers';

const sagaMiddleware = createSagaMiddleware();

const configureStore = (history, initialState) => {
  const middlewares = [
    sagaMiddleware,
    routerMiddleware(history)
  ];

  const enhancers = compose(applyMiddleware(...middlewares));
  const store = createStore(reducer, initialState, enhancers);

  store.runSaga = sagaMiddleware.run;
  store.close = () => store.dispatch(END);

  return store;
};

export default configureStore;
