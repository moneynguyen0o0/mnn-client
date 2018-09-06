import React from 'react';
import Helmet from 'react-helmet';
import { Switch, Route } from 'react-router-dom';
import styled, { injectGlobal, ThemeProvider } from 'styled-components';

import routes from 'routes';
import appConfig from './config/app';
import menu from './config/menu';
import theme from './config/themes/default';
import { Header } from './components';

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

const Wrapper = styled.div`
  background: white;
`;

const Main = styled.main`
  padding: 1em 4em;
  background: white;
`;

export default () => (
  <ThemeProvider theme={ theme }>
    <Wrapper>
      <Helmet { ...appConfig } />
      <Header menu={ menu } />
      <Main>
        <Switch>
          {
            routes.map((route, index) => (
              <Route key={ index } { ...route } />
            ))
          }
        </Switch>
      </Main>
    </Wrapper>
  </ThemeProvider>
);
