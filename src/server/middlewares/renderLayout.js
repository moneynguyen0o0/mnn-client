import React from 'react';
import Helmet from 'react-helmet';
import createHistory from 'history/createMemoryHistory';
import { renderToString } from 'react-dom/server';
import { StaticRouter, matchPath } from 'react-router-dom';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';
import { getLoadableState } from 'loadable-components/server';

import App from 'app';
import configureStore from 'app/store';
import wait from 'app/store/sagas/utils/wait';
import template from 'server/utils/template';
import routes from 'routes';

import assets from '../../../public/webpack-assets.json';

const loadBranchData = (store, location) => {
  let preloaders;

  routes.some(route => {
    const match = matchPath(location, route);
    if (match){
      const { loadData } = route;
      if (loadData) {
        preloaders = loadData(match);
      }
    }
    return match;
  });

  if (!preloaders) {
    return Promise.resolve(null);
  }

  return store.runSaga(wait(preloaders)).done;
};

export default () => {
  return (req, res, next) => {
    const history = createHistory();
    const store = configureStore(history);
    const {
      url: {
        location
      },
      i18n
    } = req;

    loadBranchData(store, location).then(async () => {
      try {
        const context = {};
        // styled-components supports concurrent ssr, with stylesheet rehydration
        const sheet = new ServerStyleSheet();
        const RootComponent = (
          <I18nextProvider i18n={i18n}>
            <Provider store={ store }>
              <StaticRouter location={ location } context={ context }>
                <StyleSheetManager sheet={ sheet.instance }>
                  <App />
                </StyleSheetManager>
              </StaticRouter>
            </Provider>
          </I18nextProvider>
        );

        const { url, status = 200 } = context;
        if (url) res.redirect(301, url);

        // Extract loadable state from application tree
        const loadableState = await getLoadableState(RootComponent);

        const markup = renderToString(RootComponent);
        const initialState = store.getState();
        const styleTags = sheet.getStyleTags();
        const helmet = Helmet.renderStatic();

        const initialI18nStore = i18n.languages.reduce((acc, language) => {
          acc[language] = i18n.services.resourceStore.data[language];
          return acc;
        }, {});
        const initialLanguage = i18n.language;

        const body = template({
          markup,
          initialState,
          assets,
          helmet,
          styleTags,
          loadableState,
          initialI18nStore,
          initialLanguage
        });

        console.log(body);

        res.status(status).send(body);
      } catch (err) {
        next(err);
      }
    }).catch(err => next(err));

    // Dispatch a close event so sagas stop listening after they're resolved
    store.close();
  };
};
