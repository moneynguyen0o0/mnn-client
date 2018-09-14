import React from 'react';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { I18nextProvider } from 'react-i18next';
import { loadComponents } from 'loadable-components';
import createHistory from 'history/createBrowserHistory';

import App from 'app';
import configureStore from 'app/store';
import rootSaga from 'app/store/sagas';
import i18n from 'app/i18n';

// Get the initial state from server-side rendering
const initialState = window.__INITIAL_STATE__;
const initialI18nStore = window.__INITIAL_I18N_STORE__;
const initialLanguage = window.__INITIAL_LANGUAGE__;

// History config
const history = createHistory();
const store = configureStore(history, initialState);

// Run saga watchers
store.runSaga(rootSaga);

// Load all components needed before starting rendering
loadComponents().then(() => {
  hydrate(
    <I18nextProvider
      i18n={ i18n }
      initialI18nStore={ initialI18nStore }
      initialLanguage={ initialLanguage }
      >
      <Provider store={ store }>
        <ConnectedRouter history={ history }>
          <App />
        </ConnectedRouter>
      </Provider>
    </I18nextProvider>,
    document.getElementById('app')
  );
});
