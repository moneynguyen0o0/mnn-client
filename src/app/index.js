import React from 'react';
import Helmet from 'react-helmet';
import { Switch, Route } from 'react-router-dom';
import styled, { injectGlobal, ThemeProvider } from 'styled-components';

import { Header } from './components';
import appConfig from './config/app';
import routes from '../routes';

injectGlobal`
  body {
    margin: 0;
  }
  ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
  }
  a {
    text-decoration: none;
  }
`;

const theme = {
  palette: {
    primary: '#1976d2',
    danger: '#d32f2f',
    alert: '#ffa000',
    success: '#388e3c'
  },
  fonts: {
    primary: 'Helvetica Neue, Helvetica, Roboto, sans-serif',
    pre: 'Consolas, Liberation Mono, Menlo, Courier, monospace',
    quote: 'Georgia, serif'
  }
};

const Main = styled.main`
  padding: 1em 4em;
  background: white;
`;

export default () => (
  <ThemeProvider theme={ theme }>
    <div>
      <Helmet { ...appConfig } />
      <Header />
      <Main>
        <Switch>
          {
            routes.map((route, index) => (
              <Route key={ index } { ...route } />
            ))
          }
        </Switch>
      </Main>
    </div>
  </ThemeProvider>
);
