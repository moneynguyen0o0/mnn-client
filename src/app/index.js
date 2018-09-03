import React from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import styled, { injectGlobal, ThemeProvider } from 'styled-components';

import routes from 'routes';
import config from './config/app';
import theme from './shared/themes/default';
import { Header, Main } from './components';

const menu = [
  {
    url: '/',
    text: 'Home'
  },
  {
    url: '/users',
    text: 'Users'
  },
  {
    url: '/login',
    text: 'Log in',
    authenticated: false
  },
  {
    url: '/logout',
    text: 'Log out',
    authenticated: true
  }
];

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

const App = ({ session, location }) => (
  <ThemeProvider theme={ theme }>
    <Wrapper>
      <Helmet { ...config } />
      <Header menu={ menu } session={ session } />
      <Main routes={ routes } location={ location } session={ session } />
    </Wrapper>
  </ThemeProvider>
);

export default connect(({ session, router }) => ({
  location: router.location,
  session: session
}))(App);
