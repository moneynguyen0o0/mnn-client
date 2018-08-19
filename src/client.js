import React from 'react';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { loadComponents } from 'loadable-components';
import createHistory from 'history/createBrowserHistory';

import App from 'app';
import configureStore from 'app/store';
import rootSaga from 'app/store/sagas';

// Get the initial state from server-side rendering
const initialState = window.__INITIAL_STATE__;
const history = createHistory();
const store = configureStore(history, initialState);

// Run saga watchers
store.runSaga(rootSaga);

// Load all components needed before starting rendering
loadComponents().then(() => {
  hydrate(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>,
    document.getElementById('app')
  );
});
