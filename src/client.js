import React from 'react';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { loadComponents } from 'loadable-components';
import createHistory from 'history/createBrowserHistory';

import App from 'app';
import configureStore from 'app/store';
import rootSaga from 'app/store/sagas';

import { isUserAuthenticated, getUserFromLocalStorage } from 'app/utils/auth';

// Get the initial state from server-side rendering
const initialState = window.__INITIAL_STATE__;

// Take user from the local storage and pass it to store if token is valid
const user = getUserFromLocalStorage();
if (isUserAuthenticated(user)) {
  initialState.session.data = user;
  initialState.session.authenticated = true;
}

// History config
const history = createHistory();
const store = configureStore(history, initialState);

// Run saga watchers
store.runSaga(rootSaga);

// Load all components needed before starting rendering
loadComponents().then(() => {
  hydrate(
    <Provider store={ store }>
      <ConnectedRouter history={ history }>
        <App />
      </ConnectedRouter>
    </Provider>,
    document.getElementById('app')
  );
});
